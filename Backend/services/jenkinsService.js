import crypto from "crypto";

const pipelines = new Map();

const wait = (ms) =>
  new Promise((resolve) =>
    setTimeout(resolve, ms)
  );

export async function createPipeline(
  repoUrl,
  branch
) {
  const pipelineId =
    crypto.randomUUID();

  const pipeline = {
    id: pipelineId,

    repository: repoUrl,

    branch,

    status: "RUNNING",

    stages: [
      {
        name: "Checkout",
        status: "RUNNING"
      },
      {
        name: "Build",
        status: "PENDING"
      },
      {
        name: "Docker",
        status: "PENDING"
      },
      {
        name: "Terraform",
        status: "PENDING"
      },
      {
        name: "Deploy",
        status: "PENDING"
      }
    ],

    createdAt:
      new Date().toISOString()
  };

  pipelines.set(
    pipelineId,
    pipeline
  );

  runDemoPipeline(pipelineId);

  return pipeline;
}

async function runDemoPipeline(
  pipelineId
) {
  const pipeline =
    pipelines.get(pipelineId);

  if (!pipeline) {
    return;
  }

  for (
    let i = 0;
    i < pipeline.stages.length;
    i++
  ) {
    pipeline.stages[i].status =
      "RUNNING";

    await wait(1200);

    pipeline.stages[i].status =
      "SUCCESS";
  }

  pipeline.status = "SUCCESS";

  pipeline.completedAt =
    new Date().toISOString();

  pipelines.set(
    pipelineId,
    pipeline
  );
}

export function findPipeline(
  pipelineId
) {
  return pipelines.get(
    pipelineId
  );
}