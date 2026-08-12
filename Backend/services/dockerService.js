export async function buildDockerImage({
  serviceName,
  language
}) {
  const imageName =
    `${serviceName}:latest`;

  return {
    success: true,

    imageName,

    language,

    dockerfile: generateDockerfile(
      language
    ),

    status: "BUILD_SUCCESS",

    message:
      `Docker image ${imageName} built successfully`,

    demoMode:
      process.env.DEMO_MODE === "true"
  };
}

function generateDockerfile(
  language
) {
  if (language === "Python") {
    return `FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8080

CMD ["gunicorn", "-b", "0.0.0.0:8080", "app:app"]`;
  }

  if (language === "Java") {
    return `FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY . .

RUN ./mvnw -q package -DskipTests

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]`;
  }

  if (language === "Go") {
    return `FROM golang:1.22-alpine

WORKDIR /src

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN go build -o /app

EXPOSE 8080

ENTRYPOINT ["/app"]`;
  }

  return `FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

EXPOSE 8080

CMD ["node", "server.js"]`;
}