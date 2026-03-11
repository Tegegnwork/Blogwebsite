import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const navigate = useNavigate();

  const createPost = async () => {
    try {
      if (!title || !desc) {
        alert("Please fill in all fields");
        return;
      }
      const res = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token") || "",
        },
        body: JSON.stringify({ title, desc }),
      });

      if (!res.ok) {
        const data = await res
          .json()
          .catch(() => ({ message: "Failed to create post" }));
        alert(data.message || "Failed to create post");
        return;
      }

      alert("Post created successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Create Post</h2>

      <div className="form-group">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <textarea
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>

      <button className="btn" onClick={createPost}>
        Create
      </button>
    </div>
  );
}

export default CreatePost;
