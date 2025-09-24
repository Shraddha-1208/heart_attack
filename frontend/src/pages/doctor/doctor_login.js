import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DoctorRegister = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    password: '',
    qualification: '',
    specialization: '',
    email: '',
    phone: '',
    image: null
  });

  const [confirmPassword, setConfirmPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'fullName':
      case 'username':
      case 'qualification':
      case 'specialization':
        if (!value.trim()) error = 'Required';
        break;

      case 'password':
        if (!value.trim()) {
          error = 'Required';
        } else if (value.length < 6) {
          error = 'At least 6 characters';
        }
        break;

      case 'confirmPassword':
        if (!value.trim()) {
          error = 'Required';
        } else if (value !== formData.password) {
          error = 'Passwords do not match';
        }
        break;

      case 'email':
        if (!value.trim()) {
          error = 'Required';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'Invalid email';
        }
        break;

      case 'phone':
        if (!value.trim()) {
          error = 'Required';
        } else if (!/^[0-9]{10}$/.test(value)) {
          error = 'Invalid phone';
        }
        break;

      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const fieldValue = name === 'image' ? files[0] : value;

    if (name === 'confirmPassword') {
      setConfirmPassword(fieldValue);
      setErrors((prev) => ({
        ...prev,
        confirmPassword: validateField('confirmPassword', fieldValue),
      }));
    } else {
      setFormData({ ...formData, [name]: fieldValue });
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, fieldValue),
      }));

      // Also validate confirmPassword again if password changes
      if (name === 'password' && confirmPassword) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: validateField('confirmPassword', confirmPassword),
        }));
      }
    }
  };

  const handleBlur = (e) => {
    const { name, value, files } = e.target;
    const fieldValue = name === 'image' ? (files ? files[0] : null) : value;

    if (name === 'confirmPassword') {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: validateField('confirmPassword', fieldValue),
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, fieldValue),
      }));

      if (name === 'password' && confirmPassword) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: validateField('confirmPassword', confirmPassword),
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields including confirmPassword
    const newErrors = {};
    Object.entries(formData).forEach(([key, val]) => {
      newErrors[key] = validateField(key, val);
    });
    newErrors.confirmPassword = validateField('confirmPassword', confirmPassword);

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err)) {
      setStatusMessage('❌ Please fix errors before submitting.');
      return;
    }

    // Prepare form data without confirmPassword
    const payload = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (val !== null) payload.append(key, val);
    });

    try {
      await axios.post('http://localhost:5000/api/auth/doctor', payload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setStatusMessage('✅ Doctor registered successfully!');
      navigate('/');
    } catch (err) {
      console.error('Error:', err);
      setStatusMessage('❌ Registration failed.');
    }
  };

  const getBorderStyle = (name) => {
    if (name === 'confirmPassword' && !confirmPassword) return {};
    if (name === 'confirmPassword' && errors.confirmPassword) {
      return { border: '2px solid #dc3545' };
    }
    if (!formData[name]) return {};
    if (errors[name]) {
      return { border: '2px solid #dc3545' }; // Red
    }
    return { border: '2px solid #198754' }; // Green
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600&family=Poppins&display=swap"
        rel="stylesheet"
      />
      <div
        style={{
          fontFamily: "'Poppins', sans-serif",
          backgroundImage: 'url("/images/doctor-bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          padding: '40px 0',
        }}
      >
        <div
          className="card shadow mx-auto"
          style={{
            maxWidth: '850px',
            background: 'rgba(255, 255, 255, 0.25)',
            backdropFilter: 'blur(10px)',
            borderRadius: '15px',
            padding: '30px',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            border: '1px solid rgba(255, 255, 255, 0.18)'
          }}
        >
          <div className="card-body">
            <h2 className="text-center text-success fw-bold mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Doctor Registration
            </h2>

            {statusMessage && (
              <div className="alert alert-info text-center fw-semibold">{statusMessage}</div>
            )}

            <form onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
              <div className="row mb-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    name="fullName"
                    className="form-control"
                    style={getBorderStyle('fullName')}
                    placeholder="Full Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={formData.fullName}
                    required
                  />
                  {errors.fullName && <small className="text-danger">{errors.fullName}</small>}
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    style={getBorderStyle('username')}
                    placeholder="Username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={formData.username}
                    required
                  />
                  {errors.username && <small className="text-danger">{errors.username}</small>}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    style={getBorderStyle('password')}
                    placeholder="Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={formData.password}
                    required
                  />
                  {errors.password && <small className="text-danger">{errors.password}</small>}
                </div>
                <div className="col-md-6">
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    style={getBorderStyle('confirmPassword')}
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={confirmPassword}
                    required
                  />
                  {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    name="qualification"
                    className="form-control"
                    style={getBorderStyle('qualification')}
                    placeholder="Qualification"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={formData.qualification}
                  />
                  {errors.qualification && <small className="text-danger">{errors.qualification}</small>}
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    name="specialization"
                    className="form-control"
                    style={getBorderStyle('specialization')}
                    placeholder="Specialization"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={formData.specialization}
                  />
                  {errors.specialization && <small className="text-danger">{errors.specialization}</small>}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    style={getBorderStyle('email')}
                    placeholder="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={formData.email}
                  />
                  {errors.email && <small className="text-danger">{errors.email}</small>}
                </div>
                <div className="col-md-6">
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    style={getBorderStyle('phone')}
                    placeholder="Phone"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={formData.phone}
                  />
                  {errors.phone && <small className="text-danger">{errors.phone}</small>}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6 text-center">
                  <label htmlFor="imageUpload" className="form-label fw-semibold">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    
                    name="image"
                    className="form-control mx-auto w-100"
                    style={getBorderStyle('image')}
                    id="imageUpload"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-success px-5 me-3">
                  Register
                </button>
                <button
                  type="button"
                  className="btn btn-secondary px-4"
                  onClick={() => navigate('/')}
                >
                  Back to Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorRegister;
