const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

async function request(
  endpoint,
  options = {}
) {
  const response =
    await fetch(
      `${API_URL}${endpoint}`,
      {
        headers: {
          "Content-Type":
            "application/json",

          ...(options.headers || {})
        },

        ...options
      }
    );

  const data =
    await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
      "API request failed"
    );
  }

  return data;
}

export async function startPipeline(
  repoUrl,
  branch = "main"
) {
  return request(
    "/pipeline/start",
    {
      method: "POST",

      body: JSON.stringify({
        repoUrl,
        branch
      })
    }
  );
}

export async function getPipeline(
  pipelineId
) {
  return request(
    `/pipeline/${pipelineId}`
  );
}

export async function getCost(
  instance,
  nodes
) {
  return request(
    `/cost?instance=${encodeURIComponent(
      instance
    )}&nodes=${nodes}`
  );
}

export async function createDeploymentPlan(
  serviceName,
  instanceType,
  nodes
) {
  return request(
    "/deployment/plan",
    {
      method: "POST",

      body: JSON.stringify({
        serviceName,
        instanceType,
        nodes
      })
    }
  );
}

export async function applyDeployment(
  serviceName
) {
  return request(
    "/deployment/apply",
    {
      method: "POST",

      body: JSON.stringify({
        serviceName
      })
    }
  );
}