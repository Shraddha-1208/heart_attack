import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import { motion } from 'framer-motion';

const reportStats = [
  { title: 'Total Reports', value: 120, color: '#1976d2' },
  { title: 'Normal Cases', value: 78, color: '#43a047' },
  { title: 'Abnormal Cases', value: 42, color: '#e53935' },
];

const dummyReports = [
  { id: 1, patient: 'Sneha Patil', status: 'Normal', date: '2025-06-01' },
  { id: 2, patient: 'Rahul Kumar', status: 'Abnormal', date: '2025-06-03' },
  { id: 3, patient: 'Aarti Shah', status: 'Normal', date: '2025-06-06' },
];

const ViewReports = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #e3f2fd, #ffffff)',
        padding: 4,
      }}
    >
      {/* Animated Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: '#1a237e',
            mb: 4,
            fontFamily: "'Segoe UI', sans-serif",
          }}
        >
          Medical Report Overview
        </Typography>
      </motion.div>

      {/* Report Summary Cards */}
      <Grid container spacing={3} mb={4}>
        {reportStats.map((stat, index) => (
          <Grid item xs={12} sm={4} key={stat.title}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card
                sx={{
                  backgroundColor: stat.color,
                  color: '#fff',
                  borderRadius: 3,
                  boxShadow: 3,
                }}
              >
                <CardContent>
                  <Typography variant="h6">{stat.title}</Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {stat.value}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Reports Table */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Paper
          elevation={3}
          sx={{
            borderRadius: 3,
            padding: 3,
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ color: '#1976d2', fontWeight: 'bold', mb: 2 }}
          >
            Patient Report History
          </Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#e6f0ff' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Patient</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dummyReports.map((report, index) => (
                  <motion.tr
                    key={report.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <TableCell>{report.patient}</TableCell>
                    <TableCell
                      sx={{
                        color:
                          report.status === 'Normal'
                            ? '#2e7d32'
                            : '#c62828',
                        fontWeight: 'medium',
                      }}
                    >
                      {report.status}
                    </TableCell>
                    <TableCell>{report.date}</TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default ViewReports;
