import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-plant-700 text-white p-4 shadow-lg flex justify-between items-center">
      <h1 className="text-2xl font-bold">🌿 The Talking Plant</h1>
      <ul className="flex gap-6">
        <li><Link to="/" className="hover:text-plant-200 transition-colors">Home</Link></li>
        <li><Link to="/dashboard" className="hover:text-plant-200 transition-colors">Dashboard</Link></li>
        <li><Link to="/chat" className="hover:text-plant-200 transition-colors">Chat</Link></li>
        <li><Link to="/weather" className="hover:text-plant-200 transition-colors">Weather</Link></li>
        <li><Link to="/community" className="hover:text-plant-200 transition-colors">Community</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
