import React from "react";
import { Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import Post from "./pages/Post";
import Details from "./pages/Details";

function App() {
  return (
    <>
      {/* Simple Navigation */}
      <nav
        style={{ textAlign: "center", padding: "35px", background: "#e1e6e2" }}
      >
        <Link to="/" style={{ margin: "40px" }}>
          Home
        </Link>
        <Link to="/login" style={{ margin: "40px" }}>
          Login
        </Link>
        <Link to="/register" style={{ margin: "40px" }}>
          Register
        </Link>
        <Link to="/account" style={{ margin: "40px" }}>
          Account
        </Link>
        <Link to="/post" style={{ margin: "40px" }}>
          Post
        </Link>
        <Link to="/details" style={{ margin: "40px" }}>
          Details
        </Link>
      </nav>

      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route path="/post" element={<Post />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </>
  );
}

export default App;
