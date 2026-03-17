import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Post() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
    fetch(`${API_URL}/posts/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Post not found");
        return res.json();
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>{post.title}</h1>

      <p>{post.desc}</p>

      <small>By {post.username}</small>
    </div>
  );
}

export default Post;
