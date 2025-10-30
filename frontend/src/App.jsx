import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import ModernNavbar from "./components/ModernNavbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ChatPlant from "./pages/ChatPlant";
import WeatherInsights from "./pages/WeatherInsights";
import Diary from "./pages/Diary";
import Settings from "./pages/Settings";
import Community from "./pages/Community";
import About from "./pages/About";
import { sensorAPI } from "./utils/api";

function App() {
  const [currentReading, setCurrentReading] = useState(null);
  const [history, setHistory] = useState([]);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [current, historyData] = await Promise.all([
          sensorAPI.getCurrentReading(),
          sensorAPI.getHistory(50)
        ]);
        setCurrentReading(current);
        setHistory(historyData);
        setIsConnected(true);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setIsConnected(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home currentReading={currentReading} />} />
          <Route path="/*" element={
            <>
              <ModernNavbar />
              <Routes>
                <Route path="/dashboard" element={
                  <Dashboard 
                    currentReading={currentReading} 
                    history={history} 
                    isConnected={isConnected} 
                  />
                } />
                <Route path="/chat" element={<ChatPlant currentReading={currentReading} />} />
                <Route path="/weather" element={<WeatherInsights />} />
                <Route path="/diary" element={<Diary />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/community" element={<Community />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </>
          } />
        </Routes>
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: 'white',
              color: '#1f2937',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
            }
          }}
        />
      </div>
    </BrowserRouter>
  )
}

export default App
