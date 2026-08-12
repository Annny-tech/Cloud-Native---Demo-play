import Panel from "./Panel";

export default function CodePanel({
  filename,
  badge,
  code
}) {
  return (
    <Panel
      filename={filename}
      badge={badge}
    >
      <pre
        dangerouslySetInnerHTML={{
          __html: code
        }}
      />
    </Panel>
  );
}