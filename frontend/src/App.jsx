import React from "react";
import "./styles/style.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import EditPost from "./pages/EditPost";
import Category from "./components/Category";
import ProtectedRoute from "./utils/ProtectedRoute";
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />
        <Route path="/category/:name" element={<Category />} />
        <Route path="/post/:id" element={<Post />} />

        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditPost />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
