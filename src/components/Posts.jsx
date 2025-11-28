import React, { useEffect, useState } from "react";
import fm from "front-matter";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { gsap } from "gsap";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        // Import all markdown posts from /src/posts
        const files = import.meta.glob("../posts/*.md", { eager: true });

        const loadedPosts = await Promise.all(
          Object.entries(files).map(async ([path, file]) => {
            try {
              // Fetch markdown text content
              const markdown = await fetch(file.default).then((res) => res.text());
              const { attributes: data, body: content } = fm(markdown);

              // Skip if missing required fields
              if (!data?.title || !data?.date) return null;

              // Normalize image path
              const imagePath = data.image?.startsWith("http")
                ? data.image
                : data.image
                ? `${import.meta.env.BASE_URL}${data.image.replace(/^\/+/, "")}`
                : null;

              return {
                ...data,
                content,
                image: imagePath,
                slug: path.split("/").pop().replace(".md", ""),
              };
            } catch (err) {
              console.error("⚠️ Error parsing post:", path, err);
              return null;
            }
          })
        );

        // Sort by date (newest first)
        const sorted = loadedPosts
          .filter(Boolean)
          .sort((a, b) => new Date(b.date) - new Date(a.date));

        setPosts(sorted);
        setFilteredPosts(sorted);
      } catch (error) {
        console.error("⚠️ Error loading posts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  useEffect(() => {
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [search, posts]);

  // GSAP animations
  useEffect(() => {
    if (!loading) {
      gsap.fromTo(".posts-header", 
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      gsap.fromTo(".search-bar", 
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.8, delay: 0.3, ease: "back.out(1.7)" }
      );

      // Animate post cards with stagger
      gsap.fromTo(".post-card", 
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.5
        }
      );
    }
  }, [loading, filteredPosts]);

  return (
    <div className="bg-light-brown min-vh-100 py-5">
      <div className="container">
        {/* Premium Header Section */}
        <motion.div 
          className="text-center mb-5 posts-header"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="fw-bold display-4 text-primary mb-4">
            <i className="bi bi-journal-richtext me-3"></i>
            Latest Insights
          </h1>
          <p className="lead text-secondary mb-4 header-subtitle">
            Discover premium content, tech insights, and authentic perspectives from the heart of innovation
          </p>
          <div className="header-ornament">
            <div className="ornament-line"></div>
            <i className="bi bi-star-fill text-accent mx-3"></i>
            <div className="ornament-line"></div>
          </div>
        </motion.div>

        {/* Premium Search Bar */}
        <motion.div 
          className="row justify-content-center mb-5 search-bar"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="col-lg-6 col-md-8">
            <div className="search-container position-relative shadow-lg rounded-pill">
              <div className="input-group input-group-lg">
                <span className="input-group-text bg-white border-0 ps-4">
                  <i className="bi bi-search text-primary"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-0 py-3 search-input"
                  placeholder="Discover insights..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                  <button
                    className="btn btn-link text-primary border-0 pe-4 clear-search"
                    type="button"
                    onClick={() => setSearch("")}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                )}
              </div>
              <div className="search-glow"></div>
            </div>
          </div>
        </motion.div>

        {/* Premium Results Count */}
        {search && (
          <motion.div 
            className="row mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="col-12">
              <div className="results-count text-center">
                <span className="badge bg-primary text-white rounded-pill px-4 py-2 shadow-sm">
                  <i className="bi bi-search me-2"></i>
                  {filteredPosts.length} premium post{filteredPosts.length !== 1 ? 's' : ''} found
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Premium Loading State */}
        {loading ? (
          <motion.div 
            className="text-center py-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="premium-spinner mb-4"></div>
            <p className="text-primary fw-semibold">Curating premium content...</p>
          </motion.div>
        ) : filteredPosts.length > 0 ? (
          <div className="row g-4">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                className="col-xl-4 col-lg-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="card border-0 shadow-lg h-100 rounded-4 overflow-hidden post-card bg-white position-relative">
                  {post.image && (
                    <div className="position-relative overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="card-img-top post-image"
                        style={{ 
                          height: "240px", 
                          objectFit: "cover"
                        }}
                        loading="lazy"
                      />
                      <div className="post-overlay position-absolute top-0 start-0 w-100 h-100 bg-primary"></div>
                      <div className="position-absolute top-0 end-0 m-3">
                        <span className="badge bg-white text-primary rounded-pill px-3 py-2 small fw-semibold shadow-sm">
                          <i className="bi bi-calendar3 me-1"></i>
                          {new Date(post.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      {post.category && (
                        <div className="position-absolute top-0 start-0 m-3">
                          <span className="badge bg-gold text-dark rounded-pill px-3 py-2 small fw-semibold shadow-sm">
                            {post.category}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="card-body d-flex flex-column p-4">
                    <h5 className="fw-bold mb-3 text-primary line-clamp-2 post-title">
                      {post.title}
                    </h5>
                    <div className="post-meta mb-3">
                      <p className="text-muted small mb-2">
                        <i className="bi bi-clock me-1"></i>
                        {new Date(post.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                      {post.readTime && (
                        <p className="text-accent small mb-0">
                          <i className="bi bi-watch me-1"></i>
                          {post.readTime} read
                        </p>
                      )}
                    </div>
                    {post.excerpt && (
                      <p className="text-secondary flex-grow-1 mb-3 line-clamp-3 post-excerpt">
                        {post.excerpt.slice(0, 120)}...
                      </p>
                    )}
                    <div className="mt-auto">
                      <Link
                        to={`/post/${post.slug}`}
                        className="btn btn-primary btn-sm rounded-pill w-100 py-2 fw-semibold post-button"
                      >
                        Read Insight
                        <i className="bi bi-arrow-right ms-2"></i>
                      </Link>
                    </div>
                  </div>
                  <div className="card-glow"></div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div 
            className="text-center py-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="empty-state py-5">
              <div className="empty-icon mb-4">
                <i className="bi bi-search display-1 text-primary-light"></i>
                <div className="icon-glow"></div>
              </div>
              <h4 className="text-primary mb-3 fw-bold">No Premium Content Found</h4>
              <p className="text-secondary mb-4 lead">
                {search ? `No insights matching "${search}" were discovered.` : 'We\'re crafting premium content for you.'}
              </p>
              {search && (
                <button 
                  className="btn btn-primary rounded-pill px-4 py-2 fw-semibold"
                  onClick={() => setSearch("")}
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Explore All Insights
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* Premium Back to Top */}
        {filteredPosts.length > 6 && (
          <motion.div 
            className="text-center mt-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button 
              className="btn btn-outline-primary rounded-pill px-4 py-2 fw-semibold back-to-top"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <i className="bi bi-arrow-up me-2"></i>
              Back to Excellence
            </button>
          </motion.div>
        )}
      </div>

      {/* Premium CSS Styles */}
      <style jsx>{`
        .bg-light-brown {
          background: linear-gradient(135deg, #f8f5f0 0%, #f0ebe4 50%, #f8f5f0 100%);
        }

        .text-primary {
          color: #6D4C41 !important;
        }

        .text-primary-light {
          color: #8D6E63 !important;
        }

        .text-accent {
          color: #FFD54F !important;
        }

        .text-secondary {
          color: #666666 !important;
        }

        .bg-primary {
          background: linear-gradient(135deg, #6D4C41 0%, #8D6E63 100%) !important;
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

        .btn-outline-primary {
          border: 2px solid #6D4C41;
          color: #6D4C41;
          background: transparent;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .btn-outline-primary:hover {
          background: #6D4C41;
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(109, 76, 65, 0.3);
        }

        /* Premium Spinner */
        .premium-spinner {
          width: 60px;
          height: 60px;
          border: 4px solid rgba(109, 76, 65, 0.2);
          border-left: 4px solid #6D4C41;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto;
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

        /* Premium Search Bar */
        .search-container {
          background: white;
          border: 2px solid rgba(109, 76, 65, 0.1);
          position: relative;
          overflow: hidden;
          transition: all 0.4s ease;
        }

        .search-container:focus-within {
          border-color: #6D4C41;
          box-shadow: 0 10px 40px rgba(109, 76, 65, 0.2);
          transform: translateY(-2px);
        }

        .search-input {
          font-size: 1.1rem;
          font-weight: 300;
        }

        .search-input::placeholder {
          color: #9E9E9E;
          font-weight: 300;
        }

        .search-input:focus {
          box-shadow: none;
        }

        .clear-search {
          transition: all 0.3s ease;
        }

        .clear-search:hover {
          transform: scale(1.2);
        }

        .search-glow {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 213, 79, 0.1), transparent);
          transition: left 0.6s ease;
        }

        .search-container:hover .search-glow {
          left: 100%;
        }

        /* Premium Post Cards */
        .post-card {
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          overflow: hidden;
        }

        .post-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 1rem;
          padding: 2px;
          background: linear-gradient(135deg, #6D4C41 0%, transparent 30%, transparent 70%, #8D6E63 100%);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: subtract;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .post-card:hover::before {
          opacity: 1;
        }

        .post-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 30px 60px rgba(109, 76, 65, 0.2) !important;
        }

        .post-image {
          transition: all 0.5s ease;
        }

        .post-card:hover .post-image {
          transform: scale(1.1);
        }

        .post-overlay {
          background: linear-gradient(135deg, rgba(109, 76, 65, 0.6) 0%, rgba(109, 76, 65, 0.3) 100%);
          transition: opacity 0.5s ease;
          opacity: 0;
        }

        .post-card:hover .post-overlay {
          opacity: 0.4;
        }

        .post-title {
          font-size: 1.2rem;
          line-height: 1.4;
          min-height: 3.5em;
        }

        .post-excerpt {
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .post-button {
          transition: all 0.3s ease;
        }

        .card-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at center, rgba(255, 213, 79, 0.1) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .post-card:hover .card-glow {
          opacity: 1;
        }

        /* Results Count */
        .results-count {
          position: relative;
        }

        .results-count .badge {
          font-size: 0.9rem;
          position: relative;
          overflow: hidden;
        }

        .results-count .badge::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.6s ease;
        }

        .results-count .badge:hover::before {
          left: 100%;
        }

        /* Empty State */
        .empty-state {
          max-width: 500px;
          margin: 0 auto;
        }

        .empty-icon {
          position: relative;
          display: inline-block;
        }

        .icon-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120px;
          height: 120px;
          background: radial-gradient(circle, rgba(255, 213, 79, 0.3) 0%, transparent 70%);
          border-radius: 50%;
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

        /* Premium Animations */
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Back to Top */
        .back-to-top {
          transition: all 0.4s ease;
        }

        .back-to-top:hover {
          transform: translateY(-3px);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .display-4 {
            font-size: 2.5rem;
          }
          
          .header-subtitle {
            font-size: 1.1rem;
          }
          
          .search-container {
            border-radius: 20px !important;
          }
          
          .post-card:hover {
            transform: translateY(-5px) scale(1.01);
          }
        }

        @media (max-width: 576px) {
          .container {
            padding: 0 1rem;
          }
          
          .header-ornament {
            margin-top: 1.5rem;
          }
          
          .ornament-line {
            width: 40px;
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

export default Posts;