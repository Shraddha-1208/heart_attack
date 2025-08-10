import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Pie, Bar } from 'react-chartjs-2';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const UploadImage = () => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notificationSent, setNotificationSent] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const uhid = (localStorage.getItem('uhid') || '').trim();

  const toggleForm = () => {
    setShowForm(!showForm);
    setResult(null);
    setNotificationSent(false);
  };

  const generatePDFBase64 = async () => {
    const pdfTarget = document.getElementById('pdf-format');
    if (!pdfTarget) return null;

    pdfTarget.style.display = 'block';
    const canvas = await html2canvas(pdfTarget, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 5, 5, pdfWidth - 10, pdfHeight);
    pdfTarget.style.display = 'none';
    return pdf.output('datauristring').split(',')[1]; // Return base64 string
  };

  const downloadPDF = async () => {
    const pdfTarget = document.getElementById('pdf-format');
    if (!pdfTarget) return;

    pdfTarget.style.display = 'block';
    const canvas = await html2canvas(pdfTarget, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 5, 5, pdfWidth - 10, pdfHeight);
    pdf.save(`${result.name}_retinal_report.pdf`);
    pdfTarget.style.display = 'none';
  };

  const sendNotification = async () => {
    if (!result || result.label.toLowerCase() === 'normal') return;

    const pdfBase64 = await generatePDFBase64();
    if (!pdfBase64) {
      alert('⚠️ Failed to generate PDF for notification.');
      return;
    }

    const notificationData = {
      name: result.name,
      uhid,
      riskRate: result.riskRate,
      label: result.label,
      confidence: result.confidence,
      timestamp: new Date().toISOString(),
      pdf: pdfBase64,
      recipient: result.riskRate >= 80 ? 'doctor' : 'admin'
    };

    try {
      await axios.post('http://127.0.0.1:5000/notify', notificationData);
      setNotificationSent(true);
      setTimeout(() => setNotificationSent(false), 5000); // Hide notification after 5 seconds
    } catch (err) {
      console.error('Failed to send notification:', err);
      alert('⚠️ Failed to send notification to ' + notificationData.recipient);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !age || !gender || !image) {
      alert("❌ Please fill all fields and upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('age', age);
    formData.append('gender', gender);
    formData.append('image', image);
    formData.append('uhid', uhid);
    try {
      setLoading(true);
      const response = await axios.post('http://127.0.0.1:5000/predict', formData);

      const data = response.data;
      if (data.success) {
        setResult({
          name: data.name,
          label: data.label,
          confidence: parseFloat(data.confidence),
          riskRate: parseFloat(data.risk_rate),
          suggestion: data.suggestion
        });
        setShowForm(false);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Server error. Make sure Flask is running.");
    } finally {
      setLoading(false);
    }
  };

  const pieChartData = result && {
    labels: ['Risk Rate', 'Remaining'],
    datasets: [
      {
        data: [result.riskRate, 100 - result.riskRate],
        backgroundColor: ['#ef5350', '#c8e6c9'],
        borderWidth: 2,
      },
    ],
  };

  const barChartData = result && {
    labels: [result.name],
    datasets: [
      {
        label: 'Confidence',
        data: [result.confidence],
        backgroundColor: '#66bb6a',
      },
    ],
  };

  return (
    <div style={styles.page}>
      <motion.div style={styles.container} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
        <h1 style={styles.heading}>🩺 Retinal Image Prediction</h1>

        <AnimatePresence>
          {notificationSent && (
            <motion.div
              style={styles.notificationBanner}
              initial={{ opacity: 0, rotateY: 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: -90 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <span role="img" aria-label="success">✅</span> Report sent to {result.riskRate >= 80 ? 'Doctor' : 'Admin'} for review!
            </motion.div>
          )}
        </AnimatePresence>

        {!result && (
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={toggleForm} style={styles.toggleButton}>
            {showForm ? 'Hide Upload Form' : 'Upload Retinal Image'}
          </motion.button>
        )}

        {showForm && (
          <motion.form
            onSubmit={handleSubmit}
            style={styles.form}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
          <input
  type="text"
  placeholder="Full Name"
  value={name}
  onChange={e => {
    const value = e.target.value;
    // Only allow letters and spaces
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setName(value);
    }
  }}
  style={{
    ...styles.input,
    borderColor: name.trim() === '' ? 'red' : '#ccc'
  }}
/>
{ name.trim() === '' && <span style={{ color: 'red', fontSize: '0.8rem' }}>Name is required</span> }

<input
  type="number"
  placeholder="Age"
  value={age}
  onChange={e => {
    const value = e.target.value;
    if (value === '' || (Number(value) > 0 && Number(value) <= 120)) {
      setAge(value);
    }
  }}
  style={{
    ...styles.input,
    borderColor: age === '' || age <= 0 || age > 120 ? 'red' : '#ccc'
  }}
/>
{ (age === '' || age <= 0 || age > 120) && (
  <span style={{ color: 'red', fontSize: '0.8rem' }}>Enter a valid age (1–120)</span>
)}

<select
  value={gender}
  onChange={e => setGender(e.target.value)}
  style={styles.input}
>
  <option value="">Select Gender</option>
  <option value="Female">Female</option>
  <option value="Male">Male</option>
  <option value="Other">Other</option>
</select>

            <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} style={styles.input} />
            <motion.button type="submit" style={styles.button} disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              {loading ? "⏳ Predicting..." : "Submit"}
            </motion.button>
          </motion.form>
        )}

        {result && (
          <>
            <motion.div id="pdf-container" style={styles.resultCard} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h2 style={{ textAlign: 'center', marginBottom: '16px' }}>📋 Retinal Health Report</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                <img
                  src={image ? URL.createObjectURL(image) : ''}
                  alt="Profile"
                  style={{ width: '120px', height: '120px', borderRadius: '8px', border: '2px solid #ccc', objectFit: 'cover' }}
                />
                <div style={{ lineHeight: '1.6' }}>
                  <p><strong>Name:</strong> {result.name}</p>
                  <p><strong>UHID:</strong> {uhid}</p>
                  <p><strong>Age:</strong> {age}</p>
                  <p><strong>Gender:</strong> {gender}</p>
                </div>
              </div>

              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Result</th>
                    <th style={styles.th}>Confidence</th>
                    <th style={styles.th}>Risk (%)</th>
                    <th style={styles.th}>Suggestion</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={styles.td}>{result.label}</td>
                    <td style={styles.td}>{result.confidence}%</td>
                    <td
                      style={{
                        ...styles.td,
                        color:
                          result.riskRate >= 80
                            ? 'red'
                            : result.riskRate >= 60
                              ? 'orange'
                              : result.riskRate >= 40
                                ? '#ff9800'
                                : 'green'
                      }}
                    >
                      {result.riskRate}%
                    </td>
                    <td style={styles.td}>{result.suggestion}</td>
                  </tr>
                </tbody>
              </table>

              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <motion.button
                  onClick={toggleForm}
                  style={{ ...styles.button, backgroundColor: '#6d4c41', marginLeft: '12px' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  🔙 Back
                </motion.button>
                {result.label.toLowerCase() !== 'normal' && (
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <motion.button
                      onClick={sendNotification}
                      style={styles.feedbackButton}
                      whileHover={{ scale: 1.05, boxShadow: '0 8px 16px rgba(0,0,0,0.3)' }}
                      whileTap={{ scale: 0.95 }}
                      animate={{
                        boxShadow: [
                          '0 4px 12px rgba(216, 27, 96, 0.3)',
                          '0 8px 16px rgba(216, 27, 96, 0.5)',
                          '0 4px 12px rgba(216, 27, 96, 0.3)',
                        ],
                        transition: { repeat: Infinity, duration: 2, ease: 'easeInOut' }
                      }}
                      onMouseEnter={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                    >
                      📨 Request Doctor Feedback
                    </motion.button>
                    <AnimatePresence>
                      {showTooltip && (
                        <motion.div
                          style={styles.tooltip}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          Send report to {result.riskRate >= 60 ? 'Doctor' : 'Admin'} for review
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </motion.div>

            <div style={{ marginTop: '30px', textAlign: 'center' }}>
              <button onClick={downloadPDF} style={styles.downloadButton}>
                📄 Download PDF Report
              </button>
            </div>

            <div
              id="pdf-format"
              style={{
                padding: '30px',
                width: '700px',
                background: '#fff',
                fontFamily: "'Poppins', sans-serif",
                margin: '30px auto',
                display: 'none'
              }}
            >
              <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#00695c' }}>
                🧠 Retinal Health Assessment Report
              </h2>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <p><strong>Name:</strong> {result.name}</p>
                  <p><strong>UHID:</strong> {uhid}</p>
                  <p><strong>Age:</strong> {age}</p>
                  <p><strong>Gender:</strong> {gender}</p>
                </div>
                <div>
                  {image && (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Profile"
                      style={{ width: '100px', height: '100px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #ccc' }}
                    />
                  )}
                </div>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#e0f2f1' }}>
                    <th style={styles.th}>Question</th>
                    <th style={styles.th}>Answer</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={styles.td}>Prediction Result</td>
                    <td style={styles.td}>{result.label}</td>
                  </tr>
                  <tr>
                    <td style={styles.td}>Confidence</td>
                    <td style={styles.td}>{result.confidence}%</td>
                  </tr>
                  <tr>
                    <td style={styles.td}>Risk Rate</td>
                    <td
                      style={{
                        ...styles.td,
                        color:
                          result.riskRate >= 80 ? 'red' :
                            result.riskRate >= 60 ? 'orange' :
                              result.riskRate >= 40 ? '#ff9800' :
                                'green'
                      }}
                    >{result.riskRate}%</td>
                  </tr>
                  <tr>
                    <td style={styles.td}>Suggestion</td>
                    <td style={styles.td}>{result.suggestion}</td>
                  </tr>
                </tbody>
              </table>

              <p style={{ marginTop: '30px', fontSize: '13px', color: '#666' }}>
                This report is auto-generated based on uploaded retinal image and input parameters. For further interpretation, consult a healthcare professional.
              </p>
            </div>

            <div style={styles.chartContainer}>
              {pieChartData && (
                <motion.div style={styles.chartBox} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
                  <h3 style={styles.chartTitle}>🧠 Risk Distribution</h3>
                  <Pie data={pieChartData} />
                </motion.div>
              )}

              {barChartData && (
                <motion.div style={styles.chartBox} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
                  <h3 style={styles.chartTitle}>📈 Confidence Level</h3>
                  <Bar data={barChartData} />
                </motion.div>
              )}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(to right, #f8fbfd, #e0f2f1)',
    padding: '40px 10px',
    fontFamily: "'Poppins', sans-serif"
  },
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    backgroundColor: '#ffffffee',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    padding: '40px',
    position: 'relative'
  },
  heading: {
    textAlign: 'center',
    color: '#00695c',
    fontSize: '28px',
    fontWeight: 600,
    marginBottom: '30px'
  },
  toggleButton: {
    display: 'block',
    margin: '0 auto 20px',
    padding: '12px 26px',
    fontSize: '16px',
    backgroundColor: '#00897b',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '600'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  input: {
    padding: '14px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    outline: 'none'
  },
  button: {
    padding: '10px 16px',
    backgroundColor: '#00796b',
    color: 'white',
    fontSize: '14px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600'
  },
  downloadButton: {
    padding: '12px 26px',
    fontSize: '16px',
    backgroundColor: '#004d40',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
  },
  feedbackButton: {
    padding: '12px 24px',
    fontSize: '16px',
    background: 'linear-gradient(45deg, #d81b60, #f06292)',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontWeight: '600',
    cursor: 'pointer',
    marginLeft: '12px',
    transition: 'background 0.3s ease'
  },
  tooltip: {
    position: 'absolute',
    bottom: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '8px 12px',
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    zIndex: 10,
    whiteSpace: 'nowrap'
  },
  resultCard: {
    marginTop: '40px',
    padding: '24px',
    borderRadius: '12px',
    backgroundColor: '#f1f8e9',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
    fontSize: '15px',
    border: '1px solid #ddd'
  },
  th: {
    backgroundColor: '#e0f2f1',
    padding: '12px',
    textAlign: 'center',
    border: '1px solid #ccc',
    fontWeight: 600,
    color: '#00695c'
  },
  td: {
    padding: '12px',
    textAlign: 'center',
    border: '1px solid #ddd',
    color: '#333'
  },
  chartContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginTop: '30px',
    flexWrap: 'wrap'
  },
  chartBox: {
    width: '340px',
    height: '300px',
    margin: '20px 10px'
  },
  chartTitle: {
    textAlign: 'center',
    marginBottom: '10px',
    fontWeight: 600
  },
  notificationBanner: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    padding: '12px 24px',
    background: 'linear-gradient(45deg, #4caf50, #81c784)',
    color: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    fontSize: '16px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  }
};

const pdfStyles = {
  th: {
    border: '1px solid #ccc',
    padding: '10px',
    textAlign: 'left',
    fontWeight: '600',
    backgroundColor: '#f1f8e9',
  },
  td: {
    border: '1px solid #ddd',
    padding: '10px',
    textAlign: 'left',
  }
};

export default UploadImage;