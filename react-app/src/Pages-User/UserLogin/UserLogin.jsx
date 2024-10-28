import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./Notre_Dame_Logo.png";

function UserLogin() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8081/user_accounts");
      const users = await response.json();

      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        // Store user info in localStorage
        localStorage.setItem("loggedInUser", JSON.stringify(user));

        setErrorMessage("");
        navigate("/user/dashboard");
      } else {
        setErrorMessage("Invalid username or password.");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <>
      <div className="w-full h-screen max-h-screen min-h-screen bg-login-bg flex items-center justify-center caret-transparent cursor-default relative">
        {/* Background Logo */}
        <div
          className="absolute inset-0 bg-no-repeat bg-center opacity-80"
          style={{
            backgroundImage: `url(${Logo})`,
            backgroundSize: "400px",
          }}
        ></div>

        <div className="relative w-[350px] max-w-lg h-[500px] bg-white bg-opacity-80 rounded-lg p-10 flex flex-col items-center justify-center">
          <h2 className="mb-4 text-2xl font-bold text-center caret-transparent cursor-default">
            Faculty Attendance Monitoring System
          </h2>

          <h3 className="mb-6 text-lg font-semibold caret-transparent cursor-default">
            Login
          </h3>

          <input
            type="text"
            placeholder="username"
            className="mb-4 w-[250px] p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <input
            type="password"
            placeholder="password"
            className="mb-4 w-[250px] p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          <button
            className="w-[150px] max-w-xs p-2 mt-5 text-white bg-green-700 rounded hover:bg-green-600 shadow-lg"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
}

export default UserLogin;
