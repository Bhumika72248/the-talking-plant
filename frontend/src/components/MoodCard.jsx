import React from "react";

const MoodCard = ({ title, value, mood }) => {
  return (
    <div className="p-4 bg-green-100 rounded-2xl shadow-lg text-center hover:scale-105 transition-transform">
      <h3 className="font-semibold text-lg text-green-800">{title}</h3>
      <p className="text-3xl font-bold text-green-600">{value}</p>
      <p className="italic text-gray-600 mt-1">{mood}</p>
    </div>
  );
};

export default MoodCard;
