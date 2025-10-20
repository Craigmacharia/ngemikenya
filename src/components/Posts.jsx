import React, { useEffect, useState } from "react";
import fm from "front-matter";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

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
      } catch (error) {
        console.error("⚠️ Error loading posts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-light-brown min-vh-100 py-5">
      <div className="container">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-5"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="fw-bold display-5 text-primary mb-3">
            <i className="bi bi-journal-text me-3"></i>
            Latest Posts
          </h1>
          <p className="lead text-secondary mb-4">
            Discover insights, stories, and perspectives from the tech world
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          className="row justify-content-center mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="col-lg-6 col-md-8">
            <div className="input-group input-group-lg shadow-sm">
              <span className="input-group-text bg-white border-end-0">
                <i className="bi bi-search text-primary"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0 ps-0 py-3"
                placeholder="Search posts by title..."
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
          </div>
        </motion.div>

        {/* Results Count */}
        {search && (
          <motion.div 
            className="row mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="col-12">
              <p className="text-center text-primary mb-0">
                <i className="bi bi-search me-2"></i>
                Found {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} matching "{search}"
              </p>
            </div>
          </motion.div>
        )}

        {/* Loading State */}
        {loading ? (
          <motion.div 
            className="text-center py-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="spinner-border text-primary mb-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-primary">Loading fresh content...</p>
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
                <div className="card border-0 shadow-sm h-100 rounded-4 overflow-hidden post-card-hover bg-white">
                  {post.image && (
                    <div className="position-relative overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="card-img-top"
                        style={{ 
                          height: "220px", 
                          objectFit: "cover",
                          transition: "transform 0.3s ease"
                        }}
                        loading="lazy"
                        onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                        onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                      />
                      <div className="position-absolute top-0 end-0 m-3">
                        <span className="badge bg-white text-primary rounded-pill px-3 py-2 small shadow-sm">
                          <i className="bi bi-calendar3 me-1"></i>
                          {new Date(post.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="card-body d-flex flex-column p-4">
                    <h5 className="fw-semibold mb-3 text-primary line-clamp-2">
                      {post.title}
                    </h5>
                    <p className="text-muted small mb-3">
                      <i className="bi bi-clock me-1"></i>
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                    {post.excerpt && (
                      <p className="text-secondary flex-grow-1 mb-3 line-clamp-3 small">
                        {post.excerpt.slice(0, 120)}...
                      </p>
                    )}
                    <div className="mt-auto">
                      <Link
                        to={`/post/${post.slug}`}
                        className="btn btn-outline-primary btn-sm rounded-pill w-100 d-flex align-items-center justify-content-center"
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
        ) : (
          <motion.div 
            className="text-center py-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="empty-state py-5">
              <i className="bi bi-search display-1 text-primary-light mb-3"></i>
              <h4 className="text-primary mb-3">No posts found</h4>
              <p className="text-secondary mb-4">
                {search ? `No posts matching "${search}" were found.` : 'No posts available at the moment.'}
              </p>
              {search && (
                <button 
                  className="btn btn-primary rounded-pill px-4"
                  onClick={() => setSearch("")}
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  View All Posts
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* Back to Top */}
        {filteredPosts.length > 6 && (
          <motion.div 
            className="text-center mt-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button 
              className="btn btn-outline-primary rounded-pill px-4"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <i className="bi bi-arrow-up me-2"></i>
              Back to Top
            </button>
          </motion.div>
        )}
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        .bg-light-brown {
          background-color: #f8f5f0;
        }
        .text-primary {
          color: #6D4C41 !important;
        }
        .text-primary-light {
          color: #8D6E63 !important;
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
        
        /* Empty State */
        .empty-state {
          max-width: 400px;
          margin: 0 auto;
        }
        
        /* Search Bar Styling */
        .input-group-text {
          border-color: #e0d6c9;
          background: white;
        }
        
        .form-control {
          border-color: #e0d6c9;
        }
        
        .form-control:focus {
          border-color: #6D4C41;
          box-shadow: 0 0 0 0.2rem rgba(109, 76, 65, 0.1);
        }
        
        /* Card Image Hover */
        .card-img-top {
          transition: transform 0.3s ease;
        }
        
        /* Responsive Adjustments */
        @media (max-width: 768px) {
          .display-5 {
            font-size: 2rem;
          }
        }
      `}</style>

      {/* Add Comfortaa Font */}
      <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    </div>
  );
};

export default Posts;