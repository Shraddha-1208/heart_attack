import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { motion } from 'framer-motion';

const ReportHistory = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  const uhid = localStorage.getItem('uhid') || 'N/A';

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/reports?uhid=${uhid}`)
      .then(res => {
        if (res.data.success) {
          setReports(res.data.reports);
        }
      })
      .catch(err => {
        console.error("Error fetching reports:", err);
      });
  }, [uhid]);

  const generatePDF = async (report) => {
    setSelectedReport(report);
    setTimeout(async () => {
      const element = document.getElementById('pdf-format');
      if (!element) return;

      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 5, 5, pdfWidth - 10, pdfHeight);
      pdf.save(`${report.name}_retinal_report.pdf`);
    }, 100);
  };

  return (
    <div style={styles.container}>
      <motion.h2 style={styles.heading}>📋 Report History</motion.h2>
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.cell}>#</th>
              <th style={styles.cell}>👤 Name</th>
              <th style={styles.cell}>🎂 Age</th>
              <th style={styles.cell}>⚧ Gender</th>
              <th style={styles.cell}>📊 Result</th>
              <th style={styles.cell}>✅ Confidence</th>
              <th style={styles.cell}>🔥 Risk</th>
              <th style={styles.cell}>💡 Suggestion</th>
              <th style={styles.cell}>🖼️ Image</th>
              <th style={styles.cell}>📄 PDF</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <motion.tr key={index}>
                <td style={styles.cell}>{index + 1}</td>
                <td style={styles.cell}>{report.name}</td>
                <td style={styles.cell}>{report.age}</td>
                <td style={styles.cell}>{report.gender}</td>
                <td style={{ ...styles.cell, color: report.label === 'Abnormal' ? 'red' : 'green' }}>{report.label}</td>
                <td style={styles.cell}>{report.confidence}%</td>
                <td style={styles.cell}>{report.risk_rate}%</td>
                <td style={styles.cell}>{report.suggestion}</td>
                <td style={styles.cell}>
                  <img src={`http://127.0.0.1:5000/${report.image_path}`} alt="Scan" style={styles.image} />
                </td>
                <td style={styles.cell}>
                  <button onClick={() => generatePDF(report)} style={styles.downloadButton}>Download</button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedReport && (
        <div id="pdf-format" style={pdfStyles.container}>
          <h2 style={pdfStyles.title}>🧠 Retinal Health Assessment Report</h2>
          <div style={pdfStyles.row}>
            <div>
              <p><strong>Name:</strong> {selectedReport.name}</p>
              <p><strong>UHID:</strong> {uhid}</p>
              <p><strong>Age:</strong> {selectedReport.age}</p>
              <p><strong>Gender:</strong> {selectedReport.gender}</p>
            </div>
            <div>
              <img
                src={`http://127.0.0.1:5000/${selectedReport.image_path}`}
                alt="Profile"
                style={pdfStyles.image}
              />
            </div>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ backgroundColor: '#e0f2f1' }}>
                <th style={pdfStyles.th}>Question</th>
                <th style={pdfStyles.th}>Answer</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={pdfStyles.td}>Prediction Result</td>
                <td style={pdfStyles.td}>{selectedReport.label}</td>
              </tr>
              <tr>
                <td style={pdfStyles.td}>Confidence</td>
                <td style={pdfStyles.td}>{selectedReport.confidence}%</td>
              </tr>
              <tr>
                <td style={pdfStyles.td}>Risk Rate</td>
                <td
                  style={{
                    ...pdfStyles.td,
                    color:
                      selectedReport.risk_rate >= 80
                        ? 'red'
                        : selectedReport.risk_rate >= 60
                        ? 'orange'
                        : selectedReport.risk_rate >= 40
                        ? '#ff9800'
                        : 'green'
                  }}
                >
                  {selectedReport.risk_rate}%
                </td>
              </tr>
              <tr>
                <td style={pdfStyles.td}>Suggestion</td>
                <td style={pdfStyles.td}>{selectedReport.suggestion}</td>
              </tr>
            </tbody>
          </table>

          <p style={{
            marginTop: '30px',
            fontSize: '13px',
            color: '#666',
            fontStyle: 'italic'
          }}>
            This report is auto-generated based on uploaded retinal image and input parameters. For further interpretation, consult a healthcare professional.
          </p>
        </div>
      )}
    </div>
  );
};

// ----------- Styles -----------
const styles = {
  container: {
    padding: '40px',
    fontFamily: "'Poppins', sans-serif",
    background: '#f9fafc',
    minHeight: '100vh',
  },
  heading: {
    fontSize: '28px',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#00695c',
    fontWeight: 600
  },
  tableWrapper: {
    overflowX: 'auto',
    background: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    padding: '10px'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px',
  },
  cell: {
    border: '1px solid #ccc',
    padding: '12px',
    textAlign: 'center',
    fontSize: '14px',
    backgroundColor: '#ffffff',
  },
  image: {
    width: '50px',
    height: 'auto',
    borderRadius: '6px',
  },
  downloadButton: {
    padding: '6px 12px',
    fontSize: '13px',
    backgroundColor: '#004d40',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  }
};

const pdfStyles = {
  container: {
    position: 'absolute',
    top: '-9999px',
    left: '-9999px',
    padding: '30px',
    width: '700px',
    background: '#fff',
    fontFamily: "'Poppins', sans-serif",
    zIndex: -999,
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#00695c'
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  image: {
    width: '100px',
    height: '100px',
    borderRadius: '8px',
    objectFit: 'cover',
    border: '1px solid #ccc'
  },
  th: {
    border: '1px solid #ccc',
    padding: '10px',
    textAlign: 'left',
    fontWeight: '600',
    backgroundColor: '#f1f8e9'
  },
  td: {
    border: '1px solid #ddd',
    padding: '10px',
    textAlign: 'left'
  }
};

export default ReportHistory;
