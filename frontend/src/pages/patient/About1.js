import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  // Inline styles for the gradient button
  const buttonStyle = {
    background: "linear-gradient(to right, #6a11cb, #2575fc)",
    color: "#fff",
    fontWeight: "600",
    borderRadius: "8px",
    transition: "all 0.3s ease",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    boxShadow: "0 4px 10px rgba(101, 101, 255, 0.3)",
    padding: "12px 24px",
    fontSize: "1rem",
  };

  const buttonHover = {
    transform: "scale(1.05)",
  };

  return (
    <section className="py-5 bg-light" id="about">
      <div className="container">
        <div className="row align-items-center g-5">
          {/* Left */}
          <div className="col-lg-6 text-center position-relative">
            <img
              src="/assets/img/about.jpg"
              alt="EyeBeat Retinal Scan"
              className="img-fluid rounded shadow"
            />
            <a
              href="https://www.youtube.com/watch?v=Y7f98aduVJ8"
              className="btn btn-danger position-absolute top-50 start-50 translate-middle rounded-circle"
              style={{ width: "60px", height: "60px", fontSize: "1.3rem" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-solid fa-play"></i>
            </a>
          </div>

          {/* Right */}
          <div className="col-lg-6">
            <h2
  className="fw-bold"
  style={{
    background: "linear-gradient(to right, #6a11cb, #2575fc)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    display: "inline-block",
  }}
>
  ABOUT EYEBEAT
</h2>

            <p className="text-muted">
              At EyeBeat, we leverage cutting-edge AI to detect early signs of heart disease through advanced retinal image analysis. Our goal is to provide a non-invasive, fast, and accurate way to predict heart attacks before they occur.
            </p>

            <ul className="list-unstyled">
              <li className="d-flex align-items-start mb-4">
                <i className="fa-solid fa-brain fa-2x text-info me-3"></i>
                <div>
                  <h5>AI-Based Retinal Analysis</h5>
                  <p className="text-muted mb-0">
                    Deep learning models detect cardiovascular disease patterns in retina scans.
                  </p>
                </div>
              </li>
              <li className="d-flex align-items-start mb-4">
                <i className="fa-solid fa-eye fa-2x text-warning me-3"></i>
                <div>
                  <h5>Non-Invasive Eye Scan</h5>
                  <p className="text-muted mb-0">
                    Just a retina image — no physical contact or blood sample needed.
                  </p>
                </div>
              </li>
              <li className="d-flex align-items-start mb-4">
                <i className="fa-solid fa-heart-circle-check fa-2x text-danger me-3"></i>
                <div>
                  <h5>Early Heart Risk Detection</h5>
                  <p className="text-muted mb-0">
                    Detects heart attack risk early for timely intervention.
                  </p>
                </div>
              </li>
            </ul>

            {/* Centered Upload Button */}
            <div className="d-flex justify-content-center mt-5">
              <Link
                to="/upload"
                className="text-decoration-none"
                style={buttonStyle}
                onMouseOver={(e) =>
                  Object.assign(e.currentTarget.style, buttonHover)
                }
                onMouseOut={(e) =>
                  Object.assign(e.currentTarget.style, buttonStyle)
                }
              >
                <i className="fa-solid fa-upload me-2"></i> Go to Upload Page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
