import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/watu.png"; // 🔹 Add your logo image here (place it in src/assets/logo.png)

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3">
      <div className="container">
        {/* Brand + Logo */}
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
          <img
            src={logo}
            alt="NgemiKenya Logo"
            width="40"
            height="40"
            className="me-2 rounded-circle border border-warning"
          />
          Ngemi<span className="text-warning">Kenya</span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
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
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/posts">
                Posts
              </Link>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="https://www.ngemikenya.com/contact"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="/admin"
                target="_blank"
                rel="noopener noreferrer"
              >
                Admin
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
