import React from "react";
import { useNavigate } from "react-router-dom";
import PawfectCareLogo from "../../assets/PawfectCareLogo.svg";
import AdoptionImage from "../../assets/AdoptionImage.png";

const pets = [
  {
    id: 1,
    type: "Dog",
    name: "Buddy",
    image: "https://placedog.net/400/300?id=1",
  },
  {
    id: 2,
    type: "Cat",
    name: "Whiskers",
    image: "https://placekitten.com/400/300",
  },
  {
    id: 3,
    type: "Dog",
    name: "Rex",
    image: "https://placedog.net/400/300?id=2",
  },
  {
    id: 4,
    type: "Cat",
    name: "Mittens",
    image: "https://placekitten.com/401/300",
  },
];

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
        <img src={AdoptionImage} className="w-full h-auto" />
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

      {/* Available Pets Section */}
      <section className="px-6 py-12 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Available Pets for Adoption</h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => alert(`You clicked on ${pet.name}`)} // You can replace this with navigate to detail page
            >
              <img
                src={pet.image}
                alt={pet.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{pet.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{pet.type}</p>
                <p className="text-gray-700 text-sm">{pet.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AdoptionPage;
