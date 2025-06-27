const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require('../db');

// Multer config for file uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  }
});
const upload = multer({ storage: storage });

/**
 * POST /api/auth
 * Register a new patient
 */
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

  // Generate unique UHID
  const uhid = `UHID${Math.floor(100000 + Math.random() * 900000)}`;

  // Insert into patient_master
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
    1, // status active
    email,
    image
  ];

  db.query(patientSql, patientValues, (err, result) => {
    if (err) {
      console.error('❌ Error inserting into patient_master:', err);
      return res.status(500).json({ success: false, message: 'Patient registration failed' });
    }

    // Insert into user_master
    const userSql = `
      INSERT INTO user_master (type, username, password, date_created, status)
      VALUES (?, ?, ?, NOW(), ?)
    `;

    const userValues = [
      'patient',
      username,
      password,
      1 // active
    ];

    db.query(userSql, userValues, (userErr, userResult) => {
      if (userErr) {
        console.error('❌ Error inserting into user_master:', userErr);
        return res.status(500).json({ success: false, message: 'User registration failed' });
      }

      // Return UHID in response
      return res.status(200).json({
        success: true,
        message: '✅ Patient registered successfully',
        uhid
      });
    });
  });
});

/**
 * POST /api/auth/login
 * Login any user (patient/admin), fetch UHID if patient
 */
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log("🔐 Login attempt:", username, password);

  const sql = 'SELECT * FROM user_master WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error("❌ DB error:", err);
      return res.status(500).json({ success: false, message: 'Database error', error: err });
    }

    if (result.length > 0) {
      const role = result[0].type;

      if (role === 'patient') {
        const uhidQuery = 'SELECT UHID FROM patient_master WHERE username = ? LIMIT 1';
        db.query(uhidQuery, [username], (uhidErr, uhidRes) => {
          if (uhidErr) {
            console.error("❌ UHID fetch error:", uhidErr);
            return res.status(500).json({ success: false, message: 'UHID fetch failed' });
          }

          console.log('UHID query result:', uhidRes);

          const uhid = uhidRes.length > 0 ? uhidRes[0].UHID : null;
          if (!uhid) {
            console.warn(`⚠️ No UHID found for username: ${username}`);
          }

          return res.json({
            success: true,
            message: 'Login successful',
            role,
            user: {
              username: result[0].username,
              status: result[0].status,
              uhid: uhid || 'N/A',
            }
          });
        });
      } else {
        // Admin or other roles
        return res.json({
          success: true,
          message: 'Login successful',
          role,
          user: {
            username: result[0].username,
            status: result[0].status
          }
        });
      }
    } else {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  });
});

module.exports = router;
