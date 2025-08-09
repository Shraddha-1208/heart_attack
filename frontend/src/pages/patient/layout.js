import React, { useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import axios from "axios";

function Layout() {
  const [profilePic, setProfilePic] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [patientData, setPatientData] = useState({});

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      axios
        .get(`http://localhost:5000/api/user/profile/${username}`)
        .then((res) => {
          if (res.data.success) {
            const imageUrl = `http://localhost:5000/uploads/${res.data.data.image}`;
            setProfilePic(imageUrl);
            setPatientData(res.data.data);
          }
        })
        .catch((err) => console.error("Failed to load profile", err));
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <>
      <div>
        {/* HEADER */}
        <header id="header" className="header sticky-top">
          <div className="branding d-flex align-items-center">
            <div className="container d-flex align-items-center justify-content-between">

              {/* Logo */}
              <div className="d-flex align-items-center">
                <a href="/" className="logo d-flex align-items-center text-decoration-none me-4">
                  <h1 className="sitename mb-0"
                    style={{
                      fontSize: "2rem",
                      fontWeight: "700",
                      background: "linear-gradient(90deg, #6a11cb, #2575fc)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      letterSpacing: "1px",
                      textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <i className="fa-solid fa-heart-pulse me-2"></i> EyeBeat
                  </h1>
                </a>
              </div>

              {/* Navigation */}
              <div className="flex-grow-1 d-flex justify-content-center">
                <nav id="navmenu" className="navmenu">
                  <ul className="d-flex gap-4 mb-0">
                    <li><NavLink to="/home" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink></li>
                    <li><NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>About</NavLink></li>
                    <li><NavLink to="/upload" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Upload</NavLink></li>
                    <li><NavLink to="/report" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Reports</NavLink></li>
                    <li><NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Contact</NavLink></li>
                  </ul>
                  <i className="mobile-nav-toggle d-xl-none bi bi-list" />
                </nav>
              </div>

              {/* Profile Image */}
              <div className="d-flex align-items-center">
                <img
                  src={profilePic ? profilePic : "/images/default-avatar.png"}
                  alt="Profile"
                  onClick={() => setShowModal(true)}
                  style={{
                    width: "55px",
                    height: "55px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid white",
                    cursor: "pointer",
                    boxShadow: "0 0 5px rgba(0,0,0,0.3)"
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/default-avatar.png";
                  }}
                />
              </div>

            </div>
          </div>
        </header>

        {/* Main */}
        <main className="main">
          <Outlet />
        </main>

        {/* Profile Modal */}
        {showModal && (
          <div
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
            }}
          >
            <div
              style={{
                background: "#fff",
                borderRadius: "20px",
                padding: "2rem",
                width: "90%",
                maxWidth: "500px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
                position: "relative",
              }}
            >
              <button
                onClick={() => setShowModal(false)}
                style={{
                  position: "absolute",
                  top: "15px",
                  right: "20px",
                  background: "transparent",
                  border: "none",
                  fontSize: "1.5rem",
                  color: "#888",
                  cursor: "pointer",
                }}
              >
                &times;
              </button>

              <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                <img
                  src={profilePic || "/images/default-avatar.png"}
                  alt="Profile"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "3px solid #007bff",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/default-avatar.png";
                  }}
                />
              </div>

              <h4 style={{ textAlign: "center", fontWeight: "bold" }}>{patientData.full_name}</h4>
              <hr />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", rowGap: "10px", columnGap: "20px", marginTop: "1rem" }}>
                <p><strong>Username:</strong><br /> {patientData.username}</p>
                <p><strong>UHID:</strong><br /> {patientData.UHID}</p>
                <p><strong>Gender:</strong><br /> {patientData.gender}</p>
                <p><strong>DOB:</strong><br /> {new Date(patientData.dob).toLocaleDateString()}</p>
                <p><strong>Age:</strong><br /> {patientData.age}</p>
                <p><strong>Phone:</strong><br /> {patientData.phone}</p>
                <p style={{ gridColumn: "span 2" }}><strong>Email:</strong><br /> {patientData.email}</p>
                <p style={{ gridColumn: "span 2" }}><strong>Address:</strong><br /> {patientData.address}</p>
              </div>

              <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
                <button
                  onClick={handleLogout}
                  style={{
                    background: "#2575fc",
                    color: "#fff",
                    border: "none",
                    padding: "10px 25px",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
                    cursor: "pointer",
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer id="footer" className="footer light-background">
          <div className="container footer-top">
            <div className="row gy-4">
              <div className="col-lg-4 col-md-6 footer-about">
                <a href="/" className="logo d-flex align-items-center">
                  <span className="sitename">EyeBeat</span>
                </a>
                <div className="footer-contact pt-3">
                  <p>Mangalore</p>
                  <p>India</p>
                  <p className="mt-3"><strong>Phone:</strong> <span>+91 9480054506</span></p>
                  <p><strong>Email:</strong> <span>eyebeat@example.com</span></p>
                </div>
                <div className="social-links d-flex mt-4">
                  <a href="#"><i className="bi bi-twitter-x" /></a>
                  <a href="#"><i className="bi bi-facebook" /></a>
                  <a href="#"><i className="bi bi-instagram" /></a>
                  <a href="#"><i className="bi bi-linkedin" /></a>
                </div>
              </div>

              <div className="col-lg-2 col-md-3 footer-links">
                <h4>Useful Links</h4>
                <ul>
                  <li><a href="/home">Home</a></li>
                  <li><a href="/about">About Us</a></li>
                  <li><a href="#">Services</a></li>
                  <li><a href="#">Terms of Service</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                </ul>
              </div>

              <div className="col-lg-2 col-md-3 footer-links">
                <h4>Our Services</h4>
                <ul>
                  <li><a href="#">Web Design</a></li>
                  <li><a href="#">Web Development</a></li>
                  <li><a href="#">Product Management</a></li>
                  <li><a href="#">Marketing</a></li>
                  <li><a href="#">Graphic Design</a></li>
                </ul>
              </div>

              <div className="col-lg-2 col-md-3 footer-links">
                <h4>Resources</h4>
                <ul>
                  <li><a href="#">Legal Matters</a></li>
                  <li><a href="#">Privacy Rights</a></li>
                  <li><a href="#">Distinct Services</a></li>
                  <li><a href="#">Favorites</a></li>
                  <li><a href="#">Content Policies</a></li>
                </ul>
              </div>

              <div className="col-lg-2 col-md-3 footer-links">
                <h4>More Info</h4>
                <ul>
                  <li><a href="#">FAQ</a></li>
                  <li><a href="#">Customer Support</a></li>
                  <li><a href="#">Testimonials</a></li>
                  <li><a href="#">Partners</a></li>
                  <li><a href="#">Affiliates</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="container text-center mt-4">
            <p>© <strong className="sitename">EyeBeat</strong> — All Rights Reserved</p>
            <div className="credits">
             
            </div>
          </div>
        </footer>

        {/* Scroll Top */}
        <a href="#" id="scroll-top" className="scroll-top d-flex align-items-center justify-content-center">
          <i className="bi bi-arrow-up-short" />
        </a>
      </div>
    </>
  );
}

export default Layout;
