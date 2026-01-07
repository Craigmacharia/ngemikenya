import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/ngemi.jpg";

function Navbar() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavToggle = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  const closeNav = () => {
    setIsNavCollapsed(true);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark professional-navbar shadow-lg py-3">
      <div className="container">
        {/* Brand + Logo */}
        <Link 
          className="navbar-brand fw-bold d-flex align-items-center" 
          to="/"
          onClick={closeNav}
        >
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
          <span className="brand-text d-none d-md-inline">
            Ngemi<span className="text-accent"></span>
          </span>
          <span className="brand-text-mobile d-md-none">
            N<span className="text-accent">K</span>
          </span>
        </Link>

        {/* Mobile Toggle - Improved */}
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={handleNavToggle}
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
        >
          <span className={`navbar-toggler-icon ${!isNavCollapsed ? 'active' : ''}`}></span>
        </button>

        {/* Nav Links - Using Bootstrap collapse properly */}
        <div className={`collapse navbar-collapse ${!isNavCollapsed ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item mx-1">
              <Link 
                className="nav-link nav-link-custom" 
                to="/"
                onClick={closeNav}
              >
                <i className="bi bi-house-door me-2"></i>
                Home
              </Link>
            </li>
            <li className="nav-item mx-1">
              <Link 
                className="nav-link nav-link-custom" 
                to="/posts"
                onClick={closeNav}
              >
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
                onClick={closeNav}
              >
                <i className="bi bi-envelope me-2"></i>
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        /* Base Styles */
        .professional-navbar {
          background: linear-gradient(135deg, #6D4C41 0%, #8D6E63 50%, #6D4C41 100%);
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

        /* Logo Styles */
        .logo-wrapper {
          position: relative;
          display: inline-block;
        }

        .logo-img {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          z-index: 2;
          border: 2px solid #FFD54F !important;
          box-shadow: 0 0 20px rgba(255, 213, 79, 0.3);
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
          box-shadow: 0 0 30px rgba(255, 213, 79, 0.6);
        }

        .logo-wrapper:hover .logo-glow {
          opacity: 1;
        }

        /* Brand Text */
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

        .brand-text-mobile {
          font-size: 1.5rem;
          background: linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 50%, #E0E0E0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 800;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }

        .text-accent {
          color: #FFD54F !important;
          -webkit-text-fill-color: #FFD54F;
          text-shadow: 0 0 20px rgba(255, 213, 79, 0.5);
        }

        /* Navigation Links */
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
          text-align: center;
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

        /* Toggle Button */
        .navbar-toggler {
          padding: 0.3rem 0.6rem;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .navbar-toggler:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.1);
        }

        .navbar-toggler:focus {
          box-shadow: 0 0 0 3px rgba(255, 213, 79, 0.5);
          outline: none;
        }

        .navbar-toggler-icon {
          width: 24px;
          height: 2px;
          background-color: #FFFFFF;
          position: relative;
          transition: all 0.3s ease;
        }

        .navbar-toggler-icon::before,
        .navbar-toggler-icon::after {
          content: '';
          position: absolute;
          width: 24px;
          height: 2px;
          background-color: #FFFFFF;
          left: 0;
          transition: all 0.3s ease;
        }

        .navbar-toggler-icon::before {
          top: -8px;
        }

        .navbar-toggler-icon::after {
          top: 8px;
        }

        .navbar-toggler-icon.active {
          background-color: transparent;
        }

        .navbar-toggler-icon.active::before {
          transform: rotate(45deg);
          top: 0;
        }

        .navbar-toggler-icon.active::after {
          transform: rotate(-45deg);
          top: 0;
        }

        /* Focus States */
        .nav-link-custom:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(255, 213, 79, 0.5);
        }

        /* Active State Animation */
        @keyframes gentlePulse {
          0% { box-shadow: 0 5px 20px rgba(255, 213, 79, 0.3); }
          50% { box-shadow: 0 5px 25px rgba(255, 213, 79, 0.5); }
          100% { box-shadow: 0 5px 20px rgba(255, 213, 79, 0.3); }
        }

        .nav-link-custom.active {
          animation: gentlePulse 2s ease-in-out infinite;
        }

        /* Mobile & Tablet Optimizations */
        
        /* Mobile (up to 576px) */
        @media (max-width: 576px) {
          .navbar {
            padding: 0.75rem 0;
          }
          
          .container {
            padding: 0 1rem;
          }
          
          .logo-img {
            width: 40px;
            height: 40px;
          }
          
          .brand-text-mobile {
            font-size: 1.3rem;
            margin-left: 0.5rem;
          }
          
          .navbar-collapse {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: rgba(109, 76, 65, 0.98);
            backdrop-filter: blur(15px);
            z-index: 1050;
            padding: 1rem;
            border-bottom: 3px solid #FFD54F;
            border-radius: 0 0 20px 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          }
          
          .navbar-nav {
            width: 100%;
            padding: 0;
          }
          
          .nav-item {
            width: 100%;
            margin: 0.25rem 0;
          }
          
          .nav-link-custom {
            padding: 0.8rem !important;
            margin: 0.25rem 0;
            border-radius: 15px;
            width: 100%;
            text-align: center;
          }
          
          .navbar-toggler {
            width: 40px;
            height: 40px;
          }
        }

        /* Tablet (577px - 991px) */
        @media (min-width: 577px) and (max-width: 991.98px) {
          .navbar-collapse {
            background: rgba(109, 76, 65, 0.95);
            border-radius: 15px;
            margin-top: 1rem;
            padding: 1rem;
            backdrop-filter: blur(15px);
            border: 1px solid rgba(255, 213, 79, 0.3);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          }
          
          .navbar-nav {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          
          .nav-item {
            width: 80%;
            margin: 0.3rem 0;
          }
          
          .nav-link-custom {
            text-align: center;
            padding: 0.75rem !important;
            border-radius: 20px;
            width: 100%;
          }
          
          .brand-text {
            font-size: 1.4rem;
          }
          
          .logo-img {
            width: 44px;
            height: 44px;
          }
        }

        /* Desktop (992px and above) */
        @media (min-width: 992px) {
          .navbar-collapse {
            display: flex !important;
          }
          
          .navbar-nav {
            flex-direction: row;
          }
          
          .nav-link-custom {
            margin: 0 0.25rem;
          }
        }

        /* Smooth transitions */
        .navbar-collapse {
          transition: all 0.3s ease-in-out;
        }

        /* Improve touch targets on mobile */
        @media (max-width: 991.98px) {
          .nav-link-custom {
            min-height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .navbar-toggler {
            min-height: 44px;
            min-width: 44px;
          }
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .professional-navbar {
            background: linear-gradient(135deg, #5A4032 0%, #7B5C52 50%, #5A4032 100%);
          }
          
          .navbar-collapse {
            background: rgba(90, 64, 50, 0.98);
          }
        }
      `}</style>

      {/* Add Comfortaa Font */}
      <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      {/* Add Bootstrap Icons */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" />
    </nav>
  );
}

export default Navbar;