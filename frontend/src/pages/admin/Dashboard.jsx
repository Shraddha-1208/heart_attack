import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';

const Dashboard = () => {
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

      {/* Dashboard Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            borderRadius: 3,
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            maxWidth: '800px',
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#007bff' }}
          >
            Dashboard Overview
          </Typography>
          <Typography
            sx={{ color: '#333', fontSize: '1.1rem', lineHeight: 1.6 }}
          >
            This panel allows the admin to manage doctors, patients, and view reports related to heart attack prediction through retinal eye analysis. Use the side menu to navigate between different sections.
          </Typography>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default Dashboard;
