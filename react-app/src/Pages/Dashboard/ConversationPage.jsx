import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ConversationPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Simulate fetching conversation by id (replace with real API call)
  const [conversation, setConversation] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // For demo, hardcoded conversation message from MessagesPage sample
    // Ideally, fetch messages by conversation id from API/backend
    if (id === "1") {
      setConversation({
        id: 1,
        sender: "John Doe",
        messages: [
          {
            id: 101,
            from: "John Doe",
            content: "Hi, I would like to know more about adopting Buddy.",
            timestamp: "2025-08-10T14:30:00Z",
          },
        ],
      });
    } else if (id === "2") {
      setConversation({
        id: 2,
        sender: "Jane Smith",
        messages: [
          {
            id: 201,
            from: "Jane Smith",
            content: "Thank you for confirming my appointment on 2025-08-12.",
            timestamp: "2025-08-11T09:15:00Z",
          },
        ],
      });
    } else {
      // If not found, redirect back to messages
      navigate("/messages");
    }
  }, [id, navigate]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const newMsgObj = {
      id: Date.now(),
      from: "You",
      content: newMessage.trim(),
      timestamp: new Date().toISOString(),
    };

    setConversation((prev) => ({
      ...prev,
      messages: [...prev.messages, newMsgObj],
    }));

    setNewMessage("");
  };

  if (!conversation) return <p>Loading conversation...</p>;

  return (
    <div className="min-h-screen flex flex-col p-6 bg-gray-100">
      <button
        onClick={() => navigate("/messages")}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Back to Messages
      </button>

      <h2 className="text-2xl font-semibold mb-4">
        Conversation with {conversation.sender}
      </h2>

      <div className="flex-grow bg-white rounded-md shadow p-4 overflow-y-auto mb-4" style={{maxHeight: '60vh'}}>
        {conversation.messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-3 max-w-md p-3 rounded ${
              msg.from === "You"
                ? "bg-blue-600 text-white self-end"
                : "bg-gray-200 text-gray-800"
            }`}
            style={{ alignSelf: msg.from === "You" ? "flex-end" : "flex-start" }}
          >
            <p>{msg.content}</p>
            <small className="block mt-1 text-xs text-gray-500">
              {new Date(msg.timestamp).toLocaleString()}
            </small>
          </div>
        ))}
      </div>

      <div className="flex space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow border rounded p-2"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendMessage();
          }}
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ConversationPage;
