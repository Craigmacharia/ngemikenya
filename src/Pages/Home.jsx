import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import matter from "gray-matter";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const importPosts = import.meta.glob("../../posts/*.md");
    const postList = [];

    for (const path in importPosts) {
      importPosts[path]().then((file) => {
        const { data } = matter(file.default);
        postList.push({
          ...data,
          slug: path.split("/").pop().replace(".md", ""),
        });
        setPosts([...postList]);
      });
    }
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">NgemiKenya Blog</h1>
      <div className="row">
        {posts.map((post) => (
          <div className="col-md-4 mb-4" key={post.slug}>
            <div className="card shadow-sm">
              {post.image && (
                <img src={post.image} className="card-img-top" alt={post.title} />
              )}
              <div className="card-body">
                <h5>{post.title}</h5>
                <p className="text-muted">{new Date(post.date).toDateString()}</p>
                <Link to={`/post/${post.slug}`} className="btn btn-primary">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
