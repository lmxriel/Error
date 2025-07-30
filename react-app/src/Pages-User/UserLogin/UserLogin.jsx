import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Logo from "./FAMS_LOGOW.png";

const API_BASE_URL = "http://192.168.68.125:8081" || "http://localhost:8081";

function UserLogin() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/user_accounts`);
      const users = await response.json();

      // Convert username and password to lowercase for comparison
      const user = users.find(
        (u) =>
          u.username.toLowerCase() === username.toLowerCase() &&
          u.password.toLowerCase() === password.toLowerCase()
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
      setErrorMessage("Invalid Login");
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
          className="absolute inset-0 bg-no-repeat bg-center opacity-80 mb-32"
          style={{
            backgroundImage: `url(${Logo})`,
            backgroundSize: "300px",
          }}
        ></div>

        <div className="relative w-[350px] max-w-lg h-[500px] bg-white bg-opacity-80 rounded-lg p-10 flex flex-col items-center justify-center">
          <h2 className="mb-4 text-2xl font-bold text-center caret-transparent cursor-default">
            Faculty Classroom Attendance Monitoring System
          </h2>

          <h3 className="mb-6 text-lg font-semibold caret-transparent cursor-default">
            Login
          </h3>

          <input
            type="text"
            placeholder="Username"
            className="mb-4 w-[250px] p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="mb-4 w-[250px] relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-2 flex items-center text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
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
