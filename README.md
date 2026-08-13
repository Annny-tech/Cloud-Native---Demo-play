# Enterprise DevOps Deployment Platform

> A cloud-native DevOps platform that simplifies application deployment by providing a unified workflow for repository analysis, containerization, Kubernetes deployment, infrastructure provisioning, monitoring, and cloud cost estimation.

## 🚀 Project Overview

The **Enterprise DevOps Deployment Platform** is a centralized platform designed to automate and simplify the deployment lifecycle of modern web applications.

Instead of manually configuring multiple DevOps tools, users can provide a GitHub repository URL through a single web interface. The platform analyzes the application, detects its runtime, generates container and infrastructure configurations, estimates cloud costs, and manages the deployment pipeline.

The project is being developed as a **Major Project** with the goal of integrating:

- GitHub
- Jenkins CI/CD
- Docker
- Kubernetes
- Terraform
- AWS
- Prometheus
- Grafana
- Infracost

---

# 🎯 Objectives

The main objectives of the project are:

1. Provide a centralized DevOps deployment interface.
2. Analyze application repositories automatically.
3. Detect the application language and runtime.
4. Generate Docker configurations automatically.
5. Generate Kubernetes deployment manifests.
6. Generate Terraform infrastructure configurations.
7. Provide AWS infrastructure cost estimation.
8. Automate CI/CD through Jenkins.
9. Deploy containerized applications to Kubernetes.
10. Provide infrastructure and application monitoring.
11. Provide cloud cost visibility before deployment.

---

# 🖥️ Current Demo

The current version contains a working **React + Node.js demonstration platform**.

The demo currently supports:

- Repository URL input
- Repository analysis simulation
- Runtime/language detection
- Dockerfile generation
- Kubernetes manifest generation
- Terraform configuration generation
- AWS infrastructure cost estimation
- Deployment pipeline visualization
- Backend API integration
- Pipeline status tracking
- Demo deployment workflow

The current backend operates in:

                         ┌──────────────────────┐
                         │      React UI        │
                         │   localhost:5174      │
                         └──────────┬───────────┘
                                    │
                                    │ REST API
                                    ▼
                         ┌──────────────────────┐
                         │    Node.js Backend   │
                         │   Express API :5000  │
                         └──────────┬───────────┘
                                    │
                 ┌──────────────────┼──────────────────┐
                 │                  │                  │
                 ▼                  ▼                  ▼
          ┌────────────┐     ┌────────────┐     ┌────────────┐
          │   GitHub   │     │  Jenkins   │     │ Cost Engine│
          │  Service   │     │  Service   │     │            │
          └────────────┘     └────────────┘     └────────────┘
                                    │
                                    ▼
                              ┌───────────┐
                              │  Docker   │
                              └─────┬─────┘
                                    │
                                    ▼
                              ┌───────────┐
                              │    ECR    │
                              └─────┬─────┘
                                    │
                                    ▼
                              ┌───────────┐
                              │    EKS    │
                              │ Kubernetes│
                              └─────┬─────┘
                                    │
                         ┌──────────┴──────────┐
                         ▼                     ▼
                   ┌───────────┐         ┌───────────┐
                   │Prometheus │         │  Grafana  │
                   └───────────┘         └───────────┘

Enterprise-DevOps-Platform-Deployment/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CodePanel.jsx
│   │   │   ├── CostPanel.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── LogPanel.jsx
│   │   │   ├── Panel.jsx
│   │   │   ├── Pipeline.jsx
│   │   │   ├── RepoInput.jsx
│   │   │   └── Stage.jsx
│   │   │
│   │   ├── data/
│   │   │   ├── costs.js
│   │   │   ├── languages.js
│   │   │   └── stages.js
│   │   │
│   │   ├── styles/
│   │   │   └── global.css
│   │   │
│   │   ├── utils/
│   │   │   ├── api.js
│   │   │   └── pipeline.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   └── package-lock.json
│
├── backend/
│   ├── routes/
│   │   ├── repository.js
│   │   ├── pipeline.js
│   │   ├── deployment.js
│   │   └── cost.js
│   │
│   ├── controllers/
│   │   ├── repositoryController.js
│   │   ├── pipelineController.js
│   │   └── deploymentController.js
│   │
│   ├── services/
│   │   ├── githubService.js
│   │   ├── jenkinsService.js
│   │   ├── dockerService.js
│   │   ├── kubernetesService.js
│   │   ├── terraformService.js
│   │   └── awsService.js
│   │
│   ├── middleware/
│   │   └── errorHandler.js
│   │
│   ├── utils/
│   │   └── logger.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
