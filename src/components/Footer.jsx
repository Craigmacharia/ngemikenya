import React from "react";

function Footer() {
  return (
    <footer className="bg-dark text-light text-center py-4 mt-5">
      <div className="container">
        <p className="mb-1">
          © {new Date().getFullYear()} <strong>NgemiKenya</strong> — All rights reserved.
        </p>
        <p className="small text-muted">
          Designed with ❤️ by the NgemiKenya Team
        </p>
      </div>
    </footer>
  );
}

export default Footer;
