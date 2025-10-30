import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, Droplets, Thermometer, Sun, Brain, Zap, 
  TrendingUp, AlertTriangle, CheckCircle, Wifi, Settings, Moon, Lightbulb
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
         RadialBarChart, RadialBar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import Plant3D from './Plant3D';
import AIVoiceAssistant from './AIVoiceAssistant';

const ModernDashboard = ({ currentReading, history, isConnected }) => {
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [aiInsights, setAiInsights] = useState([]);
  const [healthScore, setHealthScore] = useState(85);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (currentReading) {
      calculateHealthScore();
      generateAIInsights();
    }
  }, [currentReading]);

  const calculateHealthScore = () => {
    if (!currentReading) return;
    
    let score = 100;
    
    if (currentReading.soilMoisture < 30) score -= 30;
    else if (currentReading.soilMoisture < 50) score -= 15;
    else if (currentReading.soilMoisture > 90) score -= 10;
    
    if (currentReading.temperature < 15 || currentReading.temperature > 35) score -= 25;
    else if (currentReading.temperature < 18 || currentReading.temperature > 30) score -= 10;
    
    if (currentReading.lightIntensity < 200) score -= 20;
    else if (currentReading.lightIntensity < 400) score -= 10;
    
    setHealthScore(Math.max(0, score));
  };

  const generateAIInsights = () => {
    const insights = [];
    
    if (currentReading.soilMoisture < 40) {
      insights.push({
        type: 'warning',
        message: 'Soil moisture is getting low. Your plant would appreciate some water soon.',
        priority: 'high',
        icon: Droplets
      });
    }
    
    if (currentReading.temperature > 30) {
      insights.push({
        type: 'info',
        message: 'Temperature is elevated. Consider improving ventilation or moving to a cooler spot.',
        priority: 'medium',
        icon: Thermometer
      });
    }
    
    if (currentReading.lightIntensity > 800) {
      insights.push({
        type: 'success',
        message: 'Excellent light conditions! Your plant is getting optimal sunlight for photosynthesis.',
        priority: 'low',
        icon: Sun
      });
    }
    
    if (healthScore > 90) {
      insights.push({
        type: 'success',
        message: 'Your plant is thriving! Keep up the excellent care routine.',
        priority: 'low',
        icon: CheckCircle
      });
    }
    
    setAiInsights(insights);
  };

  const sensorData = [
    {
      name: 'Soil Moisture',
      value: currentReading?.soilMoisture || 0,
      max: 100,
      color: '#3b82f6',
      bgColor: 'from-blue-500 to-cyan-500',
      icon: Droplets,
      unit: '%',
      status: currentReading?.soilMoisture > 60 ? 'optimal' : 
              currentReading?.soilMoisture > 30 ? 'warning' : 'critical'
    },
    {
      name: 'Temperature',
      value: currentReading?.temperature || 0,
      max: 40,
      color: '#ef4444',
      bgColor: 'from-red-500 to-orange-500',
      icon: Thermometer,
      unit: '°C',
      status: currentReading?.temperature > 18 && currentReading?.temperature < 28 ? 'optimal' : 'warning'
    },
    {
      name: 'Light Intensity',
      value: (currentReading?.lightIntensity || 0) / 10,
      max: 100,
      color: '#f59e0b',
      bgColor: 'from-yellow-500 to-amber-500',
      icon: Sun,
      unit: ' lux',
      status: currentReading?.lightIntensity > 400 ? 'optimal' : 'warning'
    }
  ];

  const healthData = [
    { name: 'Health', value: healthScore, fill: '#10b981' },
    { name: 'Issues', value: 100 - healthScore, fill: '#e5e7eb' }
  ];

  return (
    <div className={`min-h-screen p-6 transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8 modern-card p-6"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            🌱 The Talking Plant
          </h1>
          <p className="text-gray-600 dark:text-gray-300 font-medium">
            AI-Powered Plant Care Dashboard
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className={`flex items-center space-x-2 px-4 py-2 rounded-xl ${
            isConnected 
              ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' 
              : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
          }`}>
            <Wifi size={16} />
            <span className="font-semibold text-sm">
              {isConnected ? 'Connected' : 'Offline'}
            </span>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setDarkMode(!darkMode)}
            className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="modern-button-outline"
          >
            <Settings size={16} />
          </motion.button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Plant Model & Health */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-4 space-y-6"
        >
          {/* 3D Plant Model */}
          <div className="modern-card p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <span className="mr-2">🌱</span>
              3D Plant Model
            </h3>
            <Plant3D mood={currentReading?.mood} health={healthScore} />
          </div>

          {/* Health Score */}
          <div className="gradient-card p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <span className="mr-2">💚</span>
              Plant Health
            </h3>
            <div className="relative h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={healthData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    dataKey="value"
                    startAngle={90}
                    endAngle={450}
                  >
                    {healthData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    {healthScore}%
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                    Health Score
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Current Mood */}
          <div className="modern-card p-6 text-center">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
              Current Mood
            </h3>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-4"
            >
              {currentReading?.mood?.includes('Thirsty') ? '🌵' :
               currentReading?.mood?.includes('Hot') ? '🥵' :
               currentReading?.mood?.includes('Shade') ? '🌥️' :
               currentReading?.mood?.includes('Watered') ? '💧' : '🌸'}
            </motion.div>
            <div className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {currentReading?.mood || 'Happy 🌸'}
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm italic">
              "{currentReading?.message || 'I\'m feeling wonderful today!'}"
            </p>
          </div>
        </motion.div>

        {/* Center Column - Sensors & Charts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-5 space-y-6"
        >
          {/* Sensor Cards */}
          <div className="grid grid-cols-1 gap-4">
            {sensorData.map((sensor, index) => (
              <motion.div
                key={sensor.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="modern-card p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${sensor.bgColor}`}>
                      <sensor.icon className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                        {sensor.name}
                      </h4>
                      <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                        sensor.status === 'optimal' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' :
                        sensor.status === 'warning' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
                        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                      }`}>
                        {sensor.status}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      {sensor.name === 'Light Intensity' ? currentReading?.lightIntensity : sensor.value}
                      <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                        {sensor.unit}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${sensor.bgColor} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(sensor.value / sensor.max) * 100}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Real-time Chart */}
          <div className="modern-card p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <TrendingUp className="mr-2 text-emerald-600" size={20} />
              Real-time Analytics
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={history?.slice(-20) || []}>
                  <defs>
                    <linearGradient id="moistureGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="lightGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="timestamp" 
                    stroke="#6b7280"
                    fontSize={12}
                    tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                  />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="soilMoisture" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    fill="url(#moistureGradient)"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="temperature" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    fill="url(#tempGradient)"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="lightIntensity" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    fill="url(#lightGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Right Column - AI Assistant & Insights */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-3 space-y-6"
        >
          {/* AI Voice Assistant */}
          <AIVoiceAssistant currentReading={currentReading} />

          {/* AI Insights */}
          <div className="modern-card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <Brain className="text-white" size={20} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                AI Insights
              </h3>
            </div>
            
            <div className="space-y-3">
              <AnimatePresence>
                {aiInsights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className={`p-4 rounded-xl border-l-4 ${
                      insight.type === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-400' :
                      insight.type === 'success' ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-400' :
                      'bg-blue-50 dark:bg-blue-900/20 border-blue-400'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <insight.icon 
                        className={`mt-1 ${
                          insight.type === 'warning' ? 'text-yellow-600' :
                          insight.type === 'success' ? 'text-emerald-600' :
                          'text-blue-600'
                        }`} 
                        size={16} 
                      />
                      <div className="flex-1">
                        <p className="text-gray-900 dark:text-gray-100 text-sm font-medium">
                          {insight.message}
                        </p>
                        <span className={`text-xs font-semibold mt-1 inline-block ${
                          insight.priority === 'high' ? 'text-red-600' :
                          insight.priority === 'medium' ? 'text-yellow-600' :
                          'text-emerald-600'
                        }`}>
                          {insight.priority.toUpperCase()} PRIORITY
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {aiInsights.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Lightbulb className="mx-auto mb-2" size={32} />
                  <p>All systems optimal! No insights needed right now.</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ModernDashboard;