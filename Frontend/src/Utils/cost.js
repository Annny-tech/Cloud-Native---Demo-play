import { INSTANCE_COSTS } from "../data/costs";

export function calculateCost(
  instance,
  nodes
) {
  const hours = 730;

  const nodeMonthly =
    INSTANCE_COSTS[instance].hourly *
    hours *
    nodes;

  const eksControlPlane = 73.0;
  const ecr = 2.10;
  const alb = 16.43;
  const nat = 32.85;
  const dataTransfer = 9.00;

  const total =
    nodeMonthly +
    eksControlPlane +
    ecr +
    alb +
    nat +
    dataTransfer;

  const rows = [
    [
      "EKS control plane",
      `$${eksControlPlane.toFixed(2)}`
    ],

    [
      `Worker nodes — ${nodes}× ${INSTANCE_COSTS[instance].label}`,
      `$${nodeMonthly.toFixed(2)}`
    ],

    [
      "Application Load Balancer",
      `$${alb.toFixed(2)}`
    ],

    [
      "NAT gateway",
      `$${nat.toFixed(2)}`
    ],

    [
      "ECR image storage",
      `$${ecr.toFixed(2)}`
    ],

    [
      "Data transfer (est.)",
      `$${dataTransfer.toFixed(2)}`
    ]
  ];

  return {
    rows,
    total
  };
}