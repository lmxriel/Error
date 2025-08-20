import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PawfectCareLogo from "../../assets/PawfectCareLogo.svg";
import AdoptionBanner from "../../assets/AdoptionBanner.png";

const pets = [
  { 
    id: 1, 
    type: "Dog", 
    name: "Buddy", 
    image: "https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg",
    breed: "Golden Retriever",
    size: "Large",
    gender: "Male",
    weight: "30kg",
    color: "Golden",
    status: {
      medicalHistory: "Anti-Rabies",
    }
  },
  { 
    id: 2, 
    type: "Dog", 
    name: "Rex", 
    image: "https://images.pexels.com/photos/1307630/pexels-photo-1307630.jpeg",
    breed: "German Shepherd",
    size: "Large",
    gender: "Male",
    weight: "35kg",
    color: "Black & Tan",
    status: {
      medicalHistory: "Injured",
    }
  },
  { 
    id: 3, 
    type: "Cat", 
    name: "Whiskers", 
    image: "https://images.pexels.com/photos/96938/pexels-photo-96938.jpeg",
    breed: "Siamese",
    size: "Medium",
    gender: "Female",
    weight: "5kg",
    color: "White & Gray",
    status: {
      medicalHistory: "Healthy",
    }
  },
  { 
    id: 4, 
    type: "Cat", 
    name: "Mittens", 
    image: "https://images.pexels.com/photos/1543793/pexels-photo-1543793.jpeg",
    breed: "Persian",
    size: "Small",
    gender: "Male",
    weight: "4kg",
    color: "Brown",
    status: {
      medicalHistory: "Asthma",
    }
  },
]; 

function CatPage() {
  const navigate = useNavigate();
  const [selectedCat, setSelectedCat] = useState(null);

  const delayedNavigate = (path) => {
    setTimeout(() => {
      navigate(path);
    }, 300);
  };

  const cats = pets.filter((pet) => pet.type === "Cat");

  return (
    <div className="min-h-screen text-gray-900 relative">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full flex items-center px-10 py-3 z-50 bg-white shadow-md">
        <div className="flex items-center gap-2">
          <img src={PawfectCareLogo} alt="Pawfect Care Logo" className="w-10 h-10" />
          <span className="text-2xl font-bold">Pawfect Care</span>
        </div>

        <nav className="flex-grow flex justify-center gap-10 text-sm font-medium">
          <button onClick={() => delayedNavigate("/")} className="hover:text-[#ff7e67] transition-colors font-bold text-lg">About Us</button>
          <button onClick={() => delayedNavigate("/adoption")} className="hover:text-[#ff7e67] transition-colors font-bold text-lg underline">Adoption</button>
          <button onClick={() => delayedNavigate("/booking")} className="hover:text-[#ff7e67] transition-colors font-bold text-lg">Book</button>
        </nav>

        <button onClick={() => navigate("/user/login")} className="ml-auto px-8 py-3 border border-black rounded-full hover:bg-black hover:text-white transition">
          Sign in
        </button>
      </header>

      {/* Banner Section */}
      <div className="-mt-1 w-full bg-[#D7DBF5]">
        <img src={AdoptionBanner} className="w-full h-auto" alt="Adoption Banner" />
      </div>

      {/* Cats Section */}
      <section className="px-6 py-12 max-w-7xl mx-auto mt-20">
        <h2 className="text-4xl font-poppins font-bold mb-12 text-center">Available Cats for Adoption</h2>

        {/* Category Buttons */}
        <div className="flex justify-center gap-8 mb-8 mt-8 relative z-10">
          <button onClick={() => navigate("/dogs")} className="px-6 py-2 bg-[#a9b2d6] text-white font-medium rounded-3xl shadow-md">Dogs</button>
          <button onClick={() => navigate("/cats")} className="px-6 py-2 bg-[#dbcdb4] text-white font-medium rounded-3xl shadow-md">Cats</button>
          <button onClick={() => navigate("/all")} className="px-6 py-2 bg-[#a16f4a] text-white font-medium rounded-3xl shadow-md">All</button>
        </div>

        {/* Cat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
          {cats.map((cat) => (
            <div
              key={cat.id}
              className="bg-white shadow-md rounded-xl overflow-hidden p-4 text-center cursor-pointer hover:scale-105 transition"
              onClick={() => setSelectedCat(cat)}
            >
              <img src={cat.image} alt={cat.name} className="w-full h-48 object-cover rounded-md" />
              <h3 className="mt-3 text-lg font-bold">{cat.name}</h3>
              <p className="text-sm text-gray-600">{cat.breed}</p>
            </div>
          ))}
        </div>
      </section>

     {/* Modal */}
      {selectedCat && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl shadow-lg w-11/12 md:w-1/2 max-h-[90vh] overflow-y-auto p-6 relative">
            
            {/* Close Button in Circle */}
            <button
              onClick={() => setSelectedCat(null)}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-black transition"
            >
              ✖
            </button>

            <div className="flex flex-col items-center">
              {/* Pet Image */}
              <img
                src={selectedCat.image}
                alt={selectedCat.name}
                className="w-full h-69 object-cover rounded-lg shadow-md mb-4"
              />

              {/* Pet Name */}
              <h2 className="text-2xl font-bold">{selectedCat.name}</h2>
              <p className="text-gray-600 mb-6">{selectedCat.breed}</p>

              {/* Pet Details */}
              <div className="w-full">
                <h3 className="font-semibold text-xl mb-3 text-center border-b pb-2">
                  Pet Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-100 p-3 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Size</p>
                    <p className="font-medium">{selectedCat.size}</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="font-medium">{selectedCat.gender}</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Weight</p>
                    <p className="font-medium">{selectedCat.weight}</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Color</p>
                    <p className="font-medium">{selectedCat.color}</p>
                  </div>
                </div>

                {/* Medical Status */}
                <h3 className="font-semibold text-xl mt-6 mb-3 text-center border-b pb-2">
                  Medical Status
                </h3>
                <div className="space-y-3">
                  <div className="bg-green-100 p-3 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">History</p>
                    <p className="font-medium">{selectedCat.status?.medicalHistory}</p>
                  </div>
                </div>

                 {/* Adopt Button */}
                  <div className="mt-6 w-full flex justify-center">
                    <button   
                      onClick={() => navigate("/adoption-form")}
                      className="px-6 py-2 bg-black text-white font-semibold rounded-3xl shadow-md hover:bg-gray-800 transition"
                    >
                      Adopt
                    </button>
                  </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CatPage;
