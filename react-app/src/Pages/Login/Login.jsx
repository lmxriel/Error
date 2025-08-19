import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import OVSLogo from "../../assets/OVSLogo.png";

const API_BASE_URL = "http://localhost:8081";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear old error

    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) 
      {
        navigate("/dashboard"); // Prevent back to login
      } 
      else 
      {
        setErrorMessage(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

return (
  <div className="min-h-screen flex">
    {/* Left Side - Logo */}
    <div className="w-1/2 flex items-center justify-center bg-white">
      <img src={OVSLogo} alt="OVS Logo" className="w-80 h-80" />
    </div>

    {/* Right Side - Login Form */}
    <div className="w-1/2 bg-[#600000] flex items-center justify-center">
      <form onSubmit={handleLogin} className="w-full max-w-sm p-6">
        <div className="mb-4">
          <label className="block text-white mb-1">Email</label>
          <input
            type="text"
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
            className="absolute right-2 top-9 text-black-800"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <Eye /> : <EyeOff />}
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
