import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { MessageCircle, X } from "lucide-react";
import PawfectCareLogo from "../../assets/PawfectCareLogo.svg";
import AdoptionBanner from "../../assets/AdoptionBanner.png";
import PetGroup from "../../assets/PetGroup.svg";

function AdoptionPage() {
  const navigate = useNavigate();
  const delayedNavigate = (path) => {
    setTimeout(() => {
      navigate(path);
    }, 300); // 800ms delay (change as needed)
  };
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: "bot", text: "Hello! How can we help you today? 🐾" },
  ]);
  const [input, setInput] = useState("");

  // Handle send message
  const sendMessage = () => {
    if (!input.trim()) return; 
    const newMessage = { id: Date.now(), sender: "user", text: input };
    setMessages([...messages, newMessage]);
    setInput(""); 

    // Optional: simulate bot reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: "bot", text: "Thanks for reaching out! We’ll get back to you soon 🐶🐱" },
      ]);
    }, 1000);
  };

  // Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen text-gray-900 relative bg-white">
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
            className="hover:text-[#ff7e67] transition-colors font-bold text-lg underline"
          >
            Adoption
          </button>
          <button
            onClick={() => delayedNavigate("/booking")}
            className="hover:text-[#ff7e67] transition-colors font-bold text-lg"
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

      {/* Banner Section */}
      <div className="w-full bg-[#D7DBF5] mt-[64px]"> 
        <img 
          src={AdoptionBanner} 
          alt="Adoption Campaign Banner" 
          className="w-full h-auto object-cover" 
        />
      </div>

      {/* Pet Category Section */}
      <section className="px-6 py-12 max-w-7xl mx-auto mt-12">
        <h2 className="text-4xl font-poppins font-bold mb-12 text-center">
          Available Pets for Adoption
        </h2>

        {/* Category Buttons */}
        <div className="flex justify-center gap-8 mb-0 relative z-10">
          <button 
            onClick={() => navigate("/dogs")} 
            className="px-6 py-2 bg-[#a9b2d6] text-white font-medium rounded-3xl shadow-md"
          >
            Dogs
          </button>
          <button 
            onClick={() => navigate("/cats")} 
            className="px-6 py-2 bg-[#dbcdb4] text-white font-medium rounded-3xl shadow-md"
          >
            Cats
          </button>
          <button 
            onClick={() => navigate("/all")} 
            className="px-6 py-2 bg-[#a16f4a] text-white font-medium rounded-3xl shadow-md"
          >
            All
          </button>
        </div>

        {/* Pet Group Image */}
        <div className="flex justify-center -mt-48">
          <img 
            src={PetGroup} 
            alt="Group of pets illustration" 
            className="w-[800px] max-w-full h-auto" 
          />
        </div>
      </section>

      {/* Floating Chat Icon */}
      <button
        className="fixed bottom-6 right-6 bg-[#ff7e67] text-white p-4 rounded-full shadow-lg hover:bg-[#ff5c47] transition"
        onClick={() => setIsChatOpen(true)}
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Popup */}
      {isChatOpen && (
        <div className="fixed bottom-20 right-6 w-80 bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-3 bg-[#ff7e67] text-white rounded-t-xl">
            <span className="font-semibold">Chat with Us</span>
            <button onClick={() => setIsChatOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-3 overflow-y-auto h-60 text-sm space-y-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-2 rounded-lg max-w-[75%] ${
                  msg.sender === "user"
                    ? "bg-[#ff7e67] text-white self-end ml-auto"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 border-t flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#ff7e67]"
            />
            <button
              onClick={sendMessage}
              className="bg-[#ff7e67] text-white px-3 py-2 rounded-lg hover:bg-[#ff5c47]"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdoptionPage;
