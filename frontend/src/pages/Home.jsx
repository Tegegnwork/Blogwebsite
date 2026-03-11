import React, { useEffect, useState } from "react";
import PostCard from "../components/postCard";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
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
