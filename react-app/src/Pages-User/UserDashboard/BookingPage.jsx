import React from "react";
import { useNavigate } from "react-router-dom";
import PawfectCareLogo from "../../assets/PawfectCareLogo.svg";
import Cat from "../../assets/Cat.svg";
import BookingPoster from "../../assets/BookingPoster.png";
import consultation from "../../assets/consultation.svg";
import checkup from "../../assets/checkup.svg";
import antiRabies from "../../assets/antiRabies.svg";
import deworm from "../../assets/deworm.svg";
import BookingConfirmationModal from "../../Components/Modals/BookingConfirmationModal";

function BookingPage() {
  const navigate = useNavigate();
    const services = [
    {
      icon: consultation,
      title: "Consultation",
      description:
        "Get expert veterinary advice and personalized care for your pets.",
    },
    {
      icon: deworm,
      title: "Vaccination",
      description:
        "Maintain your pet’s health with proper deworming and anti-rabies treatments.",
    },
  ];
  const delayedNavigate = (path) => {
    setTimeout(() => {
      navigate(path);
    }, 300); // 300ms delay
  };


  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full flex items-center px-10 py-3 z-50 bg-white shadow-md carret-transparent">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <img
            src={PawfectCareLogo}
            alt="Pawfect Care Logo"
            className="w-10 h-10"
          />
          <span className="text-2xl font-bold">Pawfect Care</span>
        </div>

        {/* Center: Navigation */}
        <nav className="flex-grow flex justify-center gap-10 text-sm font-medium">
          <button
            onClick={() => delayedNavigate("/")}
            className="hover:text-[#ff7e67] transition-colors font-bold text-lg"
          >
            About Us
          </button>
          <button
            onClick={() => delayedNavigate("/adoption")}
            className="hover:text-[#ff7e67] transition-colors font-bold text-lg "
          >
            Adoption
          </button>
          <button
            onClick={() => delayedNavigate("/booking")}
            className="hover:text-[#ff7e67] transition-colors font-bold text-lg underline"
          >
            Book
          </button>
        </nav>

        {/* Right: Sign in */}
        <button
          onClick={() => navigate("/user/login")}
          className="ml-auto px-8 py-3 border border-black rounded-full hover:bg-black hover:text-white transition"
        >
          Sign in
        </button>
      </header>

      {/* Poster Section */}
      <div className="-mt-1 w-full">
        <img src={BookingPoster} className="w-full h-auto" />
      </div>

      {/* About Section */}
        <div className="bg-[#a16f4a] py-20 min-h-screen">
      <section className="px-6 py-20 max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl font-extrabold text-white mb-12 text-center font-poppins">
          We Provide Best Services
        </h2>

      {/* Service Cards */}
      <div className="flex flex-wrap justify-center gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="w-72 bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition"
          >
            <div className="flex justify-center">
              <div className="bg-yellow-200 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <img
                  src={service.icon}
                  alt={`${service.title} icon`}
                  className="w-8 h-8"
                />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {service.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4">{service.description}</p>
          </div>
        ))}
      </div>



        {/* Booking Button */}
        <div className="flex justify-center mt-16">
          <button
            onClick={() => navigate("/booking-form")}
            className="px-6 py-3 bg-white text-black font-semibold rounded-3xl shadow-md hover:bg-gray-200"
          >
            Book Now
          </button>
        </div>
      </section>
         </div>

         {/* Footer */}
      <footer className="bg-white text-black py-10 px-6 md:px-20">
        <div className="text-center mb-6">
          
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 text-m gap-8 text-center md:text-left">
          <div>
            <h4 className="font-semibold mb-2">Location:</h4>
            <p>Office of Veterinary Services,<br />
              Bonifacio Street, Barangay Poblacion,<br />
              Tacurong, Philippines, 9800</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Email:</h4>
            <p>ovstacurong@gmail.com</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Contact Number:</h4>
            <p>09705475747</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Website:</h4>
            <p>www.pawfectcare.com</p>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default BookingPage;
