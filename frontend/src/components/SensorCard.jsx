import React from 'react';
import { Droplets, Thermometer, Sun } from 'lucide-react';

const SensorCard = ({ type, value, unit, trend }) => {
  const getIcon = () => {
    switch (type) {
      case 'moisture': return <Droplets className="text-blue-500" size={24} />;
      case 'temperature': return <Thermometer className="text-red-500" size={24} />;
      case 'light': return <Sun className="text-yellow-500" size={24} />;
      default: return null;
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'moisture': return 'Soil Moisture';
      case 'temperature': return 'Temperature';
      case 'light': return 'Light Intensity';
      default: return '';
    }
  };

  const getHealthStatus = () => {
    switch (type) {
      case 'moisture':
        if (value < 30) return { status: 'Low', color: 'text-red-500' };
        if (value > 80) return { status: 'High', color: 'text-blue-500' };
        return { status: 'Good', color: 'text-green-500' };
      case 'temperature':
        if (value < 18 || value > 32) return { status: 'Alert', color: 'text-orange-500' };
        return { status: 'Optimal', color: 'text-green-500' };
      case 'light':
        if (value < 300) return { status: 'Low', color: 'text-gray-500' };
        if (value > 800) return { status: 'High', color: 'text-yellow-600' };
        return { status: 'Good', color: 'text-green-500' };
      default:
        return { status: 'Unknown', color: 'text-gray-500' };
    }
  };

  const health = getHealthStatus();

  return (
    <div className="sensor-card glow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {getIcon()}
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">
            {getTitle()}
          </h3>
        </div>
        <div className={`text-sm font-medium ${health.color}`}>
          {health.status}
        </div>
      </div>
      
      <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        {value}{unit}
      </div>
      
      {trend && (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Trend: {trend > 0 ? '↗️' : trend < 0 ? '↘️' : '➡️'} 
          {Math.abs(trend).toFixed(1)}{unit}/min
        </div>
      )}
    </div>
  );
};

export default SensorCard;