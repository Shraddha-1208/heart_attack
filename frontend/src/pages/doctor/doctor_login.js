import React, { useState } from 'react';
import axios from 'axios';

const DoctorRegister = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    password: '',
    qualification: '',
    specialization: '',
    email: '',
    phone: '',
    image: null
  });

  const [statusMessage, setStatusMessage] = useState('');

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
      const res = await axios.post('http://localhost:5000/api/auth/doctor', payload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setStatusMessage('✅ Doctor registered successfully!');
    } catch (err) {
      console.error('Error:', err);
      setStatusMessage('❌ Registration failed.');
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

            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="row mb-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    name="fullName"
                    className="form-control"
                    placeholder="Full Name"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="Username"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    name="qualification"
                    className="form-control"
                    placeholder="Qualification"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    name="specialization"
                    className="form-control"
                    placeholder="Specialization"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    placeholder="Phone"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 text-center">
                  <label htmlFor="imageUpload" className="form-label fw-semibold">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    className="form-control mx-auto w-100"
                    id="imageUpload"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-success px-5">
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

export default DoctorRegister;