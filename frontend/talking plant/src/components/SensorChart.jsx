import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const SensorChart = ({ data, dataKey, color }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h3 className="text-green-700 font-semibold mb-2">{dataKey} Trend</h3>
      <LineChart width={320} height={200} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} />
      </LineChart>
    </div>
  );
};

export default SensorChart;
