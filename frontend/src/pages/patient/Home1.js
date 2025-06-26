import React, { useEffect, useState } from "react";
import axios from "axios";

function Home1() {
  

  return (
    <>
      <main className="main">
        {/* Hero Section */}
        <section
          id="hero"
          className="hero section text-white position-relative"
          style={{
            backgroundImage: "url('./assets/img/hero-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "80px 0",
          }}
        >
          {/* Dark overlay */}
          <div
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", zIndex: 1 }}
          ></div>
          <div className="container position-relative z-2">
            <div className="welcome text-center mb-5">
              <h2
                className="fw-bold display-5"
                style={{
                  color: "#ffffff",
                  textShadow: "0 0 10px rgba(255, 255, 255, 0.6)",
                }}
              >
                WELCOME TO EYEBEAT
              </h2>
            </div>

            <div className="content row gy-4">
              {/* Left Box */}
              <div className="col-lg-4 d-flex align-items-stretch">
                <div
                  className="why-box bg-white text-dark p-4 rounded shadow flex-fill d-flex flex-column justify-content-between"
                  style={{ zIndex: 2 }}
                >
                  <div>
                    <h3 className="text-primary fw-bold">Why Choose EyeBeat?</h3>
                    <p className="mt-3">
                      EyeBeat is an AI-powered system that helps detect early signs of heart attack risk by analyzing retinal eye scans.
                      Our technology combines medical precision with machine learning to provide fast, accurate, and non-invasive predictions—
                      empowering patients and doctors to take action before it's too late.
                    </p>
                  </div>
                  <div className="text-center mt-4 d-flex flex-column gap-3">
                    <a
                      href="/upload"
                      className="btn"
                      style={{
                        background: "linear-gradient(to right, #6a11cb, #2575fc)",
                        color: "#fff",
                        fontWeight: "600",
                        padding: "12px 28px",
                        borderRadius: "10px",
                        fontSize: "1rem",
                        border: "none",
                        boxShadow: "0 4px 10px rgba(101, 101, 255, 0.3)",
                        transition: "all 0.3s ease",
                        textDecoration: "none",
                        display: "inline-block",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.boxShadow = "0 8px 20px rgba(101, 101, 255, 0.5)";
                        e.currentTarget.style.transform = "scale(1.05)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.boxShadow = "0 4px 10px rgba(101, 101, 255, 0.3)";
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                      <i className="fa-solid fa-upload me-2" />
                      Go to Upload Page
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Boxes */}
              <div className="col-lg-8 d-flex align-items-stretch">
                <div className="d-flex flex-column justify-content-center w-100">
                  <div className="row gy-4">
                    <div className="col-xl-4 d-flex align-items-stretch">
                      <div className="icon-box p-4 bg-white text-dark rounded shadow text-center w-100">
                        <i className="bi bi-activity text-primary" style={{ fontSize: "2rem" }} />
                        <h5 className="fw-bold mt-3">AI-Powered Diagnosis</h5>
                        <p className="text-muted">
                          Our system uses advanced machine learning models to analyze retinal patterns that indicate cardiovascular health.
                        </p>
                      </div>
                    </div>

                    <div className="col-xl-4 d-flex align-items-stretch">
                      <div className="icon-box p-4 bg-white text-dark rounded shadow text-center w-100">
                        <i className="bi bi-eye text-warning" style={{ fontSize: "2rem" }} />
                        <h5 className="fw-bold mt-3">Retinal Image-Based Screening</h5>
                        <p className="text-muted">
                          Non-invasive, painless retina scans are used as input to detect abnormalities linked to heart disease.
                        </p>
                      </div>
                    </div>

                    <div className="col-xl-4 d-flex align-items-stretch">
                      <div className="icon-box p-4 bg-white text-dark rounded shadow text-center w-100">
                        <i className="bi bi-bar-chart text-danger" style={{ fontSize: "2rem" }} />
                        <h5 className="fw-bold mt-3">Accurate & Early Predictions</h5>
                        <p className="text-muted">
                          We deliver early warnings with high accuracy, helping in timely medical interventions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Doctors Section */}
        <section id="doctors" className="doctors section">
  <div className="container section-title">
    <h2>Doctors</h2>
  </div>
  <div className="container">
    <div className="row gy-4">
      
      {/* Doctor 1 */}
      <div className="col-lg-6">
        <div className="team-member d-flex align-items-start">
          <div className="pic">
            <img src="assets/img/doctors/doctors-1.jpg" className="img-fluid" alt="Dr. Arjun Mehta" />
          </div>
          <div className="member-info">
            <h4>Dr. Arjun Mehta</h4>
            <span>Chief Cardiologist</span>
            <p>Dr. Mehta has over 18 years of experience in interventional cardiology and leads critical heart screening and prevention programs.</p>
            <div className="social">
              <a href="#"><i className="bi bi-twitter-x" /></a>
              <a href="#"><i className="bi bi-facebook" /></a>
              <a href="#"><i className="bi bi-instagram" /></a>
              <a href="#"><i className="bi bi-linkedin" /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Doctor 2 */}
      <div className="col-lg-6">
        <div className="team-member d-flex align-items-start">
          <div className="pic">
            <img src="assets/img/doctors/doctors-2.jpg" className="img-fluid" alt="Dr. Neha Sharma" />
          </div>
          <div className="member-info">
            <h4>Dr. Neha Sharma</h4>
            <span>Consultant Anesthesiologist</span>
            <p>Dr. Sharma ensures patient comfort and care during surgical procedures and is known for her precision and empathy in high-risk operations.</p>
            <div className="social">
              <a href="#"><i className="bi bi-twitter-x" /></a>
              <a href="#"><i className="bi bi-facebook" /></a>
              <a href="#"><i className="bi bi-instagram" /></a>
              <a href="#"><i className="bi bi-linkedin" /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Doctor 3 */}
      <div className="col-lg-6">
        <div className="team-member d-flex align-items-start">
          <div className="pic">
            <img src="assets/img/doctors/doctors-3.jpg" className="img-fluid" alt="Dr. Rohan Iyer" />
          </div>
          <div className="member-info">
            <h4>Dr. Rohan Iyer</h4>
            <span>Neurosurgeon</span>
            <p>Dr. Iyer specializes in complex brain and spine surgeries, with extensive experience from AIIMS and international research institutes.</p>
            <div className="social">
              <a href="#"><i className="bi bi-twitter-x" /></a>
              <a href="#"><i className="bi bi-facebook" /></a>
              <a href="#"><i className="bi bi-instagram" /></a>
              <a href="#"><i className="bi bi-linkedin" /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Doctor 4 */}
      <div className="col-lg-6">
        <div className="team-member d-flex align-items-start">
          <div className="pic">
            <img src="assets/img/doctors/doctors-4.jpg" className="img-fluid" alt="Dr. Priya Menon" />
          </div>
          <div className="member-info">
            <h4>Dr. Priya Menon</h4>
            <span>Ophthalmologist</span>
            <p>Dr. Menon is a leading expert in retinal imaging and diagnostics, working closely with AI systems for early disease detection through eye scans.</p>
            <div className="social">
              <a href="#"><i className="bi bi-twitter-x" /></a>
              <a href="#"><i className="bi bi-facebook" /></a>
              <a href="#"><i className="bi bi-instagram" /></a>
              <a href="#"><i className="bi bi-linkedin" /></a>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>


        {/* Gallery Section */}
        <section id="gallery" className="gallery section">
          <div className="container section-title">
            <h2>Gallery</h2>
            <p>We are committed to providing personalized care and accurate diagnosis through advanced medical technology.</p>
          </div>
          <div className="container-fluid">
            <div className="row g-0">
              <div className="col-lg-3 col-md-4">
                <div className="gallery-item">
                  <a href="assets/img/gallery/gallery-1.jpg" className="glightbox" data-gallery="images-gallery">
                    <img src="assets/img/gallery/gallery-1.jpg" alt="" className="img-fluid" />
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-md-4">
                <div className="gallery-item">
                  <a href="assets/img/gallery/gallery-2.jpg" className="glightbox" data-gallery="images-gallery">
                    <img src="assets/img/gallery/gallery-2.jpg" alt="" className="img-fluid" />
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-md-4">
                <div className="gallery-item">
                  <a href="assets/img/gallery/gallery-3.jpg" className="glightbox" data-gallery="images-gallery">
                    <img src="assets/img/gallery/gallery-3.jpg" alt="" className="img-fluid" />
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-md-4">
                <div className="gallery-item">
                  <a href="assets/img/gallery/gallery-4.jpg" className="glightbox" data-gallery="images-gallery">
                    <img src="assets/img/gallery/gallery-4.jpg" alt="" className="img-fluid" />
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-md-4">
                <div className="gallery-item">
                  <a href="assets/img/gallery/gallery-5.jpg" className="glightbox" data-gallery="images-gallery">
                    <img src="assets/img/gallery/gallery-5.jpg" alt="" className="img-fluid" />
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-md-4">
                <div className="gallery-item">
                  <a href="assets/img/gallery/gallery-6.jpg" className="glightbox" data-gallery="images-gallery">
                    <img src="assets/img/gallery/gallery-6.jpg" alt="" className="img-fluid" />
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-md-4">
                <div className="gallery-item">
                  <a href="assets/img/gallery/gallery-7.jpg" className="glightbox" data-gallery="images-gallery">
                    <img src="assets/img/gallery/gallery-7.jpg" alt="" className="img-fluid" />
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-md-4">
                <div className="gallery-item">
                  <a href="assets/img/gallery/gallery-8.jpg" className="glightbox" data-gallery="images-gallery">
                    <img src="assets/img/gallery/gallery-8.jpg" alt="" className="img-fluid" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home1;