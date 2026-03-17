import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditPost() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/posts/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Post not found");
        return res.json();
      })
      .then((data) => {
        setTitle(data.title);
        setDesc(data.desc);
      })
      .catch((err) => {
        alert(err.message);
        navigate("/");
      });
  }, [id, navigate]);

  const updatePost = async () => {
    try {
      if (!title || !desc) {
        alert("Please fill in all fields");
        return;
      }
      const res = await fetch(`${API_URL}/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token") || "",
        },
        body: JSON.stringify({ title, desc }),
      });

      if (!res.ok) {
        const data = await res
          .json()
          .catch(() => ({ message: "Failed to update post" }));
        alert(data.error || data.message || "Failed to update post");
        return;
      }

      alert("Post updated successfully!");
      navigate(`/post/${id}`);
    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Post</h2>

      <div className="form-group">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
      </div>

      <button className="btn" onClick={updatePost}>
        Update
      </button>
    </div>
  );
}

export default EditPost;
