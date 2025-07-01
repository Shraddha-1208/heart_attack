import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Grid, Card, CardContent, Button,
  FormControl, InputLabel, Select, MenuItem, Modal, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { motion, AnimatePresence } from 'framer-motion';

const ViewReports = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [filter, setFilter] = useState('all');
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);

  // Fetch all reports for admin
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:5000/all-reports`);
        if (res.data.success) {
          const updated = res.data.reports.map(report => ({
            ...report,
            status: report.status || 'Not Sent',
            feedback_pdf_path: report.feedback_pdf_path || null,
          }));
          setReports(updated);
          setFilteredReports(updated);
        }
      } catch (err) {
        console.error('Error fetching reports:', err);
      }
    };
    fetchReports();
  }, []);

  // Handle filter change
  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);
    if (value === 'sentToDoctor') {
      setFilteredReports(reports.filter(r => r.status === 'Pending' || r.status === 'Reviewed'));
    } else {
      setFilteredReports(reports);
    }
  };

  const openPdfModal = (pdfPath) => {
    const cleanPath = pdfPath.replace('Uploads', 'uploads');
    setSelectedPdfUrl(`http://127.0.0.1:5000/${cleanPath}`);
    setPdfModalOpen(true);
  };

  const closePdfModal = () => {
    setPdfModalOpen(false);
    setSelectedPdfUrl(null);
  };

  return (
    <Box sx={{ padding: 4, background: '#f4fdfd', minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
        🩺 Admin - Patient Reports Overview
      </Typography>

      {/* Filter Dropdown */}
      <Box sx={{ maxWidth: 300, mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Filter Reports</InputLabel>
          <Select value={filter} onChange={handleFilterChange}>
            <MenuItem value="all">All Reports</MenuItem>
            <MenuItem value="sentToDoctor">Reports Sent to Doctor</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Reports Table */}
      <Paper elevation={3} sx={{ borderRadius: 3, padding: 3 }}>
        <Typography variant="h6" mb={2}>Patient Report History</Typography>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: '#e0f2f1' }}>
              <TableRow>
                <TableCell><b>Patient</b></TableCell>
                <TableCell><b>UHID</b></TableCell>
                <TableCell><b>Label</b></TableCell>
                <TableCell><b>Risk</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell><b>Report PDF</b></TableCell>
                <TableCell><b>Doctor Feedback</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredReports.map((report, i) => (
                <TableRow key={report.report_id}>
                  <TableCell>{report.name}</TableCell>
                  <TableCell>{report.uhid}</TableCell>
                  <TableCell style={{ color: report.label === 'Abnormal' ? 'red' : 'green' }}>
                    {report.label}
                  </TableCell>
                  <TableCell>{report.risk_rate}%</TableCell>
                  <TableCell>
                    <span style={{
                      color: report.status === 'Pending' ? 'orange' :
                            report.status === 'Reviewed' ? 'green' : '#888'
                    }}>
                      {report.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {report.pdf_path ? (
                      <Button size="small" variant="outlined" onClick={() => openPdfModal(report.pdf_path)}>
                        View PDF
                      </Button>
                    ) : (
                      <span style={{ color: '#888' }}>Not Available</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {report.feedback_pdf_path ? (
                      <Button
                        size="small"
                        sx={{
                          background: 'linear-gradient(45deg, #0288d1, #26c6da)',
                          color: 'white',
                          borderRadius: '6px'
                        }}
                        onClick={() => openPdfModal(report.feedback_pdf_path)}
                      >
                        View Feedback
                      </Button>
                    ) : (
                      <span style={{ color: report.status === 'Pending' ? '#ff9800' : '#888' }}>
                        {report.status}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* PDF Modal Viewer */}
      <Modal
        open={pdfModalOpen}
        onClose={closePdfModal}
        aria-labelledby="pdf-viewer-title"
        aria-describedby="pdf-viewer-description"
        closeAfterTransition
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height: '90%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 3,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
            <IconButton onClick={closePdfModal}><CloseIcon /></IconButton>
          </Box>
          <iframe
            src={selectedPdfUrl}
            title="PDF Viewer"
            width="100%"
            height="100%"
            style={{ border: 'none' }}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default ViewReports;
