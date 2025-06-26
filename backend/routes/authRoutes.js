const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require('../db');

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  }
});
const upload = multer({ storage: storage });

// POST /api/auth (Register patient)
router.post('/', upload.single('image'), (req, res) => {
  const {
    fullName,
    username,
    password,
    gender,
    dob,
    age,
    phone,
    address,
    medicalNotes,
    email
  } = req.body;

  const image = req.file ? req.file.filename : '';

  // ✅ Auto-generate UHID
  const uhid = `UHID${Math.floor(100000 + Math.random() * 900000)}`;

  // First insert into patient_master
  const patientSql = `
    INSERT INTO patient_master (
      full_name, username, UHID, gender, dob, age, phone,
      address, injuries, status, date_created, email, image
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?)
  `;

  const patientValues = [
    fullName,
    username,
    uhid,
    gender,
    dob,
    parseInt(age),
    phone,
    address,
    medicalNotes,
    1, // active
    email,
    image
  ];

  db.query(patientSql, patientValues, (err, result) => {
    if (err) {
      console.error('❌ Error inserting into patient_master:', err);
      return res.status(500).json({ success: false, message: 'Patient registration failed' });
    }

    // Then insert into user_master
    const userSql = `
      INSERT INTO user_master (type, username, password, date_created, status)
      VALUES (?, ?, ?, NOW(), ?)
    `;

    const userValues = [
      'patient',
      username,
      password,
      1
    ];

    db.query(userSql, userValues, (userErr, userResult) => {
      if (userErr) {
        console.error('❌ Error inserting into user_master:', userErr);
        return res.status(500).json({ success: false, message: 'User registration failed' });
      }

      return res.status(200).json({
        success: true,
        message: '✅ Patient registered successfully',
        uhid  // Include UHID in response if needed on frontend
      });
    });
  });
});

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log("🔐 Login attempt:", username, password);

  const sql = 'SELECT * FROM user_master WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: 'Database error', error: err });

    console.log("🔍 Login result:", result);

    if (result.length > 0) {
      res.json({
        success: true,
        message: 'Login successful',
        role: result[0].type,
        user: {
          username: result[0].username,
          status: result[0].status
        }
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  });
});

module.exports = router;
