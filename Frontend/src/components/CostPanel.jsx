import { useMemo, useState } from "react";

import { INSTANCE_COSTS } from "../data/costs";
import { calculateCost } from "../utils/cost";
import LogPanel from "./LogPanel";

export default function CostPanel({
  serviceName,
  onDeploy
}) {
  const [instance, setInstance] = useState("t3.medium");
  const [nodes, setNodes] = useState(2);

  const [deploying, setDeploying] = useState(false);
  const [result, setResult] = useState(null);

  const estimate = useMemo(() => {
    return calculateCost(instance, nodes);
  }, [instance, nodes]);

  const deploy = async () => {
    setDeploying(true);

    const deployment = await onDeploy(serviceName);

    setResult(deployment);
    setDeploying(false);
  };

  return (
    <>
      <div className="panel">

        <div className="panel-head">
          <span className="fname">
            estimated monthly cost
          </span>

          <span className="badge">
            us-east-1
          </span>
        </div>

        <div className="selectrow">

          <select
            value={instance}
            onChange={(e) =>
              setInstance(e.target.value)
            }
          >
            {Object.keys(INSTANCE_COSTS).map((key) => (
              <option
                value={key}
                key={key}
              >
                {key}
              </option>
            ))}
          </select>

          <select
            value={nodes}
            onChange={(e) =>
              setNodes(Number(e.target.value))
            }
          >
            {[1, 2, 3, 4].map((n) => (
              <option
                value={n}
                key={n}
              >
                {n} node{n > 1 ? "s" : ""}
              </option>
            ))}
          </select>

        </div>

        <div className="cost-grid">

          {estimate.rows.map(
            ([label, amount]) => (
              <div
                className="cost-row"
                key={label}
              >
                <div className="cost-label">
                  {label}
                </div>

                <div className="cost-amt">
                  {amount}
                </div>
              </div>
            )
          )}

          <div className="cost-row cost-total">

            <div className="cost-label">
              Estimated total / month
            </div>

            <div className="cost-amt">
              ${estimate.total.toFixed(2)}
            </div>

          </div>

        </div>

        <div className="warn">
          This is a rough estimate from list
          on-demand pricing — actual AWS billing
          will vary with data transfer, savings
          plans, and region.
        </div>

        <button
          className="deploybtn"
          onClick={deploy}
          disabled={deploying}
        >
          {deploying
            ? "Deploying…"
            : "Approve estimate & deploy to AWS"}
        </button>

      </div>

      {result && (
        <>
          <LogPanel
            filename="deployment logs"
            badge="AWS"
            lines={result.logs}
          />

          <div className="success">

            <div className="head">
              ✓ Deployed
            </div>

            <div className="url">
              Service reachable at{" "}
              <b>{result.url}</b>
            </div>

          </div>
        </>
      )}
    </>
  );
}