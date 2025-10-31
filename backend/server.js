const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://the-talking-plant-s7px.vercel.app'
  ],
  credentials: true
}));
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: '🌱 The Talking Plant API is running!',
    status: 'OK',
    endpoints: {
      health: '/api/health',
      sensors: '/api/sensors/current',
      chat: '/api/chat'
    },
    timestamp: new Date().toISOString()
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'The Talking Plant API is running',
    timestamp: new Date().toISOString()
  });
});

// Load routes with error handling
try {
  const sensorRoutes = require('./routes/sensorRoutes');
  const chatRoutes = require('./routes/chatRoutes');
  
  app.use('/api/sensors', sensorRoutes);
  app.use('/api', chatRoutes);
  
  console.log('✅ Routes loaded successfully');
} catch (error) {
  console.error('❌ Error loading routes:', error.message);
  process.exit(1);
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: err.message 
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🌱 The Talking Plant API running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🤖 AI Plant Communication System Online!`);
}).on('error', (err) => {
  console.error('❌ Server failed to start:', err);
  process.exit(1);
});