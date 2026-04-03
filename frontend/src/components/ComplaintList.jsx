import { useEffect, useState } from "react";
import { getComplaints, updateComplaintStatus, deleteComplaint } from "../services/api";
import { useToast } from "./Toast";

const STATUS_CONFIG = {
  Pending:       { color: "#dc2626", bg: "#fef2f2", border: "#fecaca" },
  "In Progress": { color: "#d97706", bg: "#fffbeb", border: "#fde68a" },
  Resolved:      { color: "#059669", bg: "#ecfdf5", border: "#a7f3d0" },
};

const CATEGORIES = ["All", "Road", "Water", "Electricity", "Garbage", "Sewage", "Street Lights", "Other"];

function ComplaintList() {
  const { addToast } = useToast();
  const [complaints, setComplaints] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadComplaints(); }, []);

  const loadComplaints = async () => {
    setLoading(true);
    const data = await getComplaints();
    setComplaints(data);
    setLoading(false);
  };

  const handleStatus = async (id, newStatus) => {
    await updateComplaintStatus(id, newStatus);
    addToast(`Status updated to ${newStatus}!`, "success");
    loadComplaints();
  };

  const handleDelete = async (id) => {
    await deleteComplaint(id);
    addToast("Complaint deleted.", "info");
    loadComplaints();
  };

  const filtered = complaints.filter((c) =>
    (statusFilter === "All" || c.status === statusFilter) &&
    (categoryFilter === "All" || c.category === categoryFilter) &&
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  const count = (status) => complaints.filter((c) => c.status === status).length;

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>All Complaints</h1>
        <p style={styles.pageSub}>{complaints.length} total complaints filed</p>
      </div>

      {/* Stats */}
      <div style={styles.statsRow}>
        {[
          { label: "Total", value: complaints.length, color: "#074742" },
          { label: "Pending", value: count("Pending"), color: "#dc2626" },
          { label: "In Progress", value: count("In Progress"), color: "#d97706" },
          { label: "Resolved", value: count("Resolved"), color: "#059669" },
        ].map((s) => (
          <div key={s.label} style={styles.statBox}>
            <div style={{ ...styles.statNum, color: s.color }}>{s.value}</div>
            <div style={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div style={styles.controls}>
        <input style={styles.search} type="text"
          placeholder="🔍  Search by title..."
          value={search} onChange={(e) => setSearch(e.target.value)} />
        <div style={styles.filters}>
          <div style={styles.filterGroup}>
            <span style={styles.filterLabel}>Status:</span>
            {["All", "Pending", "In Progress", "Resolved"].map((s) => (
              <button key={s} onClick={() => setStatusFilter(s)}
                style={{ ...styles.filterBtn, ...(statusFilter === s ? styles.filterBtnActive : {}) }}>
                {s}
              </button>
            ))}
          </div>
          <div style={styles.filterGroup}>
            <span style={styles.filterLabel}>Category:</span>
            <select style={styles.select} value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Cards */}
      {loading ? (
        <div style={styles.empty}>Loading complaints...</div>
      ) : filtered.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>📭</div>
          <div style={styles.emptyTitle}>No complaints found</div>
          <div style={styles.emptySub}>Try adjusting your filters or search term</div>
        </div>
      ) : (
        <div style={styles.grid}>
          {filtered.map((c) => {
            const sc = STATUS_CONFIG[c.status] || STATUS_CONFIG.Pending;
            return (
              <div key={c.id} style={styles.card}>
                <div style={styles.cardTop}>
                  <span style={styles.categoryTag}>{c.category}</span>
                  <span style={{ ...styles.statusBadge, color: sc.color, background: sc.bg, border: `1px solid ${sc.border}` }}>
                    {c.status}
                  </span>
                </div>
                <h3 style={styles.cardTitle}>{c.title}</h3>
                <p style={styles.cardDesc}>{c.description}</p>
                <div style={styles.cardMeta}>
                  <span>📍 {c.location}</span>
                  <span>🆔 #{c.id}</span>
                </div>
                <div style={styles.cardActions}>
                  {c.status !== "In Progress" && c.status !== "Resolved" && (
                    <button style={styles.btnProgress} onClick={() => handleStatus(c.id, "In Progress")}>
                      In Progress
                    </button>
                  )}
                  {c.status !== "Resolved" && (
                    <button style={styles.btnResolve} onClick={() => handleStatus(c.id, "Resolved")}>
                      ✓ Resolve
                    </button>
                  )}
                  <button style={styles.btnDelete} onClick={() => handleDelete(c.id)}>🗑</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const styles = {
  page: { minHeight: "calc(100vh - 80px)", background: "#f8fffe", padding: "40px 32px", fontFamily: "'Segoe UI', sans-serif" },
  header: { marginBottom: "28px" },
  pageTitle: { fontSize: "32px", fontWeight: "800", color: "#053d38", margin: 0, fontFamily: "'Georgia', serif" },
  pageSub: { color: "#6b9e99", marginTop: "4px", fontSize: "14px" },
  statsRow: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "28px" },
  statBox: { background: "white", borderRadius: "12px", padding: "20px", textAlign: "center", boxShadow: "0 1px 8px rgba(7,71,66,0.07)", border: "1px solid #e0f5f2" },
  statNum: { fontSize: "32px", fontWeight: "800", lineHeight: 1 },
  statLabel: { fontSize: "13px", color: "#6b9e99", marginTop: "4px", fontWeight: "500" },
  controls: { marginBottom: "24px" },
  search: { width: "100%", padding: "12px 16px", borderRadius: "10px", border: "1.5px solid #d1faf5", fontSize: "14px", marginBottom: "12px", background: "white", boxSizing: "border-box", outline: "none" },
  filters: { display: "flex", gap: "24px", flexWrap: "wrap", alignItems: "center" },
  filterGroup: { display: "flex", alignItems: "center", gap: "8px" },
  filterLabel: { fontSize: "13px", fontWeight: "600", color: "#374151" },
  filterBtn: { padding: "6px 14px", borderRadius: "20px", border: "1.5px solid #d1faf5", background: "white", color: "#4a7b76", cursor: "pointer", fontSize: "13px", fontWeight: "500", transition: "all 0.2s" },
  filterBtnActive: { background: "#074742", color: "white", border: "1.5px solid #074742" },
  select: { padding: "6px 12px", borderRadius: "8px", border: "1.5px solid #d1faf5", background: "white", fontSize: "13px", color: "#374151", cursor: "pointer" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" },
  card: { background: "white", borderRadius: "14px", padding: "20px", boxShadow: "0 2px 12px rgba(7,71,66,0.08)", border: "1px solid #e0f5f2", display: "flex", flexDirection: "column", gap: "10px" },
  cardTop: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  categoryTag: { background: "#edfaf8", color: "#074742", padding: "3px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "600", border: "1px solid #c0ebe5" },
  statusBadge: { padding: "3px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" },
  cardTitle: { margin: 0, fontSize: "16px", fontWeight: "700", color: "#053d38" },
  cardDesc: { margin: 0, fontSize: "13px", color: "#6b9e99", lineHeight: 1.5 },
  cardMeta: { display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#9bbfbb", borderTop: "1px solid #f0faf8", paddingTop: "10px" },
  cardActions: { display: "flex", gap: "8px", marginTop: "4px" },
  btnProgress: { flex: 1, padding: "7px 10px", background: "#fffbeb", color: "#d97706", border: "1.5px solid #fde68a", borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "12px" },
  btnResolve: { flex: 1, padding: "7px 10px", background: "#ecfdf5", color: "#059669", border: "1.5px solid #a7f3d0", borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "12px" },
  btnDelete: { padding: "7px 12px", background: "#fef2f2", color: "#dc2626", border: "1.5px solid #fecaca", borderRadius: "8px", cursor: "pointer", fontSize: "14px" },
  empty: { textAlign: "center", padding: "60px", color: "#9bbfbb", fontSize: "16px" },
  emptyState: { textAlign: "center", padding: "80px 24px" },
  emptyIcon: { fontSize: "56px", marginBottom: "16px" },
  emptyTitle: { fontSize: "20px", fontWeight: "700", color: "#053d38", marginBottom: "8px" },
  emptySub: { color: "#6b9e99", fontSize: "14px" },
};

export default ComplaintList;