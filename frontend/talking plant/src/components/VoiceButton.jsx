import React from "react";

const VoiceButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-md flex items-center gap-2"
  >
    🎤 Talk to Plant
  </button>
);

export default VoiceButton;
