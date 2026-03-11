import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PostPage() {
  const { id } = useParams();

  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="post-detail">
      <h1>{post.title}</h1>

      <p>{post.desc}</p>

      <small>By {post.username}</small>
    </div>
  );
}

export default PostPage;
