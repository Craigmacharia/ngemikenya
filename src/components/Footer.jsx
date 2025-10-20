import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="professional-footer">
      <div className="container">
        {/* Main Footer Content */}
        <div className="row g-4 py-5">
          {/* Brand Column */}
          <div className="col-lg-4 col-md-6">
            <div className="footer-brand mb-4">
              <div className="d-flex align-items-center mb-3">
                <div className="footer-logo-placeholder me-3">
                  <i className="bi bi-cup-hot-fill"></i>
                </div>
                <h5 className="brand-text mb-0">
                  Ngemi<span className="text-accent">Kenya</span>
                </h5>
              </div>
              <p className="footer-description">
                Honest perspectives, tech talk & real-world reflections from the heart of Kenya's tech scene.
              </p>
              <div className="social-links">
                <a href="https://twitter.com/ngemikenya" target="_blank" rel="noopener noreferrer" className="social-link">
                  <i className="bi bi-twitter"></i>
                </a>
                
                <a href="mailto:hello@ngemikenya.com" className="social-link">
                  <i className="bi bi-envelope"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h6 className="footer-heading mb-4">Quick Links</h6>
            <ul className="footer-links list-unstyled">
              <li className="mb-2">
                <Link to="/" className="footer-link">
                  <i className="bi bi-house me-2"></i>
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/posts" className="footer-link">
                  <i className="bi bi-journal-text me-2"></i>
                  All Posts
                </Link>
              </li>
              <li className="mb-2">
                <a href="/admin" className="footer-link" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-shield-lock me-2"></i>
                  Admin
                </a>
              </li>
              <li className="mb-2">
                <a href="https://www.ngemikenya.com/contact" className="footer-link" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-telephone me-2"></i>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          

          {/* Newsletter */}
          <div className="col-lg-3 col-md-6">
            <h6 className="footer-heading mb-4">Stay Updated</h6>
            <p className="footer-description small mb-3">
              Get the latest posts and insights delivered to your inbox.
            </p>
            <div className="newsletter-form">
              <div className="input-group mb-3">
                <input 
                  type="email" 
                  className="form-control newsletter-input" 
                  placeholder="Email address" 
                />
                <button className="btn newsletter-btn" type="button">
                  <i className="bi bi-send"></i>
                </button>
              </div>
              <div className="form-text">
                <i className="bi bi-shield-check me-1"></i>
                No spam, unsubscribe anytime
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom py-4 border-top">
          <div className="row align-items-center">
            <div className="col-md-6 text-md-start text-center mb-2 mb-md-0">
              <p className="mb-0 copyright-text">
                © {new Date().getFullYear()} <strong>NgemiKenya</strong>. All rights reserved.
              </p>
            </div>
            <div className="col-md-6 text-md-end text-center">
              <div className="footer-bottom-links">
                
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .professional-footer {
          background: linear-gradient(135deg, #5D4037 0%, #6D4C41 100%);
          color: #E0E0E0;
          font-family: 'Comfortaa', sans-serif;
          border-top: 3px solid #FFD54F;
        }

        .footer-brand {
          text-align: left;
        }

        .footer-logo-placeholder {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #FFD54F 0%, #FFB300 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #5D4037;
          font-size: 1.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .brand-text {
          font-size: 1.5rem;
          background: linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 700;
        }

        .text-accent {
          color: #FFD54F !important;
          -webkit-text-fill-color: #FFD54F;
        }

        .footer-heading {
          color: #FFFFFF;
          font-weight: 600;
          font-size: 1.1rem;
          position: relative;
          padding-bottom: 0.5rem;
        }

        .footer-heading::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 30px;
          height: 2px;
          background: #FFD54F;
          border-radius: 2px;
        }

        .footer-description {
          color: #BDBDBD;
          line-height: 1.6;
          font-size: 0.95rem;
        }

        .social-links {
          display: flex;
          gap: 12px;
          margin-top: 1.5rem;
        }

        .social-link {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #E0E0E0;
          text-decoration: none;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .social-link:hover {
          background: #FFD54F;
          color: #5D4037;
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(255, 213, 79, 0.3);
          text-decoration: none;
        }

        .footer-links {
          text-align: left;
        }

        .footer-link {
          color: #BDBDBD;
          text-decoration: none;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          font-size: 0.9rem;
        }

        .footer-link:hover {
          color: #FFD54F;
          transform: translateX(5px);
          text-decoration: none;
        }

        .newsletter-input {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #FFFFFF;
          border-radius: 25px 0 0 25px;
          border-right: none;
          padding: 0.75rem 1rem;
        }

        .newsletter-input::placeholder {
          color: #BDBDBD;
        }

        .newsletter-input:focus {
          background: rgba(255, 255, 255, 0.15);
          border-color: #FFD54F;
          box-shadow: 0 0 0 0.2rem rgba(255, 213, 79, 0.25);
          color: #FFFFFF;
        }

        .newsletter-btn {
          background: #FFD54F;
          border: 1px solid #FFD54F;
          color: #5D4037;
          border-radius: 0 25px 25px 0;
          padding: 0.75rem 1rem;
          transition: all 0.3s ease;
          font-weight: 600;
        }

        .newsletter-btn:hover {
          background: #FFB300;
          border-color: #FFB300;
          transform: scale(1.05);
        }

        .form-text {
          color: #9E9E9E;
          font-size: 0.8rem;
          display: flex;
          align-items: center;
        }

        .footer-bottom {
          border-color: rgba(255, 255, 255, 0.1) !important;
        }

        .copyright-text {
          color: #BDBDBD;
          font-size: 0.9rem;
        }

        .footer-bottom-links {
          display: flex;
          justify-content: flex-end;
          gap: 1.5rem;
        }

        .footer-bottom-link {
          color: #9E9E9E;
          text-decoration: none;
          font-size: 0.85rem;
          transition: color 0.3s ease;
        }

        .footer-bottom-link:hover {
          color: #FFD54F;
          text-decoration: none;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .footer-brand {
            text-align: center;
          }
          
          .footer-links {
            text-align: center;
          }
          
          .footer-bottom-links {
            justify-content: center;
            margin-top: 1rem;
          }
          
          .social-links {
            justify-content: center;
          }
        }

        @media (max-width: 576px) {
          .footer-bottom-links {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>

      {/* Add Comfortaa Font */}
      <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    </footer>
  );
}

export default Footer;