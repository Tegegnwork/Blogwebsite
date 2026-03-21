import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostCard from "../components/postCard";

function Category() {
  const { name } = useParams();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
    fetch(`${API_URL}/posts?category=${name}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load posts");
        return res.json();
      })
      .then((data) => setPosts(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error(err);
        setPosts([]);
      });
  }, [name]);

  return (
    <div className="container">
      <h1>{name} Posts</h1>

      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}

export default Category;
