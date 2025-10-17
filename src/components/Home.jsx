import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import matter from "gray-matter";
import { motion } from "framer-motion";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slideshow images (generic blog-related images)
  const slideshowImages = [
    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
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
        setFiltered(sorted);
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
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // 🔍 Search filter
  useEffect(() => {
    if (!search.trim()) setFiltered(posts);
    else
      setFiltered(
        posts.filter((p) =>
          p.title.toLowerCase().includes(search.toLowerCase())
        )
      );
  }, [search, posts]);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light-brown">
        <div className="text-center">
          <div className="spinner-border text-coffee" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-coffee-dark">Brewing fresh content...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light-brown">
        <div className="text-center text-coffee-dark">
          <i className="bi bi-exclamation-triangle-fill display-4 mb-3"></i>
          <h4>{error}</h4>
          <button 
            className="btn btn-coffee mt-3"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className="bg-light-brown min-vh-100">
      {/* Header Section */}
      <div className="coffee-header-bg py-5">
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
              <span className="badge bg-coffee-light rounded-pill px-3 py-2 me-2 mb-2">
                <i className="bi bi-code-slash me-1"></i>Tech
              </span>
              <span className="badge bg-coffee-light rounded-pill px-3 py-2 me-2 mb-2">
                <i className="bi bi-pencil me-1"></i>Thoughts
              </span>
              <span className="badge bg-coffee-light rounded-pill px-3 py-2 mb-2">
                <i className="bi bi-globe me-1"></i>Kenya
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slideshow Section */}
      <div className="container-fluid px-0 mb-5">
        <div className="row g-0">
          <div className="col-12">
            <div className="slideshow-container position-relative">
              <motion.div 
                className="slideshow-track"
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
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
                          Stories Worth Sharing
                        </motion.h2>
                        <motion.p 
                          className="text-white lead mb-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 }}
                        >
                          Dive into insights, experiences, and perspectives from the heart of Kenya's tech scene
                        </motion.p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Slideshow Indicators */}
              <div className="slideshow-indicators">
                {slideshowImages.map((_, index) => (
                  <button
                    key={index}
                    className={`indicator ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container pb-5">
        {/* Search Bar */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-6 col-md-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="input-group input-group-lg shadow-sm">
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-search text-coffee"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0 ps-0 py-3"
                  placeholder="Search posts..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ borderColor: '#e0d6c9' }}
                />
                {search && (
                  <button
                    className="btn btn-outline-secondary border-start-0"
                    type="button"
                    onClick={() => setSearch("")}
                  >
                    <i className="bi bi-x"></i>
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </div>

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
                    <h2 className="fw-bold text-coffee-dark mb-4">
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
                        <div className="text-coffee">
                          <i className="bi bi-journal-richtext display-6"></i>
                          <h5 className="mt-2 fw-bold">100+ Articles</h5>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="text-coffee">
                          <i className="bi bi-eye display-6"></i>
                          <h5 className="mt-2 fw-bold">50K+ Reads</h5>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="text-coffee">
                          <i className="bi bi-people display-6"></i>
                          <h5 className="mt-2 fw-bold">10K+ Community</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 text-center">
                    <div className="about-image-placeholder rounded-4 bg-coffee-light p-5">
                      <i className="bi bi-cup-hot display-1 text-coffee"></i>
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
            <h3 className="fw-bold text-coffee-dark mb-4 text-center">
              <i className="bi bi-grid-3x3-gap me-3"></i>
              Explore Categories
            </h3>
            <div className="row g-4">
              {[
                { icon: 'bi-code-slash', title: 'Web Development', count: '24 Posts', color: 'bg-coffee' },
                { icon: 'bi-phone', title: 'Mobile Tech', count: '18 Posts', color: 'bg-coffee-light' },
                { icon: 'bi-lightbulb', title: 'Innovation', count: '15 Posts', color: 'bg-coffee' },
                { icon: 'bi-graph-up', title: 'Tech Trends', count: '22 Posts', color: 'bg-coffee-light' }
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
        {filtered.length > 0 && (
          <motion.div
            className="row mb-5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="col-12">
              <div className="card border-0 shadow-lg rounded-4 overflow-hidden bg-white">
                <div className="row g-0">
                  <div className="col-md-6">
                    <img
                      src={filtered[0].image || "/api/placeholder/600/400"}
                      alt={filtered[0].title}
                      className="h-100 w-100"
                      style={{ objectFit: "cover", minHeight: "350px" }}
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="card-body h-100 d-flex flex-column p-4 p-lg-5">
                      <div className="mb-3">
                        <span className="badge bg-coffee text-white rounded-pill px-3 py-2">
                          Featured Post
                        </span>
                      </div>
                      <h2 className="card-title fw-bold mb-3 text-coffee-dark">
                        {filtered[0].title}
                      </h2>
                      <p className="text-muted mb-3">
                        <i className="bi bi-calendar3 me-2"></i>
                        {new Date(filtered[0].date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                      {filtered[0].excerpt && (
                        <p className="card-text text-secondary mb-4 flex-grow-1 lead">
                          {filtered[0].excerpt.slice(0, 200)}...
                        </p>
                      )}
                      <div className="mt-auto">
                        <Link
                          to={`/post/${filtered[0].slug}`}
                          className="btn btn-coffee btn-lg rounded-pill px-4"
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

        {/* Recent Posts Grid */}
        <div className="row mb-4">
          <div className="col-12">
            <motion.h3 
              className="fw-bold text-coffee-dark mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <i className="bi bi-clock-history me-3"></i>
              Recent Posts
              {search && (
                <span className="text-muted fs-6 ms-2">
                  ({filtered.slice(1).length} results)
                </span>
              )}
            </motion.h3>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="row">
          {filtered.slice(1).length === 0 ? (
            <motion.div 
              className="col-12 text-center py-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <i className="bi bi-search display-1 text-coffee-light mb-3"></i>
              <h4 className="text-coffee-dark">No posts found</h4>
              <p className="text-muted">Try adjusting your search terms</p>
              {search && (
                <button 
                  className="btn btn-outline-coffee mt-2"
                  onClick={() => setSearch("")}
                >
                  Clear Search
                </button>
              )}
            </motion.div>
          ) : (
            filtered.slice(1, 10).map((post, index) => (
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
                        <span className="badge bg-white text-coffee rounded-pill px-3 py-2 small">
                          <i className="bi bi-clock me-1"></i>
                          {new Date(post.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="card-body d-flex flex-column p-4">
                    <h5 className="fw-semibold mb-3 text-coffee-dark line-clamp-2">
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
                        className="btn btn-outline-coffee btn-sm rounded-pill w-100"
                      >
                        Read More 
                        <i className="bi bi-arrow-right ms-2"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Newsletter Signup */}
        <motion.div 
          className="row justify-content-center mt-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="col-lg-8">
            <div className="card border-0 bg-coffee text-white rounded-4 shadow-lg">
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
                        className="form-control rounded-pill me-2" 
                        placeholder="Your email address" 
                      />
                      <button className="btn btn-light text-coffee rounded-pill px-4">
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
        .coffee-header-bg {
          background: linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #D2691E 100%);
          position: relative;
          overflow: hidden;
        }
        .text-coffee {
          color: #8B4513;
        }
        .text-coffee-dark {
          color: #5D4037;
        }
        .text-coffee-light {
          color: #A1887F;
        }
        .bg-coffee {
          background-color: #8B4513 !important;
        }
        .bg-coffee-light {
          background-color: #A1887F !important;
        }
        .btn-coffee {
          background-color: #8B4513;
          border-color: #8B4513;
          color: white;
        }
        .btn-coffee:hover {
          background-color: #5D4037;
          border-color: #5D4037;
          color: white;
        }
        .btn-outline-coffee {
          border-color: #8B4513;
          color: #8B4513;
        }
        .btn-outline-coffee:hover {
          background-color: #8B4513;
          color: white;
        }
        
        /* Slideshow Styles */
        .slideshow-container {
          height: 500px;
          overflow: hidden;
          position: relative;
        }
        .slideshow-image {
          height: 500px;
          object-fit: cover;
          filter: brightness(0.7);
        }
        .slideshow-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          background: rgba(0, 0, 0, 0.3);
        }
        .slideshow-indicators {
          position: absolute;
          bottom: 20px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          gap: 10px;
        }
        .indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid white;
          background: transparent;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .indicator.active {
          background: white;
          transform: scale(1.2);
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
          transform: translateY(-5px);
        }
        
        /* Post Cards */
        .post-card-hover {
          transition: all 0.3s ease;
        }
        .post-card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(139, 69, 19, 0.15) !important;
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
      `}</style>
    </div>
  );
};

export default Home;