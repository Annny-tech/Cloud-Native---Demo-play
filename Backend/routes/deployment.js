import express from "express";

import {
  createDeployment,
  applyDeployment
} from "../controllers/deploymentController.js";

const router = express.Router();

router.post("/plan", createDeployment);

router.post("/apply", applyDeployment);

export default router;