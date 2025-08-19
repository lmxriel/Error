import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, X } from "lucide-react";
import PawfectCareLogo from "../../assets/PawfectCareLogo.svg";
import AdoptionBanner from "../../assets/AdoptionBanner.png";

const pets = [
  { id: 1, type: "Dog", name: "Buddy", image: "https://placedog.net/400/300?id=1" },
  { id: 2, type: "Cat", name: "Whiskers", image: "https://placekitten.com/400/300" },
  { id: 3, type: "Dog", name: "Rex", image: "https://placedog.net/400/300?id=2" },
  { id: 4, type: "Cat", name: "Mittens", image: "https://placekitten.com/401/300" },
];

function AdoptionPage() {
  const navigate = useNavigate();

  // Chat state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: "bot", text: "Hello! How can we help you today? 🐾" },
  ]);
  const [input, setInput] = useState("");

  // Handle send message
  const sendMessage = () => {
    if (!input.trim()) return; // prevent empty messages
    const newMessage = { id: Date.now(), sender: "user", text: input };
    setMessages([...messages, newMessage]);
    setInput(""); // clear input
  };

  // Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen text-gray-900 relative">
      {/* Header */}
      <header className="absolute top-0 left-0 w-full flex justify-between items-center px-10 py-6 z-50">
        <div className="flex items-center gap-2">
          <img src={PawfectCareLogo} alt="Pawfect Care Logo" className="w-10 h-10" />
          <span className="text-2xl font-bold">Pawfect Care</span>
        </div>
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
      <div className="-mt-1 w-full bg-[#D7DBF5]">
        <img src={AdoptionBanner} className="w-full h-auto" />
      </div>

      {/* Available Pets Section */}
      <section className="px-6 py-12 max-w-7xl mx-auto mt-20">
        <h2 className="text-3xl font-bold mb-8 text-center">Available Pets for Adoption</h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => alert(`You clicked on ${pet.name}`)}
            >
              <img src={pet.image} alt={pet.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{pet.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{pet.type}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ Floating Chat Icon */}
      <button
        className="fixed bottom-6 right-6 bg-[#ff7e67] text-white p-4 rounded-full shadow-lg hover:bg-[#ff5c47] transition"
        onClick={() => setIsChatOpen(true)}
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* ✅ Chat Popup */}
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
