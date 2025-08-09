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

const Dashboard = () => {
  const [counts, setCounts] = useState({
    patients: 0,
    doctors: 0,
    normal: 0,
    abnormal: 0,
    avgRisk: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/dashboard/summary')
      .then(res => {
        setCounts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching dashboard data:', err);
        setLoading(false);
      });
  }, []);

  // Chart Data
  const barData = {
    labels: ['Normal', 'Abnormal'],
    datasets: [
      {
        label: 'Cases',
        data: [counts.normal, counts.abnormal],
        backgroundColor: ['#42a5f5', '#ef5350'],
        borderRadius: 5,
        barThickness: 50,
      },
    ],
  };

  const pieData = {
    labels: ['Normal', 'Abnormal'],
    datasets: [
      {
        data: [counts.normal, counts.abnormal],
        backgroundColor: ['#81c784', '#e57373'],
        borderColor: ['#fff', '#fff'],
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
        background: 'linear-gradient(to right, #e3f2fd, #ffffff)',
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
            color: '#1b1f3b',
            mb: 4,
            fontFamily: "'Segoe UI', sans-serif",
          }}
        >
          Welcome to EyeBeat
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
              <Card elevation={3} sx={{ backgroundColor: '#fff8e1' }}>
                <CardContent>
                  <Typography variant="h6" color="textSecondary">Patients</Typography>
                  <Typography variant="h4" color="primary">{counts.patients}</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={3} sx={{ backgroundColor: '#e8f5e9' }}>
                <CardContent>
                  <Typography variant="h6" color="textSecondary">Doctors</Typography>
                  <Typography variant="h4" color="primary">{counts.doctors}</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={3} sx={{ backgroundColor: '#e3f2fd' }}>
                <CardContent>
                  <Typography variant="h6" color="textSecondary">Normal Cases</Typography>
                  <Typography variant="h4" color="primary">{counts.normal}</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={3} sx={{ backgroundColor: '#ffebee' }}>
                <CardContent>
                  <Typography variant="h6" color="textSecondary">Abnormal Cases</Typography>
                  <Typography variant="h4" color="error">{counts.abnormal}</Typography>
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
                  Normal vs Abnormal Cases
                </Typography>
                <Bar data={barData} options={barOptions} />
              </Paper>
            </Grid>

            {/* Pie Chart */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3, height: '100%', textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  Distribution of Cases
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
                <Typography variant="h2" color="warning.main">
                  {counts.avgRisk}%
                </Typography>
                <Typography color="textSecondary">
                  Based on recent reports
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default Dashboard;
