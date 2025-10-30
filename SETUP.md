# 🚀 Quick Setup Guide

## Option 1: Automatic Setup (Windows)
Double-click `start.bat` - it will install dependencies and start both servers automatically.

## Option 2: Manual Setup

### Step 1: Install Dependencies
```bash
# Install root dependencies
npm install

# Install all project dependencies
npm run install-all
```

### Step 2: Start Development Servers
```bash
# Start both backend and frontend
npm run dev
```

### Step 3: Access the Application
- **Frontend Dashboard**: http://localhost:3000
- **Backend API**: http://localhost:3001/api/sensors/current

## 🔧 Individual Server Control

### Backend Only:
```bash
cd backend
npm run dev
```

### Frontend Only:
```bash
cd frontend
npm run dev
```

## 📊 Test the API
Visit these URLs to test the backend:
- http://localhost:3001/api/health
- http://localhost:3001/api/sensors/current
- http://localhost:3001/api/sensors/history

## 🎯 Expected Behavior
1. Backend generates realistic sensor data every 5 seconds
2. Frontend displays live dashboard with plant avatar
3. Plant "talks" based on sensor conditions
4. Charts show sensor trends over time
5. Voice synthesis works (if browser supports it)

## 🐛 Troubleshooting
- **Port conflicts**: Change ports in backend/server.js and frontend/src/utils/api.js
- **CORS issues**: Backend includes CORS middleware
- **Speech not working**: Enable microphone permissions in browser
- **Charts not loading**: Ensure Recharts is installed properly

## 🌟 Features to Try
1. Toggle dark/light mode
2. Click the speaker icon to hear plant messages
3. Watch sensor values change in real-time
4. Observe how plant mood changes with sensor data
5. View historical trends in the chart