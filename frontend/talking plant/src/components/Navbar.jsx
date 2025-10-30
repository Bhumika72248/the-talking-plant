import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-green-700 text-white p-4 shadow-lg flex justify-between items-center">
      <h1 className="text-2xl font-bold">🌿 Talking Plant AI</h1>
      <ul className="flex gap-6">
        <li><a href="/" className="hover:text-green-200">Home</a></li>
        <li><a href="/dashboard" className="hover:text-green-200">Dashboard</a></li>
        <li><a href="/chat" className="hover:text-green-200">Chat</a></li>
        <li><a href="/community" className="hover:text-green-200">Community</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
