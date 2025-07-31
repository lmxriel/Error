import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function UserLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <div className="text-4xl font-semibold text-black flex items-center justify-center gap-2">
            <span role="img" aria-label="paw">🐾</span> Pawfect Care
          </div>
        </div>

        <form className="space-y-4">
          <div className="flex justify-between text-sm text-black">
            <label>Email</label>
            <a href="/register" className="underline">Register</a>
          </div>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
            placeholder="Enter your email"
          />

          <div className="text-sm text-black">Password</div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-2 border rounded-md pr-10 focus:outline-none"
              placeholder="Enter your password"
            />
            <div
              className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
              onClick={togglePassword}
            >
            {showPassword ? <Eye /> : <EyeOff />}
            </div>
          </div>

          <div className="flex justify-end items-center text-sm">
            <a href="/forgot-password" className="text-black underline">Forgot Password?</a>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-md bg-[#b18162] text-white font-semibold text-lg hover:bg-[#a06e4d]"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
