import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

const Post = () => {
  const { slug } = useParams();
  const [content, setContent] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    import(`../../posts/${slug}.md`).then((res) => {
      const { data, content } = matter(res.default);
      setData(data);
      setContent(content);
    });
  }, [slug]);

  return (
    <div className="container mt-5">
      <h1>{data.title}</h1>
      <p className="text-muted">{new Date(data.date).toDateString()}</p>
      {data.image && (
        <img src={data.image} alt={data.title} className="img-fluid mb-3" />
      )}
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default Post;
