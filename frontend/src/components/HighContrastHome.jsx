import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Leaf, Brain, Zap, Activity, ArrowRight, Play, 
  Sparkles, Globe, Users, Award 
} from 'lucide-react';
import Confetti from 'react-confetti';

const HighContrastHome = ({ currentReading }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Intelligence",
      description: "Advanced machine learning algorithms analyze your plant's needs in real-time",
      color: "text-purple-400"
    },
    {
      icon: Activity,
      title: "Real-Time Monitoring",
      description: "Live sensor data with predictive analytics and health forecasting",
      color: "text-green-400"
    },
    {
      icon: Zap,
      title: "Voice Interaction",
      description: "Natural language processing for seamless plant communication",
      color: "text-cyan-400"
    },
    {
      icon: Globe,
      title: "IoT Integration",
      description: "Connect with smart home systems and environmental controls",
      color: "text-pink-400"
    }
  ];

  const handleGetStarted = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center space-x-2"
              >
                <Sparkles className="text-green-400" size={24} />
                <span className="text-cyan-400 font-bold text-sm tracking-wider">
                  NEXT-GEN AGRICULTURE
                </span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-6xl lg:text-8xl font-bold leading-tight"
              >
                <span className="text-green-400 drop-shadow-lg">
                  THE TALKING PLANT
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-xl lg:text-2xl text-gray-300 leading-relaxed"
              >
                The world's first <span className="text-green-400 font-bold">AI-powered botanical intelligence system</span> that 
                transforms how we understand and care for plants through advanced IoT sensors and machine learning.
              </motion.p>
            </div>

            {/* Live Status */}
            {currentReading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="bg-gray-800 p-6 rounded-2xl border-2 border-green-500/50"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
                  </div>
                  <div>
                    <div className="text-green-400 font-bold text-sm">LIVE STATUS</div>
                    <div className="text-white font-bold">
                      {currentReading.mood} • {currentReading.soilMoisture}% Moisture • {currentReading.temperature}°C
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/dashboard" onClick={handleGetStarted}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-xl font-bold text-lg w-full sm:w-auto border-2 border-green-500 shadow-lg"
                >
                  <div className="flex items-center space-x-2">
                    <Play size={20} />
                    <span>LAUNCH DASHBOARD</span>
                    <ArrowRight size={20} />
                  </div>
                </motion.button>
              </Link>
              
              <Link to="/chat">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-cyan-500 bg-cyan-900/30 text-cyan-400 px-8 py-4 rounded-xl font-bold hover:bg-cyan-800/50 transition-all duration-300 w-full sm:w-auto"
                >
                  <div className="flex items-center space-x-2">
                    <Brain size={20} />
                    <span>TALK TO PLANT</span>
                  </div>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Content - Plant Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative"
          >
            <div className="bg-gray-800 p-8 h-96 flex items-center justify-center rounded-2xl border-2 border-green-500/50">
              <motion.div
                animate={{ 
                  rotateY: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                className="text-8xl"
              >
                🌱
              </motion.div>
              
              {/* Floating Data Points */}
              <div className="absolute inset-0">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-green-400 rounded-full"
                    animate={{
                      x: [0, 100, 0],
                      y: [0, -50, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5
                    }}
                    style={{
                      left: `${20 + i * 10}%`,
                      top: `${30 + i * 5}%`
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-6xl font-bold text-green-400 mb-6">
              REVOLUTIONARY FEATURES
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the future of plant care with cutting-edge technology that bridges 
              the gap between nature and artificial intelligence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-900 p-6 text-center cursor-pointer rounded-2xl border-2 border-gray-700 hover:border-green-500 transition-all"
              >
                <div className="mb-6">
                  <feature.icon 
                    className={`${feature.color} mx-auto`} 
                    size={48} 
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Users, number: "10K+", label: "Active Users", color: "text-green-400" },
              { icon: Activity, number: "1M+", label: "Data Points", color: "text-cyan-400" },
              { icon: Award, number: "99.9%", label: "Accuracy", color: "text-purple-400" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-gray-800 p-8 text-center rounded-2xl border-2 border-gray-700"
              >
                <stat.icon className={`${stat.color} mx-auto mb-4`} size={48} />
                <div className={`text-4xl font-bold ${stat.color} mb-2`}>
                  {stat.number}
                </div>
                <div className="text-gray-300 font-bold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gray-800">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="bg-gray-900 p-12 rounded-2xl border-2 border-green-500/50">
            <h2 className="text-4xl lg:text-5xl font-bold text-green-400 mb-6">
              READY TO REVOLUTIONIZE PLANT CARE?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of users who are already experiencing the future of agriculture.
            </p>
            <Link to="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-600 hover:bg-green-500 text-white px-12 py-6 rounded-xl font-bold text-xl border-2 border-green-500 shadow-lg"
                onClick={handleGetStarted}
              >
                <div className="flex items-center space-x-3">
                  <Leaf size={24} />
                  <span>START YOUR JOURNEY</span>
                  <Sparkles size={24} />
                </div>
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default HighContrastHome;