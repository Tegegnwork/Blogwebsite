import React, { useEffect, useState } from "react";
import PostCard from "../components/postCard";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
    fetch(`${API_URL}/posts`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load posts");
        return res.json();
      })
      .then((data) => {
        setPosts(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error(err);
        setPosts([]);
      });
  }, []);

  return (
    <div className="container">
      <h1>Latest Posts</h1>

      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}

export default Home;
