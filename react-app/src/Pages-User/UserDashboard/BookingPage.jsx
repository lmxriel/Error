import React from "react";
import { useNavigate } from "react-router-dom";
import PawfectCareLogo from "../../assets/PawfectCareLogo.svg";
import BookingPoster from "../../assets/BookingPostersImage.png";

function BookingPage() {
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
              className="hover:text-[#ff7e67] transition-colors"
            >
              Adoption
            </button>
            <button onClick={() => navigate("/booking")} className="hover:text-[#ff7e67] transition-colors font-bold underline">
              Book
            </button>
          </nav>
      
        </header>
  
     {/* Poster Section */}
          <div className="-mt-1 w-full">
            <img
              src={BookingPoster}
               className="w-full h-auto"
               />
          </div>    
    </div>
    );
}
export default BookingPage;