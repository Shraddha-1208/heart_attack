import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { motion } from 'framer-motion';
import { Box, CircularProgress, Alert } from '@mui/material';

const ReportHistory = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [pdfType, setPdfType] = useState(null); // 'report' or 'feedback'

  const uhid = localStorage.getItem('uhid') || 'N/A';

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`http://127.0.0.1:5000/reports?uhid=${uhid}`);
        if (res.data.success) {
          const reportsWithStatus = res.data.reports.map(report => ({
            ...report,
            status: report.status || 'Not Sent',
            feedback: report.feedback || null,
          }));
          setReports(reportsWithStatus);
        } else {
          setError('Failed to fetch reports');
        }
      } catch (err) {
        setError('Error fetching reports');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, [uhid]);

  const generatePDF = async (report) => {
    setSelectedReport(report);
    setTimeout(async () => {
      const element = document.getElementById('pdf-format');
      if (!element) return;

      element.style.display = 'block';
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 5, 5, pdfWidth - 10, pdfHeight);
      pdf.save(`${report.name}_report.pdf`);
      element.style.display = 'none';
    }, 100);
  };

  const memoizedReports = useMemo(() => reports, [reports]);

  return (
    <div style={styles.container}>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      {!loading && !error && (
        <>
          <h2 style={styles.heading}>📋 Report History</h2>
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
                  <th style={styles.cell}>📄 Download</th>
                  <th style={styles.cell}>📨 Feedback</th>
                </tr>
              </thead>
              <tbody>
                {memoizedReports.map((report, index) => (
                  <motion.tr
                    key={report.report_id || index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <td style={styles.cell}>{index + 1}</td>
                    <td style={styles.cell}>{report.name}</td>
                    <td style={styles.cell}>{report.age}</td>
                    <td style={styles.cell}>{report.gender}</td>
                    <td style={{ ...styles.cell, color: report.label === 'Abnormal' ? 'red' : 'green' }}>{report.label}</td>
                    <td style={styles.cell}>{report.confidence}%</td>
                    <td style={{
                      ...styles.cell,
                      color:
                        report.risk_rate >= 80 ? 'red' :
                        report.risk_rate >= 60 ? 'orange' :
                        report.risk_rate >= 40 ? '#ff9800' : 'green'
                    }}>
                      {report.risk_rate}%
                    </td>
                    <td style={styles.cell}>{report.suggestion}</td>
                    <td style={styles.cell}>
                      <img
                        src={`http://127.0.0.1:5000/${report.image_path}`}
                        alt="Scan"
                        style={styles.image}
                        onError={(e) => {
                          e.target.src = '/placeholder.png';
                          e.target.style.opacity = 0.5;
                        }}
                      />
                    </td>
                    <td style={styles.cell}>
                      <motion.button
                        onClick={() => generatePDF(report)}
                        style={styles.downloadButton}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Download
                      </motion.button>
                    </td>
                  <td style={styles.cell}>
  {report.feedback_pdf_path ? (
    <motion.button
      onClick={async () => {
        const fixedPath = report.feedback_pdf_path.replace('Uploads/', 'uploads/');
        const res = await axios.get(`http://127.0.0.1:5000/${fixedPath}`, {
          responseType: 'blob'
        });
        const blob = new Blob([res.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
        setSelectedReportId(report.report_id);
        setPdfType('feedback');
      }}
      style={{ ...styles.feedbackButton, backgroundColor: '#0288d1' }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Doctor Feedback
    </motion.button>
  ) : (
    <span style={{ color: report.status === 'Pending' ? '#ff9800' : '#666' }}>
      {report.status}
    </span>
  )}
</td>


                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Hidden format for PDF generation */}
          {selectedReport && (
            <div id="pdf-format" style={pdfStyles.container}>
              <h2 style={pdfStyles.title}>🧠 Health Assessment Report</h2>
              <div style={pdfStyles.row}>
                <div>
                  <p><strong>Name:</strong> {selectedReport.name}</p>
                  <p><strong>UHID:</strong> {uhid}</p>
                  <p><strong>Age:</strong> {selectedReport.age}</p>
                  <p><strong>Gender:</strong> {selectedReport.gender}</p>
                </div>
                <img src={`http://127.0.0.1:5000/${selectedReport.image_path}`} style={pdfStyles.image} alt="scan" />
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  <tr><td style={pdfStyles.th}>Label</td><td style={pdfStyles.td}>{selectedReport.label}</td></tr>
                  <tr><td style={pdfStyles.th}>Confidence</td><td style={pdfStyles.td}>{selectedReport.confidence}%</td></tr>
                  <tr><td style={pdfStyles.th}>Risk</td><td style={pdfStyles.td}>{selectedReport.risk_rate}%</td></tr>
                  <tr><td style={pdfStyles.th}>Suggestion</td><td style={pdfStyles.td}>{selectedReport.suggestion}</td></tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Modal PDF Viewer */}
        {pdfUrl && selectedReportId && (
  <div style={styles.modalOverlay} onClick={() => { setPdfUrl(null); setSelectedReportId(null); setPdfType(null); }}>
    <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
      <h3 style={{ textAlign: 'center', marginTop: '10px', fontFamily: 'Poppins, sans-serif' }}>
        {pdfType === 'feedback' ? '📝 Doctor Feedback Report' : '📄 Patient Prediction Report'}
      </h3>
      <iframe
        src={pdfUrl}
        title="PDF Viewer"
        style={styles.modalPdf}
      />
      <button
        style={styles.closeButton}
        onClick={() => { setPdfUrl(null); setSelectedReportId(null); setPdfType(null); }}
      >
        ✖
      </button>
    </div>
  </div>
)}

        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    fontFamily: "'Poppins', sans-serif",
    background: 'linear-gradient(to right, #f8fbfd, #e0f2f1)',
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
    borderRadius: '6px'
  },
  downloadButton: {
    padding: '6px 12px',
    fontSize: '13px',
    backgroundColor: '#004d40',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  feedbackButton: {
    padding: '6px 12px',
    fontSize: '13px',
    background: 'linear-gradient(45deg, #d81b60, #f06292)',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0, left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modalContent: {
    position: 'relative',
    width: '80%',
    height: '90vh',
    backgroundColor: '#fff',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 0 20px rgba(0,0,0,0.5)'
  },
  modalPdf: {
    width: '100%',
    height: '100%',
    border: 'none'
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: '#d32f2f',
    color: 'white',
    border: 'none',
    padding: '6px 10px',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer',
    zIndex: 1001
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
    backgroundColor: '#e0f7fa',
    fontWeight: 'bold'
  },
  td: {
    border: '1px solid #ccc',
    padding: '10px',
  }
};

export default ReportHistory;
