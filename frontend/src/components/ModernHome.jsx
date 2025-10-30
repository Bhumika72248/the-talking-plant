import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Leaf, Brain, Zap, Activity, ArrowRight, Play, 
  Sparkles, Globe, Users, Award, Sun, Droplets, Thermometer
} from 'lucide-react';
import Confetti from 'react-confetti';

const ModernHome = ({ currentReading }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  const features = [
    {
      icon: Brain,
      title: "AI Intelligence",
      description: "Advanced machine learning algorithms analyze your plant's needs in real-time",
      color: "from-purple-500 to-pink-500",
      iconColor: "text-purple-600"
    },
    {
      icon: Activity,
      title: "Live Monitoring",
      description: "Real-time sensor data with predictive analytics and health forecasting",
      color: "from-emerald-500 to-teal-500",
      iconColor: "text-emerald-600"
    },
    {
      icon: Zap,
      title: "Voice Chat",
      description: "Natural language processing for seamless plant communication",
      color: "from-blue-500 to-cyan-500",
      iconColor: "text-blue-600"
    },
    {
      icon: Globe,
      title: "Smart Integration",
      description: "Connect with smart home systems and environmental controls",
      color: "from-rose-500 to-orange-500",
      iconColor: "text-rose-600"
    }
  ];

  const handleGetStarted = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <div className="min-h-screen">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center space-x-3"
              >
                <div className="flex items-center space-x-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                  <Sparkles className="text-emerald-600 dark:text-emerald-400" size={20} />
                  <span className="text-emerald-700 dark:text-emerald-300 font-semibold text-sm">
                    Next-Gen Agriculture
                  </span>
                </div>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-4xl lg:text-5xl font-bold leading-tight"
              >
                <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent">
                  The Talking Plant
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium"
              >
                Experience the future of plant care with our{' '}
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  AI-powered communication system
                </span>{' '}
                that transforms how we understand and nurture plants.
              </motion.p>
            </div>

            {/* Live Status */}
            {currentReading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="modern-card p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                      <div className="absolute inset-0 w-3 h-3 bg-emerald-500 rounded-full animate-ping"></div>
                    </div>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                      Live Plant Status
                    </span>
                  </div>
                  <div className="text-2xl">
                    {currentReading.mood?.includes('Thirsty') ? '🌵' :
                     currentReading.mood?.includes('Hot') ? '🥵' :
                     currentReading.mood?.includes('Shade') ? '🌥️' :
                     currentReading.mood?.includes('Watered') ? '💧' : '🌸'}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <Droplets className="text-blue-500 mx-auto mb-1" size={20} />
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {currentReading.soilMoisture}%
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Moisture</div>
                  </div>
                  <div className="text-center">
                    <Thermometer className="text-red-500 mx-auto mb-1" size={20} />
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {currentReading.temperature}°C
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Temperature</div>
                  </div>
                  <div className="text-center">
                    <Sun className="text-yellow-500 mx-auto mb-1" size={20} />
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {currentReading.lightIntensity}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Light</div>
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
                  className="modern-button w-full sm:w-auto"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Play size={20} />
                    <span>Launch Dashboard</span>
                    <ArrowRight size={20} />
                  </div>
                </motion.button>
              </Link>
              
              <Link to="/chat">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="modern-button-outline w-full sm:w-auto"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Brain size={20} />
                    <span>Talk to Plant</span>
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
            <div className="gradient-card p-12 h-96 flex items-center justify-center relative overflow-hidden">
              <motion.div
                animate={{ 
                  rotateY: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                className="text-8xl z-10 relative"
              >
                🌱
              </motion.div>
              
              {/* Floating Elements */}
              <div className="absolute inset-0">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-emerald-400 rounded-full opacity-60"
                    animate={{
                      x: [0, 100, 0],
                      y: [0, -50, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 0.5
                    }}
                    style={{
                      left: `${15 + i * 8}%`,
                      top: `${25 + i * 6}%`
                    }}
                  />
                ))}
              </div>
              
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 transform rotate-12 scale-150 blur-3xl"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Powerful Features
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover how our advanced technology creates a seamless connection between you and your plants.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="modern-card p-8 text-center group cursor-pointer"
              >
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${feature.color} p-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="text-white w-full h-full" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Users, number: "10K+", label: "Happy Users", color: "from-emerald-500 to-teal-500" },
              { icon: Activity, number: "1M+", label: "Data Points", color: "from-blue-500 to-cyan-500" },
              { icon: Award, number: "99.9%", label: "Accuracy", color: "from-purple-500 to-pink-500" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="modern-card p-8 text-center"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${stat.color} p-4`}>
                  <stat.icon className="text-white w-full h-full" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="gradient-card p-12 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Ready to Transform Plant Care?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Join thousands of plant enthusiasts who are already experiencing the future of gardening.
              </p>
              <Link to="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="modern-button px-8 py-4"
                  onClick={handleGetStarted}
                >
                  <div className="flex items-center space-x-3">
                    <Leaf size={24} />
                    <span>Start Your Journey</span>
                    <Sparkles size={24} />
                  </div>
                </motion.button>
              </Link>
            </div>
            
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-2xl"></div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default ModernHome;