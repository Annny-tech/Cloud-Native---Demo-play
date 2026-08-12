export default function Header() {
  return (
    <>
      <div className="eyebrow">
        <span className="dot"></span>
        DEPLOYMENT PIPELINE
      </div>

      <h1>
        Repo → Runtime <span>/ ship any repo to AWS</span>
      </h1>

      <p className="sub">
        Paste a repository URL. This walks through language detection,
        container build, Kubernetes manifests, and Terraform for AWS —
        with a cost estimate gated before anything deploys.
      </p>
    </>
  );
}