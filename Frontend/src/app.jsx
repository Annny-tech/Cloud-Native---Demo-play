import { useState } from "react";

import Header from "./components/Header";
import RepoInput from "./components/RepoInput";
import Pipeline from "./components/Pipeline";

import { runPipeline } from "./utils/pipeline";

const PRESETS = [
  "https://github.com/acme/checkout-service",
  "https://github.com/northwind/pricing-api",
  "https://github.com/lumen/media-worker",
  "https://github.com/forge/build-cli"
];

export default function App() {
  const [repoUrl, setRepoUrl] = useState(PRESETS[0]);
  const [pipeline, setPipeline] = useState(null);
  const [running, setRunning] = useState(false);

  const startPipeline = async (url = repoUrl) => {
    const cleanUrl = url.trim() || PRESETS[0];

    setRepoUrl(cleanUrl);
    setRunning(true);
    setPipeline(null);

    const result = await runPipeline(cleanUrl, (state) => {
      setPipeline({ ...state });
    });

    setPipeline(result);
    setRunning(false);
  };

  return (
    <main className="wrap">
      <Header />

      <RepoInput
        value={repoUrl}
        onChange={setRepoUrl}
        presets={PRESETS}
        onRun={startPipeline}
        running={running}
      />

      <Pipeline pipeline={pipeline} />
    </main>
  );
}