import { Link } from "react-router-dom";
import { useState } from "react";

function Home() {
  const [hovered, setHovered] = useState(null);

  return (
    <div style={styles.page}>

      {/* Hero */}
      <div style={styles.hero}>

        {/* Improved badge */}
        <div style={styles.heroBadge}>
          <span style={styles.badgeDot}></span>
          <span>🏙️ Smart City Complaint Platform</span>
          <span style={styles.badgePill}>Live</span>
        </div>

        <h1 style={styles.heroTitle}>
          Report. Track.<br />
          <span style={styles.heroAccent}>Resolve.</span>
        </h1>
        <p style={styles.heroSub}>
          Submit city complaints, track their progress in real-time,
          and hold authorities accountable — all in one place.
        </p>
        <div style={styles.heroButtons}>
          <Link
            to="/add"
            style={{
              ...styles.btnPrimary,
              ...(hovered === "report" ? styles.btnPrimaryHover : {}),
            }}
            onMouseEnter={() => setHovered("report")}
            onMouseLeave={() => setHovered(null)}
          >
            + Report an Issue
          </Link>
          <Link
            to="/complaints"
            style={{
              ...styles.btnOutline,
              ...(hovered === "view" ? styles.btnOutlineHover : {}),
            }}
            onMouseEnter={() => setHovered("view")}
            onMouseLeave={() => setHovered(null)}
          >
            View All Complaints →
          </Link>
        </div>

        {/* Mini trust stats */}
        <div style={styles.trustRow}>
          <div style={styles.trustItem}><span style={styles.trustNum}>Fast</span> Response</div>
          <div style={styles.trustDivider} />
          <div style={styles.trustItem}><span style={styles.trustNum}>Real-time</span> Tracking</div>
          <div style={styles.trustDivider} />
          <div style={styles.trustItem}><span style={styles.trustNum}>Free</span> to Use</div>
        </div>
      </div>

      {/* Feature cards */}
      <div style={styles.statsBar}>
        {[
          { icon: "📋", label: "Easy Submission", desc: "Submit in under 60 seconds" },
          { icon: "📡", label: "Live Tracking", desc: "Real-time status updates" },
          { icon: "⚡", label: "Fast Resolution", desc: "Authorities notified instantly" },
          { icon: "🗂️", label: "All Categories", desc: "Road, Water, Electricity & more" },
        ].map((item) => (
          <div
            key={item.label}
            style={{
              ...styles.statCard,
              ...(hovered === item.label ? styles.statCardHover : {}),
            }}
            onMouseEnter={() => setHovered(item.label)}
            onMouseLeave={() => setHovered(null)}
          >
            <div style={styles.statIcon}>{item.icon}</div>
            <div style={styles.statLabel}>{item.label}</div>
            <div style={styles.statDesc}>{item.desc}</div>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div style={styles.howSection}>
        <h2 style={styles.sectionTitle}>How It Works</h2>
        <div style={styles.steps}>
          {[
            { num: "01", title: "Submit Your Complaint", desc: "Fill in the title, category, location and description of the issue you're facing." },
            { num: "02", title: "Authorities Review It", desc: "City officials are notified and the complaint is assigned for investigation." },
            { num: "03", title: "Track the Progress", desc: "Watch the status update from Pending → In Progress → Resolved in real-time." },
          ].map((step) => (
            <div key={step.num} style={styles.step}>
              <div style={styles.stepNum}>{step.num}</div>
              <div style={styles.stepTitle}>{step.title}</div>
              <div style={styles.stepDesc}>{step.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={styles.cta}>
        <h2 style={styles.ctaTitle}>Ready to make your city better?</h2>
        <p style={styles.ctaSub}>Join thousands of citizens already making a difference.</p>
        <Link
          to="/add"
          style={{
            ...styles.btnPrimary,
            ...(hovered === "cta" ? styles.btnPrimaryHover : {}),
          }}
          onMouseEnter={() => setHovered("cta")}
          onMouseLeave={() => setHovered(null)}
        >
          Get Started →
        </Link>
      </div>

    </div>
  );
}

const styles = {
  page: {
    fontFamily: "'Segoe UI', sans-serif",
    background: "#f8fffe",
    minHeight: "100vh",
  },
  hero: {
    textAlign: "center",
    padding: "80px 24px 64px",
    background: "linear-gradient(180deg, #edfaf8 0%, #f8fffe 100%)",
    borderBottom: "1px solid #d0f0ec",
  },
  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: "white",
    color: "#074742",
    padding: "8px 20px",
    borderRadius: "24px",
    fontSize: "13px",
    fontWeight: "600",
    marginBottom: "28px",
    border: "1.5px solid #a8e8e1",
    boxShadow: "0 2px 12px rgba(7,71,66,0.08)",
  },
  badgeDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#10b981",
    display: "inline-block",
    boxShadow: "0 0 0 3px rgba(16,185,129,0.2)",
  },
  badgePill: {
    background: "#10b981",
    color: "white",
    padding: "2px 8px",
    borderRadius: "10px",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.5px",
  },
  heroTitle: {
    fontSize: "clamp(40px, 6vw, 72px)",
    fontWeight: "900",
    color: "#053d38",
    lineHeight: 1.1,
    margin: "0 0 20px",
    fontFamily: "'Georgia', serif",
    letterSpacing: "-1px",
  },
  heroAccent: { color: "#0d9488" },
  heroSub: {
    fontSize: "18px",
    color: "#4a7b76",
    maxWidth: "520px",
    margin: "0 auto 36px",
    lineHeight: 1.6,
  },
  heroButtons: {
    display: "flex",
    gap: "16px",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: "40px",
  },
  btnPrimary: {
    padding: "14px 32px",
    background: "linear-gradient(135deg, #0d9488, #074742)",
    color: "white",
    textDecoration: "none",
    borderRadius: "10px",
    fontWeight: "700",
    fontSize: "15px",
    boxShadow: "0 4px 16px rgba(13,148,136,0.35)",
    transition: "all 0.2s ease",
    display: "inline-block",
  },
  btnPrimaryHover: {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 24px rgba(13,148,136,0.45)",
  },
  btnOutline: {
    padding: "14px 32px",
    background: "white",
    color: "#074742",
    textDecoration: "none",
    borderRadius: "10px",
    fontWeight: "600",
    fontSize: "15px",
    border: "2px solid #0d9488",
    transition: "all 0.2s ease",
    display: "inline-block",
  },
  btnOutlineHover: {
    background: "#edfaf8",
    transform: "translateY(-2px)",
  },
  trustRow: {
    display: "inline-flex",
    alignItems: "center",
    gap: "20px",
    background: "white",
    padding: "12px 28px",
    borderRadius: "40px",
    border: "1px solid #d0f0ec",
    fontSize: "13px",
    color: "#4a7b76",
    boxShadow: "0 2px 8px rgba(7,71,66,0.06)",
  },
  trustItem: { display: "flex", gap: "5px", alignItems: "center" },
  trustNum: { fontWeight: "700", color: "#074742" },
  trustDivider: { width: "1px", height: "16px", background: "#d0f0ec" },
  statsBar: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1px",
    background: "#d0f0ec",
    borderTop: "1px solid #d0f0ec",
    borderBottom: "1px solid #d0f0ec",
  },
  statCard: {
    background: "white",
    padding: "32px 24px",
    textAlign: "center",
    transition: "all 0.2s ease",
    cursor: "default",
  },
  statCardHover: {
    background: "#edfaf8",
    transform: "translateY(-2px)",
  },
  statIcon: { fontSize: "28px", marginBottom: "10px" },
  statLabel: { fontWeight: "700", color: "#053d38", fontSize: "15px", marginBottom: "4px" },
  statDesc: { color: "#6b9e99", fontSize: "13px" },
  howSection: {
    padding: "72px 24px",
    maxWidth: "900px",
    margin: "0 auto",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#053d38",
    marginBottom: "48px",
    fontFamily: "'Georgia', serif",
  },
  steps: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "32px",
  },
  step: {
    background: "white",
    borderRadius: "16px",
    padding: "32px 24px",
    boxShadow: "0 2px 16px rgba(7,71,66,0.08)",
    border: "1px solid #e0f5f2",
    textAlign: "left",
  },
  stepNum: {
    fontSize: "36px",
    fontWeight: "900",
    color: "#b2e8e2",
    fontFamily: "'Georgia', serif",
    marginBottom: "12px",
  },
  stepTitle: { fontWeight: "700", color: "#053d38", fontSize: "17px", marginBottom: "8px" },
  stepDesc: { color: "#5a8a85", fontSize: "14px", lineHeight: 1.6 },
  cta: {
    background: "linear-gradient(135deg, #053d38 0%, #074742 100%)",
    padding: "72px 24px",
    textAlign: "center",
  },
  ctaTitle: {
    fontSize: "28px",
    fontWeight: "800",
    color: "white",
    marginBottom: "12px",
    fontFamily: "'Georgia', serif",
  },
  ctaSub: {
    color: "#99d6d0",
    fontSize: "15px",
    marginBottom: "28px",
  },
};

export default Home;