import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Diary = () => {
  const [entries, setEntries] = useState([]);
  const [note, setNote] = useState("");

  const addNote = () => {
    if (!note.trim()) return;
    setEntries([{ date: new Date().toLocaleString(), text: note }, ...entries]);
    setNote("");
  };

  return (
    <div>
      <Navbar />
      <div className="p-8 bg-green-50 min-h-screen">
        <h2 className="text-3xl font-bold text-green-700 mb-6">Plant Diary 📔</h2>
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            placeholder="Record your observation..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="flex-1 p-2 border border-green-300 rounded-xl"
          />
          <button onClick={addNote} className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700">
            Add
          </button>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md">
          {entries.length === 0 ? (
            <p className="text-gray-500 italic">No diary entries yet.</p>
          ) : (
            entries.map((entry, i) => (
              <div key={i} className="border-b py-2">
                <p className="text-green-700 font-semibold">{entry.date}</p>
                <p className="text-gray-700">{entry.text}</p>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Diary;
