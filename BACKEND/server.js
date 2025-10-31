import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";
import Sensor from "./models/sensorModel.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// ✅ MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/aquafarm", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// ✅ REST API route to get sensor data
app.get("/api/sensors", async (req, res) => {
  try {
    const data = await Sensor.find().sort({ timestamp: -1 }).limit(20);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Simulate sensor data every 5 seconds
setInterval(async () => {
  const newSensor = await Sensor.create({
    temperature: (20 + Math.random() * 10).toFixed(2),
    ph: (6 + Math.random() * 3).toFixed(2),
    oxygenLevel: (4 + Math.random() * 4).toFixed(2),
    fishCount: Math.floor(50 + Math.random() * 20),
  });

  io.emit("sensorUpdate", newSensor);
  console.log("Simulated:", newSensor);
}, 5000);

// ✅ WebSocket Connection
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
  socket.on("disconnect", () => console.log("Client disconnected:", socket.id));
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
