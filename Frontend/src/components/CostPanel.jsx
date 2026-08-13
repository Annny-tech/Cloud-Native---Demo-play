import {
  useEffect,
  useState
} from "react";

import {
  getCost,
  createDeploymentPlan,
  applyDeployment
} from "../utils/api";

import LogPanel from "./LogPanel";

export default function CostPanel({
  serviceName
}) {
  const [instance, setInstance] =
    useState("t3.medium");

  const [nodes, setNodes] =
    useState(2);

  const [cost, setCost] =
    useState(null);

  const [loadingCost, setLoadingCost] =
    useState(false);

  const [deploying, setDeploying] =
    useState(false);

  const [result, setResult] =
    useState(null);

  async function loadCost() {
    try {
      setLoadingCost(true);

      const response =
        await getCost(
          instance,
          nodes
        );

      setCost(
        response.data
      );

    } catch (error) {
      console.error(
        "Cost error:",
        error
      );

    } finally {
      setLoadingCost(false);
    }
  }

  useEffect(() => {
    loadCost();
  }, [instance, nodes]);

  async function deploy() {
    try {
      setDeploying(true);

      // First create Terraform plan
      await createDeploymentPlan(
        serviceName,
        instance,
        nodes
      );

      // Then apply it
      const response =
        await applyDeployment(
          serviceName
        );

      setResult(
        response.data
      );

    } catch (error) {
      console.error(
        "Deployment error:",
        error
      );

      alert(
        error.message ||
        "Deployment failed"
      );

    } finally {
      setDeploying(false);
    }
  }

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
              setInstance(
                e.target.value
              )
            }
          >

            <option value="t3.medium">
              t3.medium
            </option>

            <option value="t3.large">
              t3.large
            </option>

            <option value="m6i.large">
              m6i.large
            </option>

          </select>

          <select
            value={nodes}
            onChange={(e) =>
              setNodes(
                Number(
                  e.target.value
                )
              )
            }
          >

            <option value="1">
              1 node
            </option>

            <option value="2">
              2 nodes
            </option>

            <option value="3">
              3 nodes
            </option>

            <option value="4">
              4 nodes
            </option>

          </select>

        </div>

        {loadingCost && (
          <div className="loglines">
            Calculating AWS estimate…
          </div>
        )}

        {cost && (
          <div className="cost-grid">

            <div className="cost-row">
              <div className="cost-label">
                EKS control plane
              </div>

              <div className="cost-amt">
                $
                {cost.breakdown
                  .eksControlPlane
                  .toFixed(2)}
              </div>
            </div>

            <div className="cost-row">
              <div className="cost-label">
                Worker nodes —{" "}
                {nodes}× {cost.instanceLabel}
              </div>

              <div className="cost-amt">
                $
                {cost.breakdown
                  .workerNodes
                  .toFixed(2)}
              </div>
            </div>

            <div className="cost-row">
              <div className="cost-label">
                Application Load Balancer
              </div>

              <div className="cost-amt">
                $
                {cost.breakdown
                  .applicationLoadBalancer
                  .toFixed(2)}
              </div>
            </div>

            <div className="cost-row">
              <div className="cost-label">
                NAT gateway
              </div>

              <div className="cost-amt">
                $
                {cost.breakdown
                  .natGateway
                  .toFixed(2)}
              </div>
            </div>

            <div className="cost-row">
              <div className="cost-label">
                ECR image storage
              </div>

              <div className="cost-amt">
                $
                {cost.breakdown
                  .ecrStorage
                  .toFixed(2)}
              </div>
            </div>

            <div className="cost-row">
              <div className="cost-label">
                Data transfer
              </div>

              <div className="cost-amt">
                $
                {cost.breakdown
                  .dataTransfer
                  .toFixed(2)}
              </div>
            </div>

            <div className="cost-row cost-total">

              <div className="cost-label">
                Estimated total / month
              </div>

              <div className="cost-amt">
                $
                {cost.estimatedMonthlyCost.toFixed(
                  2
                )}
              </div>

            </div>

          </div>
        )}

        <div className="warn">
          This is a rough estimate from
          on-demand pricing. Actual AWS
          billing varies by region,
          data transfer and usage.
        </div>

        <button
          className="deploybtn"
          onClick={deploy}
          disabled={
            deploying ||
            loadingCost
          }
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
            lines={[
              "Terraform initialized",
              "Terraform plan created",
              "ECR repository created",
              "EKS node group created",
              "Kubernetes deployment applied",
              "Kubernetes service created"
            ]}
          />

          <div className="success">

            <div className="head">
              ✓ Deployed
            </div>

            <div className="url">
              Service reachable at{" "}

              <b>
                {result.endpoint}
              </b>
            </div>

          </div>
        </>
      )}
    </>
  );
}