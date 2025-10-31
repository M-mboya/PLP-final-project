import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [sensors, setSensors] = useState([]);
  const [alerts, setAlerts] = useState([]);

  const fetchSensors = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/sensors");
      const data = await res.json();
      setSensors(data);

      // Alerts
      const newAlerts = data.map(sensor => {
        const a = [];
        if (sensor.temperature < 15 || sensor.temperature > 30)
          a.push(`🌡️ Temperature out of range: ${sensor.temperature}°C`);
        if (sensor.ph < 6.5 || sensor.ph > 8.5)
          a.push(`💧 Abnormal pH level: ${sensor.ph}`);
        if (sensor.oxygen < 5)
          a.push(`🫧 Low Oxygen level: ${sensor.oxygen} mg/L`);
        if (sensor.fishCount < 50)
          a.push(`🐟 Fish count low: ${sensor.fishCount}`);
        return a;
      }).flat();

      setAlerts(newAlerts);
    } catch (error) {
      console.error("Error fetching sensors:", error);
    }
  };

  useEffect(() => {
    fetchSensors();
    const interval = setInterval(fetchSensors, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">
        Aquafarm Sensor Dashboard 🌊
      </h1>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 animate-pulse">
          <h2 className="font-semibold text-lg mb-2">⚠️ System Alerts</h2>
          <ul className="list-disc pl-6">
            {alerts.map((alert, i) => (
              <li key={i}>{alert}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto mb-8">
        <table className="w-full bg-white rounded-lg shadow-lg border-collapse">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-2 px-4">Temperature (°C)</th>
              <th className="py-2 px-4">pH</th>
              <th className="py-2 px-4">Oxygen (mg/L)</th>
              <th className="py-2 px-4">Fish Count</th>
              <th className="py-2 px-4">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {sensors.length > 0 ? (
              sensors.map((s, i) => (
                <tr key={i} className="text-center border-b hover:bg-blue-50">
                  <td className="py-2 px-4">{s.temperature}</td>
                  <td className="py-2 px-4">{s.ph}</td>
                  <td className="py-2 px-4">{s.oxygen}</td>
                  <td className="py-2 px-4">{s.fishCount}</td>
                  <td className="py-2 px-4">
                    {new Date(s.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 text-gray-500">
                  No sensor data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Charts Section */}
      {sensors.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Temperature Chart */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">
              🌡️ Temperature Trend
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={sensors}>
                <Line type="monotone" dataKey="temperature" stroke="#ff7300" />
                <CartesianGrid stroke="#ccc" />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={(t) => new Date(t).toLocaleTimeString()}
                />
                <YAxis />
                <Tooltip />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* pH Chart */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-green-600 mb-2">
              💧 pH Levels
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={sensors}>
                <Line type="monotone" dataKey="ph" stroke="#00c49f" />
                <CartesianGrid stroke="#ccc" />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={(t) => new Date(t).toLocaleTimeString()}
                />
                <YAxis />
                <Tooltip />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Oxygen Chart */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-sky-600 mb-2">
              🫧 Oxygen Levels
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={sensors}>
                <Line type="monotone" dataKey="oxygen" stroke="#0088FE" />
                <CartesianGrid stroke="#ccc" />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={(t) => new Date(t).toLocaleTimeString()}
                />
                <YAxis />
                <Tooltip />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Fish Count Chart */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-purple-600 mb-2">
              🐟 Fish Count
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={sensors}>
                <Line type="monotone" dataKey="fishCount" stroke="#aa00ff" />
                <CartesianGrid stroke="#ccc" />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={(t) => new Date(t).toLocaleTimeString()}
                />
                <YAxis />
                <Tooltip />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
