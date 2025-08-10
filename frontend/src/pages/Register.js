import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    password: '',
    uhid: '',
    gender: '',
    dob: '',
    age: '',
    phone: '',
    email: '',
    address: '',
    medicalNotes: '',
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
      case 'gender':
        if (!value.trim()) error = 'Required';
        break;

      case 'password':
        if (!value.trim()) {
          error = 'Required';
        } else {
          const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
          if (!pwdRegex.test(value)) {
            error = 'Password must be min 8 chars with uppercase, lowercase, number & special char';
          }
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

      case 'dob':
        if (!value.trim()) error = 'Required';
        break;

      default:
        break;
    }

    return error;
  };

  const calculateAge = (dob) => {
    if (!dob) return '';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 0 ? age.toString() : '';
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    let fieldValue = name === 'image' ? files[0] : value;

    if (name === 'dob') {
      const age = calculateAge(value);
      setFormData((prev) => ({
        ...prev,
        dob: value,
        age: age
      }));

      setErrors((prev) => ({
        ...prev,
        dob: validateField('dob', value),
        age: age ? '' : 'Age calculation failed'
      }));
    } else if (name === 'confirmPassword') {
      setConfirmPassword(fieldValue);
      setErrors((prev) => ({
        ...prev,
        confirmPassword: validateField('confirmPassword', fieldValue)
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: fieldValue
      }));

      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, fieldValue)
      }));

      // Re-validate confirmPassword if password changes
      if (name === 'password' && confirmPassword) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: validateField('confirmPassword', confirmPassword)
        }));
      }
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    if (name === 'confirmPassword') {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: validateField('confirmPassword', value)
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value)
      }));

      if (name === 'password' && confirmPassword) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: validateField('confirmPassword', confirmPassword)
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.entries(formData).forEach(([key, val]) => {
      if (
        key !== 'uhid' &&
        key !== 'address' &&
        key !== 'medicalNotes' &&
        key !== 'image' &&
        key !== 'age'
      ) {
        newErrors[key] = validateField(key, val);
      }
    });
    newErrors.confirmPassword = validateField('confirmPassword', confirmPassword);

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err)) {
      setStatusMessage('❌ Please fix errors before submitting.');
      return;
    }

    if (!formData.age) {
      setStatusMessage('❌ Please select a valid Date of Birth.');
      return;
    }

    const payload = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (val !== null) payload.append(key, val);
    });

    try {
      const res = await axios.post('http://localhost:5000/api/auth', payload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setStatusMessage('✅ Patient registered successfully!');

      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      setStatusMessage('❌ Registration failed.');
      console.error('Error:', err);
    }
  };

  const getBorderStyle = (name) => {
    if (name === 'confirmPassword' && !confirmPassword) return {};
    if (name === 'confirmPassword' && errors.confirmPassword) {
      return { border: '2px solid #dc3545' };
    }
    if (!formData[name]) return {};
    if (errors[name]) {
      return { border: '2px solid #dc3545' };
    }
    return { border: '2px solid #198754' };
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
          backgroundImage: 'url("/images/patient-bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          padding: '40px 0'
        }}
      >
        <div
          className="card shadow mx-auto"
          style={{
            maxWidth: '900px',
            background: 'rgba(173, 216, 230, 0.25)',
            backdropFilter: 'blur(10px)',
            borderRadius: '15px',
            padding: '30px',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            fontFamily: "'Poppins', sans-serif"
          }}
        >
          <div className="card-body">
            <h2 className="text-center text-primary fw-bold mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              New Patient Registration
            </h2>
            {statusMessage && (
              <div className="alert alert-info text-center fw-semibold">{statusMessage}</div>
            )}
            <form onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
              {/* Existing fields */}

              <div className="row mb-3">
                <div className="col-md-4">
                  <input
                    type="text"
                    name="fullName"
                    className="form-control"
                    placeholder="Full Name *"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={getBorderStyle('fullName')}
                    value={formData.fullName}
                    required
                  />
                  {errors.fullName && <small className="text-danger">{errors.fullName}</small>}
                </div>
                <div className="col-md-4">
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="Username *"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={getBorderStyle('username')}
                    value={formData.username}
                    required
                  />
                  {errors.username && <small className="text-danger">{errors.username}</small>}
                </div>
                <div className="col-md-4">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password *"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={getBorderStyle('password')}
                    value={formData.password}
                    required
                  />
                  {errors.password && <small className="text-danger">{errors.password}</small>}
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="row mb-3">
                <div className="col-md-4 offset-md-8">
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Confirm Password *"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={getBorderStyle('confirmPassword')}
                    value={confirmPassword}
                    required
                  />
                  {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
                </div>
              </div>

              {/* Rest of your form fields */}
              <div className="row mb-3">
                <div className="col-md-4">
                  <input
                    type="text"
                    name="gender"
                    className="form-control"
                    placeholder="Gender *"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={getBorderStyle('gender')}
                    value={formData.gender}
                    required
                  />
                  {errors.gender && <small className="text-danger">{errors.gender}</small>}
                </div>
                <div className="col-md-4">
                  <input
                    type="date"
                    name="dob"
                    className="form-control"
                    placeholder="Date of Birth *"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={getBorderStyle('dob')}
                    value={formData.dob}
                    required
                  />
                  {errors.dob && <small className="text-danger">{errors.dob}</small>}
                </div>
                <div className="col-md-4">
                  <input
                    type="number"
                    name="age"
                    className="form-control"
                    placeholder="Age"
                    value={formData.age}
                    readOnly
                    style={getBorderStyle('age')}
                  />
                  {errors.age && <small className="text-danger">{errors.age}</small>}
                </div>
              </div>

              {/* Continue the rest as it is */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    placeholder="Phone Number *"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={getBorderStyle('phone')}
                    value={formData.phone}
                    required
                  />
                  {errors.phone && <small className="text-danger">{errors.phone}</small>}
                </div>
                <div className="col-md-6">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email *"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={getBorderStyle('email')}
                    value={formData.email}
                    required
                  />
                  {errors.email && <small className="text-danger">{errors.email}</small>}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <textarea
                    name="address"
                    className="form-control"
                    placeholder="Address"
                    rows="2"
                    onChange={handleChange}
                    value={formData.address}
                  />
                </div>
                <div className="col-md-6">
                  <textarea
                    name="medicalNotes"
                    className="form-control"
                    placeholder="Injuries / Medical Notes"
                    rows="2"
                    onChange={handleChange}
                    value={formData.medicalNotes}
                  />
                </div>
              </div>
              <div className="row mb-3 justify-content-center">
                <div className="col-md-6 text-center">
                  <label htmlFor="imageUpload" className="form-label fw-semibold">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    className="form-control mx-auto"
                    id="imageUpload"
                    accept="image/*"
                    onChange={handleChange}
                    style={{ maxWidth: '300px' }}
                  />
                </div>
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-primary px-5 me-3">
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

export default Register;
