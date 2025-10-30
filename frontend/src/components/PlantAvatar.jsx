import React from 'react';

const PlantAvatar = ({ mood, isAnimated = true }) => {
  const getPlantExpression = () => {
    if (mood.includes('Thirsty')) return '🌵';
    if (mood.includes('Hot')) return '🥵';
    if (mood.includes('Shade')) return '🌥️';
    if (mood.includes('Watered')) return '💧';
    return '🌸';
  };

  const getPlantBody = () => {
    if (mood.includes('Thirsty')) return '🪴';
    if (mood.includes('Hot')) return '🌿';
    return '🌱';
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className={`text-8xl ${isAnimated ? 'animate-bounce-slow' : ''}`}>
        {getPlantExpression()}
      </div>
      <div className={`text-6xl ${isAnimated ? 'animate-pulse-slow' : ''}`}>
        {getPlantBody()}
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-plant-700 dark:text-plant-300">
          {mood}
        </div>
      </div>
    </div>
  );
};

export default PlantAvatar;
