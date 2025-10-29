import Sensor from "../models/sensorModel.js";

// ✅ Get all sensor data
export const getSensors = async (req, res) => {
  try {
    const sensors = await Sensor.find().sort({ createdAt: -1 });
    res.json(sensors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Simulate and save new sensor data
export const simulateSensor = async (req, res) => {
  try {
    const newData = {
      soilMoisture: Math.floor(Math.random() * 100),
      temperature: (20 + Math.random() * 10).toFixed(2),
      waterLevel: (50 + Math.random() * 50).toFixed(2),
    };

    const sensor = await Sensor.create(newData);
    res.status(201).json({ message: "Sensor data recorded", sensor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
