export default function Stage({
  stage,
  index,
  children
}) {
  return (
    <div
      className={`stage ${stage.status || ""}`}
      id={`stage-${stage.id}`}
    >
      <div className="node">
        {index + 1}
      </div>

      <div className="stage-head">
        <div className="stage-title">
          {stage.title}
        </div>

        <div className="stage-tag">
          {stage.tag}
        </div>
      </div>

      <div className="stage-body">
        {children}
      </div>
    </div>
  );
}