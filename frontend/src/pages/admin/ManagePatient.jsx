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

const dummyPatients = [
  { id: 1, name: 'Sneha Patil', age: 29, contact: 'sneha@gmail.com' },
  { id: 2, name: 'Rahul Kumar', age: 42, contact: 'rahul.kumar@yahoo.com' },
  { id: 3, name: 'Aarti Shah', age: 35, contact: 'aarti.shah@outlook.com' },
];

const ManagePatient = () => {
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
          Welcome to Patient Management
        </Typography>
      </motion.div>

      {/* Patient Table */}
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
            Registered Patients
          </Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#e6f0ff' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Age</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Contact</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }} align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dummyPatients.map((patient, index) => (
                  <motion.tr
                    key={patient.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.age}</TableCell>
                    <TableCell>{patient.contact}</TableCell>
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

export default ManagePatient;
