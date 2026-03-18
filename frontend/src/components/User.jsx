import React from "react";

const User = ({ user }) => {
  const defaultUser = {
    name: "",
    email: "",
    avatar: "https://via.placeholder.com/100",
    role: "Admin",
  };

  const userData = user || defaultUser;

  return (
    <div className="user-card">
      <div className="user-header">
        <img
          src={userData.avatar}
          alt={userData.name}
          className="user-avatar"
        />
        <h3 className="user-name">{userData.name}</h3>
        <span className="user-role">{userData.role}</span>
      </div>
      <div className="user-info">
        <div className="info-item">
          <span className="info-label">Email:</span>
          <span className="info-value">{userData.email}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Member since:</span>
          <span className="info-value">{userData.joinDate}</span>
        </div>
      </div>
      return (
      <div className="user-actions">
        <button className="btn btn-primary">Edit Profile</button>
        <button className="btn btn-secondary">Settings</button>
      </div>
      );
    </div>
  );
};

export default User;
