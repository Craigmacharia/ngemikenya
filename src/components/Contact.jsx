import React, { useState } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;
    const mailtoLink = `mailto:cmacharia482@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="bg-light-brown min-vh-100 py-5">
      <div className="container">
        {/* Minimalist Header */}
        <motion.div 
          className="text-center mb-5"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="fw-bold display-5 text-primary mb-3">
            <i className="bi bi-envelope me-2"></i>
            Contact
          </h1>
          <p className="text-secondary">
            Get in touch for collaborations and inquiries
          </p>
        </motion.div>

        <div className="row justify-content-center">
          {/* Minimal Contact Info */}
          <motion.div 
            className="col-lg-3 col-md-4 mb-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="card border-0 rounded-3 h-100 bg-transparent">
              <div className="card-body p-0">
                <div className="contact-info">
                  <div className="contact-item d-flex align-items-center mb-4">
                    <div className="contact-icon bg-primary text-white rounded-3 p-2 me-3">
                      <i className="bi bi-envelope"></i>
                    </div>
                    <div>
                      <p className="text-primary mb-0 small fw-semibold">Email</p>
                      <p className="text-muted small mb-0">cmacharia482@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="contact-item d-flex align-items-center mb-4">
                    <div className="contact-icon bg-primary text-white rounded-3 p-2 me-3">
                      <i className="bi bi-geo-alt"></i>
                    </div>
                    <div>
                      <p className="text-primary mb-0 small fw-semibold">Location</p>
                      <p className="text-muted small mb-0">Nairobi, Kenya</p>
                    </div>
                  </div>
                  
                  <div className="contact-item d-flex align-items-center">
                    <div className="contact-icon bg-primary text-white rounded-3 p-2 me-3">
                      <i className="bi bi-clock"></i>
                    </div>
                    <div>
                      <p className="text-primary mb-0 small fw-semibold">Response</p>
                      <p className="text-muted small mb-0">Within 24h</p>
                    </div>
                  </div>
                </div>

                <hr className="my-4" />

                {/* Minimal Social Links */}
                <div>
                  <p className="text-primary small fw-semibold mb-3">Connect</p>
                  <div className="social-links d-flex gap-2">
                    <a href="https://twitter.com/ngemikenya" className="social-link" title="Twitter">
                      <i className="bi bi-twitter"></i>
                    </a>
                    <a href="https://github.com/ngemikenya" className="social-link" title="GitHub">
                      <i className="bi bi-github"></i>
                    </a>
                    <a href="https://linkedin.com/in/ngemikenya" className="social-link" title="LinkedIn">
                      <i className="bi bi-linkedin"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Minimal Contact Form */}
          <motion.div 
            className="col-lg-5 col-md-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="card border-0 rounded-3 bg-white">
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-12">
                      <label htmlFor="name" className="form-label text-primary small fw-semibold">
                        <i className="bi bi-person me-1"></i>
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-2 border-1"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="email" className="form-label text-primary small fw-semibold">
                        <i className="bi bi-envelope me-1"></i>
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control rounded-2 border-1"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="subject" className="form-label text-primary small fw-semibold">
                        <i className="bi bi-tag me-1"></i>
                        Subject
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-2 border-1"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="What's this about?"
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="message" className="form-label text-primary small fw-semibold">
                        <i className="bi bi-chat-text me-1"></i>
                        Message
                      </label>
                      <textarea
                        className="form-control rounded-2 border-1"
                        id="message"
                        name="message"
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Your message..."
                        style={{ resize: 'none' }}
                      ></textarea>
                    </div>
                    <div className="col-12">
                      <motion.button
                        type="submit"
                        className="btn btn-primary rounded-2 w-100 py-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <i className="bi bi-send me-2"></i>
                        Send Message
                      </motion.button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Minimal FAQ Section */}
        <motion.div 
          className="row justify-content-center mt-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="col-lg-8">
            <div className="text-center">
              <h5 className="text-primary mb-4 fw-semibold">
                <i className="bi bi-question-circle me-2"></i>
                Common Questions
              </h5>
              <div className="row g-3 justify-content-center">
                {[
                  {
                    question: "Guest posts?",
                    answer: "Open to collaborations"
                  },
                  {
                    question: "Topic suggestions?",
                    answer: "Always welcome"
                  },
                  {
                    question: "Consulting?",
                    answer: "Available for projects"
                  }
                ].map((faq, index) => (
                  <div className="col-md-4 col-sm-6" key={index}>
                    <div className="p-3 rounded-2 bg-white border-0">
                      <h6 className="text-primary small fw-semibold mb-2">
                        <i className="bi bi-patch-question me-1"></i>
                        {faq.question}
                      </h6>
                      <p className="text-muted small mb-0">{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        .bg-light-brown {
          background-color: #f8f5f0;
        }
        .text-primary {
          color: #6D4C41 !important;
        }
        .btn-primary {
          background-color: #6D4C41;
          border-color: #6D4C41;
          color: white;
        }
        .btn-primary:hover {
          background-color: #5D4037;
          border-color: #5D4037;
          color: white;
        }
        
        /* Contact Icons */
        .contact-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        
        .social-link {
          width: 36px;
          height: 36px;
          background: rgba(109, 76, 65, 0.1);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6D4C41;
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }
        
        .social-link:hover {
          background: #6D4C41;
          color: white;
          text-decoration: none;
        }
        
        /* Form Styling */
        .form-control {
          border: 1px solid #e0d6c9;
          background: #f8f5f0;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }
        
        .form-control:focus {
          border-color: #6D4C41;
          background: white;
          box-shadow: 0 0 0 0.1rem rgba(109, 76, 65, 0.1);
        }
        
        /* Minimal Card Styling */
        .card {
          box-shadow: 0 2px 8px rgba(109, 76, 65, 0.08);
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .display-5 {
            font-size: 1.8rem;
          }
        }
      `}</style>

      {/* Add Comfortaa Font */}
      <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    </div>
  );
};

export default Contact;