import {
  generateDeploymentPlan,
  applyDeploymentPlan
} from "../services/terraformService.js";

export async function createDeployment(
  req,
  res,
  next
) {
  try {
    const {
      serviceName,
      instanceType = "t3.medium",
      nodes = 2
    } = req.body;

    if (!serviceName) {
      return res.status(400).json({
        success: false,
        message: "serviceName is required"
      });
    }

    const result =
      await generateDeploymentPlan({
        serviceName,
        instanceType,
        nodes
      });

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    next(error);
  }
}

export async function applyDeployment(
  req,
  res,
  next
) {
  try {
    const {
      serviceName
    } = req.body;

    if (!serviceName) {
      return res.status(400).json({
        success: false,
        message: "serviceName is required"
      });
    }

    const result =
      await applyDeploymentPlan(
        serviceName
      );

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    next(error);
  }
}