import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Charts({ data }) {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="createdAt" tick={false} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="soilMoisture" stroke="#2563eb" name="Soil Moisture" />
          <Line type="monotone" dataKey="temperature" stroke="#dc2626" name="Temperature" />
          <Line type="monotone" dataKey="waterLevel" stroke="#16a34a" name="Water Level" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}