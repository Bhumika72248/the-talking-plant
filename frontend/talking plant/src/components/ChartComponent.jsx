import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const ChartComponent = ({ data, darkMode }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const chartData = data.map(reading => ({
    time: formatTime(reading.timestamp),
    moisture: reading.soilMoisture,
    temperature: reading.temperature,
    light: reading.lightIntensity / 10 // Scale down for better visualization
  }));

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
        📊 Sensor Trends (Last 20 readings)
      </h3>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
            <XAxis 
              dataKey="time" 
              stroke={darkMode ? '#9ca3af' : '#6b7280'}
              fontSize={12}
            />
            <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} fontSize={12} />
            <Tooltip 
              contentStyle={{
                backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                borderRadius: '8px'
              }}
              labelStyle={{ color: darkMode ? '#f3f4f6' : '#1f2937' }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="moisture" 
              stroke="#3b82f6" 
              strokeWidth={2}
              name="Soil Moisture (%)"
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="temperature" 
              stroke="#ef4444" 
              strokeWidth={2}
              name="Temperature (°C)"
              dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="light" 
              stroke="#f59e0b" 
              strokeWidth={2}
              name="Light (lux/10)"
              dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        💡 Light values are scaled down by 10 for better chart visualization
      </div>
    </div>
  );
};

export default ChartComponent;