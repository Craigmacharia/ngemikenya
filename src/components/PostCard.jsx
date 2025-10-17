import React from "react";
import { Link } from "react-router-dom";

function PostCard({ post }) {
  return (
    <div className="card h-100 shadow-sm border-0 rounded-3">
      {post.thumbnail && (
        <img
          src={post.thumbnail}
          alt={post.title}
          className="card-img-top rounded-top-3"
          style={{
            height: "200px",
            objectFit: "cover",
            backgroundColor: "#f8f9fa",
          }}
          loading="lazy"
        />
      )}

      <div className="card-body">
        <h5 className="fw-semibold">{post.title}</h5>
        {post.date && (
          <p className="text-muted small mb-2">
            {new Date(post.date).toDateString()}
          </p>
        )}
        {post.excerpt && (
          <p className="text-muted small">{post.excerpt}</p>
        )}
        <Link
          to={`/posts/${post.slug}`} // ✅ Corrected path (plural)
          className="btn btn-outline-dark btn-sm mt-2"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
}

export default PostCard;
