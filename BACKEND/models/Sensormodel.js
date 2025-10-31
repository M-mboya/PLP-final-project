import mongoose from "mongoose";

const sensorSchema = new mongoose.Schema({
  temperature: Number,
  ph: Number,
  oxygenLevel: Number,
  fishCount: Number,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Sensor = mongoose.model("Sensor", sensorSchema);
export default Sensor;
