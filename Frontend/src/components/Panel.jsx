export default function Panel({
  filename,
  badge,
  children
}) {
  return (
    <div className="panel">
      <div className="panel-head">
        <span className="fname">
          {filename}
        </span>

        <span className="badge">
          {badge}
        </span>
      </div>

      {children}
    </div>
  );
}