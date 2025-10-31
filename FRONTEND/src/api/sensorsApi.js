import axios from "axios";

const API_URL = "http://localhost:5000/api/sensors"; // backend base URL

// ✅ Get all sensor data
export const getSensorData = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// ✅ Simulate new sensor data
export const simulateSensorData = async () => {
  const response = await axios.post(`${API_URL}/simulate`);
  return response.data;
};
