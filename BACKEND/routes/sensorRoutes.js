import express from "express";
import Sensor from "../models/sensorModel.js";

const router = express.Router();

// Simulate sensor data
router.post("/simulate", async (req, res) => {
  try {
    const newSensor = new Sensor({
      temperature: (Math.random() * 10 + 20).toFixed(2), // 20–30°C
      ph: (Math.random() * 2 + 6).toFixed(2), // 6–8 pH
      oxygen: (Math.random() * 5 + 5).toFixed(2), // 5–10 mg/L
      fishCount: Math.floor(Math.random() * 200 + 800), // 800–1000 fish
      timestamp: new Date(),
    });

    await newSensor.save();
    res.json(newSensor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get latest 20 readings
router.get("/", async (req, res) => {
  try {
    const sensors = await Sensor.find().sort({ timestamp: -1 }).limit(20);
    res.json(sensors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Clear all sensor data
router.delete("/clear", async (req, res) => {
  try {
    await Sensor.deleteMany({});
    res.json({ message: "All old data cleared" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
