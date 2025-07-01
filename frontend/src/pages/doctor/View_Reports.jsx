import React, { useState, useEffect } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Grid, Card, CardContent, Button, Modal, TextField,
  IconButton, Fade, InputAdornment, MenuItem
} from '@mui/material';
import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const timingOptions = ['Morning', 'Evening', 'Both'];

const DoctorViewReports = () => {
  const [reports, setReports] = useState([]);
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState({});
  const [medicines, setMedicines] = useState([]);
  const [exercise, setExercise] = useState('');
  const [checkup, setCheckup] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:5000/reports/doctor`);
        if (res.data.success) {
          const filtered = res.data.reports.filter(
            r => r.status === 'Pending' || r.status === 'Reviewed'
          );
          setReports(filtered);
        }
      } catch (err) {
        console.error('Failed to fetch reports', err);
      }
    };
    fetchReports();
  }, []);

  const openPdfModal = (pdfPath) => {
    if (!pdfPath) return;
    setSelectedPdfUrl(`http://127.0.0.1:5000/${pdfPath.replace('Uploads', 'uploads')}`);
    setPdfModalOpen(true);
  };

  const closePdfModal = () => {
    setPdfModalOpen(false);
    setSelectedPdfUrl(null);
  };

  const openFeedbackModal = (report) => {
    setSelectedReport(report);
    setFeedbackModalOpen(true);
    setMedicines([{ name: '', dosage: '', timing: 'Morning' }]);
    setExercise('');
    setCheckup('');
    setLocation('');
  };

  const handleMedicineChange = (index, field, value) => {
    const updated = [...medicines];
    updated[index][field] = value;
    setMedicines(updated);
  };

  const addMedicine = () => {
    setMedicines([...medicines, { name: '', dosage: '', timing: 'Morning' }]);
  };

  const removeMedicine = (index) => {
    const updated = medicines.filter((_, i) => i !== index);
    setMedicines(updated);
  };

  const handleFeedbackSubmit = async () => {
    try {
      const input = document.getElementById('feedback-pdf-format');
      if (!input) return;
      input.style.display = 'block';

      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'pt', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 20, 20, pdfWidth - 40, pdfHeight);

      const pdfBlob = pdf.output('blob');
      input.style.display = 'none';

      const formData = new FormData();
      formData.append('report_id', selectedReport.report_id);
      formData.append('uhid', selectedReport.uhid);
      formData.append('feedback', JSON.stringify({ medicines, exercise, checkup, location }));
      formData.append('feedback_pdf', new File([pdfBlob], `${selectedReport.uhid}.pdf`, { type: 'application/pdf' }));

      const response = await axios.post('http://127.0.0.1:5000/submit-feedback', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        const updated = reports.map(r =>
          r.report_id === selectedReport.report_id
            ? { ...r, feedback: JSON.stringify({ medicines, exercise, checkup, location }), status: 'Reviewed', feedback_pdf_path: response.data.pdf_path }
            : r
        );
        setReports(updated);
        setFeedbackModalOpen(false);
      }
    } catch (err) {
      console.error('Failed to submit feedback', err);
    }
  };

  return (
    <Box sx={{ padding: 4, background: 'linear-gradient(135deg, #e0f7fa, #f1f8e9)', minHeight: '100vh', fontFamily: 'Poppins, sans-serif' }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: '#004d40' }}>
        🧑‍⚕️ Doctor's Feedback Portal
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={4}>
          <motion.div whileHover={{ scale: 1.03 }}>
            <Card sx={{ bgcolor: '#4db6ac', color: '#fff', borderRadius: 4 }}>
              <CardContent>
                <Typography variant="h6">Total Reports</Typography>
                <Typography variant="h4">{reports.length}</Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={4}>
          <motion.div whileHover={{ scale: 1.03 }}>
            <Card sx={{ bgcolor: '#81c784', color: '#fff', borderRadius: 4 }}>
              <CardContent>
                <Typography variant="h6">Reviewed</Typography>
                <Typography variant="h4">{reports.filter(r => r.status === 'Reviewed').length}</Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={4}>
          <motion.div whileHover={{ scale: 1.03 }}>
            <Card sx={{ bgcolor: '#e57373', color: '#fff', borderRadius: 4 }}>
              <CardContent>
                <Typography variant="h6">Pending</Typography>
                <Typography variant="h4">{reports.filter(r => r.status === 'Pending').length}</Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Report Table */}
      <Paper elevation={6} sx={{ borderRadius: 4, overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ background: '#b2dfdb' }}>
              <TableRow>
                <TableCell>Patient</TableCell>
                <TableCell>UHID</TableCell>
                <TableCell>Risk</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Suggestion</TableCell>
                <TableCell>PDF</TableCell>
                <TableCell>Feedback</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.map((report, index) => (
                <motion.tr key={report.report_id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }}>
                  <TableCell>{report.name}</TableCell>
                  <TableCell>{report.uhid}</TableCell>
                  <TableCell>{report.risk_rate}%</TableCell>
                  <TableCell>{report.status}</TableCell>
                  <TableCell>{report.suggestion}</TableCell>
                  <TableCell>
                    {report.pdf_path ? (
                      <Button size="small" variant="outlined" onClick={() => openPdfModal(report.pdf_path)}>Report</Button>
                    ) : 'N/A'}
                    {report.feedback_pdf_path ? (
                      <Button size="small" variant="outlined" sx={{ ml: 1 }} onClick={() => openPdfModal(report.feedback_pdf_path)}>Feedback</Button>
                    ) : null}
                  </TableCell>
                  <TableCell>
                    {report.status === 'Reviewed' ? (
                      <Typography sx={{ color: '#2e7d32' }}>Submitted</Typography>
                    ) : (
                      <Button size="small" variant="contained" onClick={() => openFeedbackModal(report)}>Give Feedback</Button>
                    )}
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Feedback Modal */}
      <Modal open={feedbackModalOpen} onClose={() => setFeedbackModalOpen(false)} closeAfterTransition>
        <Fade in={feedbackModalOpen}>
          <Box sx={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)', width: '90%',
            maxWidth: 600, bgcolor: 'background.paper',
            borderRadius: 4, boxShadow: 24, p: 4, maxHeight: '90vh', overflowY: 'auto',
          }}>
            <Typography variant="h6" gutterBottom>📝 Patient Feedback</Typography>
            {medicines.map((med, idx) => (
              <Box key={idx} sx={{ display: 'flex', gap: 1, mb: 2, alignItems: 'center' }}>
                <TextField
                  label="Medicine"
                  value={med.name}
                  onChange={(e) => handleMedicineChange(idx, 'name', e.target.value)}
                  fullWidth />
                <TextField
                  label="Dosage"
                  value={med.dosage}
                  onChange={(e) => handleMedicineChange(idx, 'dosage', e.target.value)}
                  fullWidth />
                <TextField
                  select label="Timing"
                  value={med.timing}
                  onChange={(e) => handleMedicineChange(idx, 'timing', e.target.value)}
                  sx={{ minWidth: 120 }}>
                  {timingOptions.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                </TextField>
                <IconButton onClick={() => removeMedicine(idx)}><CloseIcon /></IconButton>
              </Box>
            ))}
            <Button variant="outlined" onClick={addMedicine} sx={{ mb: 2 }}>+ Add Medicine</Button>
            <TextField fullWidth multiline minRows={2} sx={{ mb: 2 }}
              label="Exercises" value={exercise} onChange={(e) => setExercise(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><FitnessCenterIcon /></InputAdornment> }} />
            <TextField fullWidth sx={{ mb: 2 }} label="Check-up Frequency"
              value={checkup} onChange={(e) => setCheckup(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><CalendarTodayIcon /></InputAdornment> }} />
            <TextField fullWidth sx={{ mb: 2 }} label="Check-up Location"
              value={location} onChange={(e) => setLocation(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><LocationOnIcon /></InputAdornment> }} />
            <Box sx={{ textAlign: 'right' }}>
              <Button variant="contained" endIcon={<SendIcon />} onClick={handleFeedbackSubmit}>Submit</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      {/* PDF Modal */}
      <Modal open={pdfModalOpen} onClose={closePdfModal} closeAfterTransition>
        <Fade in={pdfModalOpen}>
          <Box sx={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%', height: '80%',
            bgcolor: '#fff', borderRadius: 3, boxShadow: 24,
            overflow: 'hidden', display: 'flex', flexDirection: 'column'
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
              <IconButton onClick={closePdfModal}><CloseIcon /></IconButton>
            </Box>
            <iframe src={selectedPdfUrl} title="Report PDF" width="100%" height="100%" style={{ border: 'none' }} />
          </Box>
        </Fade>
      </Modal>
      <div id="feedback-pdf-format" style={{ padding: '30px', width: '700px', background: '#fff', fontFamily: "'Poppins', sans-serif", margin: '30px auto', display: 'none' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#004d40' }}>📝 Doctor Feedback Summary Report</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <p><strong>Name:</strong> {selectedReport.name}</p>
            <p><strong>UHID:</strong> {selectedReport.uhid}</p>
            <p><strong>Age:</strong> {selectedReport.age}</p>
            <p><strong>Gender:</strong> {selectedReport.gender}</p>
          </div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ backgroundColor: '#b2dfdb' }}>
              <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left', fontWeight: 'bold' }}>Feedback Category</th>
              <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left', fontWeight: 'bold' }}>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>Medicines</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                {medicines.length > 0 ? medicines.map((med, i) => (
                  <div key={i}>{i + 1}) {med.name} ({med.dosage}) - {med.timing}</div>
                )) : 'No medicines'}
              </td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>Exercises</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{exercise || 'None'}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>Check-up Frequency</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{checkup || 'Not specified'}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>Check-up Location</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{location || 'Not specified'}</td>
            </tr>
          </tbody>
        </table>
        <p style={{ marginTop: '30px', fontSize: '13px', color: '#666' }}>This feedback is generated by the assigned doctor based on your retinal image assessment.</p>
      </div>
    </Box>
  );
};

export default DoctorViewReports;
