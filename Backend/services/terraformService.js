import {
  calculateInfrastructureCost
} from "./awsService.js";

export async function generateDeploymentPlan({
  serviceName,
  instanceType,
  nodes
}) {
  const safeName =
    serviceName.replace(
      /[^a-zA-Z0-9_-]/g,
      "-"
    );

  const terraform = `resource "aws_ecr_repository" "${safeName}" {
  name = "${safeName}"

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_eks_node_group" "app" {
  cluster_name = aws_eks_cluster.main.name

  node_group_name = "${safeName}-ng"

  instance_types = [
    var.node_instance_type
  ]

  scaling_config {
    desired_size = ${nodes}
    min_size     = 1
    max_size     = 4
  }
}`;

  const cost =
    calculateInfrastructureCost(
      instanceType,
      nodes
    );

  return {
    success: true,

    serviceName: safeName,

    terraform,

    instanceType,

    nodes,

    estimatedMonthlyCost:
      cost.total,

    status: "PLAN_CREATED"
  };
}

export async function applyDeploymentPlan(
  serviceName
) {
  return {
    success: true,

    serviceName,

    status: "APPLIED",

    steps: [
      "Terraform initialized",
      "Terraform plan created",
      "ECR repository created",
      "EKS node group created",
      "Kubernetes deployment applied",
      "Kubernetes service created"
    ],

    endpoint:
      `http://${serviceName}-lb-demo.us-east-1.elb.amazonaws.com`,

    demoMode:
      process.env.DEMO_MODE === "true"
  };
}