import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Logo from "./OVS_logo.png";

const API_BASE_URL = "http://localhost:8081";



function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/admin_login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.role === "admin") {
        localStorage.setItem("loggedInAdmin", JSON.stringify(data));
        setErrorMessage("");
        navigate("/dashboard");
      } else {
        setErrorMessage(data.message || "Invalid email or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Logo */}
      <div className="w-1/2 flex items-center justify-center bg-white">
        <img src={Logo} alt="OVS Logo" className="w-80 h-80" />
      </div>

      {/* Right Side - Login Form */}
      <div className="w-1/2 bg-[#600000] flex items-center justify-center">
        <form onSubmit={handleLogin} className="w-full max-w-sm p-6">
          <div className="mb-4">
            <label className="block text-white mb-1">Email</label>
            <input
              type="email"
              className="w-full p-2 rounded focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
         
          </div>

             <div className="mb-2 relative">
            <label className="block text-white mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-2 rounded focus:outline-none border-2 "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-2 top-9 text-purple-800"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
      
          </div>

         

          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          <div className="mt-7"></div>
          <button
            type="submit"
            className="w-full bg-white text-black p-2 rounded font-bold hover:bg-gray-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
