import React, { useState } from "react";
import { Link } from "react-router-dom";

function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      const mailtoLink = `mailto:cmacharia482@gmail.com?subject=Join NgemiKenya Newsletter&body=I'd like to join your newsletter with this email: ${encodeURIComponent(email)}`;
      window.location.href = mailtoLink;
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setEmail("");
    }
  };

  return (
    <footer className="site-footer">
      {/* Simple Top Border */}
      <div className="footer-border"></div>

      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Brand & About */}
          <div className="footer-brand-section">
            <div className="brand-simple">
              <div className="simple-logo">
                <i className="bi bi-cup-hot"></i>
              </div>
              <div className="simple-brand">
                <h3 className="brand-title">
                  Ngemi<span className="brand-kenya">Kenya</span>
                </h3>
                <p className="brand-desc">
                  Real conversations about life, business, and everything that matters 
                  in Kenya. Honest perspectives, everyday insights.
                </p>
              </div>
            </div>

            
            
          </div>

          {/* Links & Contact */}
          <div className="footer-links-section">
            {/* Quick Links */}
            <div className="links-column">
              <div className="column-header">
                <i className="bi bi-compass"></i>
                <h4>Navigate</h4>
              </div>
              <ul className="simple-links">
                <li>
                  <Link to="/" className="simple-link">
                    <i className="bi bi-house"></i>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/posts" className="simple-link">
                    <i className="bi bi-journal-text"></i>
                    All Stories
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="simple-link">
                    <i className="bi bi-person"></i>
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="simple-link">
                    <i className="bi bi-chat"></i>
                    Share Thoughts
                  </Link>
                </li>
                <li>
                  <Link to="/privacy-policy" className="simple-link">
                    <i className="bi bi-shield"></i>
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div className="links-column">
              <div className="column-header">
                <i className="bi bi-people"></i>
                <h4>Connect</h4>
              </div>
              <div className="connect-grid">
                <a 
                  href="https://twitter.com/ngemikenya" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="connect-link"
                  aria-label="Twitter"
                >
                  <i className="bi bi-twitter"></i>
                  <span>Twitter</span>
                </a>
                <a 
                  href="https://instagram.com/ngemikenya" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="connect-link"
                  aria-label="Instagram"
                >
                  <i className="bi bi-instagram"></i>
                  <span>Instagram</span>
                </a>
                <a 
                  href="mailto:cmacharia482@gmail.com" 
                  className="connect-link"
                  aria-label="Email"
                >
                  <i className="bi bi-envelope"></i>
                  <span>Email</span>
                </a>
                <a 
                  href="https://linkedin.com/company/ngemikenya" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="connect-link"
                  aria-label="LinkedIn"
                >
                  <i className="bi bi-linkedin"></i>
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="copyright">
            <p>
              © {new Date().getFullYear()} NgemiKenya 
              <span className="separator">•</span>
              <span className="love">
                <i className="bi bi-heart"></i>
                For Kenya
              </span>
            </p>
          </div>
          <p className="footer-tagline">
            Real stories. Real perspectives. From Kenya.
          </p>
        </div>
      </div>

      {/* Simple Back to Top */}
      <button 
        className="simple-top-btn"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <i className="bi bi-chevron-up"></i>
      </button>

      <style jsx>{`
        /* Base Styles */
        .site-footer {
          background: linear-gradient(135deg, #5D4037 0%, #6D4C41 100%);
          color: #FAFAFA;
          font-family: system-ui, -apple-system, sans-serif;
          position: relative;
          margin-top: auto;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .footer-border {
          height: 3px;
          background: linear-gradient(90deg, #FFD54F, #FFB300);
          width: 100%;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem 1.5rem 2rem;
        }

        /* Main Layout */
        .footer-main {
          display: flex;
          flex-direction: column;
          gap: 3rem;
          margin-bottom: 3rem;
        }

        @media (min-width: 768px) {
          .footer-main {
            flex-direction: row;
            justify-content: space-between;
            gap: 4rem;
          }
        }

        /* Brand Section */
        .footer-brand-section {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        .brand-simple {
          display: flex;
          gap: 1.5rem;
          align-items: flex-start;
        }

        .simple-logo {
          width: 50px;
          height: 50px;
          background: #FFD54F;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #5D4037;
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .simple-brand {
          flex: 1;
        }

        .brand-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: #FFFFFF;
          margin-bottom: 0.5rem;
          letter-spacing: -0.5px;
        }

        .brand-kenya {
          color: #FFD54F;
        }

        .brand-desc {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.95rem;
          line-height: 1.6;
          font-weight: 400;
        }

        /* Simple Newsletter */
        .simple-newsletter {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .newsletter-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .newsletter-header i {
          color: #FFD54F;
          font-size: 1.2rem;
        }

        .newsletter-header h4 {
          color: #FFFFFF;
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0;
        }

        .newsletter-desc {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
          margin-bottom: 1rem;
          line-height: 1.5;
        }

        .simple-form {
          margin-bottom: 0.5rem;
        }

        .input-wrapper {
          display: flex;
          gap: 0.5rem;
        }

        .simple-input {
          flex: 1;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          color: #FFFFFF;
          font-size: 0.95rem;
          font-family: inherit;
          transition: all 0.3s ease;
        }

        .simple-input:focus {
          outline: none;
          border-color: #FFD54F;
          background: rgba(255, 255, 255, 0.15);
        }

        .simple-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .simple-submit {
          padding: 0.75rem 1.5rem;
          background: #FFD54F;
          color: #5D4037;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .simple-submit:hover {
          background: #FFE082;
          transform: translateY(-1px);
        }

        .simple-success {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #A5D6A7;
          font-size: 0.85rem;
          padding-top: 0.5rem;
        }

        .simple-success i {
          color: #4CAF50;
        }

        /* Links Section */
        .footer-links-section {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 2.5rem;
        }

        @media (min-width: 768px) {
          .footer-links-section {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .links-column {
          display: flex;
          flex-direction: column;
        }

        .column-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }

        .column-header i {
          color: #FFD54F;
          font-size: 1.1rem;
        }

        .column-header h4 {
          color: #FFFFFF;
          font-size: 1rem;
          font-weight: 600;
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .simple-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .simple-links li {
          margin-bottom: 0.75rem;
        }

        .simple-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          padding: 0.25rem 0;
        }

        .simple-link:hover {
          color: #FFD54F;
          transform: translateX(3px);
        }

        .simple-link i {
          width: 20px;
          text-align: center;
          font-size: 1rem;
        }

        /* Connect Grid */
        .connect-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }

        .connect-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-size: 0.95rem;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .connect-link:hover {
          color: #FFD54F;
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 213, 79, 0.3);
          transform: translateY(-2px);
        }

        .connect-link i {
          font-size: 1.1rem;
        }

        /* Footer Bottom */
        .footer-bottom {
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
        }

        @media (min-width: 768px) {
          .footer-bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            text-align: left;
          }
        }

        .copyright {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
          margin-bottom: 0.75rem;
        }

        @media (min-width: 768px) {
          .copyright {
            margin-bottom: 0;
          }
        }

        .separator {
          margin: 0 0.5rem;
          opacity: 0.5;
        }

        .love {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
        }

        .love i {
          color: #FF5252;
          font-size: 0.9rem;
        }

        .footer-tagline {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.85rem;
          font-style: italic;
          margin: 0;
        }

        /* Back to Top Button */
        .simple-top-btn {
          position: fixed;
          bottom: 1.5rem;
          right: 1.5rem;
          width: 45px;
          height: 45px;
          background: #FFD54F;
          color: #5D4037;
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 1000;
          opacity: 0;
          transform: translateY(20px);
          pointer-events: none;
          box-shadow: 0 4px 15px rgba(255, 213, 79, 0.3);
        }

        .simple-top-btn.visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        .simple-top-btn:hover {
          background: #FFE082;
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(255, 213, 79, 0.4);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .footer-container {
            padding: 2.5rem 1.25rem 1.5rem;
          }

          .brand-simple {
            flex-direction: column;
            text-align: center;
            align-items: center;
          }

          .simple-logo {
            margin: 0 auto;
          }

          .footer-links-section {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .simple-top-btn {
            width: 40px;
            height: 40px;
            font-size: 1rem;
            bottom: 1rem;
            right: 1rem;
          }
        }

        @media (max-width: 480px) {
          .connect-grid {
            grid-template-columns: 1fr;
          }

          .input-wrapper {
            flex-direction: column;
          }

          .simple-submit {
            width: 100%;
          }
        }

        /* Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
          * {
            transition: none !important;
          }

          .simple-top-btn {
            transition: opacity 0.3s ease !important;
          }
        }

        /* Dark Mode */
        @media (prefers-color-scheme: dark) {
          .site-footer {
            background: linear-gradient(135deg, #4A342A 0%, #5D4037 100%);
          }
        }

        /* Print Styles */
        @media print {
          .site-footer {
            background: #F5F5F5 !important;
            color: #333 !important;
          }

          .simple-logo,
          .simple-top-btn {
            display: none !important;
          }

          .brand-title {
            color: #333 !important;
          }
        }
      `}</style>

      {/* Add Icons */}
      <link 
        rel="stylesheet" 
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" 
      />
    </footer>
  );
}

export default Footer;