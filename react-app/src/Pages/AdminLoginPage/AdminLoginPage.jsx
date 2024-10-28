import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Notre_Dame_Logo.png";

function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8081/admin_login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.role === "admin") {
        localStorage.setItem("loggedInAdmin", JSON.stringify(data));
        setErrorMessage("");
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        setErrorMessage(data.message || "Invalid username or password.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin(e);
    }
  };

  return (
    <div className="w-full h-screen gap-16 max-h-screen min-h-screen bg-login-bg flex items-center justify-center caret-transparent cursor-default">
      <div className="w-360px h-420px bg-login-frame-bg rounded-lg p-10 flex flex-col items-center">
        <h2 className="mb-50px text-xl font-bold text-center caret-transparent cursor-default">
          Admin Login
        </h2>
        <form onSubmit={handleLogin} className="flex flex-col items-center">
          <input
            type="text"
            placeholder="username"
            className="mb-4 w-64 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="username"
          />
          <input
            type="password"
            placeholder="password"
            className="mb-9 w-64 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="current-password"
          />
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          <button
            className="w-48 p-2 text-white bg-green-700 rounded hover:bg-green-600"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
      <div className="w-400px h-auto flex justify-center items-center flex-col">
        <h1 className="mb-50px text-4xl font-bold text-center text-white">
          Faculty Attendance Monitoring System
        </h1>
        <img src={Logo} className="size-80" alt="Logo" />
      </div>
    </div>
  );
}

export default AdminLoginPage;
