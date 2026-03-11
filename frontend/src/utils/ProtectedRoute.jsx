import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Check if user is logged in (e.g., check localStorage or context)
  const isAuthenticated = localStorage.getItem("token"); // Assuming token is stored

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
