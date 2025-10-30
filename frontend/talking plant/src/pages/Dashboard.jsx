import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SensorChart from "../components/SensorChart";
import MoodCard from "../components/MoodCard";
import GrowthPredictor from "../components/GrowthPredictor";
import sensorData from "../utils/sensorData";

const Dashboard = () => {
  const latest = sensorData[sensorData.length - 1];
  return (
    <div>
      <Navbar />
      <div className="p-8 bg-green-50 min-h-screen">
        <h2 className="text-3xl font-bold text-green-700 mb-6">Plant Health Dashboard 🌱</h2>
        <div className="grid grid-cols-3 gap-6">
          <MoodCard title="Temperature" value={`${latest.temp}°C`} mood="Comfortable" />
          <MoodCard title="Moisture" value={`${latest.moisture}%`} mood="Hydrated" />
          <MoodCard title="Sunlight" value={`${latest.sunlight} lux`} mood="Optimal" />
        </div>
        <div className="grid grid-cols-3 gap-6 mt-6">
          <SensorChart data={sensorData} dataKey="temp" color="#16a34a" />
          <SensorChart data={sensorData} dataKey="moisture" color="#3b82f6" />
          <SensorChart data={sensorData} dataKey="sunlight" color="#facc15" />
        </div>
        <GrowthPredictor />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
