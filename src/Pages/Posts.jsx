import React, { useEffect, useState } from "react";
import matter from "gray-matter";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const importPosts = import.meta.glob("../posts/*.md", { eager: true });

    const postList = Object.entries(importPosts).map(([path, file]) => {
      const { data, content } = matter(file.default);
      return {
        ...data,
        content,
        slug: path.split("/").pop().replace(".md", ""),
      };
    });

    const sortedPosts = postList.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    setPosts(sortedPosts);
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Latest Posts</h1>

      {/* Search Bar */}
      <div className="d-flex justify-content-center mb-4">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="row">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              className="col-md-4 mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="card h-100 shadow-sm border-0">
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h5>{post.title}</h5>
                  <p className="text-muted small">
                    {new Date(post.date).toDateString()}
                  </p>
                  <Link to={`/post/${post.slug}`} className="btn btn-primary btn-sm">
                    Read More
                  </Link>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-muted">No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default Posts;
