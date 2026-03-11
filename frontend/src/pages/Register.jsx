import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const registerUser = async () => {
    try {
      if (!username || !email || !password) {
        alert("Please fill in all fields");
        return;
      }
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!res.ok) {
        const data = await res
          .json()
          .catch(() => ({ message: "Server error" }));
        alert(data.message || "Registration failed");
        return;
      }

      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>

      <div className="form-group">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

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

      <button className="btn" onClick={registerUser}>
        Register
      </button>
    </div>
  );
}

export default Register;
