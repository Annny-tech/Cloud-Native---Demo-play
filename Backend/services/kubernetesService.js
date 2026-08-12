export async function generateKubernetesManifest(
  serviceName
) {
  const manifest = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${serviceName}
spec:
  replicas: 2

  selector:
    matchLabels:
      app: ${serviceName}

  template:
    metadata:
      labels:
        app: ${serviceName}

    spec:
      containers:
        - name: ${serviceName}
          image: ${serviceName}:latest

          ports:
            - containerPort: 8080

          resources:
            requests:
              cpu: "250m"
              memory: "256Mi"

            limits:
              cpu: "500m"
              memory: "512Mi"

---
apiVersion: v1
kind: Service

metadata:
  name: ${serviceName}

spec:
  type: LoadBalancer

  selector:
    app: ${serviceName}

  ports:
    - port: 80
      targetPort: 8080
`;

  return {
    success: true,

    serviceName,

    manifest,

    resources: [
      "Deployment",
      "Service"
    ]
  };
}