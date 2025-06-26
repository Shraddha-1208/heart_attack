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

  const [statusMessage, setStatusMessage] = useState('');
const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  const payload = new FormData();
  Object.entries(formData).forEach(([key, val]) => {
    if (val !== null) payload.append(key, val);
  });

  try {
    const res = await axios.post('http://localhost:5000/api/auth', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    setStatusMessage('✅ Patient registered successfully!');
    console.log('Response:', res.data);

    // Redirect to login page after 1.5 seconds
    setTimeout(() => {
      navigate('/');
    }, 1500);
  } catch (err) {
    setStatusMessage('❌ Registration failed.');
    console.error('Error:', err);
  }
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
          padding: '40px 0',
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
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          <div className="card-body">
            <h2 className="text-center text-primary fw-bold mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              New Patient Registration
            </h2>
            {statusMessage && (
              <div className="alert alert-info text-center fw-semibold">{statusMessage}</div>
            )}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="row mb-3">
                <div className="col-md-4">
                  <input
                    type="text"
                    name="fullName"
                    className="form-control"
                    placeholder="Full Name"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="Username"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
               
                <div className="col-md-4">
                  <input
                    type="text"
                    name="gender"
                    className="form-control"
                    placeholder="Gender"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="date"
                    name="dob"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <input
                    type="number"
                    name="age"
                    className="form-control"
                    placeholder="Age"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    placeholder="Phone Number"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <textarea
                    name="address"
                    className="form-control"
                    placeholder="Address"
                    rows="2"
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <textarea
                    name="medicalNotes"
                    className="form-control"
                    placeholder="Injuries / Medical Notes"
                    rows="2"
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="col-md-6 text-center">
                  <label htmlFor="imageUpload" className="form-label fw-semibold">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    className="form-control mx-auto w-75"
                    id="imageUpload"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-primary px-5">
                  Register
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
