import React from "react";
const About = () => {
  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="row gy-4 gx-5">
          <div className="col-lg-6 position-relative align-self-start">
            <img src="/assets/img/about.jpg" className="img-fluid" alt="EyeBeat Retinal Scan" />
            <a
              href="https://www.youtube.com/watch?v=Y7f98aduVJ8"
              className="glightbox pulsating-play-btn"
            >
              <i className="fa-solid fa-play"></i>
            </a>
          </div>
          <div className="col-lg-6 content">
            <h3>About EyeBeat</h3>
            <p>
              At EyeBeat, we leverage cutting-edge AI to detect early signs of heart disease through advanced retinal image analysis. Our goal is to provide a non-invasive, fast, and accurate way to predict heart attacks before they occur — saving lives with every scan.
            </p>
            <ul>
              <li>
                <i className="fa-solid fa-brain" />
                <div>
                  <h5>AI-Based Retinal Analysis</h5>
                  <p>
                    Uses deep learning models to analyze retinal images and detect patterns linked to cardiovascular diseases.
                  </p>
                </div>
              </li>
              <li>
                <i className="fa-solid fa-eye" />
                <div>
                  <h5>Non-Invasive Eye Scan</h5>
                  <p>
                    Requires only a retina image — no physical contact or blood sample — ensuring user comfort and safety.
                  </p>
                </div>
              </li>
              <li>
                <i className="fa-solid fa-heart-circle-check" />
                <div>
                  <h5>Early Heart Risk Detection</h5>
                  <p>
                    Provides accurate early warning signs of heart attack risk, giving time for preventive care and lifestyle changes.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
