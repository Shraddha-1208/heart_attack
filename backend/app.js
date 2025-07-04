const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const otpRoutes = require('./routes/otpRoutes');
const doctorAuth = require('./routes/doctor');
const patientRoutes = require('./routes/patient');
const userRoutes = require('./routes/user');
const path = require('path');
const cors = require('cors');


dotenv.config();
const app = express();
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api/user', userRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/auth', doctorAuth);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});