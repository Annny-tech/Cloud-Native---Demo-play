import Stage from "./Stage";
import CodePanel from "./CodePanel";
import LogPanel from "./LogPanel";
import CostPanel from "./CostPanel";

export default function Pipeline({ pipeline }) {
  if (!pipeline) {
    return (
      <div
        className="rail"
        id="rail"
      />
    );
  }

  return (
    <div
      className="rail"
      id="rail"
    >

      {pipeline.stages.map(
        (stage, index) => {

          if (stage.id === "analyze") {
            return (
              <Stage
                key={stage.id}
                stage={stage}
                index={index}
              >
                <LogPanel
                  filename="git clone"
                  badge="read-only"
                  lines={stage.logs}
                />
              </Stage>
            );
          }

          if (stage.id === "lang") {
            return (
              <Stage
                key={stage.id}
                stage={stage}
                index={index}
              >

                <div className="panel">

                  <div className="panel-head">

                    <span className="fname">
                      runtime detection
                    </span>

                    <span className="badge">
                      {pipeline.lang.icon}
                    </span>

                  </div>

                  <div className="kv-row">

                    <div className="kv">
                      <span className="l">
                        Language
                      </span>

                      <span className="v">
                        {pipeline.lang.name}
                      </span>
                    </div>

                    <div className="kv">
                      <span className="l">
                        Version
                      </span>

                      <span className="v">
                        {pipeline.lang.tag}
                      </span>
                    </div>

                    <div className="kv">
                      <span className="l">
                        Manifest
                      </span>

                      <span className="v">
                        {pipeline.lang.manifest}
                      </span>
                    </div>

                    <div className="kv">
                      <span className="l">
                        Entry
                      </span>

                      <span className="v">
                        {pipeline.repoName
                          .split("/")
                          .pop()}
                      </span>
                    </div>

                  </div>
                </div>

              </Stage>
            );
          }

          if (stage.id === "docker") {
            return (
              <Stage
                key={stage.id}
                stage={stage}
                index={index}
              >
                <CodePanel
                  filename="Dockerfile"
                  badge="generated"
                  code={pipeline.lang.dockerfile}
                />
              </Stage>
            );
          }

          if (stage.id === "k8s") {
            return (
              <Stage
                key={stage.id}
                stage={stage}
                index={index}
              >
                <CodePanel
                  filename="k8s/deployment.yaml"
                  badge="2 objects"
                  code={pipeline.k8sYaml}
                />
              </Stage>
            );
          }

          if (stage.id === "tf") {
            return (
              <Stage
                key={stage.id}
                stage={stage}
                index={index}
              >

                <CodePanel
                  filename="infra/main.tf"
                  badge="AWS · eu / us"
                  code={pipeline.tf}
                />

                <LogPanel
                  filename="terraform plan"
                  badge="dry run"
                  lines={pipeline.tfLogs}
                />

              </Stage>
            );
          }

          if (stage.id === "cost") {
            return (
              <Stage
                key={stage.id}
                stage={stage}
                index={index}
              >
                <CostPanel
                 serviceName={pipeline.serviceName}
              />
              </Stage>
            );
          }

          return null;
        }
      )}

    </div>
  );
}