import mongoose from "mongoose";

const sensorSchema = new mongoose.Schema(
  {
    soilMoisture: Number,
    temperature: Number,
    waterLevel: Number,
  },
  { timestamps: true }
);

const Sensor = mongoose.model("Sensor", sensorSchema);
export default Sensor;
