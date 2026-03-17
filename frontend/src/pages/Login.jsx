import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginUser = async () => {
    try {
      if (!email || !password) {
        alert("Please fill in all fields");
        return;
      }
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const res = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res
          .json()
          .catch(() => ({ message: "Server error" }));
        alert(data.error || data.message || "Login failed");
        return;
      }

      const data = await res.json();

      if (!data.token) {
        alert("No token received");
        return;
      }

      localStorage.setItem("token", data.token);
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>

      <div className="form-group">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="btn" onClick={loginUser}>
        Login
      </button>
    </div>
  );
}

export default Login;
