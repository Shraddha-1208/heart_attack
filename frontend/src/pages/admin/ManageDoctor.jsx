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

const ManageDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);

  // Fetch doctor data
  const fetchDoctors = () => {
    axios.get('http://localhost:5000/api/auth/doctor')
      .then(response => {
        setDoctors(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching doctors:', err);
        setError('Failed to load doctor data');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleEditClick = (doctor) => {
    setSelectedDoctor(doctor);
    setOpenEditModal(true);
  };

  const handleEditSave = () => {
    axios.put(`http://localhost:5000/api/auth/doctor/${selectedDoctor.doctor_id}`, selectedDoctor)
      .then(() => {
        setOpenEditModal(false);
        fetchDoctors();
      })
      .catch(err => {
        console.error('Error updating doctor:', err);
      });
  };

  const handleDeleteClick = (doctor) => {
    setSelectedDoctor(doctor);
    setOpenDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    axios.delete(`http://localhost:5000/api/auth/doctor/${selectedDoctor.doctor_id}`)
      .then(() => {
        setOpenDeleteConfirm(false);
        fetchDoctors();
      })
      .catch(err => {
        console.error('Error deleting doctor:', err);
      });
  };

  return (
    <Box sx={{ minHeight: '100vh', padding: 4, background: 'linear-gradient(to right, #f3f9ff, #ffffff)' }}>
      <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1b1f3b', mb: 4 }}>
          Manage Doctors
        </Typography>
      </motion.div>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" variant="h6">{error}</Typography>
      ) : (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Paper elevation={3} sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold', mb: 2 }}>
              Registered Doctors
            </Typography>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#e6f0ff' }}>
                    <TableCell sx={{ fontWeight: 'bold' }}>Photo</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Full Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Username</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Qualification</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Specialization</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Phone</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Created Date</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {doctors.map((doctor, index) => (
                    <motion.tr
                      key={doctor.doctor_id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <TableCell>
                        <Avatar
                          alt={doctor.full_name}
                          src={`http://localhost:5000/uploads/${doctor.image}`}
                        />
                      </TableCell>
                      <TableCell>{doctor.full_name}</TableCell>
                      <TableCell>{doctor.username}</TableCell>
                      <TableCell>{doctor.qualification}</TableCell>
                      <TableCell>{doctor.specialization}</TableCell>
                      <TableCell>{doctor.email}</TableCell>
                      <TableCell>{doctor.phone}</TableCell>
                      <TableCell>{new Date(doctor.created_date).toLocaleString()}</TableCell>
                      <TableCell align="center">
                        <IconButton sx={{ color: '#007bff' }} onClick={() => handleEditClick(doctor)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton sx={{ color: '#e53935' }} onClick={() => handleDeleteClick(doctor)}>
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

      {/* Edit Doctor Dialog */}
      <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <DialogTitle>Edit Doctor</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Full Name"
            value={selectedDoctor?.full_name || ''}
            onChange={(e) => setSelectedDoctor({ ...selectedDoctor, full_name: e.target.value })}
          />
          <TextField
            label="Phone"
            value={selectedDoctor?.phone || ''}
            onChange={(e) => setSelectedDoctor({ ...selectedDoctor, phone: e.target.value })}
          />
          <TextField
            label="Email"
            value={selectedDoctor?.email || ''}
            onChange={(e) => setSelectedDoctor({ ...selectedDoctor, email: e.target.value })}
          />
          <TextField
            label="Specialization"
            value={selectedDoctor?.specialization || ''}
            onChange={(e) => setSelectedDoctor({ ...selectedDoctor, specialization: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSave}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={openDeleteConfirm} onClose={() => setOpenDeleteConfirm(false)}>
        <DialogTitle>Delete Doctor</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete <b>{selectedDoctor?.full_name}</b>?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteConfirm(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDeleteConfirm}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageDoctor;
