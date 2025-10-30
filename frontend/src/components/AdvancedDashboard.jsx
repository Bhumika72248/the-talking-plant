import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, Droplets, Thermometer, Sun, Brain, Zap, 
  TrendingUp, AlertTriangle, CheckCircle, Wifi, Settings
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
         RadialBarChart, RadialBar, PieChart, Pie, Cell } from 'recharts';
import Plant3D from './Plant3D';
import AIVoiceAssistant from './AIVoiceAssistant';
import SimpleParticleBackground from './SimpleParticleBackground';

const AdvancedDashboard = ({ currentReading, history, isConnected }) => {
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [aiInsights, setAiInsights] = useState([]);
  const [healthScore, setHealthScore] = useState(85);

  useEffect(() => {
    if (currentReading) {
      calculateHealthScore();
      generateAIInsights();
    }
  }, [currentReading]);

  const calculateHealthScore = () => {
    if (!currentReading) return;
    
    let score = 100;
    
    // Moisture scoring
    if (currentReading.soilMoisture < 30) score -= 30;
    else if (currentReading.soilMoisture < 50) score -= 15;
    else if (currentReading.soilMoisture > 90) score -= 10;
    
    // Temperature scoring
    if (currentReading.temperature < 15 || currentReading.temperature > 35) score -= 25;
    else if (currentReading.temperature < 18 || currentReading.temperature > 30) score -= 10;
    
    // Light scoring
    if (currentReading.lightIntensity < 200) score -= 20;
    else if (currentReading.lightIntensity < 400) score -= 10;
    
    setHealthScore(Math.max(0, score));
  };

  const generateAIInsights = () => {
    const insights = [];
    
    if (currentReading.soilMoisture < 40) {
      insights.push({
        type: 'warning',
        message: 'Soil moisture is low. Consider watering soon.',
        priority: 'high'
      });
    }
    
    if (currentReading.temperature > 30) {
      insights.push({
        type: 'info',
        message: 'Temperature is elevated. Monitor for heat stress.',
        priority: 'medium'
      });
    }
    
    if (currentReading.lightIntensity > 800) {
      insights.push({
        type: 'success',
        message: 'Excellent light conditions for photosynthesis!',
        priority: 'low'
      });
    }
    
    if (healthScore > 90) {
      insights.push({
        type: 'success',
        message: 'Plant is in optimal condition!',
        priority: 'low'
      });
    }
    
    setAiInsights(insights);
  };

  const sensorData = [
    {
      name: 'Moisture',
      value: currentReading?.soilMoisture || 0,
      max: 100,
      color: '#00ffff',
      icon: Droplets,
      unit: '%',
      status: currentReading?.soilMoisture > 60 ? 'optimal' : 
              currentReading?.soilMoisture > 30 ? 'warning' : 'critical'
    },
    {
      name: 'Temperature',
      value: currentReading?.temperature || 0,
      max: 40,
      color: '#ff1493',
      icon: Thermometer,
      unit: '°C',
      status: currentReading?.temperature > 18 && currentReading?.temperature < 28 ? 'optimal' : 'warning'
    },
    {
      name: 'Light',
      value: (currentReading?.lightIntensity || 0) / 10,
      max: 100,
      color: '#39ff14',
      icon: Sun,
      unit: ' lux',
      status: currentReading?.lightIntensity > 400 ? 'optimal' : 'warning'
    }
  ];

  const healthData = [
    { name: 'Health', value: healthScore, fill: '#39ff14' },
    { name: 'Issues', value: 100 - healthScore, fill: '#333' }
  ];

  return (
    <div className="relative min-h-screen p-6">
      <SimpleParticleBackground />
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="neon-text text-4xl font-cyber mb-2">
            PLANT.AI CONTROL CENTER
          </h1>
          <p className="text-neon-cyan font-cyber">
            Advanced Botanical Intelligence System v2.0
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className={`flex items-center space-x-2 px-4 py-2 rounded-xl ${
            isConnected ? 'bg-green-500/20 border border-green-500/50' : 'bg-red-500/20 border border-red-500/50'
          }`}>
            <Wifi size={16} className={isConnected ? 'text-green-400' : 'text-red-400'} />
            <span className={`font-cyber text-sm ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
              {isConnected ? 'CONNECTED' : 'OFFLINE'}
            </span>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cyber-button"
          >
            <Settings size={16} />
          </motion.button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - 3D Plant & Health */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* 3D Plant Model */}
          <div className="hologram-card p-6">
            <h3 className="neon-text text-xl font-cyber mb-4">3D PLANT MODEL</h3>
            <Plant3D mood={currentReading?.mood} health={healthScore} />
          </div>

          {/* Health Score */}
          <div className="hologram-card p-6">
            <h3 className="neon-text text-xl font-cyber mb-4">HEALTH ANALYSIS</h3>
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
                  >
                    {healthData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="neon-text text-3xl font-cyber">{healthScore}%</div>
                  <div className="text-neon-cyan text-sm font-cyber">HEALTH</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Center Column - Sensors & Charts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Sensor Grid */}
          <div className="grid grid-cols-1 gap-4">
            {sensorData.map((sensor, index) => (
              <motion.div
                key={sensor.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="sensor-glow hologram-card p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <sensor.icon className="text-neon-green" size={24} />
                    <h4 className="neon-text font-cyber">{sensor.name}</h4>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-cyber ${
                    sensor.status === 'optimal' ? 'bg-green-500/20 text-green-400' :
                    sensor.status === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {sensor.status.toUpperCase()}
                  </div>
                </div>
                
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-3xl font-cyber text-white mb-1">
                      {sensor.name === 'Light' ? currentReading?.lightIntensity : sensor.value}
                      <span className="text-lg text-neon-cyan">{sensor.unit}</span>
                    </div>
                    <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: sensor.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${(sensor.value / sensor.max) * 100}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      />
                    </div>
                  </div>
                  
                  <div className="ai-pulse">
                    <Activity className="text-neon-purple" size={20} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Real-time Chart */}
          <div className="hologram-card p-6">
            <h3 className="neon-text text-xl font-cyber mb-4">REAL-TIME ANALYTICS</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={history?.slice(-20) || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#39ff14" opacity={0.2} />
                  <XAxis 
                    dataKey="timestamp" 
                    stroke="#00ffff"
                    fontSize={10}
                    tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                  />
                  <YAxis stroke="#00ffff" fontSize={10} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: '1px solid #39ff14',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="soilMoisture" 
                    stroke="#00ffff" 
                    strokeWidth={2}
                    dot={{ fill: '#00ffff', strokeWidth: 2, r: 3 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="temperature" 
                    stroke="#ff1493" 
                    strokeWidth={2}
                    dot={{ fill: '#ff1493', strokeWidth: 2, r: 3 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="lightIntensity" 
                    stroke="#39ff14" 
                    strokeWidth={2}
                    dot={{ fill: '#39ff14', strokeWidth: 2, r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Right Column - AI Assistant & Insights */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* AI Voice Assistant */}
          <AIVoiceAssistant currentReading={currentReading} />

          {/* AI Insights */}
          <div className="hologram-card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Brain className="text-neon-purple animate-pulse" size={24} />
              <h3 className="neon-text text-xl font-cyber">AI INSIGHTS</h3>
            </div>
            
            <div className="space-y-3">
              <AnimatePresence>
                {aiInsights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className={`p-4 rounded-xl border ${
                      insight.type === 'warning' ? 'bg-yellow-500/10 border-yellow-500/30' :
                      insight.type === 'success' ? 'bg-green-500/10 border-green-500/30' :
                      'bg-blue-500/10 border-blue-500/30'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {insight.type === 'warning' ? (
                        <AlertTriangle className="text-yellow-400 mt-1" size={16} />
                      ) : insight.type === 'success' ? (
                        <CheckCircle className="text-green-400 mt-1" size={16} />
                      ) : (
                        <Zap className="text-blue-400 mt-1" size={16} />
                      )}
                      <div>
                        <p className="text-white text-sm font-cyber">{insight.message}</p>
                        <span className={`text-xs font-cyber ${
                          insight.priority === 'high' ? 'text-red-400' :
                          insight.priority === 'medium' ? 'text-yellow-400' :
                          'text-green-400'
                        }`}>
                          {insight.priority.toUpperCase()} PRIORITY
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Plant Mood Display */}
          <div className="hologram-card p-6 text-center">
            <h3 className="neon-text text-xl font-cyber mb-4">CURRENT MOOD</h3>
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
            <div className="neon-text text-lg font-cyber mb-2">
              {currentReading?.mood || 'Happy 🌸'}
            </div>
            <p className="text-neon-cyan text-sm font-cyber">
              "{currentReading?.message || 'I\'m feeling great!'}"
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdvancedDashboard;