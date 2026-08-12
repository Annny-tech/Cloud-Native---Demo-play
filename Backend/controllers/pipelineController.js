import {
  createPipeline,
  findPipeline
} from "../services/jenkinsService.js";

export async function startPipeline(
  req,
  res,
  next
) {
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

    const pipeline =
      await createPipeline(
        repoUrl,
        branch
      );

    res.status(201).json({
      success: true,
      data: pipeline
    });

  } catch (error) {
    next(error);
  }
}

export async function getPipeline(
  req,
  res,
  next
) {
  try {
    const pipeline =
      findPipeline(req.params.pipelineId);

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