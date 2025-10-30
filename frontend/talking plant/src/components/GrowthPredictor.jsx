import React, { useState } from "react";

const GrowthPredictor = () => {
  const [prediction, setPrediction] = useState("");

  const predictGrowth = () => {
    const msgs = [
      "Your plant will grow lushly in the next 3 days 🌿",
      "It might need more sunlight ☀️",
      "Water levels are perfect 💧",
      "Soil nutrients are strong 🌱",
    ];
    setPrediction(msgs[Math.floor(Math.random() * msgs.length)]);
  };

  return (
    <div className="bg-green-100 p-6 rounded-2xl shadow-lg text-center mt-4">
      <h3 className="text-green-800 text-lg font-semibold mb-2">Growth Predictor</h3>
      <button
        onClick={predictGrowth}
        className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700"
      >
        Predict Growth 🌾
      </button>
      {prediction && <p className="mt-3 text-gray-700 italic">{prediction}</p>}
    </div>
  );
};

export default GrowthPredictor;
