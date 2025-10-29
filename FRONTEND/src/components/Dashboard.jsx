import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Charts from './Charts';

export default function Dashboard() {
  const [sensorData, setSensorData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSensorData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/sensors');
      setSensorData(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching sensor data:', error);
    }
  };

  const simulateSensorData = async () => {
    try {
      await axios.post('http://localhost:5000/api/sensors/simulate');
      fetchSensorData();
    } catch (error) {
      console.error('Error simulating data:', error);
    }
  };

  useEffect(() => {
    fetchSensorData();
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-3xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Sensor Data</h2>
        <button
          onClick={simulateSensorData}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Simulate Data
        </button>
      </div>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div>
          <div className="grid grid-cols-3 gap-4 text-center mb-6">
            <div>
              <p className="text-gray-500">Soil Moisture</p>
              <p className="text-2xl font-bold text-blue-700">{sensorData[0]?.soilMoisture ?? '--'}%</p>
            </div>
            <div>
              <p className="text-gray-500">Temperature</p>
              <p className="text-2xl font-bold text-red-600">{sensorData[0]?.temperature ?? '--'}°C</p>
            </div>
            <div>
              <p className="text-gray-500">Water Level</p>
              <p className="text-2xl font-bold text-green-600">{sensorData[0]?.waterLevel ?? '--'}%</p>
            </div>
          </div>
          <Charts data={sensorData.slice(0, 10).reverse()} />
        </div>
      )}
    </div>
  );
}