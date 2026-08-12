import Panel from "./Panel";

export default function LogPanel({
  filename = "pipeline logs",
  badge = "logs",
  lines = []
}) {
  return (
    <Panel
      filename={filename}
      badge={badge}
    >
      <div className="loglines">
        {lines.map((line, index) => (
          <div
            className="logline"
            key={`${index}-${line}`}
            style={{
              animationDelay: `${index * 0.26}s`
            }}
            dangerouslySetInnerHTML={{
              __html: line
            }}
          />
        ))}
      </div>
    </Panel>
  );
}