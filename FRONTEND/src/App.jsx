import { useEffect, useState } from "react";
import { getSensorData, simulateSensorData } from "./api/sensorsApi";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchSensorData();
  }, []);

  const fetchSensorData = async () => {
    try {
      const response = await getSensorData();
      setData(response);
    } catch (error) {
      console.error("Error fetching sensor data:", error);
    }
  };

  const handleSimulate = async () => {
    try {
      await simulateSensorData();
      fetchSensorData(); // refresh after simulating
    } catch (error) {
      console.error("Error simulating data:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      <h1 className="text-3xl font-bold mb-6">Aquafarm Sensor Dashboard</h1>
      <button
        onClick={handleSimulate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-6"
      >
        Simulate Sensor Data
      </button>

      <table className="table-auto border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Voltage (V)</th>
            <th className="border border-gray-300 px-4 py-2">Current (A)</th>
            <th className="border border-gray-300 px-4 py-2">Power (W)</th>
            <th className="border border-gray-300 px-4 py-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {data.map((sensor, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">
                {sensor.voltage}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {sensor.current}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {sensor.power}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(sensor.timestamp).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
