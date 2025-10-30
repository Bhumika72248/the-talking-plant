import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import weatherData from "../utils/weatherData";

const WeatherInsights = () => {
  const today = weatherData[weatherData.length - 1];

  return (
    <div>
      <Navbar />
      <div className="p-8 bg-green-50 min-h-screen">
        <h2 className="text-3xl font-bold text-green-700 mb-6">Weather Insights 🌦️</h2>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-green-800 mb-3">Today’s Forecast</h3>
            <p className="text-gray-700">Temperature: {today.temperature}°C</p>
            <p className="text-gray-700">Humidity: {today.humidity}%</p>
            <p className="text-gray-700">Condition: {today.condition}</p>
            <p className="mt-2 italic text-green-700">
              🌿 Suggestion: {today.tip}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-green-800 mb-3">Next 3 Days Forecast</h3>
            {weatherData.slice(-4, -1).map((day, i) => (
              <div key={i} className="border-b py-2 text-gray-700">
                <p><b>{day.day}</b> — {day.temperature}°C, {day.condition}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WeatherInsights;
