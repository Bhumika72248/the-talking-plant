const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sensorRoutes = require('./routes/sensorRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/sensors', sensorRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'The Talking Plant API is running',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🌱 The Talking Plant API running on port ${PORT}`);
  console.log(`📊 Sensor data available at http://localhost:${PORT}/api/sensors/current`);
  console.log(`🤖 AI Plant Communication System Online!`);
});