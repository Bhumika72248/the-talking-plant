import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div>
      <Navbar />
      <div className="p-8 bg-green-50 min-h-screen text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-6">About Talking Plant AI 🌿</h2>
        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Talking Plant AI is an innovative solution that bridges the communication gap between humans and plants using Artificial Intelligence.  
          This project simulates plant emotions and conditions based on real-time sensor data — including soil moisture, sunlight, and humidity.
        </p>
        <p className="mt-6 text-green-800 font-semibold">
          “Because plants do talk — we just needed to learn their language.” 💚
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default About;
