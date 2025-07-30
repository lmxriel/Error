// src/Pages/Dashboard/ChangePassword.jsx
import React, { useState } from "react";

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match.");
      return;
    }

  
    fetch("http://localhost:8081/admin/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMessage("Password changed successfully.");
        } else {
          setMessage(data.message || "Failed to change password.");
        }
      })
      .catch((err) => {
        console.error(err);
        setMessage("An error occurred.");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Change Password</h2>
        {message && <p className="text-red-500 mb-2">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Current Password"
            className="w-full p-2 border border-gray-300 rounded"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="New Password"
            className="w-full p-2 border border-gray-300 rounded"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full p-2 border border-gray-300 rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
