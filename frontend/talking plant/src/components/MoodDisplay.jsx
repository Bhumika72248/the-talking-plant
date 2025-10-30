import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { speakMessage } from '../utils/api';

const MoodDisplay = ({ message, priority, isSpeechEnabled, onToggleSpeech }) => {
  const handleSpeak = () => {
    if (isSpeechEnabled && message) {
      speakMessage(message);
    }
  };

  const getPriorityColor = () => {
    switch (priority) {
      case 'high': return 'border-red-400 bg-red-50 dark:bg-red-900/20';
      case 'medium': return 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20';
      default: return 'border-plant-400 bg-plant-50 dark:bg-plant-900/20';
    }
  };

  return (
    <div className={`card p-6 ${getPriorityColor()} border-2`}>
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          💬 Plant Message
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={onToggleSpeech}
            className="p-2 rounded-lg bg-plant-100 dark:bg-plant-800 hover:bg-plant-200 dark:hover:bg-plant-700 transition-colors"
            title={isSpeechEnabled ? 'Disable speech' : 'Enable speech'}
          >
            {isSpeechEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
          {isSpeechEnabled && (
            <button
              onClick={handleSpeak}
              className="px-4 py-2 bg-plant-500 text-white rounded-lg hover:bg-plant-600 transition-colors text-sm"
            >
              🔊 Speak
            </button>
          )}
        </div>
      </div>
      
      <div className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
        "{message}"
      </div>
      
      {priority === 'high' && (
        <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 rounded-lg border border-red-200 dark:border-red-800">
          <div className="text-red-800 dark:text-red-200 font-medium text-sm">
            ⚠️ Urgent attention needed!
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodDisplay;