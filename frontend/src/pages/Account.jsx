import React, { useState } from "react";
import "../styles/style.css";

function Account() {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@email.com");
  const [bio, setBio] = useState("Frontend Developer");
  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    setEditing(false);
    console.log(name, email, bio);
  };

  return (
    <div className="account-container">
      <div className="account-card">

        <h1>Account</h1>

        {editing ? (
          <>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />

            <button onClick={handleSave}>Save</button>
          </>
        ) : (
          <>
            <h2>{name}</h2>
            <p>{email}</p>
            <p>{bio}</p>

            <button onClick={() => setEditing(true)}>
              Edit Profile
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default Account;