import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PostPage() {
  const { id } = useParams();

  const [post, setPost] = useState(null);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
    fetch(`${API_URL}/posts/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Post not found");
        return res.json();
      })
      .then((data) => setPost(data))
      .catch((err) => {
        alert(err.message);
      });
  }, [id]);

  if (!post) return <p>Loading...</p>;
  if (post.error) return <p>{post.error}</p>;
  return (
    <div>
      <h1>{post.title}</h1>

      <p>{post.desc}</p>

      <small>By {post.username}</small>
    </div>
  );
}

export default PostPage;
