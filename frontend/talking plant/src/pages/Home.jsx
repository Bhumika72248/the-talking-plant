import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import VoiceButton from "../components/VoiceButton";

const Home = () => {
  return (
    <div>
      <Navbar />
      <section className="text-center p-12 bg-green-50 min-h-[70vh] flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-green-700">Welcome to Talking Plant AI 🌿</h1>
        <p className="mt-4 text-gray-700 max-w-xl mx-auto">
          Experience a new era of agriculture — where plants communicate their needs through AI-powered sensors and virtual intelligence.
        </p>
        <div className="mt-6">
          <VoiceButton onClick={() => alert('Hello human! I feel sunny today 🌞')} />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
