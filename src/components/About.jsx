import React from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

const About = () => {
  // GSAP animations on component mount
  React.useEffect(() => {
    gsap.fromTo(".about-header",
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
    gsap.fromTo(".about-hero",
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1, delay: 0.3, ease: "back.out(1.7)" }
    );
    gsap.fromTo(".stats-section",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: "power3.out" }
    );
    gsap.fromTo(".journey-section",
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8, delay: 0.7, ease: "power3.out" }
    );
    gsap.fromTo(".values-section",
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.8, delay: 0.9, ease: "power3.out" }
    );
    // Animate stats counting
    gsap.utils.toArray(".stat-number").forEach((stat) => {
      gsap.fromTo(stat,
        { textContent: 0 },
        {
          textContent: stat.getAttribute('data-target'),
          duration: 2,
          delay: 1,
          ease: "power2.out",
          snap: { textContent: 1 },
          stagger: 0.2
        }
      );
    });
    // Hover animations
    gsap.utils.toArray(".value-card, .stat-item").forEach(element => {
      element.addEventListener("mouseenter", () => {
        gsap.to(element, {
          y: -8,
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
          className="text-center mb-5 about-header"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="fw-bold display-4 text-primary mb-4">
            <i className="bi bi-person-badge me-3"></i>
            About NgemiBlog
          </h1>
          <p className="lead text-secondary header-subtitle">
            Capturing Nairobi's urban pulse with authentic Gen Z stories.
          </p>
          <div className="header-ornament">
            <div className="ornament-line"></div>
            <i className="bi bi-star-fill text-accent mx-3"></i>
            <div className="ornament-line"></div>
          </div>
        </motion.div>
        {/* Hero Section */}
        <motion.div
          className="row justify-content-center mb-5 about-hero"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="col-lg-10">
            <div className="card border-0 shadow-xl rounded-4 bg-white overflow-hidden">
              <div className="row g-0">
                <div className="col-md-8">
                  <div className="card-body p-4 p-lg-5">
                    <h2 className="fw-bold text-primary mb-4">
                      <i className="bi bi-cup-hot-fill me-3"></i>
                      The Story Behind the Vibe
                    </h2>
                    <p className="text-secondary lead mb-4">
                      Welcome to my urban vibe hub, where Nairobi's electric streets pulse with raw, authentic Kenyan tales. I'm all about capturing the city's rhythm—mixing vibrant cultures, street-smart hustle, and everyday adventures that echo the lively spirit of Kenya's buzzing metropolises, bringing them to life on a global stage.
                    </p>
                    <p className="text-secondary mb-4">
                      Where the city's chaotic energy fuels unfiltered stories of hustle, memes, and squad goals. I'm diving into the vibes of street fashion slays, matatu madness, and late-night shawarma runs, channeling that fresh Kenyan youth wave that's all about owning the moment and turning everyday flexes into global inspo.
                    </p>
                    <div className="d-flex flex-wrap gap-2 mb-4">
                      <span className="badge bg-primary text-white rounded-pill px-3 py-2">
                        <i className="bi bi-music-note me-1"></i>Street Vibes
                      </span>
                      <span className="badge bg-primary-light text-white rounded-pill px-3 py-2">
                        <i className="bi bi-heart me-1"></i>Youth Culture
                      </span>
                      <span className="badge bg-gold text-dark rounded-pill px-3 py-2">
                        <i className="bi bi-pencil me-1"></i>Urban Storytelling
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 d-flex align-items-center justify-content-center p-4">
                  <div className="about-avatar position-relative">
                    <div className="avatar-placeholder rounded-4 bg-primary-light p-5">
                      <i className="bi bi-cup-hot display-1 text-primary"></i>
                    </div>
                    <div className="avatar-glow"></div>
                    <div className="floating-elements">
                      <div className="floating-element element-1"></div>
                      <div className="floating-element element-2"></div>
                      <div className="floating-element element-3"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        {/* Stats Section */}
        <motion.div
          className="row justify-content-center mb-5 stats-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="col-lg-10">
            <div className="card border-0 shadow-lg rounded-4 bg-white">
              <div className="card-body p-4 p-lg-5">
                <h3 className="text-center fw-bold text-primary mb-5">
                  <i className="bi bi-graph-up-arrow me-2"></i>
                  Impact in Numbers
                </h3>
                <div className="row text-center">
                  {[
                    { icon: 'bi-journal-richtext', number: '85', suffix: '+', label: 'Stories Shared', target: 85 },
                    { icon: 'bi-eye', number: '50', suffix: 'K+', label: 'Total Views', target: 50 },
                    { icon: 'bi-people', number: '10', suffix: 'K+', label: 'Squad Members', target: 10 },
                    { icon: 'bi-star', number: '4.9', suffix: '', label: 'Average Rating', target: 4.9 }
                  ].map((stat, index) => (
                    <div className="col-6 col-md-3 mb-4" key={index}>
                      <div className="stat-item p-3 rounded-3 bg-light-brown">
                        <i className={`bi ${stat.icon} display-6 text-primary mb-3`}></i>
                        <h3 className="fw-bold text-primary mb-1">
                          <span className="stat-number" data-target={stat.target}>
                            0
                          </span>
                          {stat.suffix}
                        </h3>
                        <p className="text-muted small mb-0">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        {/* Journey & Values */}
        <div className="row justify-content-center g-5">
          {/* Journey Timeline */}
          <motion.div
            className="col-lg-6 journey-section"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="card border-0 shadow-lg rounded-4 bg-white h-100">
              <div className="card-body p-4 p-lg-5">
                <h3 className="fw-bold text-primary mb-4">
                  <i className="bi bi-map me-2"></i>
                  My Journey
                </h3>
                <div className="timeline">
                  {[
                    { year: '2018', title: 'First Street Adventures', description: 'Started exploring Nairobi\'s hidden spots and never looked back' },
                    { year: '2020', title: 'Urban Culture Dive', description: 'Immersed in the city\'s vibrant youth scene and local trends' },
                    { year: '2022', title: 'Vibe Curation', description: 'Mastered capturing authentic Nairobi moments and stories' },
                    { year: '2023', title: 'NgemiBlog Launch', description: 'Started sharing unfiltered urban tales through blogging' },
                    { year: '2024', title: 'Community Growth', description: 'Building the next wave of Nairobi Gen Z creators' }
                  ].map((milestone, index) => (
                    <div key={index} className="timeline-item position-relative ps-4 pb-4">
                      <div className="timeline-marker position-absolute start-0 top-0 bg-primary rounded-circle"></div>
                      <div className="timeline-content">
                        <span className="badge bg-primary text-white rounded-pill px-3 py-1 mb-2">
                          {milestone.year}
                        </span>
                        <h6 className="fw-semibold text-primary mb-2">{milestone.title}</h6>
                        <p className="text-muted small mb-0">{milestone.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          {/* Core Values */}
          <motion.div
            className="col-lg-6 values-section"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
          >
            <div className="card border-0 shadow-lg rounded-4 bg-white h-100">
              <div className="card-body p-4 p-lg-5">
                <h3 className="fw-bold text-primary mb-4">
                  <i className="bi bi-heart me-2"></i>
                  Core Values
                </h3>
                <div className="row g-4">
                  {[
                    {
                      icon: 'bi-lightbulb',
                      title: 'Creativity',
                      description: 'Pushing boundaries with fresh urban perspectives and bold storytelling',
                      color: 'bg-primary'
                    },
                    {
                      icon: 'bi-shield-check',
                      title: 'Authenticity',
                      description: 'Crafting real, unfiltered content that resonates with city life',
                      color: 'bg-primary-light'
                    },
                    {
                      icon: 'bi-people',
                      title: 'Community',
                      description: 'Empowering others through shared experiences and collective vibes',
                      color: 'bg-primary'
                    },
                    {
                      icon: 'bi-globe',
                      title: 'Impact',
                      description: 'Highlighting stories that celebrate Nairobi\'s dynamic spirit',
                      color: 'bg-primary-light'
                    }
                  ].map((value, index) => (
                    <div className="col-12" key={index}>
                      <div className="value-card p-4 rounded-3 bg-light-brown h-100">
                        <div className="d-flex align-items-start">
                          <div className={`value-icon rounded-3 p-3 me-3 ${value.color} text-white`}>
                            <i className={`bi ${value.icon}`}></i>
                          </div>
                          <div>
                            <h6 className="fw-semibold text-primary mb-2">{value.title}</h6>
                            <p className="text-muted small mb-0">{value.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        {/* Call to Action */}
        <motion.div
          className="row justify-content-center mt-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <div className="col-lg-8">
            <div className="card border-0 bg-primary text-white rounded-4 shadow-xl">
              <div className="card-body p-5 text-center">
                <i className="bi bi-rocket-takeoff display-1 mb-3"></i>
                <h3 className="fw-bold mb-3">Let's Vibe Together</h3>
                <p className="lead mb-4 opacity-90">
                  Ready to share urban stories or dive into Nairobi's Gen Z scene?
                </p>
                <div className="d-flex flex-wrap justify-content-center gap-3">
                  <a href="/contact" className="btn btn-light text-primary rounded-pill px-4 py-2 fw-semibold">
                    <i className="bi bi-envelope me-2"></i>
                    Get In Touch
                  </a>
                  <a href="/posts" className="btn btn-outline-light rounded-pill px-4 py-2 fw-semibold">
                    <i className="bi bi-journal-text me-2"></i>
                    Read My Stories
                  </a>
                </div>
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
        .bg-primary-light {
          background: linear-gradient(135deg, #8D6E63 0%, #A1887F 100%) !important;
        }
        .bg-gold {
          background: linear-gradient(135deg, #FFD54F 0%, #FFE082 100%) !important;
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
        .btn-primary:hover {
          background: linear-gradient(135deg, #5D4037 0%, #7B5B53 100%);
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 15px 40px rgba(109, 76, 65, 0.4);
        }
        .btn-light {
          background: white;
          border: none;
          color: #6D4C41;
          transition: all 0.3s ease;
        }
        .btn-light:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 255, 255, 0.3);
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
        /* About Avatar */
        .about-avatar {
          position: relative;
        }
        .avatar-placeholder {
          background: linear-gradient(135deg, #f8f5f0 0%, #e0d6c9 100%);
          position: relative;
          overflow: hidden;
          border: 3px solid rgba(109, 76, 65, 0.1);
        }
        .avatar-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120px;
          height: 120px;
          background: radial-gradient(circle, rgba(255, 213, 79, 0.3) 0%, transparent 70%);
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .about-avatar:hover .avatar-glow {
          opacity: 1;
        }
        .floating-elements {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
        .floating-element {
          position: absolute;
          background: rgba(255, 213, 79, 0.3);
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
        }
        .element-1 {
          width: 20px;
          height: 20px;
          top: 20%;
          left: 20%;
          animation-delay: 0s;
        }
        .element-2 {
          width: 15px;
          height: 15px;
          top: 60%;
          left: 70%;
          animation-delay: 2s;
        }
        .element-3 {
          width: 25px;
          height: 25px;
          top: 80%;
          left: 30%;
          animation-delay: 4s;
        }
        /* Stats Section */
        .stat-item {
          transition: all 0.4s ease;
          border: 1px solid transparent;
        }
        .stat-item:hover {
          border-color: rgba(109, 76, 65, 0.2);
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        }
        /* Timeline */
        .timeline {
          position: relative;
        }
        .timeline::before {
          content: '';
          position: absolute;
          left: 7px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, #6D4C41, #8D6E63, #A1887F);
        }
        .timeline-marker {
          width: 14px;
          height: 14px;
          border: 3px solid white;
          box-shadow: 0 0 0 2px #6D4C41;
          z-index: 2;
        }
        .timeline-item:last-child {
          padding-bottom: 0 !important;
        }
        /* Value Cards */
        .value-card {
          transition: all 0.4s ease;
          border: 1px solid transparent;
          cursor: pointer;
        }
        .value-card:hover {
          border-color: rgba(109, 76, 65, 0.2);
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        .value-icon {
          transition: all 0.3s ease;
          flex-shrink: 0;
        }
        .value-card:hover .value-icon {
          transform: scale(1.1) rotate(5deg);
        }
        /* Premium Animations */
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
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
         
          .stat-item {
            margin-bottom: 1rem;
          }
         
          .timeline::before {
            left: 15px;
          }
         
          .timeline-marker {
            left: 8px !important;
          }
        }
        @media (max-width: 576px) {
          .container {
            padding: 0 1rem;
          }
         
          .card-body {
            padding: 1.5rem !important;
          }
         
          .about-avatar {
            margin-top: 2rem;
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

export default About;