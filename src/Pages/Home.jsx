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

  useEffect(() => {
    const importPosts = import.meta.glob("../../posts/*.md");
    const postList = [];

    const loadPosts = async () => {
      try {
        for (const path in importPosts) {
          const file = await importPosts[path]();
          const { data } = matter(file.default);
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

  // Search filter
  useEffect(() => {
    if (!search.trim()) {
      setFiltered(posts);
    } else {
      setFiltered(
        posts.filter((p) =>
          p.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, posts]);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="text-center mt-5 text-danger">
        <h4>{error}</h4>
      </div>
    );

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4 fw-bold">NgemiKenya Blog</h1>

      {/* Search bar */}
      <div className="text-center mb-5">
        <input
          type="text"
          className="form-control w-50 mx-auto shadow-sm"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="row">
        {filtered.length === 0 ? (
          <div className="text-center text-muted">No posts found.</div>
        ) : (
          filtered.map((post, index) => (
            <motion.div
              className="col-md-4 mb-4"
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="card border-0 shadow-lg rounded-4 h-100">
                {post.image && (
                  <img
                    src={post.image}
                    className="card-img-top rounded-top-4"
                    alt={post.title}
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="fw-semibold">{post.title}</h5>
                  <p className="text-muted small mb-2">
                    {new Date(post.date).toLocaleDateString()}
                  </p>
                  {post.excerpt && (
                    <p className="text-secondary">{post.excerpt.slice(0, 100)}...</p>
                  )}
                  <Link to={`/post/${post.slug}`} className="btn btn-sm btn-primary mt-2">
                    Read More →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
