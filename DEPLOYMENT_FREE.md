# 🚀 Free Deployment Guide

## 🔧 Backend Deployment (Railway - Free)

### Step 1: Deploy Backend
1. **Go to**: https://railway.app
2. **Sign up** with GitHub
3. **Click "New Project"** → **"Deploy from GitHub repo"**
4. **Select**: `the-talking-plant` repository
5. **Choose**: `backend` folder
6. **Add Environment Variables**:
   - `GEMINI_API_KEY`: `AIzaSyCWVnDF8SQ_dFGN1hNphEG_PXkbrrvjKKs`
   - `PORT`: `3001`
7. **Deploy** and **copy the URL** (e.g., `https://your-app.railway.app`)

### Step 2: Update Frontend
1. **Edit** `frontend/.env.production`
2. **Replace** with your Railway URL:
```env
VITE_API_URL=https://your-actual-railway-url.railway.app/api
```

## 🎨 Frontend Deployment (Vercel - Free)

### Step 1: Deploy Frontend
1. **Go to**: https://vercel.com
2. **Sign up** with GitHub
3. **Click "New Project"**
4. **Import**: `the-talking-plant` repository
5. **Set Root Directory**: `frontend`
6. **Add Environment Variable**:
   - `VITE_API_URL`: `https://your-railway-url.railway.app/api`
7. **Deploy**

### Step 2: Get Your Live URLs
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-app.railway.app`

## 🎉 Your app is now live and free!

### Alternative Free Options:
- **Backend**: Render.com, Fly.io
- **Frontend**: Netlify, GitHub Pages

### 💡 Tips:
- Railway gives 500 hours/month free
- Vercel gives unlimited static hosting
- Both auto-deploy on GitHub push