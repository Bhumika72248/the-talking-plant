import React from "react";
import { Volume2 } from "lucide-react";
import { speakMessage } from "../utils/api";

const VoiceButton = ({ message = "Hello! I'm your talking plant. How are you today?" }) => {
  const handleSpeak = () => {
    speakMessage(message);
  };

  return (
    <button
      onClick={handleSpeak}
      className="bg-plant-600 hover:bg-plant-700 text-white px-6 py-3 rounded-full shadow-md flex items-center gap-2 transition-colors"
    >
      <Volume2 size={20} />
      🎤 Talk to Plant
    </button>
  );
};

export default VoiceButton;
