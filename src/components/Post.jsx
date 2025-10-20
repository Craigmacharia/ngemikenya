import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import fm from "front-matter";
import { motion } from "framer-motion";

const Post = () => {
  const { slug } = useParams();
  const [post, setPost] = useState({ content: "", data: {} });
  const [loading, setLoading] = useState(true);

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

  const { data, content } = post;

  return (
    <div className="bg-light-brown min-vh-100 py-5">
      <div className="container" style={{ maxWidth: "800px" }}>
        {loading ? (
          <motion.div 
            className="text-center py-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="spinner-border text-primary mb-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-primary">Loading post content...</p>
          </motion.div>
        ) : (
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header Section */}
            <div className="text-center mb-5">
              <motion.h1 
                className="fw-bold display-4 text-primary mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {data.title}
              </motion.h1>

              {data.date && (
                <motion.p 
                  className="text-muted lead mb-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <i className="bi bi-calendar3 me-2"></i>
                  {new Date(data.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </motion.p>
              )}

              {data.excerpt && (
                <motion.p 
                  className="lead text-secondary mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {data.excerpt}
                </motion.p>
              )}
            </div>

            {/* Featured Image */}
            {data.image && (
              <motion.div 
                className="text-center mb-5"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <img
                  src={data.image}
                  alt={data.title}
                  className="img-fluid rounded-4 shadow-lg"
                  style={{ 
                    maxHeight: "450px", 
                    objectFit: "cover",
                    width: "100%"
                  }}
                />
              </motion.div>
            )}

            {/* Content */}
            <motion.div 
              className="post-content card border-0 shadow-sm rounded-4 bg-white p-4 p-md-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <ReactMarkdown
                components={{
                  // Custom styling for markdown elements
                  h1: ({node, ...props}) => <h1 className="text-primary fw-bold mb-4 border-bottom pb-2" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-primary fw-bold mt-5 mb-3" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-primary fw-semibold mt-4 mb-2" {...props} />,
                  p: ({node, ...props}) => <p className="text-secondary mb-4 line-height-lg" {...props} />,
                  blockquote: ({node, ...props}) => (
                    <blockquote className="border-start border-primary border-4 ps-4 py-2 my-4 bg-primary-light text-white rounded-end" {...props} />
                  ),
                  code: ({node, inline, ...props}) => 
                    inline ? 
                    <code className="bg-light-brown text-primary px-2 py-1 rounded small" {...props} /> :
                    <code className="d-block bg-dark text-light p-3 rounded-3 mb-4 overflow-auto" {...props} />,
                  ul: ({node, ...props}) => <ul className="mb-4 ps-3" {...props} />,
                  ol: ({node, ...props}) => <ol className="mb-4 ps-3" {...props} />,
                  li: ({node, ...props}) => <li className="mb-2 text-secondary" {...props} />,
                  a: ({node, ...props}) => <a className="text-primary text-decoration-underline" target="_blank" rel="noopener noreferrer" {...props} />,
                  img: ({node, ...props}) => <img className="img-fluid rounded-3 shadow-sm my-4" {...props} />,
                }}
              >
                {content}
              </ReactMarkdown>
            </motion.div>

            {/* Back Button */}
            <motion.div 
              className="text-center mt-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Link to="/posts" className="btn btn-primary btn-lg rounded-pill px-4">
                <i className="bi bi-arrow-left me-2"></i>
                Back to Posts
              </Link>
            </motion.div>

            {/* Post Metadata Footer */}
            {data.date && (
              <motion.div 
                className="text-center mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <p className="text-muted small">
                  <i className="bi bi-clock me-1"></i>
                  Published on {new Date(data.date).toLocaleDateString('en-US', { 
                    weekday: 'long',
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </motion.div>
            )}
          </motion.article>
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
        .text-secondary {
          color: #666666 !important;
        }
        .bg-primary-light {
          background: linear-gradient(135deg, #8D6E63 0%, #6D4C41 100%);
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
        
        /* Markdown Content Styling */
        .post-content {
          font-size: 1.1rem;
          line-height: 1.7;
        }
        
        .post-content h1 {
          font-size: 2.5rem;
          font-weight: 700;
        }
        
        .post-content h2 {
          font-size: 2rem;
          font-weight: 600;
        }
        
        .post-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
        }
        
        .post-content blockquote {
          font-style: italic;
          border-left: 4px solid #6D4C41 !important;
        }
        
        .post-content code {
          font-family: 'Courier New', monospace;
        }
        
        .post-content pre {
          background: #2d3748 !important;
          border-radius: 12px;
        }
        
        .post-content img {
          transition: transform 0.3s ease;
        }
        
        .post-content img:hover {
          transform: scale(1.02);
        }
        
        .line-height-lg {
          line-height: 1.8;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .display-4 {
            font-size: 2rem;
          }
          
          .post-content {
            font-size: 1rem;
            padding: 1.5rem !important;
          }
          
          .post-content h1 {
            font-size: 1.8rem;
          }
          
          .post-content h2 {
            font-size: 1.5rem;
          }
          
          .post-content h3 {
            font-size: 1.3rem;
          }
        }
      `}</style>

      {/* Add Comfortaa Font */}
      <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    </div>
  );
};

export default Post;
