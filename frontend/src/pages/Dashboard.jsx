import { useEffect, useState } from "react";
import { getComplaints } from "../services/api";

function Dashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getComplaints().then((data) => {
      setComplaints(data);
      setLoading(false);
    });
  }, []);

  const total = complaints.length;
  const pending = complaints.filter((c) => c.status === "Pending").length;
  const inProgress = complaints.filter((c) => c.status === "In Progress").length;
  const resolved = complaints.filter((c) => c.status === "Resolved").length;
  const resolutionRate = total > 0 ? Math.round((resolved / total) * 100) : 0;

  // Category breakdown
  const categories = {};
  complaints.forEach((c) => {
    categories[c.category] = (categories[c.category] || 0) + 1;
  });
  const sortedCategories = Object.entries(categories).sort((a, b) => b[1] - a[1]);

  const maxCount = sortedCategories[0]?.[1] || 1;

  const catColors = {
    Road: "#0d9488", Water: "#3b82f6", Electricity: "#f59e0b",
    Garbage: "#10b981", Sewage: "#8b5cf6", "Street Lights": "#f97316", Other: "#6b7280",
  };

  if (loading) return <div style={styles.loading}>Loading dashboard...</div>;

  return (
    <div style={styles.page}>

      <div style={styles.header}>
        <h1 style={styles.title}>Dashboard</h1>
        <p style={styles.sub}>Overview of all complaints and their statuses</p>
      </div>

      {/* KPI Cards */}
      <div style={styles.kpiGrid}>
        {[
          { label: "Total Complaints", value: total, icon: "📋", color: "#074742", bg: "#edfaf8" },
          { label: "Pending", value: pending, icon: "🔴", color: "#dc2626", bg: "#fef2f2" },
          { label: "In Progress", value: inProgress, icon: "🟡", color: "#d97706", bg: "#fffbeb" },
          { label: "Resolved", value: resolved, icon: "🟢", color: "#059669", bg: "#ecfdf5" },
        ].map((k) => (
          <div key={k.label} style={{ ...styles.kpiCard, background: k.bg, borderColor: k.bg }}>
            <div style={styles.kpiIcon}>{k.icon}</div>
            <div style={{ ...styles.kpiValue, color: k.color }}>{k.value}</div>
            <div style={styles.kpiLabel}>{k.label}</div>
          </div>
        ))}
      </div>

      <div style={styles.row2}>

        {/* Resolution Rate */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Resolution Rate</h3>
          <div style={styles.rateCircleWrapper}>
            <div style={styles.rateCircle}>
              <svg viewBox="0 0 120 120" width="160" height="160">
                <circle cx="60" cy="60" r="50" fill="none" stroke="#e0f5f2" strokeWidth="12" />
                <circle
                  cx="60" cy="60" r="50"
                  fill="none"
                  stroke="#0d9488"
                  strokeWidth="12"
                  strokeDasharray={`${2 * Math.PI * 50}`}
                  strokeDashoffset={`${2 * Math.PI * 50 * (1 - resolutionRate / 100)}`}
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                />
                <text x="60" y="55" textAnchor="middle" fontSize="22" fontWeight="800" fill="#053d38">{resolutionRate}%</text>
                <text x="60" y="73" textAnchor="middle" fontSize="10" fill="#6b9e99">Resolved</text>
              </svg>
            </div>
          </div>
          <div style={styles.rateRow}>
            <div style={styles.rateStat}>
              <span style={{ color: "#dc2626", fontWeight: 700 }}>{pending}</span> Pending
            </div>
            <div style={styles.rateStat}>
              <span style={{ color: "#d97706", fontWeight: 700 }}>{inProgress}</span> In Progress
            </div>
            <div style={styles.rateStat}>
              <span style={{ color: "#059669", fontWeight: 700 }}>{resolved}</span> Resolved
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div style={{ ...styles.card, flex: 2 }}>
          <h3 style={styles.cardTitle}>Complaints by Category</h3>
          {sortedCategories.length === 0 ? (
            <div style={styles.noData}>No data yet</div>
          ) : (
            <div style={styles.barList}>
              {sortedCategories.map(([cat, count]) => (
                <div key={cat} style={styles.barRow}>
                  <div style={styles.barLabel}>{cat}</div>
                  <div style={styles.barTrack}>
                    <div
                      style={{
                        ...styles.barFill,
                        width: `${(count / maxCount) * 100}%`,
                        background: catColors[cat] || "#6b7280",
                      }}
                    />
                  </div>
                  <div style={styles.barCount}>{count}</div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Recent Complaints Table */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Recent Complaints</h3>
        {complaints.length === 0 ? (
          <div style={styles.noData}>No complaints yet</div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                {["#", "Title", "Category", "Location", "Status"].map((h) => (
                  <th key={h} style={styles.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {complaints.slice(-8).reverse().map((c) => {
                const sc = {
                  Pending: { color: "#dc2626", bg: "#fef2f2" },
                  "In Progress": { color: "#d97706", bg: "#fffbeb" },
                  Resolved: { color: "#059669", bg: "#ecfdf5" },
                }[c.status] || { color: "#374151", bg: "#f3f4f6" };
                return (
                  <tr key={c.id} style={styles.tr}>
                    <td style={styles.td}>#{c.id}</td>
                    <td style={styles.td}>{c.title}</td>
                    <td style={styles.td}>{c.category}</td>
                    <td style={styles.td}>{c.location}</td>
                    <td style={styles.td}>
                      <span style={{
                        padding: "3px 10px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "600",
                        color: sc.color,
                        background: sc.bg,
                      }}>
                        {c.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}

const styles = {
  page: {
    minHeight: "calc(100vh - 72px)",
    background: "#f8fffe",
    padding: "40px 32px",
    fontFamily: "'Segoe UI', sans-serif",
  },
  loading: { padding: "80px", textAlign: "center", color: "#6b9e99" },
  header: { marginBottom: "28px" },
  title: {
    fontSize: "32px", fontWeight: "800", color: "#053d38",
    margin: 0, fontFamily: "'Georgia', serif",
  },
  sub: { color: "#6b9e99", marginTop: "4px", fontSize: "14px" },
  kpiGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "16px",
    marginBottom: "24px",
  },
  kpiCard: {
    borderRadius: "14px",
    padding: "24px 20px",
    textAlign: "center",
    border: "1px solid transparent",
    boxShadow: "0 1px 8px rgba(7,71,66,0.06)",
  },
  kpiIcon: { fontSize: "24px", marginBottom: "10px" },
  kpiValue: { fontSize: "36px", fontWeight: "900", lineHeight: 1 },
  kpiLabel: { fontSize: "13px", color: "#6b9e99", marginTop: "4px", fontWeight: "500" },
  row2: { display: "flex", gap: "20px", marginBottom: "24px", flexWrap: "wrap" },
  card: {
    background: "white",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 2px 12px rgba(7,71,66,0.08)",
    border: "1px solid #e0f5f2",
    marginBottom: "24px",
    flex: 1,
    minWidth: "260px",
  },
  cardTitle: { margin: "0 0 20px", fontSize: "17px", fontWeight: "700", color: "#053d38" },
  rateCircleWrapper: { display: "flex", justifyContent: "center", marginBottom: "16px" },
  rateCircle: {},
  rateRow: { display: "flex", justifyContent: "space-around", fontSize: "13px", color: "#6b9e99" },
  rateStat: { textAlign: "center" },
  barList: { display: "flex", flexDirection: "column", gap: "14px" },
  barRow: { display: "flex", alignItems: "center", gap: "12px" },
  barLabel: { width: "100px", fontSize: "13px", color: "#374151", fontWeight: "500", flexShrink: 0 },
  barTrack: { flex: 1, background: "#f0faf8", borderRadius: "6px", height: "10px", overflow: "hidden" },
  barFill: { height: "100%", borderRadius: "6px", transition: "width 0.4s ease" },
  barCount: { width: "24px", textAlign: "right", fontSize: "13px", fontWeight: "700", color: "#053d38" },
  noData: { color: "#9bbfbb", textAlign: "center", padding: "24px", fontSize: "14px" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    textAlign: "left", padding: "10px 12px", fontSize: "12px",
    fontWeight: "700", color: "#6b9e99", borderBottom: "2px solid #f0faf8",
    textTransform: "uppercase", letterSpacing: "0.5px",
  },
  tr: { borderBottom: "1px solid #f0faf8" },
  td: { padding: "12px 12px", fontSize: "13px", color: "#374151" },
};

export default Dashboard;