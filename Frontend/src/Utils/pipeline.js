import { LANGS } from "../data/languages";
import { STAGES } from "../data/stages";

import {
  pickLang,
  repoName,
  shortName
} from "./repo";

const wait = (ms) =>
  new Promise((resolve) =>
    setTimeout(resolve, ms)
  );

function makeK8sYaml(service) {
  return `<span class="k">apiVersion</span>: apps/v1
<span class="k">kind</span>: Deployment
<span class="k">metadata</span>:
  <span class="k">name</span>: <span class="s">${service}</span>
<span class="k">spec</span>:
  <span class="k">replicas</span>: <span class="n">2</span>
  <span class="k">selector</span>:
    <span class="k">matchLabels</span>: { <span class="k">app</span>: <span class="s">${service}</span> }
  <span class="k">template</span>:
    <span class="k">metadata</span>:
      <span class="k">labels</span>: { <span class="k">app</span>: <span class="s">${service}</span> }
    <span class="k">spec</span>:
      <span class="k">containers</span>:
        - <span class="k">name</span>: <span class="s">${service}</span>
          <span class="k">image</span>: <span class="s">\\${ecr_repo_url}:\\${git_sha}</span>
          <span class="k">ports</span>: [{ <span class="k">containerPort</span>: <span class="n">8080</span> }]
          <span class="k">resources</span>:
            <span class="k">requests</span>: { <span class="k">cpu</span>: <span class="s">"250m"</span>, <span class="k">memory</span>: <span class="s">"256Mi"</span> }
            <span class="k">limits</span>: { <span class="k">cpu</span>: <span class="s">"500m"</span>, <span class="k">memory</span>: <span class="s">"512Mi"</span> }
---
<span class="k">apiVersion</span>: v1
<span class="k">kind</span>: Service
<span class="k">metadata</span>:
  <span class="k">name</span>: <span class="s">${service}</span>
<span class="k">spec</span>:
  <span class="k">type</span>: LoadBalancer
  <span class="k">selector</span>: { <span class="k">app</span>: <span class="s">${service}</span> }
  <span class="k">ports</span>: [{ <span class="k">port</span>: <span class="n">80</span>, <span class="k">targetPort</span>: <span class="n">8080</span> }]`;
}

function makeTerraform(service) {
  const safe = service.replace(
    /[^a-z0-9_]/g,
    "_"
  );

  return `<span class="k">resource</span> <span class="s">"aws_ecr_repository"</span> <span class="s">"${safe}"</span> {
  <span class="k">name</span> = <span class="s">"${service}"</span>

  <span class="k">image_scanning_configuration</span> {
    <span class="k">scan_on_push</span> = <span class="n">true</span>
  }
}

<span class="k">resource</span> <span class="s">"aws_eks_node_group"</span> <span class="s">"app"</span> {
  <span class="k">cluster_name</span> = <span class="s">aws_eks_cluster.main.name</span>
  <span class="k">node_group_name</span> = <span class="s">"${service}-ng"</span>
  <span class="k">instance_types</span> = [<span class="s">var.node_instance_type</span>]

  <span class="k">scaling_config</span> {
    <span class="k">desired_size</span> = <span class="n">2</span>
    <span class="k">min_size</span> = <span class="n">1</span>
    <span class="k">max_size</span> = <span class="n">4</span>
  }
}

<span class="k">resource</span> <span class="s">"kubernetes_manifest"</span> <span class="s">"deployment"</span> {
  <span class="k">manifest</span> = yamldecode(
    file(
      <span class="s">"\\${path.module}/k8s/deployment.yaml"</span>
    )
  )
}`;
}

export async function runPipeline(
  url,
  onUpdate
) {
  const lang = pickLang(
    url,
    LANGS
  );

  const rname = repoName(url);
  const sname = shortName(url);

  const state = {
    repoName: rname,

    serviceName: sname,

    lang,

    k8sYaml: makeK8sYaml(sname),

    tf: makeTerraform(sname),

    stages: STAGES.map(
      (stage) => ({
        ...stage,
        status: ""
      })
    )
  };

  const update = () => {
    onUpdate({
      ...state,

      stages: state.stages.map(
        (stage) => ({
          ...stage
        })
      )
    });
  };

  for (
    let i = 0;
    i < state.stages.length - 1;
    i++
  ) {
    const stage =
      state.stages[i];

    stage.status = "active";

    update();

    await wait(150);

    if (
      stage.id === "analyze"
    ) {
      stage.logs = [
        `cloning ${url}`,

        `resolved repo <b class="ok">${rname}</b>`,

        `247 files · 8,410 lines scanned`,

        `<span class="ok">✓</span> found ${lang.manifest}`
      ];

      await wait(700);
    }

    if (
      stage.id === "lang"
    ) {
      await wait(500);
    }

    if (
      stage.id === "docker"
    ) {
      await wait(600);
    }

    if (
      stage.id === "k8s"
    ) {
      await wait(600);
    }

    if (
      stage.id === "tf"
    ) {
      stage.tfLogs = [
        `Initializing provider "aws"…`,

        `<span class="ok">+</span> aws_ecr_repository.${sname.replace(
          /[^a-z0-9_]/g,
          "_"
        )}`,

        `<span class="ok">+</span> aws_eks_node_group.app`,

        `<span class="ok">+</span> kubernetes_manifest.deployment`,

        `Plan: 3 to add, 0 to change, 0 to destroy.`
      ];

      await wait(1200);
    }

    stage.status = "done";

    update();
  }

  state.stages[
    state.stages.length - 1
  ].status = "active";

  state.deploy = async (
    serviceName
  ) => {
    await wait(1000);

    return {
      logs: [
        `terraform apply -auto-approve`,

        `<span class="ok">✓</span> aws_ecr_repository.${serviceName.replace(
          /[^a-z0-9_]/g,
          "_"
        )} created`,

        `<span class="ok">✓</span> aws_eks_node_group.app created`,

        `docker push …/${serviceName}:latest`,

        `kubectl apply -f k8s/deployment.yaml`,

        `<span class="ok">✓</span> deployment "${serviceName}" rolled out — 2/2 pods ready`
      ],

      url:
        `http://${serviceName}-lb-8f2ac1.us-east-1.elb.amazonaws.com`
    };
  };

  update();

  return state;
}