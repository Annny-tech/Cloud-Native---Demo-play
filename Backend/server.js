import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import repositoryRoutes from "./routes/repository.js";
import pipelineRoutes from "./routes/pipeline.js";
import deploymentRoutes from "./routes/deployment.js";
import costRoutes from "./routes/cost.js";

import { errorHandler } from "./middleware/errorHandler.js";
import logger from "./utils/logger.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173"
  })
);

app.use(express.json());

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Enterprise DevOps Platform Backend is running",
    version: "1.0.0",
    demoMode: process.env.DEMO_MODE === "true"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "healthy",
    service: "devops-backend",
    timestamp: new Date().toISOString()
  });
});

app.use("/api/repository", repositoryRoutes);
app.use("/api/pipeline", pipelineRoutes);
app.use("/api/deployment", deploymentRoutes);
app.use("/api/cost", costRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Backend running on http://localhost:${PORT}`);
  logger.info(
    `Demo mode: ${process.env.DEMO_MODE === "true" ? "ON" : "OFF"}`
  );
});