import express from "express";

import {
  startPipeline,
  getPipeline
} from "../controllers/pipelineController.js";

const router = express.Router();

router.post("/start", startPipeline);

router.get("/:pipelineId", getPipeline);

export default router;