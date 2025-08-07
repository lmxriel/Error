import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UserRegistrationPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <div className="text-4xl font-semibold text-black flex items-center justify-center gap-2">
            <span role="img" aria-label="paw">🐾</span> Pawfect Care
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm text-black">First Name</label>
            <input
              type="text"
              placeholder="First Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="text-sm text-black">Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="text-sm text-black">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="text-sm text-black">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-md pr-10 focus:outline-none"
                required
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm text-black">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full px-4 py-2 border rounded-md pr-10 focus:outline-none"
                required
              />
              <div
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
              >
                {showConfirmPassword ? <Eye /> : <EyeOff />}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-md bg-[#b18162] text-white font-semibold text-lg hover:bg-[#a06e4d]"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
