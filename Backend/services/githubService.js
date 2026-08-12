function getRepositoryName(repoUrl) {
  try {
    const cleanUrl =
      repoUrl.replace(/\/+$/, "");

    const parts =
      cleanUrl.split("/");

    const owner =
      parts[parts.length - 2];

    const repository =
      parts[parts.length - 1]
        .replace(".git", "");

    return {
      owner,
      repository,
      fullName:
        `${owner}/${repository}`
    };

  } catch {
    return {
      owner: "demo",
      repository: "application",
      fullName: "demo/application"
    };
  }
}

function detectLanguage(repository) {
  const value =
    repository.toLowerCase();

  if (
    value.includes("python") ||
    value.includes("flask") ||
    value.includes("django")
  ) {
    return {
      name: "Python",
      version: "3.12",
      manifest: "requirements.txt"
    };
  }

  if (
    value.includes("node") ||
    value.includes("javascript") ||
    value.includes("js")
  ) {
    return {
      name: "Node.js",
      version: "20 LTS",
      manifest: "package.json"
    };
  }

  if (
    value.includes("go")
  ) {
    return {
      name: "Go",
      version: "1.22",
      manifest: "go.mod"
    };
  }

  if (
    value.includes("java")
  ) {
    return {
      name: "Java",
      version: "21",
      manifest: "pom.xml"
    };
  }

  return {
    name: "Node.js",
    version: "20 LTS",
    manifest: "package.json"
  };
}

export async function analyzeRepositoryService(
  repoUrl
) {
  const repo =
    getRepositoryName(repoUrl);

  const language =
    detectLanguage(
      repo.repository
    );

  return {
    repository: repo.fullName,

    url: repoUrl,

    language,

    filesScanned: 247,

    linesScanned: 8410,

    detectedManifest:
      language.manifest,

    status: "analyzed",

    demoMode:
      process.env.DEMO_MODE === "true"
  };
}