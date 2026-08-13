import {
  analyzeRepositoryService
} from "../services/githubService.js";

import {
  buildDockerImage
} from "../services/dockerService.js";

import {
  generateKubernetesManifest
} from "../services/kubernetesService.js";

import {
  generateDeploymentPlan
} from "../services/terraformService.js";

import {
  createPipeline,
  findPipeline
} from "../services/jenkinsService.js";

export async function startPipeline(req, res, next) {
  try {
    const {
      repoUrl,
      branch = "main"
    } = req.body;

    if (!repoUrl) {
      return res.status(400).json({
        success: false,
        message: "repoUrl is required"
      });
    }

    // 1. Analyze repository
    const analysis =
      await analyzeRepositoryService(repoUrl);

    // 2. Generate Dockerfile
    const docker =
      await buildDockerImage({
        serviceName:
          analysis.repository.split("/").pop(),

        language:
          analysis.language.name
      });

    // 3. Generate Kubernetes manifest
    const serviceName =
      analysis.repository
        .split("/")
        .pop()
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, "-");

    const kubernetes =
      await generateKubernetesManifest(
        serviceName
      );

    // 4. Generate Terraform plan
    const terraform =
      await generateDeploymentPlan({
        serviceName,
        instanceType: "t3.medium",
        nodes: 2
      });

    // 5. Start Jenkins/demo pipeline
    const pipeline =
      await createPipeline(
        repoUrl,
        branch,
        {
          analysis,
          docker,
          kubernetes,
          terraform
        }
      );

    res.status(201).json({
      success: true,

      data: pipeline
    });

  } catch (error) {
    next(error);
  }
}

export async function getPipeline(req, res, next) {
  try {
    const pipeline =
      findPipeline(
        req.params.pipelineId
      );

    if (!pipeline) {
      return res.status(404).json({
        success: false,
        message: "Pipeline not found"
      });
    }

    res.json({
      success: true,
      data: pipeline
    });

  } catch (error) {
    next(error);
  }
}