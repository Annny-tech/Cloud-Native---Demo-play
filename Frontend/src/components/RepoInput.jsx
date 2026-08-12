export default function RepoInput({
  value,
  onChange,
  presets,
  onRun,
  running
}) {
  return (
    <>
      <div className="urlbar">
        <span className="glyph">&gt;</span>

        <input
          id="repoInput"
          type="text"
          placeholder="https://github.com/your-org/your-repo"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onRun();
            }
          }}
        />

        <button
          className="runbtn"
          onClick={() => onRun()}
          disabled={running}
        >
          {running ? "Running…" : "Run pipeline"}
        </button>
      </div>

      <div className="presets">
        {presets.map((repo) => (
          <button
            className="preset"
            key={repo}
            type="button"
            onClick={() => onRun(repo)}
          >
            {repo.replace("https://github.com/", "")}
          </button>
        ))}
      </div>
    </>
  );
}