const API_BASE_URL = 'http://localhost:3001/api';

export const sensorAPI = {
  getCurrentReading: async () => {
    const response = await fetch(`${API_BASE_URL}/sensors/current`);
    if (!response.ok) throw new Error('Failed to fetch sensor data');
    return response.json();
  },
  
  getHistory: async (limit = 20) => {
    const response = await fetch(`${API_BASE_URL}/sensors/history?limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch history');
    return response.json();
  },
  
  getStatus: async () => {
    const response = await fetch(`${API_BASE_URL}/sensors/status`);
    if (!response.ok) throw new Error('Failed to fetch status');
    return response.json();
  }
};

export const speakMessage = (message) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    utterance.volume = 0.8;
    speechSynthesis.speak(utterance);
  }
};