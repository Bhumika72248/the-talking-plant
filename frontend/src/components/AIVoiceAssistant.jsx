import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Brain, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AIVoiceAssistant = ({ currentReading, onCommand }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setTranscript(finalTranscript);
          processVoiceCommand(finalTranscript);
        }
      };
      
      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
    }
  }, []);

  const processVoiceCommand = async (command) => {
    setIsProcessing(true);
    
    // AI-powered command processing
    const responses = {
      status: `Your plant is currently ${currentReading?.mood}. Soil moisture is at ${currentReading?.soilMoisture}%, temperature is ${currentReading?.temperature}°C, and light level is ${currentReading?.lightIntensity} lux.`,
      water: currentReading?.soilMoisture < 40 ? 
        "Yes, I need water! My soil is getting dry. Please water me soon." :
        "I'm well hydrated right now, thank you for checking!",
      light: currentReading?.lightIntensity < 300 ?
        "I could use more light! Maybe move me closer to a window?" :
        "The lighting is perfect right now, I'm photosynthesizing beautifully!",
      temperature: currentReading?.temperature > 30 ?
        "It's getting quite warm here. Some shade would be nice!" :
        "The temperature is comfortable for me right now.",
      health: `I'm feeling ${currentReading?.mood}. My overall health is good with ${currentReading?.soilMoisture}% soil moisture.`,
      joke: "Why don't plants ever get speeding tickets? Because they're always rooted to the spot! 🌱😄",
      sing: "🎵 I'm a little plant, short and green, here's my leaves and here's my stem! 🎵",
      dance: "💃 *rustles leaves rhythmically* This is my plant dance! 🌿",
    };

    let response = "I'm not sure what you mean, but I'm happy to chat with you!";
    
    const lowerCommand = command.toLowerCase();
    if (lowerCommand.includes('status') || lowerCommand.includes('how are you')) {
      response = responses.status;
    } else if (lowerCommand.includes('water') || lowerCommand.includes('thirsty')) {
      response = responses.water;
    } else if (lowerCommand.includes('light') || lowerCommand.includes('sun')) {
      response = responses.light;
    } else if (lowerCommand.includes('temperature') || lowerCommand.includes('hot') || lowerCommand.includes('cold')) {
      response = responses.temperature;
    } else if (lowerCommand.includes('health')) {
      response = responses.health;
    } else if (lowerCommand.includes('joke')) {
      response = responses.joke;
    } else if (lowerCommand.includes('sing')) {
      response = responses.sing;
    } else if (lowerCommand.includes('dance')) {
      response = responses.dance;
    }

    setAiResponse(response);
    speak(response);
    
    if (onCommand) {
      onCommand(command, response);
    }
    
    setTimeout(() => {
      setIsProcessing(false);
      setTranscript('');
    }, 2000);
  };

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.3;
      utterance.volume = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
      setTranscript('');
      setAiResponse('');
    }
  };

  return (
    <div className="hologram-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Brain className="text-neon-cyan animate-pulse" size={24} />
          <h3 className="neon-text text-lg">AI Voice Assistant</h3>
        </div>
        <Zap className="text-neon-purple animate-bounce" size={20} />
      </div>

      <div className="flex justify-center">
        <motion.button
          onClick={toggleListening}
          className={`cyber-button relative ${isListening ? 'animate-pulse' : ''}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center space-x-2">
            {isListening ? (
              <MicOff className="text-red-400" size={20} />
            ) : (
              <Mic className="text-neon-green" size={20} />
            )}
            <span>{isListening ? 'Stop Listening' : 'Start Voice Chat'}</span>
          </div>
          
          {isListening && (
            <motion.div
              className="absolute -inset-2 border-2 border-neon-green rounded-xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {transcript && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="cyber-card p-4"
          >
            <div className="flex items-center space-x-2 mb-2">
              <Volume2 className="text-neon-blue" size={16} />
              <span className="text-neon-blue font-cyber text-sm">You said:</span>
            </div>
            <p className="text-white">{transcript}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center justify-center space-x-2 py-4"
          >
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-neon-green border-t-transparent"></div>
            <span className="text-neon-green font-cyber">Processing...</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {aiResponse && !isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="hologram-card p-4"
          >
            <div className="flex items-center space-x-2 mb-2">
              <Brain className="text-neon-purple animate-pulse" size={16} />
              <span className="text-neon-purple font-cyber text-sm">Plant AI:</span>
            </div>
            <p className="text-white leading-relaxed">{aiResponse}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-center text-xs text-gray-400 font-cyber">
        {isListening ? (
          <span className="text-neon-green animate-pulse">🎤 Listening for commands...</span>
        ) : (
          <span>Click to start voice interaction</span>
        )}
      </div>
    </div>
  );
};

export default AIVoiceAssistant;