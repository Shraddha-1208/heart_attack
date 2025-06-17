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
  IconButton
} from '@mui/material';

import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';

const dummyDoctors = [
  { id: 1, name: 'Dr. Arjun Mehta', specialization: 'Cardiologist', email: 'arjun@example.com' },
  { id: 2, name: 'Dr. Priya Nair', specialization: 'Ophthalmologist', email: 'priya@example.com' },
  { id: 3, name: 'Dr. Ramesh Rao', specialization: 'General Physician', email: 'ramesh@example.com' },
];

const ManageDoctor = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #e3f2fd, #ffffff)',
        padding: 4,
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: '#1b1f3b',
            mb: 4,
            fontFamily: "'Segoe UI', sans-serif",
          }}
        >
          Welcome to Doctor Management
        </Typography>
      </motion.div>

      {/* Doctor Table Card */}
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
            sx={{ color: '#007bff', fontWeight: 'bold', mb: 2 }}
          >
            Registered Doctors
          </Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#e6f0ff' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Specialization</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }} align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dummyDoctors.map((doc, index) => (
                  <motion.tr
                    key={doc.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <TableCell>{doc.name}</TableCell>
                    <TableCell>{doc.specialization}</TableCell>
                    <TableCell>{doc.email}</TableCell>
                    <TableCell align="center">
                      <IconButton sx={{ color: '#007bff' }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton sx={{ color: '#e53935' }}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
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

export default ManageDoctor;
