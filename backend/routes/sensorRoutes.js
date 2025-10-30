const express = require('express');
const AdvancedSensorSimulator = require('../utils/advancedSensorData');

const router = express.Router();
const sensor = new AdvancedSensorSimulator();

// Store recent readings in memory
let recentReadings = [];
const MAX_READINGS = 50;

// Get current sensor reading
router.get('/current', (req, res) => {
  const reading = sensor.generateAdvancedReading();
  const mood = sensor.analyzeAdvancedMood(reading);
  
  const response = {
    ...reading,
    ...mood
  };
  
  // Store reading
  recentReadings.push(response);
  if (recentReadings.length > MAX_READINGS) {
    recentReadings.shift();
  }
  
  res.json(response);
});

// Get historical data
router.get('/history', (req, res) => {
  const limit = parseInt(req.query.limit) || 20;
  const history = recentReadings.slice(-limit);
  res.json(history);
});

// Get plant status summary
router.get('/status', (req, res) => {
  if (recentReadings.length === 0) {
    return res.json({ message: 'No data available yet' });
  }
  
  const latest = recentReadings[recentReadings.length - 1];
  const avg = recentReadings.slice(-10).reduce((acc, reading) => {
    acc.soilMoisture += reading.soilMoisture;
    acc.temperature += reading.temperature;
    acc.lightIntensity += reading.lightIntensity;
    return acc;
  }, { soilMoisture: 0, temperature: 0, lightIntensity: 0 });
  
  const count = Math.min(10, recentReadings.length);
  
  res.json({
    current: latest,
    averages: {
      soilMoisture: Math.round((avg.soilMoisture / count) * 10) / 10,
      temperature: Math.round((avg.temperature / count) * 10) / 10,
      lightIntensity: Math.round(avg.lightIntensity / count)
    },
    totalReadings: recentReadings.length
  });
});

module.exports = router;