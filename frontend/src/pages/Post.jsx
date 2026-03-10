import React, { useState, useEffect } from "react";
import "../styles/style.css";

function Post() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [categories, setCategories] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to create a post");
    }
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          desc,
          username: user.username || "Anonymous",
          categories: categories ? [categories] : [],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to create post");
        return;
      }

      setSuccess("Post created successfully!");
      setTitle("");
      setDesc("");
      setCategories("");
    } catch (err) {
      setError("Server error. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-container">
      <div className="post-card">
        <h1>Create Post</h1>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <form onSubmit={handlePost}>
          <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            className="post-textarea"
            placeholder="Write your post..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Category (optional)"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
          />

          <button className="post-btn" type="submit" disabled={loading}>
            {loading ? "Posting..." : "Post"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Post;
