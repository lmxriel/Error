import React, { useState, useEffect } from "react";
import OVSLogo from "../../assets/OVSLogo.png";
import { Trash2 } from "lucide-react"; // icon library (lucide-react)

function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function MessagesPage() {
  const [conversations, setConversations] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [reply, setReply] = useState("");

  useEffect(() => {
    setConversations([
      {
        id: 1,
        sender: "John Doe",
        subject: "Inquiry about adoption",
        messages: [
          {
            from: "John Doe",
            text: "Hi, I would like to know more about adopting Buddy.",
            time: "2025-08-10T14:30:00Z",
          },
        ],
        dateSent: "2025-08-10T14:30:00Z",
        status: "Unread",
      },
      {
        id: 2,
        sender: "Jane Smith",
        subject: "Appointment confirmation",
        messages: [
          {
            from: "Jane Smith",
            text: "Thank you for confirming my appointment on 2025-08-12.",
            time: "2025-08-11T09:15:00Z",
          },
        ],
        dateSent: "2025-08-11T09:15:00Z",
        status: "Read",
      },
    ]);
  }, []);

  const openConversation = (message) => {
    if (message.status === "Unread") {
      setConversations((prev) =>
        prev.map((msg) =>
          msg.id === message.id ? { ...msg, status: "Read" } : msg
        )
      );
    }
    setSelectedMessage(message);
  };

  const closeConversation = () => {
    setSelectedMessage(null);
    setReply("");
  };

  const sendReply = () => {
    if (!reply.trim() || !selectedMessage) return;

    const newMsg = {
      from: "You",
      text: reply.trim(),
      time: new Date().toISOString(),
    };

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === selectedMessage.id
          ? { ...conv, messages: [...conv.messages, newMsg] }
          : conv
      )
    );

    setSelectedMessage((prev) => ({
      ...prev,
      messages: [...prev.messages, newMsg],
    }));

    setReply("");
  };

  const deleteMessage = (index) => {
    if (!selectedMessage) return;

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === selectedMessage.id
          ? {
              ...conv,
              messages: conv.messages.filter((_, i) => i !== index),
            }
          : conv
      )
    );

    setSelectedMessage((prev) => ({
      ...prev,
      messages: prev.messages.filter((_, i) => i !== index),
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // prevent newline
      sendReply();
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100 relative overflow-hidden">
      {/* Messages List */}
      <div className="flex-grow p-6">
        <div className="flex items-center mb-6">
          <img
            className="w-10 h-10 rounded-full mr-3"
            src={OVSLogo}
            alt="Logo"
          />
          <h1 className="text-xl font-semibold text-gray-800">
            Tacurong City Veterinary Services Office
          </h1>
        </div>

        <div className="bg-white rounded-md shadow divide-y divide-gray-200">
          {conversations.length === 0 ? (
            <p className="text-center p-6 text-gray-500">No messages found.</p>
          ) : (
            conversations.map((msg) => (
              <button
                key={msg.id}
                onClick={() => openConversation(msg)}
                className={`flex items-center w-full p-4 text-left hover:bg-gray-50 focus:outline-none ${
                  msg.status === "Unread" ? "bg-blue-50 font-semibold" : ""
                }`}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center mr-4 text-lg font-bold select-none">
                  {getInitials(msg.sender)}
                </div>
                <div className="flex-grow overflow-hidden">
                  <p className="truncate text-gray-900">{msg.sender}</p>
                  <p className="truncate text-gray-600 text-sm">{msg.subject}</p>
                </div>
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

      {/* Slide-In Conversation Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-2/3 md:w-1/2 lg:w-2/5 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          selectedMessage ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {selectedMessage && (
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">
                {selectedMessage.subject}
              </h2>
              <button
                onClick={closeConversation}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {selectedMessage.messages.map((m, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg max-w-xs relative group ${
                    m.from === "You"
                      ? "bg-blue-600 text-white self-end ml-auto"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <p className="text-sm">{m.text}</p>
                  <p className="text-[10px] opacity-70 mt-1">
                    {new Date(m.time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  {/* Delete Icon */}
                  <button
                    onClick={() => deleteMessage(index)}
                    className="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            {/* Reply Box */}
            <div className="border-t p-4 flex items-center space-x-2">
              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your reply..."
                className="flex-grow border rounded px-3 py-2 text-sm resize-none"
                rows={1}
              />
              <button
                onClick={sendReply}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessagesPage;
