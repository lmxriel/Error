import React from "react";
import { useNavigate } from "react-router-dom";
import PawfectCareLogo from "../../assets/PawfectCareLogo.svg";
import BookingPoster from "../../assets/BookingPoster.png";
import consultation from "../../assets/consultation.svg";
import checkup from "../../assets/checkup.svg";
import antiRabies from "../../assets/antiRabies.svg";
import deworm from "../../assets/deworm.svg";
import BookingConfirmationModal from "../../Components/Modals/BookingConfirmationModal";

function BookingPage() {
  const navigate = useNavigate();
  const delayedNavigate = (path) => {
    setTimeout(() => {
      navigate(path);
    }, 300); // 800ms delay (change as needed)
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
                  <img
                    src={BookingPoster}
                    className="w-full h-auto"
                    />
                </div>    

          {/* About Section */}
          <div className="bg-[#a16f4a] min-h-screen text-center">
            <section className="px-6 py-20">
              <h2 className="relative -top-2 text-3xl font-extrabold text-white mb-6 justify-center ml-5">All Pet Care Services</h2>
            </section>
 
            <div className="bg-yellow-200 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <img 
                src={consultation} 
                alt="consultation icon" 
                className="w-12 h-12" 
              />
            </div>

              <button onClick={() => navigate("/booking-form")}
              className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-300 transition duration-300 shadow-md"  >Book Now
              </button>
            </div>
            </div>
    );
  }
export default BookingPage;