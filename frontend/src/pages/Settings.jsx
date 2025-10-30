import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Settings = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <div className={theme === "dark" ? "bg-gray-900 text-white" : "bg-green-50 text-black"}>
      <Navbar />
      <div className="p-8 min-h-screen">
        <h2 className="text-3xl font-bold text-green-700 mb-6">Settings ⚙️</h2>
        <button
          onClick={toggleTheme}
          className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
        >
          Toggle {theme === "light" ? "Dark" : "Light"} Mode
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Settings;
