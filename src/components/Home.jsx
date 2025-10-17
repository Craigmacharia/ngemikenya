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
      {/* Header Section */}
      <motion.div
        className="text-center mb-5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="fw-bold mb-3 display-5 text-dark">NgemiKenya Blog</h1>
        <p className="text-muted">
          Honest perspectives, tech talk & real-world reflections.
        </p>
      </motion.div>

      {/* Search Bar */}
      <div className="text-center mb-5">
        <input
          type="text"
          className="form-control w-75 w-md-50 mx-auto shadow-sm rounded-pill px-3 py-2"
          placeholder="🔍 Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Featured Latest Post */}
      {filtered.length > 0 && (
        <motion.div
          className="card border-0 shadow-lg mb-5 rounded-4 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {filtered[0].image && (
            <img
              src={filtered[0].image}
              alt={filtered[0].title}
              className="card-img-top"
              style={{ height: "400px", objectFit: "cover" }}
            />
          )}
          <div className="card-body text-center p-4">
            <h2 className="fw-bold mb-2">{filtered[0].title}</h2>
            <p className="text-muted small">
              {new Date(filtered[0].date).toLocaleDateString()}
            </p>
            {filtered[0].excerpt && (
              <p className="text-secondary mb-3">
                {filtered[0].excerpt.slice(0, 180)}...
              </p>
            )}
            <Link
              to={`/post/${filtered[0].slug}`}
              className="btn btn-primary rounded-pill px-4"
            >
              Read Full Story →
            </Link>
          </div>
        </motion.div>
      )}

      {/* Other Posts */}
      <div className="row">
        {filtered.slice(1).length === 0 ? (
          <div className="text-center text-muted">No posts found.</div>
        ) : (
          filtered.slice(1, 10).map((post, index) => (
            <motion.div
              className="col-md-4 mb-4"
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="card border-0 shadow-sm h-100 rounded-4 hover-zoom">
                {post.image && (
                  <img
                    src={post.image}
                    className="card-img-top rounded-top-4"
                    alt={post.title}
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="fw-semibold mb-2">{post.title}</h5>
                  <p className="text-muted small mb-1">
                    {new Date(post.date).toLocaleDateString()}
                  </p>
                  {post.excerpt && (
                    <p className="text-secondary flex-grow-1">
                      {post.excerpt.slice(0, 100)}...
                    </p>
                  )}
                  <Link
                    to={`/post/${post.slug}`}
                    className="btn btn-outline-primary btn-sm rounded-pill mt-auto"
                  >
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
