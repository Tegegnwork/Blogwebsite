import React from "react";
import { Link } from "react-router-dom";

function PostCard({ post }) {
  const deletePost = async () => {
    try {
      if (!window.confirm("Are you sure you want to delete this post?")) return;

      const res = await fetch(`http://localhost:3000/posts/${post._id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        alert("Failed to delete post");
        return;
      }

      alert("Post deleted successfully!");
      window.location.reload();
    } catch (error) {
      alert("Error deleting post: " + error.message);
    }
  };

  const likePost = async () => {
    try {
      const res = await fetch(`http://localhost:3000/posts/${post._id}/like`, {
        method: "PUT",
      });

      if (!res.ok) {
        alert("Failed to like post");
        return;
      }

      window.location.reload();
    } catch (error) {
      alert("Error liking post: " + error.message);
    }
  };

  return (
    <div className="post-card">
      <Link to={`/post/${post._id}`}>
        <h2>{post.title}</h2>
      </Link>

      <p>{post.desc.substring(0, 120)}...</p>

      <div className="meta">
        <small>By {post.username}</small>
      </div>

      <div className="post-actions">
        <Link to={`/edit/${post._id}`} className="btn btn-edit">
          Edit
        </Link>
        <button className="btn btn-secondary" onClick={deletePost}>
          Delete
        </button>
        <button className="btn btn-like" onClick={likePost}>
          👍 {post.likes}
        </button>
      </div>
    </div>
  );
}

export default PostCard;
