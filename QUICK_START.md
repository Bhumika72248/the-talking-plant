# 🚀 Quick Start Guide - The Talking Plant

## Prerequisites
- Node.js (v16 or higher) - Download from https://nodejs.org/
- Git - Download from https://git-scm.com/

## 1. Clone the Repository
```bash
git clone https://github.com/Bhumika72248/the-talking-plant.git
cd the-talking-plant
```

## 2. Install Dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## 3. Start the Application
Open 2 terminals:

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

## 4. Access the Application
- **Home Page**: http://localhost:3000
- **Dashboard**: http://localhost:3000/dashboard
- **Chat**: http://localhost:3000/chat

## 🎯 That's it! The Talking Plant is now running!

## Troubleshooting
- If ports are busy, change them in `backend/server.js` and `frontend/src/utils/api.js`
- Make sure Node.js v16+ is installed
- Run `npm install` again if there are dependency issues