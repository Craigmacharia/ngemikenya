import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import fm from "front-matter";
import { motion } from "framer-motion";
import { gsap } from "gsap";

const Post = () => {
  const { slug } = useParams();
  const [post, setPost] = useState({ content: "", data: {} });
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Dynamically import markdown file from /src/posts
        const file = await import(`../posts/${slug}.md`);
        const markdown = await fetch(file.default).then((res) => res.text());

        // Parse frontmatter safely in browser
        const { attributes: data, body: content } = fm(markdown);

        // Fix relative image paths for Netlify CMS uploads
        const imagePath = data.image?.startsWith("http")
          ? data.image
          : data.image
          ? `${import.meta.env.BASE_URL}${data.image.replace(/^\/+/, "")}`
          : null;

        setPost({ content, data: { ...data, image: imagePath } });
      } catch (err) {
        console.error("⚠️ Error loading post:", err);
        setPost({
          content: "Sorry, this post could not be found.",
          data: { title: "Post Not Found" },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  useEffect(() => {
    if (!loading && post.data) {
      // GSAP animations for premium feel
      gsap.fromTo(".post-header", 
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      gsap.fromTo(".post-meta", 
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.8, delay: 0.3, ease: "back.out(1.7)" }
      );

      gsap.fromTo(".post-content-card", 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.6, ease: "power3.out" }
      );

      // Parallax effect for featured image
      if (post.data.image) {
        gsap.to(".featured-image", {
          y: "-10%",
          ease: "none",
          scrollTrigger: {
            trigger: ".featured-image-container",
            scrub: 1.5,
            start: "top bottom",
            end: "bottom top",
          }
        });
      }

      // Animate content elements on scroll
      gsap.utils.toArray(".post-content h2, .post-content h3, .post-content blockquote").forEach((element) => {
        gsap.fromTo(element, 
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }
  }, [loading, post.data]);

  const { data, content } = post;

  const handleImageLoad = () => {
    setImageLoaded(true);
    gsap.fromTo(".featured-image", 
      { scale: 1.1, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: "power2.out" }
    );
  };

  return (
    <div className="bg-light-brown min-vh-100 py-5">
      <div className="container" style={{ maxWidth: "900px" }}>
        {loading ? (
          <motion.div 
            className="text-center py-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="premium-spinner mb-4"></div>
            <p className="text-primary fw-semibold">Loading premium content...</p>
          </motion.div>
        ) : (
          <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Premium Header Section */}
            <div className="text-center mb-5 post-header">
              <motion.h1 
                className="fw-bold display-3 text-primary mb-4 post-title"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                {data.title}
              </motion.h1>

              {data.date && (
                <motion.div 
                  className="post-meta"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="d-flex justify-content-center align-items-center flex-wrap gap-3 mb-3">
                    <span className="badge bg-primary text-white rounded-pill px-3 py-2">
                      <i className="bi bi-calendar3 me-2"></i>
                      {new Date(data.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                    {data.category && (
                      <span className="badge bg-primary-light text-white rounded-pill px-3 py-2">
                        <i className="bi bi-tag me-2"></i>
                        {data.category}
                      </span>
                    )}
                    {data.readTime && (
                      <span className="badge bg-gold text-dark rounded-pill px-3 py-2">
                        <i className="bi bi-clock me-2"></i>
                        {data.readTime}
                      </span>
                    )}
                  </div>
                </motion.div>
              )}

              {data.excerpt && (
                <motion.p 
                  className="lead text-secondary mb-4 post-excerpt"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {data.excerpt}
                </motion.p>
              )}
            </div>

            {/* Premium Featured Image */}
            {data.image && (
              <motion.div 
                className="text-center mb-5 featured-image-container"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="position-relative rounded-4 overflow-hidden shadow-xl">
                  <img
                    src={data.image}
                    alt={data.title}
                    className={`featured-image w-100 ${imageLoaded ? 'loaded' : 'loading'}`}
                    style={{ 
                      maxHeight: "500px", 
                      objectFit: "cover",
                      transition: "transform 0.3s ease"
                    }}
                    onLoad={handleImageLoad}
                  />
                  {!imageLoaded && (
                    <div className="position-absolute top-0 start-0 w-100 h-100 bg-primary-light d-flex align-items-center justify-content-center">
                      <div className="spinner-border text-white" role="status">
                        <span className="visually-hidden">Loading image...</span>
                      </div>
                    </div>
                  )}
                  <div className="image-overlay position-absolute top-0 start-0 w-100 h-100 bg-gradient-to-b from-transparent to-black opacity-20"></div>
                </div>
              </motion.div>
            )}

            {/* Premium Content */}
            <motion.div 
              className="post-content-card card border-0 shadow-xl rounded-4 bg-white overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="card-body p-4 p-md-5 post-content">
                <ReactMarkdown
                  components={{
                    // Premium custom styling for markdown elements
                    h1: ({node, ...props}) => (
                      <h1 className="text-primary fw-bold mb-4 pb-3 border-bottom border-2 border-primary post-heading-1" {...props} />
                    ),
                    h2: ({node, ...props}) => (
                      <h2 className="text-primary fw-bold mt-5 mb-4 pb-2 post-heading-2" {...props} />
                    ),
                    h3: ({node, ...props}) => (
                      <h3 className="text-primary fw-semibold mt-4 mb-3 post-heading-3" {...props} />
                    ),
                    p: ({node, ...props}) => (
                      <p className="text-secondary mb-4 line-height-lg post-paragraph" {...props} />
                    ),
                    blockquote: ({node, ...props}) => (
                      <blockquote className="border-start border-primary border-4 ps-4 py-3 my-5 bg-primary-light text-white rounded-end shadow-sm post-blockquote" {...props} />
                    ),
                    code: ({node, inline, ...props}) => 
                      inline ? 
                      <code className="bg-light-brown text-primary px-2 py-1 rounded small post-inline-code" {...props} /> :
                      <pre className="bg-dark text-light p-4 rounded-4 mb-5 overflow-auto shadow-lg post-code-block">
                        <code {...props} />
                      </pre>,
                    ul: ({node, ...props}) => <ul className="mb-4 ps-4 post-unordered-list" {...props} />,
                    ol: ({node, ...props}) => <ol className="mb-4 ps-4 post-ordered-list" {...props} />,
                    li: ({node, ...props}) => <li className="mb-2 text-secondary post-list-item" {...props} />,
                    a: ({node, ...props}) => (
                      <a 
                        className="text-primary text-decoration-underline fw-semibold post-link" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        {...props} 
                      />
                    ),
                    img: ({node, ...props}) => (
                      <img 
                        className="img-fluid rounded-4 shadow-lg my-5 post-image" 
                        {...props} 
                      />
                    ),
                    table: ({node, ...props}) => (
                      <div className="table-responsive my-5">
                        <table className="table table-striped table-hover rounded-3 overflow-hidden post-table" {...props} />
                      </div>
                    ),
                  }}
                >
                  {content}
                </ReactMarkdown>
              </div>
            </motion.div>

            {/* Premium Back Button */}
            <motion.div 
              className="text-center mt-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <Link to="/posts" className="btn btn-primary btn-lg rounded-pill px-5 py-3 fw-semibold back-button">
                <i className="bi bi-arrow-left me-2"></i>
                Back to All Posts
              </Link>
            </motion.div>

            {/* Premium Post Metadata Footer */}
            <motion.div 
              className="text-center mt-5 pt-4 border-top"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <p className="text-muted small mb-2">
                    <i className="bi bi-clock me-2"></i>
                    Published on {new Date(data.date).toLocaleDateString('en-US', { 
                      weekday: 'long',
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                  {data.tags && (
                    <div className="mt-3">
                      <span className="text-muted small me-2">Tags:</span>
                      {data.tags.split(',').map((tag, index) => (
                        <span key={index} className="badge bg-light-brown text-primary rounded-pill px-3 py-1 me-2 small">
                          #{tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.article>
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

        .text-secondary {
          color: #666666 !important;
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

        /* Premium Post Styling */
        .post-title {
          background: linear-gradient(135deg, #6D4C41 0%, #8D6E63 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.2;
          text-shadow: 0 4px 20px rgba(109, 76, 65, 0.1);
        }

        .post-excerpt {
          font-size: 1.3rem;
          font-weight: 300;
          line-height: 1.6;
        }

        .post-content {
          font-size: 1.15rem;
          line-height: 1.8;
          font-family: 'Inter', 'Comfortaa', sans-serif;
        }

        .post-heading-1 {
          font-size: 2.5rem;
          font-weight: 800;
          position: relative;
        }

        .post-heading-2 {
          font-size: 2rem;
          font-weight: 700;
          position: relative;
        }

        .post-heading-2::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #6D4C41, #FFD54F);
          border-radius: 2px;
        }

        .post-heading-3 {
          font-size: 1.5rem;
          font-weight: 600;
        }

        .post-paragraph {
          font-size: 1.15rem;
          line-height: 1.9;
          color: #4a5568;
        }

        .post-blockquote {
          background: linear-gradient(135deg, #6D4C41 0%, #8D6E63 100%) !important;
          border-left: 6px solid #FFD54F !important;
          font-style: italic;
          font-size: 1.2rem;
          position: relative;
          overflow: hidden;
        }

        .post-blockquote::before {
          content: '"';
          position: absolute;
          top: 10px;
          left: 10px;
          font-size: 4rem;
          color: rgba(255, 255, 255, 0.1);
          font-family: serif;
          line-height: 1;
        }

        .post-inline-code {
          background: linear-gradient(135deg, #f8f5f0 0%, #e8dfd5 100%);
          border: 1px solid rgba(109, 76, 65, 0.2);
          font-weight: 600;
          padding: 0.2rem 0.5rem;
        }

        .post-code-block {
          background: #2d3748 !important;
          border: 1px solid #4a5568;
          position: relative;
        }

        .post-code-block::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #FFD54F, #6D4C41, #FFD54F);
        }

        .post-link {
          transition: all 0.3s ease;
          position: relative;
        }

        .post-link:hover {
          color: #FFD54F !important;
          transform: translateY(-1px);
        }

        .post-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: #FFD54F;
          transition: width 0.3s ease;
        }

        .post-link:hover::after {
          width: 100%;
        }

        .post-image {
          transition: all 0.4s ease;
          cursor: zoom-in;
        }

        .post-image:hover {
          transform: scale(1.02);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3) !important;
        }

        .post-unordered-list,
        .post-ordered-list {
          position: relative;
        }

        .post-list-item {
          position: relative;
          padding-left: 0.5rem;
        }

        .post-unordered-list .post-list-item::before {
          content: '▸';
          color: #6D4C41;
          font-weight: bold;
          position: absolute;
          left: -1rem;
        }

        .post-table {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .post-table th {
          background: linear-gradient(135deg, #6D4C41 0%, #8D6E63 100%);
          color: white;
          font-weight: 600;
          border: none;
          padding: 1rem;
        }

        .post-table td {
          padding: 0.75rem 1rem;
          border-color: #f8f5f0;
        }

        .post-table tr:hover {
          background-color: #f8f5f0;
        }

        .featured-image {
          transition: transform 0.3s ease;
        }

        .featured-image.loaded {
          animation: imageReveal 1s ease-out;
        }

        .back-button {
          font-size: 1.1rem;
          padding: 0.75rem 2rem;
        }

        /* Premium Animations */
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes imageReveal {
          0% {
            opacity: 0;
            transform: scale(1.1);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Gradient overlay for featured image */
        .image-overlay {
          background: linear-gradient(
            to bottom,
            rgba(109, 76, 65, 0.1) 0%,
            rgba(109, 76, 65, 0.3) 100%
          );
          pointer-events: none;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .display-3 {
            font-size: 2.2rem;
          }
          
          .post-content {
            font-size: 1.05rem;
            padding: 1.5rem !important;
          }
          
          .post-heading-1 {
            font-size: 1.8rem;
          }
          
          .post-heading-2 {
            font-size: 1.5rem;
          }
          
          .post-heading-3 {
            font-size: 1.3rem;
          }
          
          .post-excerpt {
            font-size: 1.1rem;
          }

          .post-content-card {
            margin: 0 -1rem;
            border-radius: 1rem !important;
          }
        }

        @media (max-width: 576px) {
          .container {
            padding: 0 1rem;
          }
          
          .post-title {
            font-size: 1.8rem;
          }
          
          .btn-lg {
            padding: 0.75rem 1.5rem;
            font-size: 1rem;
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
      {/* Add Inter Font for better readability */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    </div>
  );
};

export default Post;