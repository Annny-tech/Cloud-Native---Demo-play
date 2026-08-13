import crypto from "crypto";

const pipelines = new Map();

const wait = (ms) =>
  new Promise((resolve) =>
    setTimeout(resolve, ms)
  );

export async function createPipeline(
  repoUrl,
  branch,
  artifacts = {}
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
        id: "checkout",
        name: "Checkout",
        status: "RUNNING"
      },

      {
        id: "build",
        name: "Build",
        status: "PENDING"
      },

      {
        id: "docker",
        name: "Docker",
        status: "PENDING"
      },

      {
        id: "terraform",
        name: "Terraform",
        status: "PENDING"
      },

      {
        id: "deploy",
        name: "Deploy",
        status: "PENDING"
      }
    ],

    artifacts,

    createdAt:
      new Date().toISOString()
  };

  pipelines.set(
    pipelineId,
    pipeline
  );

  runDemoPipeline(
    pipelineId
  );

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

    pipelines.set(
      pipelineId,
      pipeline
    );

    await wait(1500);

    pipeline.stages[i].status =
      "SUCCESS";

    pipelines.set(
      pipelineId,
      pipeline
    );
  }

  pipeline.status =
    "SUCCESS";

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