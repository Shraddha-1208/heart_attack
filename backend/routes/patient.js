const express = require('express');
const router = express.Router();
const db = require('../db');  // adjust path if needed

// GET all patients
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM patient_master';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching patients:', err);
      return res.status(500).json({ error: 'Failed to fetch patients' });
    }
    res.json(results);
  });
});

// UPDATE patient
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { full_name, phone, email, address } = req.body;

  const sql = 'UPDATE patient_master SET full_name = ?, phone = ?, email = ?, address = ? WHERE id = ?';
  db.query(sql, [full_name, phone, email, address, id], (err, result) => {
    if (err) {
      console.error('Error updating patient:', err);
      return res.status(500).json({ error: 'Failed to update patient' });
    }
    res.json({ message: 'Patient updated successfully' });
  });
});

// DELETE patient
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  const sql = 'DELETE FROM patient_master WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting patient:', err);
      return res.status(500).json({ error: 'Failed to delete patient' });
    }
    res.json({ message: 'Patient deleted successfully' });
  });
});

module.exports = router;
