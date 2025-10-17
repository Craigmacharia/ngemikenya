import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import matter from "gray-matter";

const Post = () => {
  const { slug } = useParams();
  const [post, setPost] = useState({ content: "", data: {} });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Import the markdown file dynamically
        const file = await import(`../posts/${slug}.md`);
        const markdown = await fetch(file.default).then((res) => res.text());
        const { data, content } = matter(markdown);

        // ✅ Handle both relative + absolute Netlify CMS image URLs
        const imagePath = data.image?.startsWith("http")
          ? data.image
          : data.image
          ? new URL(
              data.image.replace(/^\/+/, ""),
              window.location.origin + import.meta.env.BASE_URL
            ).toString()
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
    <div className="container mt-5 mb-5" style={{ maxWidth: "850px" }}>
      {loading ? (
        <p className="text-center text-muted">Loading post...</p>
      ) : (
        <>
          <h1 className="fw-bold mb-3 text-center">{data.title}</h1>
          {data.date && (
            <p className="text-muted text-center">
              {new Date(data.date).toDateString()}
            </p>
          )}

          {data.image && (
            <div className="text-center mb-4">
              <img
                src={data.image}
                alt={data.title}
                className="img-fluid rounded shadow-sm"
                style={{
                  maxHeight: "450px",
                  width: "100%",
                  objectFit: "cover",
                  backgroundColor: "#f8f9fa",
                }}
              />
            </div>
          )}

          <div className="post-content">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>

          <div className="text-center mt-5">
            <Link to="/posts" className="btn btn-outline-dark">
              ← Back to Posts
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
