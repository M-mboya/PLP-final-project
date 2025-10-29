import express from "express";
import { getSensors, simulateSensor } from "../controllers/sensorController.js";

const router = express.Router();

router.get("/", getSensors);
router.post("/simulate", simulateSensor);

export default router;
