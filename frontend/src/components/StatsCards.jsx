export default function StatsCards({
  stats,
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(4,1fr)",
        gap: "1rem",
        marginBottom: "2rem",
      }}
    >
      <div className="card">
        <h3>Pending</h3>
        <p>{stats.pending || 0}</p>
      </div>

      <div className="card">
        <h3>Verified</h3>
        <p>{stats.verified || 0}</p>
      </div>

      <div className="card">
        <h3>Rejected</h3>
        <p>{stats.rejected || 0}</p>
      </div>

      <div className="card">
        <h3>Submitted</h3>
        <p>{stats.submitted || 0}</p>
      </div>
    </div>
  );
}