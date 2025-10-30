# 🤖 Gemini AI Setup Guide

## Get Your Gemini API Key

1. **Go to Google AI Studio**: https://makersuite.google.com/app/apikey
2. **Sign in** with your Google account
3. **Click "Create API Key"**
4. **Copy the API key**

## Add API Key to Your Project

1. **Open the file**: `backend/.env`
2. **Replace** `your_gemini_api_key_here` with your actual API key:

```env
PORT=3001
GEMINI_API_KEY=AIzaSyC-your-actual-api-key-here
```

## Test the Chat Feature

1. **Start the backend**: `cd backend && npm run dev`
2. **Start the frontend**: `cd frontend && npm run dev`
3. **Go to**: http://localhost:3000/chat
4. **Try chatting** with your plant!

## Example Conversations

- "How are you feeling today?"
- "Do you need water?"
- "Tell me about photosynthesis"
- "What's your favorite time of day?"

## 🎉 Your plant will now give unique, intelligent responses powered by Gemini AI!