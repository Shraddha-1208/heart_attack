// backend/routes/doctorAuth.js
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

// POST /api/auth/doctor
router.post('/doctor', upload.single('image'), (req, res) => {
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

  // 1) Insert into doctor_master
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
      console.error('Error inserting into doctor_master:', err);
      return res.status(500).json({ success: false, message: 'Doctor registration failed' });
    }

    // 2) Insert into user_master for login
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
        console.error('Error inserting into user_master:', userErr);
        return res.status(500).json({ success: false, message: 'User creation failed' });
      }

      return res.status(200).json({ success: true, message: 'Doctor registered successfully' });
    });
  });
});

module.exports = router;
