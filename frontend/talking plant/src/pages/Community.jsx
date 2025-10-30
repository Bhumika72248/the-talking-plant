import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [msg, setMsg] = useState("");

  const addPost = () => {
    if (!msg.trim()) return;
    setPosts([{ text: msg, user: "You", time: new Date().toLocaleTimeString() }, ...posts]);
    setMsg("");
  };

  return (
    <div>
      <Navbar />
      <div className="p-8 bg-green-50 min-h-screen">
        <h2 className="text-3xl font-bold text-green-700 mb-6">Plant Community 🌍</h2>
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            placeholder="Share your plant updates..."
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            className="flex-1 p-2 border border-green-300 rounded-xl"
          />
          <button onClick={addPost} className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700">
            Post
          </button>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md">
          {posts.length === 0 ? (
            <p className="text-gray-500 italic">No community posts yet.</p>
          ) : (
            posts.map((p, i) => (
              <div key={i} className="border-b py-2">
                <p className="text-green-700 font-semibold">{p.user}</p>
                <p className="text-gray-700">{p.text}</p>
                <p className="text-xs text-gray-400">{p.time}</p>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Community;
