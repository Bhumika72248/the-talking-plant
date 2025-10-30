import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Leaf, Brain, Zap, Activity, ArrowRight, Play, 
  Sparkles, Globe, Users, Award 
} from 'lucide-react';
import SimpleParticleBackground from './SimpleParticleBackground';
import Confetti from 'react-confetti';

const FuturisticHome = ({ currentReading }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Intelligence",
      description: "Advanced machine learning algorithms analyze your plant's needs in real-time",
      color: "neon-purple"
    },
    {
      icon: Activity,
      title: "Real-Time Monitoring",
      description: "Live sensor data with predictive analytics and health forecasting",
      color: "neon-green"
    },
    {
      icon: Zap,
      title: "Voice Interaction",
      description: "Natural language processing for seamless plant communication",
      color: "neon-cyan"
    },
    {
      icon: Globe,
      title: "IoT Integration",
      description: "Connect with smart home systems and environmental controls",
      color: "neon-pink"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleGetStarted = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <SimpleParticleBackground />
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      
      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
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
                <Sparkles className="text-neon-green animate-pulse" size={24} />
                <span className="text-neon-cyan font-cyber text-sm tracking-wider">
                  NEXT-GEN AGRICULTURE
                </span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-6xl lg:text-8xl font-cyber font-bold leading-tight"
              >
                <span className="neon-text glitch" data-text="PLANT.AI">
                  PLANT.AI
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-xl lg:text-2xl text-gray-300 font-organic leading-relaxed"
              >
                The world's first <span className="text-neon-green">AI-powered botanical intelligence system</span> that 
                transforms how we understand and care for plants through advanced IoT sensors and machine learning.
              </motion.p>
            </div>

            {/* Live Status */}
            {currentReading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="hologram-card p-6"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-4 h-4 bg-neon-green rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 w-4 h-4 bg-neon-green rounded-full animate-ping"></div>
                  </div>
                  <div>
                    <div className="text-neon-green font-cyber text-sm">LIVE STATUS</div>
                    <div className="text-white font-organic">
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
                  className="cyber-button text-lg px-8 py-4 w-full sm:w-auto"
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
                  className="border-2 border-neon-cyan/50 bg-neon-cyan/10 text-neon-cyan px-8 py-4 rounded-xl font-cyber font-bold hover:bg-neon-cyan/20 transition-all duration-300 w-full sm:w-auto"
                >
                  <div className="flex items-center space-x-2">
                    <Brain size={20} />
                    <span>TALK TO PLANT</span>
                  </div>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Content - 3D Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative"
          >
            <div className="hologram-card p-8 h-96 flex items-center justify-center">
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
                    className="absolute w-2 h-2 bg-neon-green rounded-full"
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
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <h2 className="neon-text text-4xl lg:text-6xl font-cyber mb-6">
              REVOLUTIONARY FEATURES
            </h2>
            <p className="text-xl text-gray-300 font-organic max-w-3xl mx-auto">
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
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className={`hologram-card p-6 text-center cursor-pointer ${
                  currentFeature === index ? 'animate-pulse' : ''
                }`}
              >
                <div className="mb-6">
                  <feature.icon 
                    className={`text-${feature.color} mx-auto animate-float`} 
                    size={48} 
                  />
                </div>
                <h3 className="neon-text text-xl font-cyber mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-300 font-organic leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Users, number: "10K+", label: "Active Users", color: "neon-green" },
              { icon: Activity, number: "1M+", label: "Data Points", color: "neon-cyan" },
              { icon: Award, number: "99.9%", label: "Accuracy", color: "neon-purple" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="hologram-card p-8 text-center"
              >
                <stat.icon className={`text-${stat.color} mx-auto mb-4`} size={48} />
                <div className={`text-4xl font-cyber text-${stat.color} mb-2`}>
                  {stat.number}
                </div>
                <div className="text-gray-300 font-organic">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="hologram-card p-12">
            <h2 className="neon-text text-4xl lg:text-5xl font-cyber mb-6">
              READY TO REVOLUTIONIZE PLANT CARE?
            </h2>
            <p className="text-xl text-gray-300 font-organic mb-8">
              Join thousands of users who are already experiencing the future of agriculture.
            </p>
            <Link to="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cyber-button text-xl px-12 py-6"
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

export default FuturisticHome;