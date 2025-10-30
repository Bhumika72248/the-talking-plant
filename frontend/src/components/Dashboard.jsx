import React, { useState, useEffect } from 'react';
import { Moon, Sun, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import PlantAvatar from './PlantAvatar';
import MoodDisplay from './MoodDisplay';
import SensorCard from './SensorCard';
import ChartComponent from './ChartComponent';
import { sensorAPI, speakMessage } from '../utils/api';

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentReading, setCurrentReading] = useState(null);
  const [history, setHistory] = useState([]);
  const [isConnected, setIsConnected] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(true);
  const [previousMood, setPreviousMood] = useState('');

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const fetchData = async () => {
    try {
      const [current, historyData] = await Promise.all([
        sensorAPI.getCurrentReading(),
        sensorAPI.getHistory(20)
      ]);
      
      setCurrentReading(current);
      setHistory(historyData);
      setLastUpdate(new Date());
      setIsConnected(true);

      // Auto-speak if mood changed and speech is enabled
      if (isSpeechEnabled && current.mood !== previousMood && previousMood !== '') {
        setTimeout(() => speakMessage(current.message), 1000);
      }
      setPreviousMood(current.mood);

    } catch (error) {
      console.error('Failed to fetch data:', error);
      setIsConnected(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [isSpeechEnabled, previousMood]);

  const calculateTrend = (current, history, field) => {
    if (history.length < 2) return 0;
    const previous = history[history.length - 2];
    return current[field] - previous[field];
  };

  if (!currentReading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">🌱</div>
          <div className="text-xl text-gray-600 dark:text-gray-400">
            Connecting to your plant...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              🌱 The Talking Plant
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              AI-Powered Plant Monitoring System
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              {isConnected ? <Wifi size={16} /> : <WifiOff size={16} />}
              <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
            </div>
            
            <button
              onClick={fetchData}
              className="p-2 rounded-lg bg-plant-100 dark:bg-plant-800 hover:bg-plant-200 dark:hover:bg-plant-700 transition-colors"
              title="Refresh data"
            >
              <RefreshCw size={20} />
            </button>
            
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Plant Avatar & Mood */}
          <div className="lg:col-span-1 space-y-6">
            <div className="card p-8 text-center">
              <PlantAvatar mood={currentReading.mood} />
            </div>
            
            <MoodDisplay
              message={currentReading.message}
              priority={currentReading.priority}
              isSpeechEnabled={isSpeechEnabled}
              onToggleSpeech={() => setIsSpeechEnabled(!isSpeechEnabled)}
            />
          </div>

          {/* Sensor Data & Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Sensor Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SensorCard
                type="moisture"
                value={currentReading.soilMoisture}
                unit="%"
                trend={calculateTrend(currentReading, history, 'soilMoisture')}
              />
              <SensorCard
                type="temperature"
                value={currentReading.temperature}
                unit="°C"
                trend={calculateTrend(currentReading, history, 'temperature')}
              />
              <SensorCard
                type="light"
                value={currentReading.lightIntensity}
                unit=" lux"
                trend={calculateTrend(currentReading, history, 'lightIntensity')}
              />
            </div>

            {/* Chart */}
            {history.length > 1 && (
              <ChartComponent data={history} darkMode={darkMode} />
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          Last updated: {lastUpdate?.toLocaleTimeString()} • 
          Auto-refresh every 5 seconds • 
          {history.length} readings collected
        </div>
      </div>
    </div>
  );
};

export default Dashboard;