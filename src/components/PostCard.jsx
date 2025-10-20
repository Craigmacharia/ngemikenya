import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function PostCard({ post, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden post-card-hover bg-white">
        {post.thumbnail && (
          <div className="position-relative overflow-hidden">
            <img
              src={post.thumbnail}
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
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
        )}

        <div className="card-body d-flex flex-column p-4">
          <h5 className="fw-semibold mb-3 text-primary line-clamp-2">
            {post.title}
          </h5>
          
          {post.date && (
            <p className="text-muted small mb-2">
              <i className="bi bi-clock me-1"></i>
              {new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          )}
          
          {post.excerpt && (
            <p className="text-secondary flex-grow-1 mb-3 line-clamp-3 small">
              {post.excerpt}
            </p>
          )}
          
          <div className="mt-auto">
            <Link
              to={`/posts/${post.slug}`}
              className="btn btn-outline-primary btn-sm rounded-pill w-100 d-flex align-items-center justify-content-center"
            >
              Read More 
              <i className="bi bi-arrow-right ms-2"></i>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .text-primary {
          color: #6D4C41 !important;
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
        
        /* Card Image Hover */
        .card-img-top {
          transition: transform 0.3s ease;
        }
      `}</style>
    </motion.div>
  );
}

export default PostCard;
