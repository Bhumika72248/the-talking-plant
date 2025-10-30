import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import VoiceButton from "../components/VoiceButton";
import { sensorAPI, speakMessage } from "../utils/api";

const ChatPlant = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [currentReading, setCurrentReading] = useState(null);

  useEffect(() => {
    const fetchPlantStatus = async () => {
      try {
        const reading = await sensorAPI.getCurrentReading();
        setCurrentReading(reading);
        setMessages([{
          sender: "Plant",
          text: `Hello! ${reading.message}`,
          timestamp: new Date().toLocaleTimeString()
        }]);
      } catch (error) {
        console.error('Failed to fetch plant status:', error);
      }
    };
    fetchPlantStatus();
  }, []);

  const generatePlantResponse = async (userMessage) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          plantData: currentReading
        })
      });
      
      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Chat API Error:', error);
      // Fallback response
      return "I'm having trouble thinking right now. Maybe I need more sunlight? ☀️";
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = { sender: "You", text: input, timestamp: new Date().toLocaleTimeString() };
    setMessages(prev => [...prev, userMessage]);
    
    // Show typing indicator
    const typingMessage = {
      sender: "Plant",
      text: "🌿 Thinking...",
      timestamp: new Date().toLocaleTimeString(),
      isTyping: true
    };
    setMessages(prev => [...prev, typingMessage]);
    
    const currentInput = input;
    setInput("");
    
    try {
      const aiResponse = await generatePlantResponse(currentInput);
      const plantReply = {
        sender: "Plant",
        text: `🌿 ${aiResponse}`,
        timestamp: new Date().toLocaleTimeString()
      };
      
      // Remove typing indicator and add real response
      setMessages(prev => prev.filter(msg => !msg.isTyping).concat(plantReply));
      speakMessage(plantReply.text);
    } catch (error) {
      // Remove typing indicator and show error
      setMessages(prev => prev.filter(msg => !msg.isTyping).concat({
        sender: "Plant",
        text: "🌿 Sorry, I'm having trouble thinking right now! 🌱",
        timestamp: new Date().toLocaleTimeString()
      }));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-8 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-plant-700 dark:text-plant-300 mb-6">
            Chat with Your Plant 💬
          </h2>
          <div className="card p-6 h-[500px] overflow-y-auto mb-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-400 mt-20">
                <div className="text-6xl mb-4">🌱</div>
                <p>Start a conversation with your plant!</p>
              </div>
            ) : (
              messages.map((m, i) => (
                <div key={i} className={`mb-4 ${m.sender === "You" ? "text-right" : "text-left"}`}>
                  <div className={`inline-block max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    m.sender === "You" 
                      ? "bg-plant-500 text-white" 
                      : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  }`}>
                    <p className="font-medium text-sm opacity-75">{m.sender}</p>
                    <p>{m.text}</p>
                    <p className="text-xs opacity-50 mt-1">{m.timestamp}</p>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="flex gap-3 items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 p-3 border border-plant-300 dark:border-plant-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              placeholder="Ask your plant something..."
            />
            <button 
              onClick={handleSend} 
              className="bg-plant-600 text-white px-6 py-3 rounded-xl hover:bg-plant-700 transition-colors"
            >
              Send
            </button>
            <VoiceButton message={currentReading?.message || "Hello! I'm your talking plant!"} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChatPlant;
