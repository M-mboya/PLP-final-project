import express from "express";
import Sensor from "../models/sensorModel.js";

const router = express.Router();

// ✅ GET all sensor data
router.get("/", async (req, res) => {
  try {
    const sensors = await Sensor.find().sort({ timestamp: -1 }).limit(20);
    res.json(sensors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sensor data", error });
  }
});

// ✅ Simulate new sensor data
router.post("/simulate", async (req, res) => {
  try {
    // Generate random realistic readings
    const newSensor = new Sensor({
      temperature: Number((Math.random() * 10 + 20).toFixed(2)), // 20–30°C
      ph: Number((Math.random() * 2 + 6).toFixed(2)),            // 6–8 pH
      oxygenLevel: Number((Math.random() * 5 + 5).toFixed(2)),   // 5–10 mg/L
      fishCount: Math.floor(Math.random() * 50 + 50),            // 50–100 fish
    });

    const savedSensor = await newSensor.save();
    res.status(201).json(savedSensor);
  } catch (error) {
    res.status(500).json({ message: "Error saving sensor data", error });
  }
});

// ✅ Clear all sensor data
router.get("/clear", async (req, res) => {
  try {
    await Sensor.deleteMany({});
    res.json({ message: "All sensor data cleared" });
  } catch (error) {
    res.status(500).json({ message: "Error clearing data", error });
  }
});

export default router;
