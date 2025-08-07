import React from "react";
import { useNavigate } from "react-router-dom";
import PawfectCareLogo from "../UserDashboard/PawfectCareLogo.svg";
import AdoptionImage from "../UserDashboard/AdoptionImage.png";

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
          <button onClick={() => navigate("/")} className="hover:text-[#ff7e67] transition-colors">
            About Us
          </button>
          <button
            onClick={() => navigate("/adoption")}
            className="hover:text-[#ff7e67] transition-colors font-bold underline"
          >
            Adoption
          </button>
          <button onClick={() => navigate("/booking")} className="hover:text-[#ff7e67] transition-colors">
            Book
          </button>
        </nav>

    
      </header>


   {/* Banner Section */}
        <div className="-mt-1 w-full">
          <img
            src={AdoptionImage}
             className="w-full h-auto"
             />
        </div>


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
