import React, { useState, useEffect } from "react";
import OVSLogo from "../../assets/OVSLogo.png";
import { useNavigate } from "react-router-dom";

function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function MessagesPage() {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        id: 1,
        sender: "John Doe",
        subject: "Inquiry about adoption",
        content: "Hi, I would like to know more about adopting Buddy.",
        dateSent: "2025-08-10T14:30:00Z",
        status: "Unread",
      },
      {
        id: 2,
        sender: "Jane Smith",
        subject: "Appointment confirmation",
        content: "Thank you for confirming my appointment on 2025-08-12.",
        dateSent: "2025-08-11T09:15:00Z",
        status: "Read",
      },
    ]);
  }, []);

  // Navigate to conversation page and mark message as read
  const openConversation = (message) => {
    if (message.status === "Unread") {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === message.id ? { ...msg, status: "Read" } : msg
        )
      );
    }
    navigate(`/conversations/${message.id}`);
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="flex-grow p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <img
              className="w-10 h-10 rounded-full mr-3"
              src={OVSLogo}
              alt="Logo"
            />
            <h1 className="text-xl font-semibold text-gray-800">
              Tacurong City Veterinary Services Office
            </h1>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-md shadow mb-6">
          <nav className="flex space-x-4 p-2 overflow-x-auto">
            <button
              onClick={() => navigate("/dashboard")}
              className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate("/pets")}
              className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Pets
            </button>
            <button
              onClick={() => navigate("/adoptions/pending")}
              className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Adoptions
            </button>
            <button
              onClick={() => navigate("/appointments")}
              className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Appointments
            </button>
            <button
              onClick={() => navigate("/messages")}
              className="px-4 py-2 rounded-md bg-gray-900 text-white"
            >
              Messages
            </button>
          </nav>
        </div>

        {/* Messages List */}
        <div className="bg-white rounded-md shadow divide-y divide-gray-200">
          {messages.length === 0 ? (
            <p className="text-center p-6 text-gray-500">No messages found.</p>
          ) : (
            messages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => openConversation(msg)}
                className={`flex items-center w-full p-4 text-left hover:bg-gray-50 focus:outline-none ${
                  msg.status === "Unread" ? "bg-blue-50 font-semibold" : ""
                }`}
              >
                {/* Avatar circle with initials */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center mr-4 text-lg font-bold select-none">
                  {getInitials(msg.sender)}
                </div>

                {/* Message info */}
                <div className="flex-grow overflow-hidden">
                  <p className="truncate text-gray-900">{msg.sender}</p>
                  <p className="truncate text-gray-600 text-sm">{msg.subject}</p>
                </div>

                {/* Date */}
                <div className="ml-4 text-xs text-gray-400 whitespace-nowrap select-none">
                  {new Date(msg.dateSent).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default MessagesPage;
