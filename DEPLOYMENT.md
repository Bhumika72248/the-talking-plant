# 🚀 Deployment Guide

## Quick Start Commands

### 1. Install Dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Start Development Servers
```bash
# Start backend (Terminal 1)
cd backend
npm run dev

# Start frontend (Terminal 2)
cd frontend
npm run dev
```

### 3. Access Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001

## Production Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy the 'dist' folder
```

### Backend (Railway/Heroku)
```bash
cd backend
# Set NODE_ENV=production
# Deploy backend folder
```

## Environment Variables
Create `.env` files if needed:
- Backend: `backend/.env`
- Frontend: `frontend/.env`

## Troubleshooting
- Ensure Node.js v16+ is installed
- Check if ports 3000 and 3001 are available
- Run `npm install` if dependencies are missing