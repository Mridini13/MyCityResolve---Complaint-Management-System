import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div style={styles.page}>
      <div style={styles.code}>404</div>
      <h2 style={styles.title}>Page Not Found</h2>
      <p style={styles.sub}>Looks like this page doesn't exist or was moved.</p>
      <Link to="/" style={styles.btn}>← Back to Home</Link>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "calc(100vh - 80px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(180deg, #edfaf8 0%, #f8fffe 100%)",
    textAlign: "center",
    padding: "40px 24px",
    fontFamily: "'Segoe UI', sans-serif",
  },
  code: {
    fontSize: "120px",
    fontWeight: "900",
    color: "#d0f0ec",
    lineHeight: 1,
    fontFamily: "'Georgia', serif",
    marginBottom: "8px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#053d38",
    margin: "0 0 12px",
    fontFamily: "'Georgia', serif",
  },
  sub: { color: "#6b9e99", fontSize: "16px", marginBottom: "32px" },
  btn: {
    padding: "12px 28px",
    background: "linear-gradient(135deg, #0d9488, #074742)",
    color: "white",
    textDecoration: "none",
    borderRadius: "10px",
    fontWeight: "700",
    fontSize: "15px",
    boxShadow: "0 4px 14px rgba(13,148,136,0.3)",
  },
};

export default NotFound;