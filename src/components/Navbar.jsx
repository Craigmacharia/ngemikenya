import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/watu.png";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark professional-navbar shadow-sm py-3">
      <div className="container">
        {/* Brand + Logo */}
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
          <img
            src={logo}
            alt="NgemiKenya Logo"
            width="42"
            height="42"
            className="me-3 rounded-circle border border-light shadow-sm"
          />
          <span className="brand-text">
            Ngemi<span className="text-accent">Kenya</span>
          </span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item mx-1">
              <Link className="nav-link nav-link-custom" to="/">
                <i className="bi bi-house-door me-2"></i>
                Home
              </Link>
            </li>
            <li className="nav-item mx-1">
              <Link className="nav-link nav-link-custom" to="/posts">
                <i className="bi bi-journal-text me-2"></i>
                Posts
              </Link>
            </li>
            <li className="nav-item mx-1">
              <a
                className="nav-link nav-link-custom"
                href="./contact"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-envelope me-2"></i>
                Contact
              </a>
            </li>
            <li className="nav-item mx-1">
              <a
                className="nav-link nav-link-custom admin-link"
                href="/admin"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-shield-lock me-2"></i>
                Admin
              </a>
            </li>
            
          </ul>
        </div>
      </div>

      <style jsx>{`
        .professional-navbar {
          background: linear-gradient(135deg, #6D4C41 0%, #8D6E63 100%) !important;
          border-bottom: 3px solid #FFD54F;
          font-family: 'Comfortaa', sans-serif;
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

        .nav-link-custom {
          color: #E0E0E0 !important;
          font-weight: 500;
          padding: 0.5rem 1rem !important;
          border-radius: 25px;
          transition: all 0.3s ease;
          margin: 0.1rem 0;
          position: relative;
          overflow: hidden;
        }

        .nav-link-custom::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: #FFD54F;
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }

        .nav-link-custom:hover {
          color: #FFFFFF !important;
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-1px);
        }

        .nav-link-custom:hover::before {
          width: 80%;
        }

        .nav-link-custom.active {
          color: #FFFFFF !important;
          background: rgba(255, 213, 79, 0.2);
        }

        .nav-link-custom.active::before {
          width: 80%;
          background: #FFD54F;
        }

        .admin-link {
          background: rgba(255, 213, 79, 0.15);
          border: 1px solid rgba(255, 213, 79, 0.3);
        }

        .admin-link:hover {
          background: rgba(255, 213, 79, 0.25) !important;
          border-color: rgba(255, 213, 79, 0.5);
        }

        .navbar-toggler {
          padding: 0.25rem 0.5rem;
          transition: all 0.3s ease;
        }

        .navbar-toggler:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .navbar-toggler:focus {
          box-shadow: 0 0 0 2px rgba(255, 213, 79, 0.5);
        }

        .btn-outline-light {
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #FFFFFF;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .btn-outline-light:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: #FFFFFF;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        /* Mobile Responsive */
        @media (max-width: 991.98px) {
          .navbar-nav {
            padding: 1rem 0;
          }
          
          .nav-link-custom {
            margin: 0.25rem 0;
            text-align: center;
          }
          
          .btn-outline-light {
            margin-top: 0.5rem;
            text-align: center;
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }
        }

        /* Smooth animations */
        .navbar {
          transition: all 0.3s ease;
        }
      `}</style>

      {/* Add Comfortaa Font */}
      <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    </nav>
  );
}

export default Navbar;
