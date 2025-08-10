import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CircularProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

// Register chart.js components
ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const DoctorDashboard = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    todayAppointments: 0,
    completedReports: 0,
    pendingReports: 0,
    avgRisk: 0,
  });
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    try {
      // Get dashboard summary
      const summaryRes = await axios.get('http://127.0.0.1:5000/api/dashboard/summary');
      const summaryData = summaryRes.data || {};

      // Get all doctor reports
      const reportsRes = await axios.get('http://127.0.0.1:5000/reports/doctor');
      const reports = reportsRes.data?.reports || [];

      // Calculate counts based on status
      const completedCount = reports.filter(r => r.status === 'Reviewed').length;
      const pendingCount = reports.filter(r => r.status !== 'Reviewed').length;

      setStats({
        totalPatients: summaryData.patients || 0,
        todayAppointments: 0, // Not provided yet by backend
        completedReports: completedCount,
        pendingReports: pendingCount,
        avgRisk: summaryData.avgRisk || 0
      });

      setLoading(false);
    } catch (err) {
      console.error('Error fetching doctor dashboard:', err);
      setLoading(false);
    }
  };

  fetchData();
}, []);

  // Chart Data
  const barData = {
    labels: ['Completed Reports', 'Pending Reports'],
    datasets: [
      {
        label: 'Reports',
        data: [stats.completedReports, stats.pendingReports],
        backgroundColor: ['#4caf50', '#ff9800'],
        borderRadius: 5,
        barThickness: 50,
      },
    ],
  };

  const pieData = {
    labels: ['Low Risk', 'Medium Risk', 'High Risk'],
    datasets: [
      {
        data: [60, 25, 15], // Replace with API values if available
        backgroundColor: ['#81c784', '#ffeb3b', '#e57373'],
        borderColor: ['#fff', '#fff', '#fff'],
        borderWidth: 2,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #f3e5f5, #ffffff)',
        padding: 4,
      }}
    >
      {/* Welcome Title */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            color: '#4a148c',
            mb: 4,
            fontFamily: "'Segoe UI', sans-serif",
          }}
        >
          Doctor's Dashboard
        </Typography>
      </motion.div>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Count Cards */}
          <Grid container spacing={3} mb={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={3} sx={{ backgroundColor: '#e3f2fd' }}>
                <CardContent>
                  <Typography variant="h6" color="textSecondary">My Patients</Typography>
                  <Typography variant="h4" color="primary">{stats.totalPatients}</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={3} sx={{ backgroundColor: '#e8f5e9' }}>
                <CardContent>
                  <Typography variant="h6" color="textSecondary">Completed Reports</Typography>
                  <Typography variant="h4" color="success.main">{stats.completedReports}</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={3} sx={{ backgroundColor: '#fff8e1' }}>
                <CardContent>
                  <Typography variant="h6" color="textSecondary">Pending Reports</Typography>
                  <Typography variant="h4" color="error">{stats.pendingReports}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Charts and Risk Rate */}
          <Grid container spacing={4}>
            {/* Bar Chart */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Reports Status
                </Typography>
                <Bar data={barData} options={barOptions} />
              </Paper>
            </Grid>

            {/* Pie Chart */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3, height: '100%', textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  Risk Distribution of Patients
                </Typography>
                <Pie data={pieData} />
              </Paper>
            </Grid>

            {/* Average Risk Rate */}
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  Average Risk Rate
                </Typography>
                <Typography variant="h2" color="secondary.main">
                  {stats.avgRisk}%
                </Typography>
                <Typography color="textSecondary">
                  Based on current patient reports
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default DoctorDashboard;
