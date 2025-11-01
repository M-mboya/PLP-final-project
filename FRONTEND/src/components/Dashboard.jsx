import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const API_URL = "http://localhost:5000/api/sensors"; // Adjust if your backend runs elsewhere

const App = () => {
  const [sensorData, setSensorData] = useState([]);
  const [alert, setAlert] = useState("");

  // Fetch all sensor data
  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      setSensorData(response.data);
    } catch (error) {
      console.error("Error fetching sensor data:", error);
    }
  };

  // Simulate new sensor reading
  const simulateSensorData = async () => {
    try {
      await axios.post(`${API_URL}/simulate`);
      fetchData();
    } catch (error) {
      console.error("Error simulating data:", error);
    }
  };

  // Simple alert system based on sensor values
  const checkAlerts = (data) => {
    if (data.length === 0) return;

    const latest = data[data.length - 1];
    let message = "";

    if (latest.temperature < 20) message = "⚠️ Temperature too low!";
    else if (latest.temperature > 30) message = "🔥 Temperature too high!";
    else if (latest.ph < 6.5) message = "⚠️ pH is too low!";
    else if (latest.ph > 8.5) message = "⚠️ pH is too high!";
    else if (latest.oxygenLevel < 4) message = "🚨 Oxygen level is critically low!";
    else message = "✅ All readings are normal.";

    setAlert(message);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    checkAlerts(sensorData);
  }, [sensorData]);

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">
        Aquafarm Sensor Dashboard 🌊
      </h1>

      {/* ✅ Alerts */}
      {alert && (
        <div
          className={`p-3 rounded-lg text-center mb-6 font-semibold ${
            alert.includes("✅")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {alert}
        </div>
      )}

      {/* Simulate button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={simulateSensorData}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-full shadow-lg"
        >
          Simulate Sensor Data
        </button>
      </div>

      {/* Sensor Data Table */}
      <div className="overflow-x-auto bg-white p-4 rounded-2xl shadow-lg">
        <table className="min-w-full table-auto text-center border-collapse">
          <thead>
            <tr className="bg-blue-200 text-blue-900">
              <th className="p-2">Temperature (°C)</th>
              <th className="p-2">pH</th>
              <th className="p-2">Oxygen (mg/L)</th>
              <th className="p-2">Fish Count</th>
              <th className="p-2">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {sensorData.length > 0 ? (
              sensorData.map((item) => (
                <tr key={item._id} className="border-t">
                  <td className="p-2">{item.temperature?.toFixed(2)}</td>
                  <td className="p-2">{item.ph?.toFixed(2)}</td>
                  <td className="p-2">{item.oxygenLevel?.toFixed(2)}</td>
                  <td className="p-2">{item.fishCount}</td>
                  <td className="p-2">
                    {new Date(item.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-gray-500">
                  No sensor data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Charts Section */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 🌡️ Temperature Chart */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-2">Temperature (°C)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sensorData}>
              <XAxis
                dataKey="timestamp"
                tickFormatter={(t) => new Date(t).toLocaleTimeString()}
              />
              <YAxis domain={[0, "dataMax + 5"]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="#FF6B6B"
                strokeWidth={2}
                dot={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 💧 Oxygen Level Chart */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-2">Oxygen Level (mg/L)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sensorData}>
              <XAxis
                dataKey="timestamp"
                tickFormatter={(t) => new Date(t).toLocaleTimeString()}
              />
              <YAxis domain={[0, "dataMax + 2"]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="oxygenLevel"
                stroke="#4ECDC4"
                strokeWidth={2}
                dot={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 🧪 pH Chart */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-2">pH Level</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sensorData}>
              <XAxis
                dataKey="timestamp"
                tickFormatter={(t) => new Date(t).toLocaleTimeString()}
              />
              <YAxis domain={[0, "dataMax + 2"]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="ph"
                stroke="#FFD93D"
                strokeWidth={2}
                dot={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 🐟 Fish Count Chart */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-2">Fish Count</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sensorData}>
              <XAxis
                dataKey="timestamp"
                tickFormatter={(t) => new Date(t).toLocaleTimeString()}
              />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="fishCount"
                stroke="#1A535C"
                strokeWidth={2}
                dot={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default App;
