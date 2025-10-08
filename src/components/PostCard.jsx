import React from "react";
import { Link } from "react-router-dom";

function PostCard({ post }) {
  return (
    <div className="card h-100 shadow-sm">
      {post.thumbnail && (
        <img src={post.thumbnail} className="card-img-top" alt={post.title} />
      )}
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text text-muted">{post.excerpt}</p>
        <Link to={`/post/${post.slug}`} className="btn btn-dark">
          Read More
        </Link>
      </div>
    </div>
  );
}

export default PostCard;
