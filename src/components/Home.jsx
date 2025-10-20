import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import matter from "gray-matter";
import { motion } from "framer-motion";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Professional slideshow images with Kenyan tech theme
  const slideshowImages = [
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80"
  ];

  const slideshowTitles = [
    "Tech Innovation in East Africa",
    "Digital Transformation Journey",
    "Startup Ecosystem Growth",
    "Future of African Technology"
  ];

  useEffect(() => {
    const importPosts = import.meta.glob("../../posts/*.md", { as: "raw" });
    const postList = [];

    const loadPosts = async () => {
      try {
        for (const path in importPosts) {
          const file = await importPosts[path]();
          const { data } = matter(file);

          postList.push({
            ...data,
            slug: path.split("/").pop().replace(".md", ""),
          });
        }

        // Sort newest first
        const sorted = postList.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setPosts(sorted);
      } catch (err) {
        console.error("Error loading posts:", err);
        setError("Failed to load posts.");
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  // Auto-advance slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideshowImages.length) % slideshowImages.length);
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light-brown">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-primary">Brewing fresh content...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light-brown">
        <div className="text-center text-primary">
          <i className="bi bi-exclamation-triangle-fill display-4 mb-3"></i>
          <h4>{error}</h4>
          <button 
            className="btn btn-primary mt-3"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className="bg-light-brown min-vh-100" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
      {/* Header Section */}
      <div className="professional-header-bg py-5">
        <div className="container">
          <motion.div
            className="text-center text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="fw-bold mb-3 display-4">
              <i className="bi bi-cup-hot-fill me-3"></i>
              NgemiKenya
            </h1>
            <p className="lead opacity-90 mb-4">
              Honest perspectives, tech talk & real-world reflections
            </p>
            <div className="mt-4">
              <span className="badge bg-primary-light rounded-pill px-3 py-2 me-2 mb-2">
                <i className="bi bi-code-slash me-1"></i>Tech
              </span>
              <span className="badge bg-primary-light rounded-pill px-3 py-2 me-2 mb-2">
                <i className="bi bi-pencil me-1"></i>Thoughts
              </span>
              <span className="badge bg-primary-light rounded-pill px-3 py-2 mb-2">
                <i className="bi bi-globe me-1"></i>Kenya
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Slideshow Section */}
      <div className="container-fluid px-0 mb-5">
        <div className="row g-0">
          <div className="col-12">
            <div className="slideshow-container position-relative">
              <motion.div 
                className="slideshow-track"
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
              >
                <img 
                  src={slideshowImages[currentSlide]} 
                  alt={`Slide ${currentSlide + 1}`}
                  className="w-100 slideshow-image"
                />
                <div className="slideshow-overlay">
                  <div className="container">
                    <div className="row justify-content-center text-center">
                      <div className="col-lg-8">
                        <motion.h2 
                          className="text-white fw-bold mb-3 display-5"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          {slideshowTitles[currentSlide]}
                        </motion.h2>
                        <motion.p 
                          className="text-white lead mb-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 }}
                        >
                          Dive into insights, experiences, and perspectives from the heart of Kenya's tech scene
                        </motion.p>
                        <motion.div
                          className="mt-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.9 }}
                        >
                          <Link to="/posts" className="btn btn-primary btn-lg rounded-pill me-3 px-4">
                            <i className="bi bi-journal-text me-2"></i>
                            Explore Posts
                          </Link>
                          <Link to="/about" className="btn btn-outline-light btn-lg rounded-pill px-4">
                            <i className="bi bi-person me-2"></i>
                            About
                          </Link>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Slideshow Navigation Buttons */}
              <button className="slideshow-btn slideshow-btn-prev" onClick={prevSlide}>
                <i className="bi bi-chevron-left"></i>
              </button>
              <button className="slideshow-btn slideshow-btn-next" onClick={nextSlide}>
                <i className="bi bi-chevron-right"></i>
              </button>
              
              {/* Enhanced Slideshow Indicators */}
              <div className="slideshow-indicators">
                {slideshowImages.map((_, index) => (
                  <button
                    key={index}
                    className={`indicator ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(index)}
                  >
                    <span className="indicator-progress"></span>
                  </button>
                ))}
              </div>

              
            </div>
          </div>
        </div>
      </div>

      <div className="container pb-5">
        {/* About Section */}
        <motion.div 
          className="row justify-content-center mb-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="col-lg-10">
            <div className="card border-0 shadow-sm rounded-4 bg-white">
              <div className="card-body p-5">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <h2 className="fw-bold text-primary mb-4">
                      <i className="bi bi-person-circle me-3"></i>
                      About NgemiKenya
                    </h2>
                    <p className="lead text-secondary mb-4">
                      Welcome to my digital corner where technology meets authentic Kenyan perspectives. 
                      I'm passionate about sharing insights from my journey through the tech landscape, 
                      mixed with personal reflections and honest commentary.
                    </p>
                    <div className="row text-center">
                      <div className="col-4">
                        <div className="text-primary">
                          <i className="bi bi-journal-richtext display-6"></i>
                          <h5 className="mt-2 fw-bold">100+ Articles</h5>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="text-primary">
                          <i className="bi bi-eye display-6"></i>
                          <h5 className="mt-2 fw-bold">50K+ Reads</h5>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="text-primary">
                          <i className="bi bi-people display-6"></i>
                          <h5 className="mt-2 fw-bold">10K+ Community</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 text-center">
                    <div className="about-image-placeholder rounded-4 bg-primary-light p-5">
                      <i className="bi bi-cup-hot display-1 text-primary"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Featured Categories */}
        <motion.div 
          className="row mb-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="col-12">
            <h3 className="fw-bold text-primary mb-4 text-center">
              <i className="bi bi-grid-3x3-gap me-3"></i>
              Explore Categories
            </h3>
            <div className="row g-4">
              {[
                { icon: 'bi-code-slash', title: 'Web Development', count: '24 Posts', color: 'bg-primary' },
                { icon: 'bi-phone', title: 'Mobile Tech', count: '18 Posts', color: 'bg-primary-light' },
                { icon: 'bi-lightbulb', title: 'Innovation', count: '15 Posts', color: 'bg-primary' },
                { icon: 'bi-graph-up', title: 'Tech Trends', count: '22 Posts', color: 'bg-primary-light' }
              ].map((category, index) => (
                <div className="col-md-3 col-6" key={index}>
                  <div className={`card border-0 text-white rounded-4 h-100 ${category.color} category-card`}>
                    <div className="card-body text-center p-4">
                      <i className={`bi ${category.icon} display-4 mb-3`}></i>
                      <h5 className="fw-bold">{category.title}</h5>
                      <p className="mb-0 opacity-90">{category.count}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Featured Latest Post */}
        {posts.length > 0 && (
          <motion.div
            className="row mb-5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            id="featured"
          >
            <div className="col-12">
              <div className="card border-0 shadow-lg rounded-4 overflow-hidden bg-white">
                <div className="row g-0">
                  <div className="col-md-6">
                    <img
                      src={posts[0].image || "/api/placeholder/600/400"}
                      alt={posts[0].title}
                      className="h-100 w-100"
                      style={{ objectFit: "cover", minHeight: "350px" }}
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="card-body h-100 d-flex flex-column p-4 p-lg-5">
                      <div className="mb-3">
                        <span className="badge bg-primary text-white rounded-pill px-3 py-2">
                          <i className="bi bi-star-fill me-1"></i>
                          Featured Post
                        </span>
                      </div>
                      <h2 className="card-title fw-bold mb-3 text-primary">
                        {posts[0].title}
                      </h2>
                      <p className="text-muted mb-3">
                        <i className="bi bi-calendar3 me-2"></i>
                        {new Date(posts[0].date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                      {posts[0].excerpt && (
                        <p className="card-text text-secondary mb-4 flex-grow-1 lead">
                          {posts[0].excerpt.slice(0, 200)}...
                        </p>
                      )}
                      <div className="mt-auto">
                        <Link
                          to={`/post/${posts[0].slug}`}
                          className="btn btn-primary btn-lg rounded-pill px-4"
                        >
                          Read Full Story 
                          <i className="bi bi-arrow-right ms-2"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        

        {/* Posts Grid */}
        <div className="row">
          {posts.slice(1, 10).map((post, index) => (
            <motion.div
              className="col-xl-4 col-lg-6 mb-4"
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="card border-0 shadow-sm h-100 rounded-4 overflow-hidden post-card-hover bg-white">
                {post.image && (
                  <div className="position-relative overflow-hidden">
                    <img
                      src={post.image}
                      className="card-img-top"
                      alt={post.title}
                      style={{ height: "220px", objectFit: "cover" }}
                    />
                    <div className="position-absolute top-0 end-0 m-3">
                      <span className="badge bg-white text-primary rounded-pill px-3 py-2 small">
                        <i className="bi bi-clock me-1"></i>
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                )}
                <div className="card-body d-flex flex-column p-4">
                  <h5 className="fw-semibold mb-3 text-primary line-clamp-2">
                    {post.title}
                  </h5>
                  {post.excerpt && (
                    <p className="text-secondary flex-grow-1 mb-3 line-clamp-3">
                      {post.excerpt.slice(0, 120)}...
                    </p>
                  )}
                  <div className="mt-auto">
                    <Link
                      to={`/post/${post.slug}`}
                      className="btn btn-outline-primary btn-sm rounded-pill w-100"
                    >
                      Read More 
                      <i className="bi bi-arrow-right ms-2"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <motion.div 
          className="row justify-content-center mt-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="col-lg-8">
            <div className="card border-0 bg-primary text-white rounded-4 shadow-lg">
              <div className="card-body p-5 text-center">
                <i className="bi bi-envelope-paper display-1 mb-3"></i>
                <h3 className="fw-bold mb-3">Stay Updated</h3>
                <p className="lead mb-4 opacity-90">
                  Get the latest posts and insights delivered directly to your inbox
                </p>
                <div className="row justify-content-center">
                  <div className="col-md-8">
                    <div className="input-group input-group-lg">
                      <input 
                        type="email" 
                        className="form-control rounded-pill me-2 border-0" 
                        placeholder="Your email address" 
                      />
                      <button className="btn btn-light text-primary rounded-pill px-4 fw-bold">
                        <i className="bi bi-send me-2"></i>
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>
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
        .professional-header-bg {
          background: linear-gradient(135deg, #6D4C41 0%, #8D6E63 50%, #A1887F 100%);
          position: relative;
          overflow: hidden;
        }
        .text-primary {
          color: #6D4C41 !important;
        }
        .bg-primary {
          background-color: #6D4C41 !important;
        }
        .bg-primary-light {
          background-color: #8D6E63 !important;
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
        .btn-outline-primary {
          border-color: #6D4C41;
          color: #6D4C41;
        }
        .btn-outline-primary:hover {
          background-color: #6D4C41;
          color: white;
        }
        
        /* Enhanced Slideshow Styles */
        .slideshow-container {
          height: 600px;
          overflow: hidden;
          position: relative;
        }
        .slideshow-image {
          height: 600px;
          object-fit: cover;
          filter: brightness(0.6);
        }
        .slideshow-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          background: rgba(109, 76, 65, 0.1);
        }
        
        /* Slideshow Navigation Buttons */
        .slideshow-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          z-index: 10;
        }
        .slideshow-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-50%) scale(1.1);
        }
        .slideshow-btn-prev {
          left: 20px;
        }
        .slideshow-btn-next {
          right: 20px;
        }
        
        /* Enhanced Slideshow Indicators */
        .slideshow-indicators {
          position: absolute;
          bottom: 30px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          gap: 15px;
          z-index: 10;
        }
        .indicator {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 2px solid white;
          background: transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .indicator.active {
          border-color: #FFD54F;
        }
        .indicator.active .indicator-progress {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          background: #FFD54F;
          border-radius: 50%;
          animation: progress 6s linear infinite;
        }
        
        /* Quick Action Buttons */
        .slideshow-quick-actions {
          position: absolute;
          top: 20px;
          right: 20px;
          display: flex;
          gap: 10px;
          z-index: 10;
        }
        .quick-action-btn {
          background: rgba(255, 255, 255, 0.9);
          color: #6D4C41;
          padding: 10px 15px;
          border-radius: 25px;
          text-decoration: none;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }
        .quick-action-btn:hover {
          background: white;
          transform: translateY(-2px);
          color: #5D4037;
          text-decoration: none;
        }
        
        /* About Section */
        .about-image-placeholder {
          background: linear-gradient(135deg, #f8f5f0 0%, #e0d6c9 100%);
        }
        
        /* Category Cards */
        .category-card {
          transition: all 0.3s ease;
        }
        .category-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 30px rgba(109, 76, 65, 0.2) !important;
        }
        
        /* Post Cards */
        .post-card-hover {
          transition: all 0.3s ease;
        }
        .post-card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 30px rgba(109, 76, 65, 0.15) !important;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        @keyframes progress {
          0% {
            transform: scale(0);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>

      {/* Add Comfortaa Font */}
      <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    </div>
  );
};

export default Home;