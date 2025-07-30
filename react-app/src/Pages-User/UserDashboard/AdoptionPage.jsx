import React from "react";
import { useNavigate } from "react-router-dom";

// Assets
import PawfectCareLogo from "../UserDashboard/PawfectCareLogo.svg";
import DogBanner from "../UserDashboard/DogBanner.png";

export default function AdoptionPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-300">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={PawfectCareLogo} alt="Pawfect Care Logo" className="w-10 h-10" />
          <span className="text-2xl font-bold">Pawfect Care</span>
        </div>

        {/* Navigation */}
        <nav className="flex-grow flex justify-center ml-[-150px] gap-10 text-sm font-medium">
          <button onClick={() => navigate("/about")} className="hover:text-[#ff7e67] transition-colors">
            About Us
          </button>
          <button
            onClick={() => navigate("/adoption")}
            className="hover:text-[#ff7e67] transition-colors font-bold underline"
          >
            Adoption
          </button>
          <button onClick={() => navigate("/book")} className="hover:text-[#ff7e67] transition-colors">
            Book
          </button>
        </nav>

        {/* Sign In */}
        <div>
          <button
            onClick={() => navigate("/signin")}
            className="px-4 py-1 border border-black rounded-full hover:bg-black hover:text-white transition"
          >
            Sign in
          </button>
        </div>
      </header>

      {/* Banner Section */}
      <section className="relative w-full h-[300px] flex items-center justify-center bg-gradient-to-r from-[#fef4e8] to-white overflow-hidden">
        <img src={DogBanner} alt="Dog Banner" className="absolute left-0 h-full object-contain" />
        <div className="text-right pr-10 z-10">
          <h1 className="text-4xl font-black text-[#5e4224]">ADOPT.</h1>
          <p className="text-xl font-bold text-[#b88a4c]">DON’T SHOP</p>
        </div>
      </section>

      {/* Pet Type Buttons */}
      <section className="flex justify-center gap-6 py-16 bg-[#f4f1f1]">
        <button
          onClick={() => navigate("/adoption/dogs")}
          className="bg-white px-10 py-4 rounded-xl shadow-md text-xl font-semibold hover:bg-gray-100 transition"
        >
          DOG
        </button>
        <button
          onClick={() => navigate("/adoption/cats")}
          className="bg-white px-10 py-4 rounded-xl shadow-md text-xl font-semibold hover:bg-gray-100 transition"
        >
          CAT
        </button>
      </section>
    </div>
  );
}
