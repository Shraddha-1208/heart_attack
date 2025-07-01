import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Modal, IconButton, Button, Fade
} from '@mui/material';
import { motion } from 'framer-motion';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';

const DoctorReportHistory = () => {
  const [history, setHistory] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:5000/reports/doctor');
        if (res.data.success) {
          const reviewedReports = res.data.reports.filter(r => r.status === 'Reviewed');
          setHistory(reviewedReports);
        }
      } catch (err) {
        console.error('Failed to fetch history reports', err);
      }
    };

    fetchHistory();
  }, []);

  const handleViewFeedback = (pdfPath) => {
    if (!pdfPath) {
      setSelectedPdfUrl('');
    } else {
      setSelectedPdfUrl(`http://127.0.0.1:5000/${pdfPath}`);
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPdfUrl('');
  };

  return (
    <Box sx={{ p: 4, background: 'linear-gradient(145deg, #e0f2f1, #f9fbe7)', minHeight: '100vh', fontFamily: 'Poppins' }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: '#00695c' }}>
        📄 Doctor Report History
      </Typography>

      <Paper elevation={6} sx={{ borderRadius: 4 }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ background: '#b2dfdb' }}>
              <TableRow>
                <TableCell>Patient</TableCell>
                <TableCell>UHID</TableCell>
                <TableCell>Risk</TableCell>
                <TableCell>Label</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>View Feedback PDF</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.length > 0 ? history.map((report, index) => (
                <motion.tr
                  key={report.report_id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <TableCell>{report.name}</TableCell>
                  <TableCell>{report.uhid}</TableCell>
                  <TableCell>{report.risk_rate}%</TableCell>
                  <TableCell>{report.label}</TableCell>
                  <TableCell sx={{ color: 'green', fontWeight: 'bold' }}>Reviewed</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<VisibilityIcon />}
                      onClick={() => handleViewFeedback(report.feedback_pdf_path)}
                      disabled={!report.feedback_pdf_path}
                    >
                      {report.feedback_pdf_path ? 'View PDF' : 'No PDF'}
                    </Button>
                  </TableCell>
                </motion.tr>
              )) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">No reviewed reports found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* PDF Modal */}
      <Modal open={modalOpen} onClose={handleCloseModal} closeAfterTransition>
        <Fade in={modalOpen}>
          <Box sx={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'white',
            width: '90%', maxWidth: 800,
            borderRadius: 4,
            boxShadow: 24,
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            maxHeight: '90vh',
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton onClick={handleCloseModal}><CloseIcon /></IconButton>
            </Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              📝 Feedback PDF Preview
            </Typography>
            {selectedPdfUrl ? (
              <iframe
                src={selectedPdfUrl}
                title="Feedback PDF"
                width="100%"
                height="600px"
                style={{ border: '1px solid #ccc', borderRadius: '8px' }}
              />
            ) : (
              <Typography>No PDF available for this report.</Typography>
            )}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default DoctorReportHistory;
