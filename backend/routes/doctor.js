const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require('../db');

// Multer config for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/'); // ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// POST /api/auth/doctor — Add new doctor
router.post('/doctor', upload.single('image'), (req, res) => {
  console.log("Doctor registration called");
  console.log("Request body:", req.body);
  if (req.file) {
    console.log("Image uploaded:", req.file.filename);
  } else {
    console.log("No image uploaded");
  }

  const {
    fullName,
    username,
    password,
    qualification,
    specialization,
    email,
    phone
  } = req.body;

  const image = req.file ? req.file.filename : '';
  const createdDate = new Date();
  const doctorStatus = 1;

  const doctorSql = `
    INSERT INTO doctor_master (
      full_name, username, qualification, specialization,
      email, phone, image, created_date, doctor_status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const doctorValues = [
    fullName,
    username,
    qualification,
    specialization,
    email,
    phone,
    image,
    createdDate,
    doctorStatus
  ];

  db.query(doctorSql, doctorValues, (err, result) => {
    if (err) {
      console.error('❌ Error inserting into doctor_master:', err.sqlMessage || err.message);
      return res.status(500).json({ success: false, message: 'Doctor registration failed' });
    }

    console.log("✅ Inserted into doctor_master:", result.insertId);

    const userSql = `
      INSERT INTO user_master (type, username, password, date_created, status)
      VALUES (?, ?, ?, NOW(), ?)
    `;
    const userValues = [
      'doctor',
      username,
      password,
      1
    ];

    db.query(userSql, userValues, (userErr, userResult) => {
      if (userErr) {
        console.error('❌ Error inserting into user_master:', userErr.sqlMessage || userErr.message);
        return res.status(500).json({ success: false, message: 'User creation failed' });
      }

      console.log("✅ User created with ID:", userResult.insertId);
      return res.status(200).json({ success: true, message: 'Doctor registered successfully' });
    });
  });
});

// GET /api/auth/doctor — get all doctors
router.get('/doctor', (req, res) => {
  const sql = 'SELECT * FROM doctor_master ORDER BY created_date DESC';

  db.query(sql, (err, result) => {
    if (err) {
      console.error('❌ Error fetching doctors:', err.sqlMessage || err.message);
      return res.status(500).json({ success: false, message: 'Failed to fetch doctors' });
    }

    return res.status(200).json(result);
  });
});

// PUT /api/auth/doctor/:doctor_id — update doctor
router.put('/doctor/:doctor_id', (req, res) => {
  const { doctor_id } = req.params;
  const { full_name, phone, email, specialization } = req.body;

  const sql = `
    UPDATE doctor_master 
    SET full_name = ?, phone = ?, email = ?, specialization = ?
    WHERE doctor_id = ?
  `;

  const values = [full_name, phone, email, specialization, doctor_id];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('❌ Error updating doctor:', err.sqlMessage || err.message);
      return res.status(500).json({ success: false, message: 'Failed to update doctor' });
    }

    return res.status(200).json({ success: true, message: 'Doctor updated successfully' });
  });
});

// DELETE /api/auth/doctor/:doctor_id — delete doctor
router.delete('/doctor/:doctor_id', (req, res) => {
  const { doctor_id } = req.params;

  const sql = 'DELETE FROM doctor_master WHERE doctor_id = ?';

  db.query(sql, [doctor_id], (err, result) => {
    if (err) {
      console.error('❌ Error deleting doctor:', err.sqlMessage || err.message);
      return res.status(500).json({ success: false, message: 'Failed to delete doctor' });
    }

    return res.status(200).json({ success: true, message: 'Doctor deleted successfully' });
  });
});

module.exports = router;
