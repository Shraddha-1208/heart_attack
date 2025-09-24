from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import numpy as np
import traceback
import pymysql
from datetime import datetime
import os
from pytz import timezone
import time
import base64

app = Flask(__name__)
CORS(app)

# Directories for uploads and PDFs
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'uploads')
PDF_FOLDER = os.path.join(os.path.dirname(__file__), 'uploads', 'PDFs')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PDF_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
model = load_model('heart_attack_model.h5')
india = timezone('Asia/Kolkata')


# DB connection using pymysql
def get_connection():
    return pymysql.connect(
        host="127.0.0.1",
        user="root",
        password="",
        database="heart_attack",
        port=3306,
        connect_timeout=5,
        cursorclass=pymysql.cursors.DictCursor
    )


@app.route('/')
def home():
    return jsonify({"message": "Heart Attack Prediction API is running."})


@app.route('/predict', methods=['POST'])
def predict():
    try:
        name = request.form.get('name')
        age = int(request.form.get('age'))
        gender = request.form.get('gender', 'Other')
        uhid = request.form.get('uhid')
        image = request.files.get('image')

        print("📥 Received prediction request")
        print(f"🧾 Params: name={name}, age={age}, gender={gender}, uhid={uhid}")

        if not image or image.filename == '':
            return jsonify({'success': False, 'message': "❌ No image uploaded."}), 400

        timestamp = datetime.now(india).strftime('%Y%m%d%H%M%S')
        filename = f"{timestamp}_{image.filename}"
        image_path = os.path.join(UPLOAD_FOLDER, filename)
        image.save(image_path)
        print(f"🖼️ Saved image to {image_path}")

        print("🔍 Predicting...")
        img = load_img(image_path, target_size=(64, 64))
        img_array = img_to_array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        prediction = float(model.predict(img_array)[0][0])
        label = "Normal" if prediction > 0.5 else "Abnormal"
        confidence = round(abs(prediction - 0.5) * 200, 2)
        print(f"✅ Prediction done: {label}, confidence={confidence}")

        if label == "Abnormal":
            base_risk = 60
            age_risk = 25 if age >= 60 else 15 if age >= 45 else 5
            gender_risk = 10 if gender.lower() == "male" else 5
            risk_rate = round(min(base_risk + age_risk + gender_risk, 100), 2)
        else:
            risk_rate = round(np.random.uniform(30, 39), 2) if age >= 45 else round(np.random.uniform(15, 29), 2)

        if risk_rate >= 80:
            suggestion = "🚨 Very high risk. Immediate medical attention needed."
        elif risk_rate >= 60:
            suggestion = "⚠️ High risk. Please consult a cardiologist soon."
        elif risk_rate >= 40:
            suggestion = "⚠ You appear to be healthy, but due to age-related risks, continue routine health monitoring and follow a heart-healthy lifestyle."
        else:
            suggestion = "✅ You are in good condition. Maintain a balanced diet, exercise regularly."

        try:
            print("🛠 Connecting to DB...")
            conn = get_connection()
            print("🟢 DB connection successful")
            cursor = conn.cursor()
            created_at = datetime.now(india)
            print("🛠 Inserting record into DB...")

            cursor.execute("""
                INSERT INTO report_history 
                (name, age, gender, label, confidence, risk_rate, suggestion, image_path, created_at, uhid, status)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                name, age, gender, label, confidence, risk_rate, suggestion,
                f"uploads/{filename}", created_at, uhid, "Not Sent"
            ))
            report_id = cursor.lastrowid
            conn.commit()
            cursor.close()
            conn.close()
            print("✅ DB insert and close successful")

        except Exception as db_err:
            print("❌ DB error occurred:")
            traceback.print_exc()
            return jsonify({'success': False, 'message': f"❌ Database Error: {str(db_err)}"}), 500

        print("✅ Full prediction process complete.")
        time.sleep(5)

        return jsonify({
            'success': True,
            'name': name,
            'label': label,
            'confidence': float(confidence),
            'risk_rate': float(risk_rate),
            'suggestion': suggestion,
            'image_path': f"Uploads/{filename}",
            'created_at': created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'report_id': report_id
        })

    except Exception as e:
        print("❌ General error in /predict:")
        traceback.print_exc()
        return jsonify({'success': False, 'message': f"❌ Error: {str(e)}"}), 500


@app.route('/reports', methods=['GET'])
def get_reports():
    try:
        uhid = request.args.get('uhid')
        if not uhid:
            return jsonify({'success': False, 'message': 'UHID is required'}), 400

        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT report_id, name, age, gender,uhid, label, confidence, risk_rate, suggestion, image_path, created_at, status, feedback,pdf_path,feedback_pdf_path
            FROM report_history 
            WHERE uhid = %s 
            ORDER BY created_at DESC
        """, (uhid,))
        reports = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify({'success': True, 'reports': reports})
    except Exception as e:
        traceback.print_exc()
        return jsonify({'success': False, 'message': str(e)}), 500
@app.route('/reports/doctor', methods=['GET'])
def get_doctor_reports():
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT report_id, name, age, gender, uhid, label, confidence, 
                   risk_rate, suggestion, image_path, created_at, status, 
                   feedback, pdf_path,feedback_pdf_path
            FROM report_history 
            WHERE status IN ('Pending', 'Reviewed') 
            ORDER BY created_at DESC
        """)
        reports = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify({'success': True, 'reports': reports})
    except Exception as e:
        traceback.print_exc()
        return jsonify({'success': False, 'message': str(e)}), 500


@app.route('/notify', methods=['POST'])
def notify():
    try:
        data = request.get_json()
        report_id = data.get('report_id')  # Optional, if provided
        name = data.get('name')
        uhid = data.get('uhid')
        risk_rate = data.get('riskRate')
        label = data.get('label')
        confidence = data.get('confidence')
        timestamp = data.get('timestamp')
        pdf_base64 = data.get('pdf')
        recipient = data.get('recipient')  # "doctor" or "admin"

        if not all([name, uhid, risk_rate, label, confidence, timestamp, pdf_base64, recipient]):
            return jsonify({'success': False, 'message': 'Missing required fields'}), 400

        # Save PDF to file
        pdf_filename = f"report_{uhid}_{timestamp.replace(':', '-')}.pdf"
        pdf_path = os.path.join(PDF_FOLDER, pdf_filename)
        with open(pdf_path, 'wb') as f:
            f.write(base64.b64decode(pdf_base64))

        # Update report status and PDF path in database
        conn = get_connection()
        cursor = conn.cursor()
        if report_id:
            cursor.execute("""
                UPDATE report_history 
                SET status = %s, pdf_path = %s
                WHERE report_id = %s AND uhid = %s
            """, ('Pending', f"Uploads/PDFs/{pdf_filename}", report_id, uhid))
        else:
            # If no report_id provided, find the latest report for the uhid
            cursor.execute("""
                UPDATE report_history 
                SET status = %s, pdf_path = %s
                WHERE uhid = %s AND created_at = (
                    SELECT MAX(created_at) FROM report_history WHERE uhid = %s
                )
            """, ('Pending', f"Uploads/PDFs/{pdf_filename}", uhid, uhid))

        conn.commit()
        cursor.close()
        conn.close()

        # Simulate notification (e.g., email or internal system)
        print(f"📨 Notification sent to {recipient} for report (UHID: {uhid}, Risk: {risk_rate}%)")

        return jsonify({'success': True, 'message': f'Notification sent to {recipient}'})

    except Exception as e:
        traceback.print_exc()
        return jsonify({'success': False, 'message': str(e)}), 500
@app.route('/all-reports', methods=['GET'])
def get_all_reports():
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM report_history")  # Change table name if needed
        reports = cursor.fetchall()

        return jsonify({'success': True, 'reports': reports})
    except Exception as e:
        print("Error:", str(e))
        return jsonify({'success': False, 'message': str(e)})
    finally:
        cursor.close()
        conn.close()

@app.route('/feedback-status', methods=['GET'])
def feedback_status():
    try:
        report_id = request.args.get('report_id')
        uhid = request.args.get('uhid')
        if not report_id or not uhid:
            return jsonify({'success': False, 'message': 'report_id and uhid are required'}), 400

        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT status, feedback 
            FROM report_history 
            WHERE report_id = %s AND uhid = %s
        """, (report_id, uhid))
        result = cursor.fetchone()
        cursor.close()
        conn.close()

        if not result:
            return jsonify({'success': False, 'message': 'Report not found'}), 404

        return jsonify({
            'success': True,
            'report_id': report_id,
            'status': result['status'],
            'feedback': result['feedback']
        })

    except Exception as e:
        traceback.print_exc()
        return jsonify({'success': False, 'message': str(e)}), 500


@app.route('/submit-feedback', methods=['POST'])
def submit_feedback():
    try:
        report_id = request.form.get('report_id')
        uhid = request.form.get('uhid')
        feedback = request.form.get('feedback')
        file = request.files.get('feedback_pdf')

        if not all([report_id, uhid, feedback, file]):
            return jsonify({'success': False, 'message': 'Missing fields or PDF file'}), 400
        filename = f"{uhid}_feedback.pdf"
        save_path = os.path.join(app.config['UPLOAD_FOLDER'], 'PDFs', filename)
        os.makedirs(os.path.dirname(save_path), exist_ok=True)
        file.save(save_path)

        relative_path = f"uploads/PDFs/{filename}"

        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("""
            UPDATE report_history
            SET status = %s, feedback = %s, feedback_pdf_path = %s
            WHERE report_id = %s AND uhid = %s
        """, ('Reviewed', feedback, relative_path, report_id, uhid))
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({'success': True, 'message': 'Feedback submitted successfully', 'pdf_path': relative_path})
    except Exception as e:
        traceback.print_exc()
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/uploads/<path:filename>')
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

@app.route('/uploads/PDFs/<filename>')
def serve_pdf_file(filename):
    return send_from_directory(PDF_FOLDER, filename)
@app.route('/api/dashboard/summary', methods=['GET'])
def dashboard_summary():
    try:
        conn = get_connection()
        cursor = conn.cursor()

        # Count of patients
        cursor.execute("SELECT COUNT(*) as patient_count FROM patient_master")
        patient_result = cursor.fetchone()
        patient_count = patient_result['patient_count']

        # Count of doctors
        cursor.execute("SELECT COUNT(*) as doctor_count FROM doctor_master")
        doctor_result = cursor.fetchone()
        doctor_count = doctor_result['doctor_count']

        # Count of normal reports
        cursor.execute("SELECT COUNT(*) as normal_count FROM report_history WHERE label = 'Normal'")
        normal_result = cursor.fetchone()
        normal_count = normal_result['normal_count']

        # Count of abnormal reports
        cursor.execute("SELECT COUNT(*) as abnormal_count FROM report_history WHERE label = 'Abnormal'")
        abnormal_result = cursor.fetchone()
        abnormal_count = abnormal_result['abnormal_count']

        # Average risk rate
        cursor.execute("SELECT AVG(risk_rate) as avg_risk FROM report_history")
        avg_risk_result = cursor.fetchone()
        avg_risk = round(avg_risk_result['avg_risk'] or 0, 2)

        cursor.close()
        conn.close()

        return jsonify({
            'patients': patient_count,
            'doctors': doctor_count,
            'normal': normal_count,
            'abnormal': abnormal_count,
            'avgRisk': avg_risk
        })

    except Exception as e:
        traceback.print_exc()
        return jsonify({'success': False, 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)