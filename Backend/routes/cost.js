import express from "express";

const router = express.Router();

const INSTANCE_COSTS = {
  "t3.medium": {
    hourly: 0.0416,
    label: "t3.medium (2 vCPU / 4GB)"
  },

  "t3.large": {
    hourly: 0.0832,
    label: "t3.large (2 vCPU / 8GB)"
  },

  "m6i.large": {
    hourly: 0.096,
    label: "m6i.large (2 vCPU / 8GB)"
  }
};

router.get("/", (req, res) => {
  const instance = req.query.instance || "t3.medium";
  const nodes = Number(req.query.nodes) || 2;

  if (!INSTANCE_COSTS[instance]) {
    return res.status(400).json({
      success: false,
      message: "Invalid instance type"
    });
  }

  const hours = 730;

  const workerNodes =
    INSTANCE_COSTS[instance].hourly *
    hours *
    nodes;

  const eksControlPlane = 73.0;
  const alb = 16.43;
  const nat = 32.85;
  const ecr = 2.10;
  const dataTransfer = 9.00;

  const total =
    workerNodes +
    eksControlPlane +
    alb +
    nat +
    ecr +
    dataTransfer;

  res.json({
    success: true,

    region: "us-east-1",

    instance,

    instanceLabel:
      INSTANCE_COSTS[instance].label,

    nodes,

    breakdown: {
      eksControlPlane,
      workerNodes,
      applicationLoadBalancer: alb,
      natGateway: nat,
      ecrStorage: ecr,
      dataTransfer
    },

    estimatedMonthlyCost:
      Number(total.toFixed(2))
  });
});

export default router;