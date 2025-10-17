import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Dynamically import all Markdown files from /posts
    const importAll = (r) => r.keys().map(r);
    const markdownFiles = importAll(
      require.context("../../posts", false, /\.md$/)
    );

    Promise.all(
      markdownFiles.map(async (file) => {
        const response = await fetch(file.default);
        const text = await response.text();

        // Extract frontmatter
        const match = /---([\s\S]*?)---/.exec(text);
        const frontmatter = match ? match[1] : "";
        const content = text.replace(/---[\s\S]*?---/, "").trim();

        const titleMatch = /title:\s*(.*)/.exec(frontmatter);
        const slugMatch = /slug:\s*(.*)/.exec(frontmatter);

        return {
          title: titleMatch ? titleMatch[1].replace(/"/g, "") : "Untitled",
          slug: slugMatch ? slugMatch[1].replace(/"/g, "") : "",
          content,
        };
      })
    ).then(setPosts);
  }, []);

  return (
    <div className="posts-container">
      <h2>Blog Posts</h2>
      {posts.length === 0 ? (
        <p>No posts yet...</p>
      ) : (
        posts.map((post) => (
          <div key={post.slug} className="post-card">
            <h3>{post.title}</h3>
            <Link to={`/posts/${post.slug}`}>Read More</Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Posts;
