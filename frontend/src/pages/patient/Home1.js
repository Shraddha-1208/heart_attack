import React from "react";

function Home1() {
  return (
    <>
  <div>
  <header id="header" className="header sticky-top">
    <div className="topbar d-flex align-items-center">
      <div className="container d-flex justify-content-center justify-content-md-between">
        <div className="contact-info d-flex align-items-center">
          <i className="bi bi-envelope d-flex align-items-center"><a href="mailto:contact@example.com">contact@example.com</a></i>
          <i className="bi bi-phone d-flex align-items-center ms-4"><span>+1 5589 55488 55</span></i>
        </div>
        <div className="social-links d-none d-md-flex align-items-center">
          <a href="#" className="twitter"><i className="bi bi-twitter-x" /></a>
          <a href="#" className="facebook"><i className="bi bi-facebook" /></a>
          <a href="#" className="instagram"><i className="bi bi-instagram" /></a>
          <a href="#" className="linkedin"><i className="bi bi-linkedin" /></a>
        </div>
      </div>
    </div>{/* End Top Bar */}
    <div className="branding d-flex align-items-center">
      <div className="container position-relative d-flex align-items-center justify-content-between">
        <a href="index.html" className="logo d-flex align-items-center me-auto">
          {/* Uncomment the line below if you also wish to use an image logo */}
          {/* <img src="assets/img/logo.png" alt=""> */}
          <h1 className="sitename">EyeBeat</h1>
        </a>
        <nav id="navmenu" className="navmenu">
          <ul>
            <li><a href="#hero" className="active">Home<br /></a></li>
            <li><a href="/about">About</a></li>
            <li><a href="#doctors">Doctors</a></li>
            <li className="dropdown"><a href="#"><span>Dropdown</span> <i className="bi bi-chevron-down toggle-dropdown" /></a>
              <ul>
                <li><a href="#">Dropdown 1</a></li>
                <li className="dropdown"><a href="#"><span>Deep Dropdown</span> <i className="bi bi-chevron-down toggle-dropdown" /></a>
                  <ul>
                    <li><a href="#">Deep Dropdown 1</a></li>
                    <li><a href="#">Deep Dropdown 2</a></li>
                    <li><a href="#">Deep Dropdown 3</a></li>
                    <li><a href="#">Deep Dropdown 4</a></li>
                    <li><a href="#">Deep Dropdown 5</a></li>
                  </ul>
                </li>
                <li><a href="#">Dropdown 2</a></li>
                <li><a href="#">Dropdown 3</a></li>
                <li><a href="#">Dropdown 4</a></li>
              </ul>
            </li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <i className="mobile-nav-toggle d-xl-none bi bi-list" />
        </nav>
        <a className="cta-btn d-none d-sm-block" href="/">Logout</a>
      </div>
    </div>
  </header>
  <main className="main">
    {/* Hero Section */}
    <section id="hero" className="hero section light-background">
      <img src="./assets/img/hero-bg.jpg"  />
      <div className="container position-relative">
        <div className="welcome position-relative" >
          <h2>WELCOME TO EYEBEAT</h2>
        </div>{/* End Welcome */}
        <div className="content row gy-4">
          <div className="col-lg-4 d-flex align-items-stretch">
            <div className="why-box" >
              <h3>Why Choose EyeBeat?</h3>
              <p>
                EyeBeat is an AI-powered system that helps detect early signs of heart attack risk by analyzing retinal eye scans. 
                Our technology combines medical precision with machine learning to provide fast, accurate, and non-invasive predictions—empowering patients and doctors to take action before it's too late.
                </p>
              <div className="text-center">
                <a href="#about" className="more-btn"><span>Learn More</span> <i className="bi bi-chevron-right" /></a>
              </div>
            </div>
          </div>{/* End Why Box */}
          <div className="col-lg-8 d-flex align-items-stretch">
            <div className="d-flex flex-column justify-content-center">
              <div className="row gy-4">
                <div className="col-xl-4 d-flex align-items-stretch">
                  <div className="icon-box" >
                    <i className="bi bi-activity" />
                    <h4>AI-Powered Diagnosis</h4>
                    <p>Our system uses advanced machine learning models to analyze retinal patterns that indicate cardiovascular health.</p>
                  </div>
                </div>{/* End Icon Box */}
                <div className="col-xl-4 d-flex align-items-stretch">
                  <div className="icon-box" >
                    <i className="bi bi-eye" />
                    <h4>Retinal Image-Based Screening</h4>
                    <p>Non-invasive, painless retina scans are used as input to detect abnormalities linked to heart disease.</p>
                  </div>
                </div>{/* End Icon Box */}
                <div className="col-xl-4 d-flex align-items-stretch">
                  <div className="icon-box" >
                    <i className="bi bi-bar-chart" />
                    <h4>Accurate & Early Predictions</h4>
                    <p>We deliver early warnings with high accuracy, helping in timely medical interventions.</p>
                  </div>
                </div>{/* End Icon Box */}
              </div>
            </div>
          </div>
        </div>{/* End  Content*/}
      </div>
    </section>{/* /Hero Section */}
   
    {/* Doctors Section */}
    <section id="doctors" className="doctors section">
      {/* Section Title */}
      <div className="container section-title" >
        <h2>Doctors</h2>
        
      </div>{/* End Section Title */}
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-6" >
            <div className="team-member d-flex align-items-start">
              <div className="pic"><img src="assets/img/doctors/doctors-1.jpg" className="img-fluid" alt /></div>
              <div className="member-info">
                <h4>Walter White</h4>
                <span>Chief Medical Officer</span>
                <p>Explicabo voluptatem mollitia et repellat qui dolorum quasi</p>
                <div className="social">
                  <a href><i className="bi bi-twitter-x" /></a>
                  <a href><i className="bi bi-facebook" /></a>
                  <a href><i className="bi bi-instagram" /></a>
                  <a href> <i className="bi bi-linkedin" /> </a>
                </div>
              </div>
            </div>
          </div>{/* End Team Member */}
          <div className="col-lg-6" >
            <div className="team-member d-flex align-items-start">
              <div className="pic"><img src="assets/img/doctors/doctors-2.jpg" className="img-fluid" alt /></div>
              <div className="member-info">
                <h4>Sarah Jhonson</h4>
                <span>Anesthesiologist</span>
                <p>Aut maiores voluptates amet et quis praesentium qui senda para</p>
                <div className="social">
                  <a href><i className="bi bi-twitter-x" /></a>
                  <a href><i className="bi bi-facebook" /></a>
                  <a href><i className="bi bi-instagram" /></a>
                  <a href> <i className="bi bi-linkedin" /> </a>
                </div>
              </div>
            </div>
          </div>{/* End Team Member */}
          <div className="col-lg-6" >
            <div className="team-member d-flex align-items-start">
              <div className="pic"><img src="assets/img/doctors/doctors-3.jpg" className="img-fluid" alt /></div>
              <div className="member-info">
                <h4>William Anderson</h4>
                <span>Cardiology</span>
                <p>Quisquam facilis cum velit laborum corrupti fuga rerum quia</p>
                <div className="social">
                  <a href><i className="bi bi-twitter-x" /></a>
                  <a href><i className="bi bi-facebook" /></a>
                  <a href><i className="bi bi-instagram" /></a>
                  <a href> <i className="bi bi-linkedin" /> </a>
                </div>
              </div>
            </div>
          </div>{/* End Team Member */}
          <div className="col-lg-6" >
            <div className="team-member d-flex align-items-start">
              <div className="pic"><img src="assets/img/doctors/doctors-4.jpg" className="img-fluid" alt /></div>
              <div className="member-info">
                <h4>Amanda Jepson</h4>
                <span>Neurosurgeon</span>
                <p>Dolorum tempora officiis odit laborum officiis et et accusamus</p>
                <div className="social">
                  <a href><i className="bi bi-twitter-x" /></a>
                  <a href><i className="bi bi-facebook" /></a>
                  <a href><i className="bi bi-instagram" /></a>
                  <a href> <i className="bi bi-linkedin" /> </a>
                </div>
              </div>
            </div>
          </div>{/* End Team Member */}
        </div>
      </div>
    </section>{/* /Doctors Section */}
   
    
    {/* Gallery Section */}
    <section id="gallery" className="gallery section">
      {/* Section Title */}
      <div className="container section-title" >
        <h2>Gallery</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </div>{/* End Section Title */}
      <div className="container-fluid" >
        <div className="row g-0">
          <div className="col-lg-3 col-md-4">
            <div className="gallery-item">
              <a href="assets/img/gallery/gallery-1.jpg" className="glightbox" data-gallery="images-gallery">
                <img src="assets/img/gallery/gallery-1.jpg" alt className="img-fluid" />
              </a>
            </div>
          </div>{/* End Gallery Item */}
          <div className="col-lg-3 col-md-4">
            <div className="gallery-item">
              <a href="assets/img/gallery/gallery-2.jpg" className="glightbox" data-gallery="images-gallery">
                <img src="assets/img/gallery/gallery-2.jpg" alt className="img-fluid" />
              </a>
            </div>
          </div>{/* End Gallery Item */}
          <div className="col-lg-3 col-md-4">
            <div className="gallery-item">
              <a href="assets/img/gallery/gallery-3.jpg" className="glightbox" data-gallery="images-gallery">
                <img src="assets/img/gallery/gallery-3.jpg" alt className="img-fluid" />
              </a>
            </div>
          </div>{/* End Gallery Item */}
          <div className="col-lg-3 col-md-4">
            <div className="gallery-item">
              <a href="assets/img/gallery/gallery-4.jpg" className="glightbox" data-gallery="images-gallery">
                <img src="assets/img/gallery/gallery-4.jpg" alt className="img-fluid" />
              </a>
            </div>
          </div>{/* End Gallery Item */}
          <div className="col-lg-3 col-md-4">
            <div className="gallery-item">
              <a href="assets/img/gallery/gallery-5.jpg" className="glightbox" data-gallery="images-gallery">
                <img src="assets/img/gallery/gallery-5.jpg" alt className="img-fluid" />
              </a>
            </div>
          </div>{/* End Gallery Item */}
          <div className="col-lg-3 col-md-4">
            <div className="gallery-item">
              <a href="assets/img/gallery/gallery-6.jpg" className="glightbox" data-gallery="images-gallery">
                <img src="assets/img/gallery/gallery-6.jpg" alt className="img-fluid" />
              </a>
            </div>
          </div>{/* End Gallery Item */}
          <div className="col-lg-3 col-md-4">
            <div className="gallery-item">
              <a href="assets/img/gallery/gallery-7.jpg" className="glightbox" data-gallery="images-gallery">
                <img src="assets/img/gallery/gallery-7.jpg" alt className="img-fluid" />
              </a>
            </div>
          </div>{/* End Gallery Item */}
          <div className="col-lg-3 col-md-4">
            <div className="gallery-item">
              <a href="assets/img/gallery/gallery-8.jpg" className="glightbox" data-gallery="images-gallery">
                <img src="assets/img/gallery/gallery-8.jpg" alt className="img-fluid" />
              </a>
            </div>
          </div>{/* End Gallery Item */}
        </div>
      </div>
    </section>{/* /Gallery Section */}
    
  </main>
  {/* Footer Section */}
      <footer id="footer" className="footer light-background">
        <div className="container footer-top">
          <div className="row gy-4">
            {/* Company Info */}
            <div className="col-lg-4 col-md-6 footer-about">
              <a href="/" className="logo d-flex align-items-center">
                <span className="sitename">EyeBeat</span>
              </a>
              <div className="footer-contact pt-3">
                <p>Mangalore</p>
                <p>India</p>
                <p className="mt-3">
                  <strong>Phone:</strong> <span>+91 9480054506</span>
                </p>
                <p>
                  <strong>Email:</strong> <span>eyebeat@example.com</span>
                </p>
              </div>
              <div className="social-links d-flex mt-4">
                <a href="#"><i className="bi bi-twitter-x" /></a>
                <a href="#"><i className="bi bi-facebook" /></a>
                <a href="#"><i className="bi bi-instagram" /></a>
                <a href="#"><i className="bi bi-linkedin" /></a>
              </div>
            </div>

            {/* Useful Links */}
            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>

            {/* Our Services */}
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

            {/* Placeholder Section */}
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

            {/* Another Placeholder */}
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

        {/* Copyright */}
        <div className="container text-center mt-4">
          <p>© <strong className="sitename">EyeBeat</strong> — All Rights Reserved</p>
          <div className="credits">
            Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a> | Distributed by <a href="https://themewagon.com">ThemeWagon</a>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <a href="#" id="scroll-top" className="scroll-top d-flex align-items-center justify-content-center">
        <i className="bi bi-arrow-up-short" />
      </a>
      </div>
    </>
  );
}

export default Home1;