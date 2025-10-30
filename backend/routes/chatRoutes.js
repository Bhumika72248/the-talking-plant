const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const router = express.Router();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Chat with plant using Gemini AI
router.post('/chat', async (req, res) => {
  try {
    const { message, plantData } = req.body;
    
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      // Fallback responses if no API key
      const fallbackResponses = [
        "I'm feeling great today! Thanks for talking to me! 🌱",
        "The sunlight feels wonderful on my leaves! ☀️",
        "I love our conversations! They help me grow! 💚",
        "Did you know plants can communicate? Well, now I can talk to you! 🗣️",
        "I'm grateful for your care and attention! 🙏"
      ];
      
      return res.json({
        response: fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)],
        timestamp: new Date().toISOString()
      });
    }

    // Create plant personality prompt
    const plantPersonality = `You are a friendly, wise talking plant with the following characteristics:
    - Current soil moisture: ${plantData?.soilMoisture || 60}%
    - Temperature: ${plantData?.temperature || 25}°C  
    - Light intensity: ${plantData?.lightIntensity || 500} lux
    - Current mood: ${plantData?.mood || 'Happy'}
    
    Respond as this plant would, considering your current conditions. Be friendly, wise, and occasionally mention your needs or feelings about your environment. Keep responses under 100 words and use plant/nature emojis. Always stay in character as a talking plant.`;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const result = await model.generateContent([
      plantPersonality,
      `Human says: "${message}"`
    ]);
    
    const response = await result.response;
    const plantResponse = response.text();

    res.json({
      response: plantResponse,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Gemini AI Error:', error);
    
    // Fallback response on error
    const errorResponses = [
      "Sorry, I'm having trouble thinking right now. Maybe I need more sunlight? ☀️",
      "My thoughts are a bit scattered like leaves in the wind! 🍃",
      "I'm feeling a bit wilted today. Can you try asking me again? 🌿"
    ];
    
    res.json({
      response: errorResponses[Math.floor(Math.random() * errorResponses.length)],
      timestamp: new Date().toISOString()
    });
  }
});

module.exports = router;