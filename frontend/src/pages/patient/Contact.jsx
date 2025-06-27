import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/contact', formData);
      if (res.data.success) {
        setStatus('✅ Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      }
    } catch {
      setStatus('❌ Failed to send your message.');
    }
  };

  return (
    <div style={styles.bg}>
      <motion.div
        className="container py-5"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <div style={styles.glass} className="p-5 shadow rounded-5">
              <h2 className="text-center mb-4" style={styles.title}>📫 Contact Admin</h2>

              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="name">Your Name</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="email">Email address</label>
                </div>

                <div className="form-floating mb-4">
                  <textarea
                    name="message"
                    className="form-control"
                    id="message"
                    placeholder="Leave a message here"
                    style={{ height: '120px' }}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                  <label htmlFor="message">Your Message</label>
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-dark btn-lg rounded-pill">
                    ✉️ Send Message
                  </button>
                </div>
              </form>

              {status && (
                <div className="alert alert-info mt-4 text-center shadow-sm" role="alert">
                  {status}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ---------- Stylish Inline Styles ----------
const styles = {
  bg: {
    background: 'linear-gradient(to right top,rgb(224, 229, 226),rgb(231, 243, 248))',
    minHeight: '100vh',
    paddingTop: '60px',
    fontFamily: "'Poppins', sans-serif"
  },
  glass: {
    background: 'rgba(255, 255, 255, 0.75)',
    borderRadius: '20px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.25)'
  },
  title: {
    fontWeight: 700,
    color: '#333',
    fontSize: '28px',
    letterSpacing: '0.5px'
  }
};

export default Contact;
