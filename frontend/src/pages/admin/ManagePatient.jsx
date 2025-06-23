import React, { useState, useEffect } from 'react';
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
  IconButton,
  Avatar,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@mui/material';

import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import axios from 'axios';

const ManagePatient = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);

  // Fetch patients
  const fetchPatients = () => {
    axios.get('http://localhost:5000/api/patients')
      .then(response => {
        setPatients(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching patients:', err);
        setError('Failed to load patients');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // Handle Edit
  const handleEditClick = (patient) => {
    setSelectedPatient(patient);
    setOpenEditModal(true);
  };

  const handleEditSave = () => {
    axios.put(`http://localhost:5000/api/patients/${selectedPatient.id}`, selectedPatient)
      .then(() => {
        setOpenEditModal(false);
        fetchPatients(); // refresh table
      })
      .catch(err => {
        console.error('Error updating patient:', err);
      });
  };

  // Handle Delete
  const handleDeleteClick = (patient) => {
    setSelectedPatient(patient);
    setOpenDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    axios.delete(`http://localhost:5000/api/patients/${selectedPatient.id}`)
      .then(() => {
        setOpenDeleteConfirm(false);
        fetchPatients(); // refresh table
      })
      .catch(err => {
        console.error('Error deleting patient:', err);
      });
  };

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

      {/* Content */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" variant="h6">{error}</Typography>
      ) : (
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
                    <TableCell sx={{ fontWeight: 'bold' }}>Photo</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>UHID</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Gender</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Age</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Phone</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Address</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {patients.map((patient, index) => (
                    <motion.tr
                      key={patient.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <TableCell>
                        <Avatar
                          alt={patient.full_name}
                          src={`http://localhost:5000/${patient.image}`}
                        />
                      </TableCell>
                      <TableCell>{patient.full_name}</TableCell>
                      <TableCell>{patient.UHID}</TableCell>
                      <TableCell>{patient.gender}</TableCell>
                      <TableCell>{patient.age}</TableCell>
                      <TableCell>{patient.phone}</TableCell>
                      <TableCell>{patient.email}</TableCell>
                      <TableCell>{patient.address}</TableCell>
                      <TableCell align="center">
                        <IconButton sx={{ color: '#007bff' }} onClick={() => handleEditClick(patient)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton sx={{ color: '#e53935' }} onClick={() => handleDeleteClick(patient)}>
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
      )}

      {/* Edit Patient Modal */}
      <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <DialogTitle>Edit Patient</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Full Name"
            value={selectedPatient?.full_name || ''}
            onChange={(e) => setSelectedPatient({ ...selectedPatient, full_name: e.target.value })}
          />
          <TextField
            label="Phone"
            value={selectedPatient?.phone || ''}
            onChange={(e) => setSelectedPatient({ ...selectedPatient, phone: e.target.value })}
          />
          <TextField
            label="Email"
            value={selectedPatient?.email || ''}
            onChange={(e) => setSelectedPatient({ ...selectedPatient, email: e.target.value })}
          />
          <TextField
            label="Address"
            value={selectedPatient?.address || ''}
            onChange={(e) => setSelectedPatient({ ...selectedPatient, address: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSave}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={openDeleteConfirm} onClose={() => setOpenDeleteConfirm(false)}>
        <DialogTitle>Delete Patient</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete <b>{selectedPatient?.full_name}</b>?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteConfirm(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDeleteConfirm}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManagePatient;
