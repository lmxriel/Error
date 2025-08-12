import React from "react";
import { useNavigate } from "react-router-dom";
import PawfectCareLogo from "../../assets/PawfectCareLogo.svg";
import AdoptionImage from "../../assets/AdoptionImage.png";

function AdoptionPage() {
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
        {/* About Section */}
     <div className="bg-black-300 min-h-screen text-center">
       <section className="px-6 py-20">
         <h2 className="relative -top-2 text-3xl font-extrabold text-white mb-6 text-left ml-5">ABOUT US?</h2>
           <p className="mb-16 text-base w-full md:w-1/3 text-white text-justify ml-5">
              Pawfect Care is a web-based management system designed to make pet adoption
              easier and more accessible for residents of Tacurong City. Our platform connects
              adopters with loving pets in need of a home while also providing a seamless way
              to schedule veterinary consultations. By reducing the need for manual processing,
              we help streamline adoption efforts and ensure a smooth experience for adopters,
              pet owners, and the Tacurong City Veterinary Services Office.
            </p>
       </section>
      </div>

    </div>
  );
}
export default AdoptionPage
