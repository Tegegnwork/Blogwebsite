import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import PostPage from "./pages/Post";
import Category from "./components/Category";

function App() {
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully");
    window.location.href = "/login";
  };

  return (
    <>
      <nav
        style={{ textAlign: "center", padding: "16px", background: "#e1e6e2" }}
      >
        <Link to="/" style={{ margin: "0 12px" }}>
          Home
        </Link>
        <Link to="/create" style={{ margin: "0 12px" }}>
          Create
        </Link>
        {!isLoggedIn ? (
          <>
            <Link to="/login" style={{ margin: "0 12px" }}>
              Login
            </Link>
            <Link to="/register" style={{ margin: "0 12px" }}>
              Register
            </Link>
          </>
        ) : (
          <button className="btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/category/:name" element={<Category />} />
      </Routes>
    </>
  );
}

export default App;
