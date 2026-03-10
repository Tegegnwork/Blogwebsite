import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/posts");
        const data = await response.json();

        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          setError("Failed to fetch posts");
        }
      } catch (err) {
        setError("Server error. Could not fetch posts.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="home-container">
      {!isLoggedIn ? (
        <div className="home-card">
          <h1 className="home-title">Welcome to the Blog</h1>
          <p className="home-text">
            Sign up or log in to create your first post!
          </p>
          <Link to="/register">
            <button className="home-btn">Get Started</button>
          </Link>
        </div>
      ) : (
        <>
          <h1>Latest Posts</h1>
          {loading && <p>Loading posts...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {posts.length === 0 && !loading && (
            <p>No posts yet. Be the first to create one!</p>
          )}
          <div className="posts-list">
            {posts.map((post) => (
              <div key={post._id} className="post-item">
                <h2>{post.title}</h2>
                <p>{post.desc}</p>
                <small>By {post.username}</small>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
