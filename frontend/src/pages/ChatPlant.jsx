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

  const generatePlantResponse = (userMessage) => {
    const responses = {
      water: "Thanks for asking! My soil moisture is at " + (currentReading?.soilMoisture || 60) + "%. " + 
             (currentReading?.soilMoisture < 40 ? "I could use some water!" : "I'm well hydrated!"),
      temperature: "The temperature around me is " + (currentReading?.temperature || 25) + "°C. " +
                  (currentReading?.temperature > 30 ? "It's getting warm!" : "Perfect temperature!"),
      light: "I'm getting " + (currentReading?.lightIntensity || 500) + " lux of light. " +
            (currentReading?.lightIntensity < 300 ? "Could use more sunshine!" : "Great lighting!"),
      mood: currentReading?.message || "I'm feeling great today!",
      default: [
        "That's interesting! Tell me more about your day.",
        "I love chatting with you! How can I help?",
        "As a plant, I find human conversations fascinating!",
        "Thanks for talking to me. It helps me grow!"
      ]
    };

    const message = userMessage.toLowerCase();
    if (message.includes('water') || message.includes('thirsty')) return responses.water;
    if (message.includes('temperature') || message.includes('hot') || message.includes('cold')) return responses.temperature;
    if (message.includes('light') || message.includes('sun')) return responses.light;
    if (message.includes('how') && message.includes('feel')) return responses.mood;
    
    return responses.default[Math.floor(Math.random() * responses.default.length)];
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage = { sender: "You", text: input, timestamp: new Date().toLocaleTimeString() };
    const plantReply = {
      sender: "Plant",
      text: `🌿 ${generatePlantResponse(input)}`,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setMessages(prev => [...prev, userMessage, plantReply]);
    speakMessage(plantReply.text);
    setInput("");
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
