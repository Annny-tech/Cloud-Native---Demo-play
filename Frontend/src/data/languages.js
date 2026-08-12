export const LANGS = [
  {
    name: "Python",
    tag: "3.12",
    manifest: "requirements.txt",
    icon: "PY",

    dockerfile: `<span class="k">FROM</span> <span class="s">python:3.12-slim</span> <span class="k">AS</span> base
<span class="k">WORKDIR</span> /app
<span class="k">COPY</span> requirements.txt .
<span class="k">RUN</span> pip install --no-cache-dir -r requirements.txt
<span class="k">COPY</span> . .
<span class="k">ENV</span> PORT=8080
<span class="k">EXPOSE</span> 8080
<span class="k">CMD</span> [<span class="s">"gunicorn"</span>, <span class="s">"-b"</span>, <span class="s">"0.0.0.0:8080"</span>, <span class="s">"app:app"</span>]`
  },

  {
    name: "Node.js",
    tag: "20 LTS",
    manifest: "package.json",
    icon: "JS",

    dockerfile: `<span class="k">FROM</span> <span class="s">node:20-alpine</span> <span class="k">AS</span> build
<span class="k">WORKDIR</span> /app
<span class="k">COPY</span> package*.json ./
<span class="k">RUN</span> npm ci --omit=dev
<span class="k">COPY</span> . .
<span class="k">ENV</span> PORT=8080
<span class="k">EXPOSE</span> 8080
<span class="k">CMD</span> [<span class="s">"node"</span>, <span class="s">"server.js"</span>]`
  },

  {
    name: "Go",
    tag: "1.22",
    manifest: "go.mod",
    icon: "GO",

    dockerfile: `<span class="k">FROM</span> <span class="s">golang:1.22-alpine</span> <span class="k">AS</span> build
<span class="k">WORKDIR</span> /src
<span class="k">COPY</span> go.mod go.sum ./
<span class="k">RUN</span> go mod download
<span class="k">COPY</span> . .
<span class="k">RUN</span> CGO_ENABLED=0 go build -o /app ./cmd/server

<span class="k">FROM</span> <span class="s">gcr.io/distroless/static</span>
<span class="k">COPY</span> --from=build /app /app
<span class="k">EXPOSE</span> 8080
<span class="k">ENTRYPOINT</span> [<span class="s">"/app"</span>]`
  },

  {
    name: "Java",
    tag: "21 (Temurin)",
    manifest: "pom.xml",
    icon: "JV",

    dockerfile: `<span class="k">FROM</span> <span class="s">eclipse-temurin:21-jdk</span> <span class="k">AS</span> build
<span class="k">WORKDIR</span> /app
<span class="k">COPY</span> . .
<span class="k">RUN</span> ./mvnw -q package -DskipTests

<span class="k">FROM</span> <span class="s">eclipse-temurin:21-jre-alpine</span>
<span class="k">COPY</span> --from=build /app/target/*.jar /app.jar
<span class="k">EXPOSE</span> 8080
<span class="k">ENTRYPOINT</span> [<span class="s">"java"</span>, <span class="s">"-jar"</span>, <span class="s">"/app.jar"</span>]`
  }
];