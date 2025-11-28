import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/watu.png";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark professional-navbar shadow-lg py-3">
      <div className="container">
        {/* Brand + Logo */}
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
          <div className="logo-wrapper position-relative">
            <img
              src={logo}
              alt="NgemiKenya Logo"
              width="48"
              height="48"
              className="me-3 rounded-circle border border-light shadow-lg logo-img"
            />
            <div className="logo-glow"></div>
          </div>
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
                href="/contact"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-envelope me-2"></i>
                Contact
              </a>
            </li>
            
          </ul>
        </div>
      </div>

      <style jsx>{`
        .professional-navbar {
          background: linear-gradient(135deg, #6D4C41 0%, #8D6E63 50%, #6D4C41 100%) !important;
          border-bottom: 3px solid #FFD54F;
          font-family: 'Comfortaa', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .professional-navbar::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transition: left 0.7s ease;
        }

        .professional-navbar:hover::before {
          left: 100%;
        }

        .logo-wrapper {
          position: relative;
          display: inline-block;
        }

        .logo-img {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          z-index: 2;
          border: 2px solid #FFD54F !important;
          box-shadow: 0 0 20px rgba(255, 213, 79, 0.3) !important;
        }

        .logo-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60px;
          height: 60px;
          background: radial-gradient(circle, rgba(255, 213, 79, 0.4) 0%, transparent 70%);
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 1;
        }

        .logo-wrapper:hover .logo-img {
          transform: scale(1.1) rotate(5deg);
          box-shadow: 0 0 30px rgba(255, 213, 79, 0.6) !important;
        }

        .logo-wrapper:hover .logo-glow {
          opacity: 1;
        }

        .brand-text {
          font-size: 1.6rem;
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

        .nav-link-custom {
          color: #E0E0E0 !important;
          font-weight: 600;
          padding: 0.6rem 1.2rem !important;
          border-radius: 30px;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          margin: 0.1rem 0.2rem;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
          border: 1px solid transparent;
        }

        .nav-link-custom::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.6s ease;
        }

        .nav-link-custom:hover::before {
          left: 100%;
        }

        .nav-link-custom::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 3px;
          background: linear-gradient(90deg, #FFD54F, #FFE082, #FFD54F);
          transition: all 0.4s ease;
          transform: translateX(-50%);
          border-radius: 2px;
        }

        .nav-link-custom:hover {
          color: #FFFFFF !important;
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
          border-color: rgba(255, 213, 79, 0.3);
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        }

        .nav-link-custom:hover::after {
          width: 70%;
        }

        .nav-link-custom.active {
          color: #FFFFFF !important;
          background: rgba(255, 213, 79, 0.25);
          border-color: rgba(255, 213, 79, 0.5);
          box-shadow: 0 5px 20px rgba(255, 213, 79, 0.3);
        }

        .nav-link-custom.active::after {
          width: 70%;
          background: #FFD54F;
        }

        .admin-link {
          background: rgba(255, 213, 79, 0.2);
          border: 1px solid rgba(255, 213, 79, 0.4);
          box-shadow: 0 0 15px rgba(255, 213, 79, 0.2);
        }

        .admin-link:hover {
          background: rgba(255, 213, 79, 0.3) !important;
          border-color: rgba(255, 213, 79, 0.6);
          box-shadow: 0 5px 25px rgba(255, 213, 79, 0.4);
          transform: translateY(-2px) scale(1.05);
        }

        .navbar-toggler {
          padding: 0.3rem 0.6rem;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
        }

        .navbar-toggler:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.1);
        }

        .navbar-toggler:focus {
          box-shadow: 0 0 0 3px rgba(255, 213, 79, 0.5);
        }

        /* Mobile Responsive */
        @media (max-width: 991.98px) {
          .navbar-nav {
            padding: 1rem 0;
            background: rgba(109, 76, 65, 0.95);
            border-radius: 15px;
            margin-top: 1rem;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 213, 79, 0.2);
          }
          
          .nav-link-custom {
            margin: 0.3rem 0;
            text-align: center;
            border-radius: 15px;
          }
          
          .brand-text {
            font-size: 1.4rem;
          }
        }

        /* Smooth animations */
        .navbar {
          transition: all 0.3s ease;
        }

        /* Enhanced focus states */
        .nav-link-custom:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(255, 213, 79, 0.5);
        }

        /* Pulse animation for active state */
        @keyframes gentlePulse {
          0% { box-shadow: 0 5px 20px rgba(255, 213, 79, 0.3); }
          50% { box-shadow: 0 5px 25px rgba(255, 213, 79, 0.5); }
          100% { box-shadow: 0 5px 20px rgba(255, 213, 79, 0.3); }
        }

        .nav-link-custom.active {
          animation: gentlePulse 2s ease-in-out infinite;
        }
      `}</style>

      {/* Add Comfortaa Font */}
      <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    </nav>
  );
}

export default Navbar;