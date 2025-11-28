import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="professional-footer">
      <div className="container">
        {/* Main Footer Content */}
        <div className="row g-5 py-5">
          {/* Brand Column */}
          <div className="col-lg-4 col-md-6">
            <div className="footer-brand mb-4">
              <div className="d-flex align-items-center mb-4">
                <div className="footer-logo-wrapper me-3">
                  <div className="footer-logo-placeholder">
                    <i className="bi bi-cup-hot-fill"></i>
                  </div>
                  <div className="logo-glow"></div>
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
                  <span className="social-tooltip">Twitter</span>
                </a>
                <a href="https://linkedin.com/company/ngemikenya" target="_blank" rel="noopener noreferrer" className="social-link">
                  <i className="bi bi-linkedin"></i>
                  <span className="social-tooltip">LinkedIn</span>
                </a>
                <a href="https://github.com/ngemikenya" target="_blank" rel="noopener noreferrer" className="social-link">
                  <i className="bi bi-github"></i>
                  <span className="social-tooltip">GitHub</span>
                </a>
                <a href="mailto:hello@ngemikenya.com" className="social-link">
                  <i className="bi bi-envelope"></i>
                  <span className="social-tooltip">Email</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h6 className="footer-heading mb-4">Quick Links</h6>
            <ul className="footer-links list-unstyled">
              <li className="mb-3">
                <Link to="/" className="footer-link">
                  <i className="bi bi-house me-2"></i>
                  Home
                </Link>
              </li>
              <li className="mb-3">
                <Link to="/posts" className="footer-link">
                  <i className="bi bi-journal-text me-2"></i>
                  All Posts
                </Link>
              </li>
              
              <li className="mb-3">
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
            <p className="footer-description small mb-4">
              Get the latest posts and insights delivered to your inbox.
            </p>
            <div className="newsletter-form">
              <div className="input-group mb-3">
                <input 
                  type="email" 
                  className="form-control newsletter-input" 
                  placeholder="Enter your email" 
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
                © {new Date().getFullYear()} <strong>NgemiKenya</strong>. Crafted with <i className="bi bi-heart-fill text-accent mx-1"></i> for the whole community.
              </p>
            </div>
            <div className="col-md-6 text-md-end text-center">
              <div className="footer-bottom-links">
                <a href="/privacy" className="footer-bottom-link">Privacy</a>
                <a href="/terms" className="footer-bottom-link">Terms</a>
                <a href="/sitemap" className="footer-bottom-link">Sitemap</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .professional-footer {
          background: linear-gradient(135deg, #5D4037 0%, #6D4C41 30%, #8D6E63 70%, #6D4C41 100%);
          color: #E0E0E0;
          font-family: 'Comfortaa', sans-serif;
          border-top: 3px solid #FFD54F;
          position: relative;
          overflow: hidden;
        }

        .professional-footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          animation: float 20s ease-in-out infinite;
        }

        .footer-brand {
          text-align: left;
          position: relative;
          z-index: 2;
        }

        .footer-logo-wrapper {
          position: relative;
          display: inline-block;
        }

        .footer-logo-placeholder {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #FFD54F 0%, #FFB300 100%);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #5D4037;
          font-size: 1.8rem;
          box-shadow: 0 8px 25px rgba(255, 213, 79, 0.3);
          border: 2px solid rgba(255, 255, 255, 0.2);
          position: relative;
          z-index: 2;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .logo-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 70px;
          height: 70px;
          background: radial-gradient(circle, rgba(255, 213, 79, 0.4) 0%, transparent 70%);
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .footer-logo-wrapper:hover .footer-logo-placeholder {
          transform: scale(1.1) rotate(5deg);
          box-shadow: 0 12px 35px rgba(255, 213, 79, 0.5);
        }

        .footer-logo-wrapper:hover .logo-glow {
          opacity: 1;
        }

        .brand-text {
          font-size: 1.8rem;
          background: linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 50%, #E0E0E0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 800;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          letter-spacing: 0.5px;
        }

        .text-accent {
          color: #FFD54F !important;
          -webkit-text-fill-color: #FFD54F;
          text-shadow: 0 0 20px rgba(255, 213, 79, 0.5);
        }

        .footer-heading {
          color: #FFFFFF;
          font-weight: 700;
          font-size: 1.2rem;
          position: relative;
          padding-bottom: 1rem;
          letter-spacing: 0.5px;
        }

        .footer-heading::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 3px;
          background: linear-gradient(90deg, #FFD54F, #FFE082, #FFD54F);
          border-radius: 2px;
          transition: width 0.4s ease;
        }

        .footer-heading:hover::after {
          width: 60px;
        }

        .footer-description {
          color: #BDBDBD;
          line-height: 1.7;
          font-size: 1rem;
          font-weight: 300;
        }

        .social-links {
          display: flex;
          gap: 15px;
          margin-top: 2rem;
        }

        .social-link {
          width: 50px;
          height: 50px;
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #E0E0E0;
          text-decoration: none;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          backdrop-filter: blur(20px);
          position: relative;
          overflow: hidden;
        }

        .social-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.6s ease;
        }

        .social-link:hover::before {
          left: 100%;
        }

        .social-link:hover {
          background: #FFD54F;
          color: #5D4037;
          transform: translateY(-5px) scale(1.1);
          box-shadow: 0 10px 30px rgba(255, 213, 79, 0.4);
          border-color: #FFD54F;
        }

        .social-tooltip {
          position: absolute;
          bottom: -40px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 5px 10px;
          border-radius: 4px;
          font-size: 0.75rem;
          white-space: nowrap;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .social-link:hover .social-tooltip {
          opacity: 1;
        }

        .footer-links {
          text-align: left;
        }

        .footer-link {
          color: #BDBDBD;
          text-decoration: none;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          display: flex;
          align-items: center;
          font-size: 0.95rem;
          font-weight: 400;
          padding: 0.5rem 0;
          position: relative;
          overflow: hidden;
        }

        .footer-link::before {
          content: '';
          position: absolute;
          left: -100%;
          bottom: 0;
          width: 100%;
          height: 2px;
          background: #FFD54F;
          transition: left 0.4s ease;
        }

        .footer-link:hover {
          color: #FFD54F;
          transform: translateX(8px);
          text-decoration: none;
        }

        .footer-link:hover::before {
          left: 0;
        }

        .footer-link i {
          transition: transform 0.3s ease;
        }

        .footer-link:hover i {
          transform: scale(1.2);
        }

        .newsletter-input {
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.2);
          color: #FFFFFF;
          border-radius: 25px 0 0 25px;
          border-right: none;
          padding: 0.9rem 1.2rem;
          font-size: 0.95rem;
          transition: all 0.4s ease;
          backdrop-filter: blur(10px);
        }

        .newsletter-input::placeholder {
          color: #BDBDBD;
          font-weight: 300;
        }

        .newsletter-input:focus {
          background: rgba(255, 255, 255, 0.15);
          border-color: #FFD54F;
          box-shadow: 0 0 0 0.3rem rgba(255, 213, 79, 0.2);
          color: #FFFFFF;
          outline: none;
        }

        .newsletter-btn {
          background: linear-gradient(135deg, #FFD54F 0%, #FFB300 100%);
          border: 2px solid #FFD54F;
          color: #5D4037;
          border-radius: 0 25px 25px 0;
          padding: 0.9rem 1.2rem;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          font-weight: 700;
          position: relative;
          overflow: hidden;
        }

        .newsletter-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          transition: left 0.6s ease;
        }

        .newsletter-btn:hover::before {
          left: 100%;
        }

        .newsletter-btn:hover {
          background: linear-gradient(135deg, #FFB300 0%, #FF8F00 100%);
          border-color: #FFB300;
          transform: scale(1.05);
          box-shadow: 0 8px 25px rgba(255, 213, 79, 0.4);
        }

        .form-text {
          color: #9E9E9E;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          font-weight: 300;
        }

        .footer-bottom {
          border-color: rgba(255, 255, 255, 0.15) !important;
          position: relative;
          z-index: 2;
        }

        .copyright-text {
          color: #BDBDBD;
          font-size: 0.95rem;
          font-weight: 300;
        }

        .copyright-text strong {
          color: #FFFFFF;
          font-weight: 600;
        }

        .footer-bottom-links {
          display: flex;
          justify-content: flex-end;
          gap: 2rem;
        }

        .footer-bottom-link {
          color: #9E9E9E;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 400;
          transition: all 0.3s ease;
          position: relative;
        }

        .footer-bottom-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: #FFD54F;
          transition: width 0.3s ease;
        }

        .footer-bottom-link:hover {
          color: #FFD54F;
          text-decoration: none;
        }

        .footer-bottom-link:hover::after {
          width: 100%;
        }

        /* Premium Animations */
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
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
            gap: 1.5rem;
          }
          
          .social-links {
            justify-content: center;
          }

          .footer-heading::after {
            left: 50%;
            transform: translateX(-50%);
          }

          .footer-heading:hover::after {
            width: 40px;
            left: 50%;
            transform: translateX(-50%);
          }
        }

        @media (max-width: 576px) {
          .footer-bottom-links {
            flex-direction: column;
            gap: 1rem;
          }

          .social-links {
            gap: 12px;
          }

          .social-link {
            width: 45px;
            height: 45px;
          }

          .footer-logo-placeholder {
            width: 50px;
            height: 50px;
            font-size: 1.5rem;
          }

          .brand-text {
            font-size: 1.5rem;
          }
        }

        /* Enhanced focus states */
        .footer-link:focus,
        .social-link:focus,
        .newsletter-btn:focus,
        .newsletter-input:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(255, 213, 79, 0.3);
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* Add Comfortaa Font */}
      <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    </footer>
  );
}

export default Footer;