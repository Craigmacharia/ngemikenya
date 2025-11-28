import React, { useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // GSAP submission animation
    gsap.to(".submit-btn", {
      scale: 0.95,
      duration: 0.2,
      ease: "power2.inOut"
    });

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const { name, email, subject, message } = formData;
    const mailtoLink = `mailto:cmacharia482@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`)}`;
    window.location.href = mailtoLink;
    
    setIsSubmitting(false);
    gsap.to(".submit-btn", {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  // GSAP animations on component mount
  React.useEffect(() => {
    gsap.fromTo(".contact-header", 
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(".contact-info-card", 
      { opacity: 0, x: -50, scale: 0.9 },
      { opacity: 1, x: 0, scale: 1, duration: 0.8, delay: 0.3, ease: "back.out(1.7)" }
    );

    gsap.fromTo(".contact-form-card", 
      { opacity: 0, x: 50, scale: 0.9 },
      { opacity: 1, x: 0, scale: 1, duration: 0.8, delay: 0.5, ease: "back.out(1.7)" }
    );

    gsap.fromTo(".faq-section", 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.7, ease: "power3.out" }
    );

    // Hover animations for interactive elements
    gsap.utils.toArray(".contact-item, .social-link, .faq-item").forEach(element => {
      element.addEventListener("mouseenter", () => {
        gsap.to(element, {
          y: -5,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      element.addEventListener("mouseleave", () => {
        gsap.to(element, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });
  }, []);

  return (
    <div className="bg-light-brown min-vh-100 py-5">
      <div className="container">
        {/* Premium Header Section */}
        <motion.div 
          className="text-center mb-5 contact-header"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="fw-bold display-4 text-primary mb-4">
            <i className="bi bi-envelope-paper me-3"></i>
            Let's Connect
          </h1>
          <p className="lead text-secondary header-subtitle">
            Ready to collaborate? Share your ideas and let's create something extraordinary together.
          </p>
          <div className="header-ornament">
            <div className="ornament-line"></div>
            <i className="bi bi-star-fill text-accent mx-3"></i>
            <div className="ornament-line"></div>
          </div>
        </motion.div>

        <div className="row justify-content-center">
          {/* Premium Contact Info */}
          <motion.div 
            className="col-lg-4 col-md-5 mb-5"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="card border-0 shadow-xl rounded-4 h-100 bg-white contact-info-card">
              <div className="card-body p-4 p-lg-5">
                <h4 className="fw-bold text-primary mb-4">
                  <i className="bi bi-info-circle me-2"></i>
                  Get In Touch
                </h4>
                
                <div className="contact-info">
                  <div className="contact-item d-flex align-items-center mb-4 p-3 rounded-3 bg-light-brown">
                    <div className="contact-icon-wrapper me-3">
                      <div className="contact-icon bg-primary text-white rounded-3 p-3">
                        <i className="bi bi-envelope"></i>
                      </div>
                      <div className="icon-glow"></div>
                    </div>
                    <div>
                      <p className="text-primary mb-1 fw-semibold">Email</p>
                      <p className="text-muted mb-0 small">cmacharia482@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="contact-item d-flex align-items-center mb-4 p-3 rounded-3 bg-light-brown">
                    <div className="contact-icon-wrapper me-3">
                      <div className="contact-icon bg-primary text-white rounded-3 p-3">
                        <i className="bi bi-geo-alt"></i>
                      </div>
                      <div className="icon-glow"></div>
                    </div>
                    <div>
                      <p className="text-primary mb-1 fw-semibold">Location</p>
                      <p className="text-muted mb-0 small">Nairobi, Kenya</p>
                    </div>
                  </div>
                  
                  <div className="contact-item d-flex align-items-center p-3 rounded-3 bg-light-brown">
                    <div className="contact-icon-wrapper me-3">
                      <div className="contact-icon bg-primary text-white rounded-3 p-3">
                        <i className="bi bi-clock"></i>
                      </div>
                      <div className="icon-glow"></div>
                    </div>
                    <div>
                      <p className="text-primary mb-1 fw-semibold">Response Time</p>
                      <p className="text-muted mb-0 small">Within 24 hours</p>
                    </div>
                  </div>
                </div>

                <hr className="my-4" />

                {/* Premium Social Links */}
                <div>
                  <h6 className="text-primary fw-semibold mb-3">
                    <i className="bi bi-share me-2"></i>
                    Connect With Me
                  </h6>
                  <div className="social-links d-flex gap-3">
                    {[
                      { icon: "bi-twitter", href: "https://twitter.com/ngemikenya", label: "Twitter" },
                      { icon: "bi-github", href: "https://github.com/ngemikenya", label: "GitHub" },
                      { icon: "bi-linkedin", href: "https://linkedin.com/in/ngemikenya", label: "LinkedIn" },
                      { icon: "bi-instagram", href: "https://instagram.com/ngemikenya", label: "Instagram" }
                    ].map((social, index) => (
                      <a 
                        key={index}
                        href={social.href} 
                        className="social-link position-relative"
                        title={social.label}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className={`bi ${social.icon}`}></i>
                        <span className="social-tooltip">{social.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Premium Contact Form */}
          <motion.div 
            className="col-lg-6 col-md-7"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="card border-0 shadow-xl rounded-4 bg-white contact-form-card">
              <div className="card-body p-4 p-lg-5">
                <h4 className="fw-bold text-primary mb-4">
                  <i className="bi bi-pencil-square me-2"></i>
                  Send a Message
                </h4>
                
                <form onSubmit={handleSubmit}>
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="name" className="form-label text-primary fw-semibold mb-2">
                          <i className="bi bi-person me-2"></i>
                          Your Name
                        </label>
                        <input
                          type="text"
                          className="form-control rounded-3 border-0 py-3 px-3 form-input"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Enter your full name"
                          style={{ background: '#f8f5f0' }}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="email" className="form-label text-primary fw-semibold mb-2">
                          <i className="bi bi-envelope me-2"></i>
                          Email Address
                        </label>
                        <input
                          type="email"
                          className="form-control rounded-3 border-0 py-3 px-3 form-input"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="your.email@example.com"
                          style={{ background: '#f8f5f0' }}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label htmlFor="subject" className="form-label text-primary fw-semibold mb-2">
                          <i className="bi bi-tag me-2"></i>
                          Subject
                        </label>
                        <input
                          type="text"
                          className="form-control rounded-3 border-0 py-3 px-3 form-input"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          placeholder="What would you like to discuss?"
                          style={{ background: '#f8f5f0' }}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label htmlFor="message" className="form-label text-primary fw-semibold mb-2">
                          <i className="bi bi-chat-text me-2"></i>
                          Your Message
                        </label>
                        <textarea
                          className="form-control rounded-3 border-0 py-3 px-3 form-input"
                          id="message"
                          name="message"
                          rows="5"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          placeholder="Share your thoughts, ideas, or project details..."
                          style={{ resize: 'none', background: '#f8f5f0' }}
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-12">
                      <motion.button
                        type="submit"
                        className="btn btn-primary rounded-3 w-100 py-3 fw-semibold submit-btn position-relative"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="spinner-border spinner-border-sm me-2" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                            Sending Message...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-send me-2"></i>
                            Send Premium Message
                          </>
                        )}
                        <div className="btn-glow"></div>
                      </motion.button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Premium FAQ Section */}
        <motion.div 
          className="row justify-content-center mt-5 faq-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="col-lg-10">
            <div className="text-center">
              <h3 className="text-primary mb-4 fw-bold">
                <i className="bi bi-patch-question me-2"></i>
                Frequently Asked Questions
              </h3>
              <div className="row g-4 justify-content-center">
                {[
                  {
                    question: "Are you open to guest posts?",
                    answer: "Absolutely! I welcome collaborations and guest contributions.",
                    icon: "bi-pencil"
                  },
                  {
                    question: "Do you accept topic suggestions?",
                    answer: "Yes, I'm always looking for fresh perspectives and ideas.",
                    icon: "bi-lightbulb"
                  },
                  {
                    question: "Are you available for consulting?",
                    answer: "I'm available for select projects and consulting opportunities.",
                    icon: "bi-briefcase"
                  },
                  {
                    question: "What's your response time?",
                    answer: "I typically respond to all inquiries within 24 hours.",
                    icon: "bi-clock"
                  }
                ].map((faq, index) => (
                  <div className="col-lg-5 col-md-6" key={index}>
                    <div className="faq-item p-4 rounded-4 bg-white shadow-sm h-100">
                      <div className="faq-icon mb-3">
                        <i className={`bi ${faq.icon} text-primary display-6`}></i>
                      </div>
                      <h6 className="text-primary fw-semibold mb-3">{faq.question}</h6>
                      <p className="text-muted mb-0 small">{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Premium CSS Styles */}
      <style jsx>{`
        .bg-light-brown {
          background: linear-gradient(135deg, #f8f5f0 0%, #f0ebe4 50%, #f8f5f0 100%);
        }

        .text-primary {
          color: #6D4C41 !important;
        }

        .text-secondary {
          color: #666666 !important;
        }

        .text-accent {
          color: #FFD54F !important;
        }

        .bg-primary {
          background: linear-gradient(135deg, #6D4C41 0%, #8D6E63 100%) !important;
        }

        .btn-primary {
          background: linear-gradient(135deg, #6D4C41 0%, #8D6E63 100%);
          border: none;
          color: white;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          box-shadow: 0 8px 25px rgba(109, 76, 65, 0.3);
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.6s ease;
        }

        .btn-primary:hover::before {
          left: 100%;
        }

        .btn-primary:hover:not(:disabled) {
          background: linear-gradient(135deg, #5D4037 0%, #7B5B53 100%);
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(109, 76, 65, 0.4);
        }

        .btn-primary:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* Header Styling */
        .header-subtitle {
          font-size: 1.3rem;
          font-weight: 300;
          max-width: 600px;
          margin: 0 auto;
        }

        .header-ornament {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 2rem;
        }

        .ornament-line {
          width: 80px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #6D4C41, transparent);
        }

        /* Premium Contact Items */
        .contact-item {
          transition: all 0.4s ease;
          cursor: pointer;
          border: 1px solid transparent;
        }

        .contact-item:hover {
          border-color: rgba(109, 76, 65, 0.2);
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .contact-icon-wrapper {
          position: relative;
        }

        .contact-icon {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .icon-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60px;
          height: 60px;
          background: radial-gradient(circle, rgba(255, 213, 79, 0.3) 0%, transparent 70%);
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .contact-item:hover .icon-glow {
          opacity: 1;
        }

        .contact-item:hover .contact-icon {
          transform: scale(1.1);
        }

        /* Premium Social Links */
        .social-link {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #f8f5f0 0%, #e8dfd5 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6D4C41;
          text-decoration: none;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          overflow: hidden;
          font-size: 1.1rem;
        }

        .social-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transition: left 0.6s ease;
        }

        .social-link:hover::before {
          left: 100%;
        }

        .social-link:hover {
          background: linear-gradient(135deg, #6D4C41 0%, #8D6E63 100%);
          color: white;
          transform: translateY(-5px) scale(1.1);
          box-shadow: 0 10px 25px rgba(109, 76, 65, 0.3);
          text-decoration: none;
        }

        .social-tooltip {
          position: absolute;
          bottom: -40px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 5px 10px;
          border-radius: 6px;
          font-size: 0.75rem;
          white-space: nowrap;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .social-link:hover .social-tooltip {
          opacity: 1;
        }

        /* Premium Form Styling */
        .form-input {
          border: 2px solid transparent;
          background: #f8f5f0 !important;
          transition: all 0.4s ease;
          font-size: 1rem;
          font-weight: 400;
        }

        .form-input:focus {
          border-color: #6D4C41;
          background: white !important;
          box-shadow: 0 0 0 0.2rem rgba(109, 76, 65, 0.1);
          transform: translateY(-2px);
        }

        .form-input::placeholder {
          color: #9E9E9E;
          font-weight: 300;
        }

        .btn-glow {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 213, 79, 0.4), transparent);
          transition: left 0.6s ease;
        }

        .submit-btn:hover .btn-glow {
          left: 100%;
        }

        /* FAQ Section */
        .faq-item {
          transition: all 0.4s ease;
          cursor: pointer;
          border: 1px solid transparent;
        }

        .faq-item:hover {
          border-color: rgba(109, 76, 65, 0.2);
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1) !important;
        }

        .faq-icon {
          transition: transform 0.3s ease;
        }

        .faq-item:hover .faq-icon {
          transform: scale(1.1);
        }

        /* Premium Card Styling */
        .card {
          transition: all 0.4s ease;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15) !important;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .display-4 {
            font-size: 2.5rem;
          }
          
          .header-subtitle {
            font-size: 1.1rem;
          }
          
          .header-ornament {
            margin-top: 1.5rem;
          }
          
          .ornament-line {
            width: 40px;
          }
          
          .contact-icon {
            width: 45px;
            height: 45px;
          }
          
          .social-link {
            width: 45px;
            height: 45px;
          }
        }

        @media (max-width: 576px) {
          .container {
            padding: 0 1rem;
          }
          
          .card-body {
            padding: 1.5rem !important;
          }
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Selection color */
        ::selection {
          background: rgba(255, 213, 79, 0.3);
          color: #6D4C41;
        }
      `}</style>

      {/* Add Comfortaa Font */}
      <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    </div>
  );
};

export default Contact;