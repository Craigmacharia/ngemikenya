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
    <div className="container mt-5">
      <h1 className="text-center mb-4 fw-bold">📰 Latest Posts</h1>

      {/* Search Bar */}
      <div className="d-flex justify-content-center mb-4">
        <input
          type="text"
          className="form-control w-50 shadow-sm"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="text-center text-muted">Loading posts...</p>
      ) : filteredPosts.length > 0 ? (
        <div className="row">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              className="col-md-4 mb-4"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.07 }}
            >
              <div className="card h-100 shadow-sm border-0 rounded-3">
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="card-img-top rounded-top-3"
                    style={{
                      height: "200px",
                      objectFit: "cover",
                      backgroundColor: "#f0f0f0",
                    }}
                    loading="lazy"
                  />
                )}
                <div className="card-body">
                  <h5 className="fw-semibold">{post.title}</h5>
                  <p className="text-muted small mb-3">
                    {new Date(post.date).toDateString()}
                  </p>
                  <Link
                    to={`/post/${post.slug}`}
                    className="btn btn-outline-primary btn-sm"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted">No posts found.</p>
      )}
    </div>
  );
};

export default Posts;
