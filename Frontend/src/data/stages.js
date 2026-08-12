export const STAGES = [
  {
    id: "analyze",
    title: "Analyze repository",
    tag: "clone + inspect"
  },

  {
    id: "lang",
    title: "Detect language & runtime",
    tag: "heuristic scan"
  },

  {
    id: "docker",
    title: "Generate Dockerfile",
    tag: "container build"
  },

  {
    id: "k8s",
    title: "Write Kubernetes manifests",
    tag: "deployment + service"
  },

  {
    id: "tf",
    title: "Generate Terraform for AWS",
    tag: "ECR + EKS"
  },

  {
    id: "cost",
    title: "Estimate cost, then deploy",
    tag: "gated approval"
  }
];