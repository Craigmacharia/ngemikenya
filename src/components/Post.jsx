import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

function Post() {
  const { slug } = useParams();
  const [content, setContent] = useState("");
  const [metadata, setMetadata] = useState({});

  useEffect(() => {
    const loadPost = async () => {
      try {
        const post = await import(`../posts/${slug}.md`);
        setContent(post.default);
        setMetadata(post.metadata || {});
      } catch (err) {
        setContent("Post not found.");
      }
    };

    loadPost();
  }, [slug]);

  return (
    <div className="container mt-5">
      <h1 className="fw-bold mb-3">{metadata.title}</h1>
      <p className="text-muted">{metadata.date}</p>
      <div className="mt-4">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}

export default Post;

