import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import sensorRoutes from "./routes/sensorRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    // these options are no longer needed but kept for safety
  })
  .then(() => console.log("✅ MongoDB Connected:", mongoose.connection.host))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/sensors", sensorRoutes);

app.get("/", (req, res) => {
  res.send("🌿 Aquafarm API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
