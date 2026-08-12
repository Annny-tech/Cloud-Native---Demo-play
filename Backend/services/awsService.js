const INSTANCE_COSTS = {
  "t3.medium": {
    hourly: 0.0416
  },

  "t3.large": {
    hourly: 0.0832
  },

  "m6i.large": {
    hourly: 0.096
  }
};

export function calculateInfrastructureCost(
  instanceType,
  nodes
) {
  const instance =
    INSTANCE_COSTS[instanceType];

  if (!instance) {
    throw new Error(
      "Unsupported AWS instance type"
    );
  }

  const hours = 730;

  const workerNodes =
    instance.hourly *
    hours *
    nodes;

  const eksControlPlane =
    73.0;

  const alb =
    16.43;

  const nat =
    32.85;

  const ecr =
    2.10;

  const dataTransfer =
    9.00;

  const total =
    workerNodes +
    eksControlPlane +
    alb +
    nat +
    ecr +
    dataTransfer;

  return {
    workerNodes,

    eksControlPlane,

    alb,

    nat,

    ecr,

    dataTransfer,

    total:
      Number(total.toFixed(2))
  };
}

export async function checkAWSConnection() {
  if (
    process.env.DEMO_MODE === "true"
  ) {
    return {
      connected: true,
      mode: "demo",
      region:
        process.env.AWS_REGION ||
        "us-east-1"
    };
  }

  return {
    connected: false,
    mode: "real",
    message:
      "AWS SDK integration will be enabled in the next phase."
  };
}