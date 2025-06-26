const express = require('express');
const router = express.Router();
const db = require('../db'); // Ensure correct DB connection

// GET patient profile by username
router.get('/profile/:username', (req, res) => {
  const username = req.params.username;

  const sql = `
    SELECT 
      full_name, 
      username, 
      UHID, 
      gender, 
      dob, 
      age, 
      phone, 
      email, 
      address, 
      image
    FROM patient_master
    WHERE username = ?
  `;

  db.query(sql, [username], (err, result) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Patient not found" });
    }

    return res.json({
      success: true,
      data: result[0] // Return full patient object
    });
  });
});

module.exports = router;
