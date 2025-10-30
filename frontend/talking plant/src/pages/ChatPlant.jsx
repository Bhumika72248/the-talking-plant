import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ChatPlant = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    const reply = `🌿 Plant says: I feel ${["happy", "thirsty", "fresh", "sunny"][Math.floor(Math.random() * 4)]} today!`;
    setMessages([...messages, { sender: "You", text: input }, { sender: "Plant", text: reply }]);
    setInput("");
  };

  return (
    <div>
      <Navbar />
      <div className="p-8 bg-green-50 min-h-screen">
        <h2 className="text-3xl font-bold text-green-700 mb-6">Chat with Your Plant 💬</h2>
        <div className="bg-white p-4 rounded-xl shadow-md h-[400px] overflow-y-auto">
          {messages.map((m, i) => (
            <p key={i} className={`my-2 ${m.sender === "You" ? "text-right text-green-800" : "text-left text-gray-700"}`}>
              <b>{m.sender}:</b> {m.text}
            </p>
          ))}
        </div>
        <div className="mt-4 flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 border border-green-300 rounded-xl"
            placeholder="Ask your plant something..."
          />
          <button onClick={handleSend} className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700">
            Send
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChatPlant;
