import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, MessageCircle, BarChart3, Leaf, ArrowRight } from 'lucide-react';

const BeautifulHome = ({ currentReading }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          onLoadedData={() => setIsVideoLoaded(true)}
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-20 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <Leaf className="text-white" size={24} />
            </div>
            <span className="text-white text-xl font-bold">The Talking Plant</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/dashboard" className="text-white/80 hover:text-white transition-colors">Dashboard</Link>
            <Link to="/chat" className="text-white/80 hover:text-white transition-colors">Chat</Link>
            <Link to="/about" className="text-white/80 hover:text-white transition-colors">About</Link>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            The Future of
            <span className="block text-green-400">Plant Care</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed"
          >
            Experience AI-powered plant communication that transforms how you care for your green companions
          </motion.p>

          {/* Live Status Card */}
          {currentReading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20"
            >
              <div className="flex items-center justify-center space-x-8">
                <div className="text-center">
                  <div className="text-2xl mb-1">💧</div>
                  <div className="text-white font-semibold">{currentReading.soilMoisture}%</div>
                  <div className="text-white/70 text-sm">Moisture</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1">🌡️</div>
                  <div className="text-white font-semibold">{currentReading.temperature}°C</div>
                  <div className="text-white/70 text-sm">Temperature</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1">☀️</div>
                  <div className="text-white font-semibold">{currentReading.lightIntensity}</div>
                  <div className="text-white/70 text-sm">Light</div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <div className="text-white/90 italic">"{currentReading.message}"</div>
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold flex items-center space-x-2 transition-colors"
              >
                <BarChart3 size={20} />
                <span>View Dashboard</span>
                <ArrowRight size={20} />
              </motion.button>
            </Link>
            
            <Link to="/chat">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-8 py-4 rounded-full font-semibold flex items-center space-x-2 border border-white/30 transition-colors"
              >
                <MessageCircle size={20} />
                <span>Talk to Plant</span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose The Talking Plant?</h2>
            <p className="text-xl text-gray-600">Advanced AI technology meets natural plant care</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ y: -10 }}
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100"
            >
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">AI Communication</h3>
              <p className="text-gray-600">Your plants can now tell you exactly what they need through advanced AI analysis</p>
            </motion.div>
            
            <motion.div
              whileHover={{ y: -10 }}
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100"
            >
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Real-time Monitoring</h3>
              <p className="text-gray-600">Track soil moisture, temperature, and light levels with precision sensors</p>
            </motion.div>
            
            <motion.div
              whileHover={{ y: -10 }}
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100"
            >
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Care Tips</h3>
              <p className="text-gray-600">Get personalized care recommendations based on your plant's specific needs</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <Leaf className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold">The Talking Plant</span>
          </div>
          <p className="text-gray-400">© 2024 The Talking Plant. Bringing AI and nature together.</p>
        </div>
      </footer>
    </div>
  );
};

export default BeautifulHome;