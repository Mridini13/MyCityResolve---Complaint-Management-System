import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.inner}>

        <div style={styles.brand}>
          <div style={styles.logoRow}>
            <div style={styles.logoMark}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#053d38"/>
                <circle cx="12" cy="9" r="2.5" fill="#2dd4bf"/>
              </svg>
            </div>
            <span style={styles.brandName}>My <span style={styles.accent}>CityResolve</span></span>
          </div>
          <p style={styles.brandDesc}>
            A smart city platform for citizens to report, track, and resolve civic issues efficiently.
          </p>
        </div>

        <div style={styles.links}>
          <div style={styles.linkCol}>
            <div style={styles.linkTitle}>Navigate</div>
            <Link to="/" style={styles.link}>Home</Link>
            <Link to="/add" style={styles.link}>Report Issue</Link>
            <Link to="/complaints" style={styles.link}>Complaints</Link>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
          </div>
          <div style={styles.linkCol}>
            <div style={styles.linkTitle}>Account</div>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </div>
        </div>

      </div>

      <div style={styles.bottom}>
        <span>© {new Date().getFullYear()} My CityResolve. Built with ❤️ for a smarter city.</span>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: "linear-gradient(135deg, #053d38, #074742)",
    color: "white",
    marginTop: "auto",
  },
  inner: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "52px 40px 40px",
    display: "flex",
    justifyContent: "space-between",
    gap: "40px",
    flexWrap: "wrap",
  },
  brand: { maxWidth: "320px" },
  logoRow: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" },
  logoMark: {
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #2dd4bf, #14b8a6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  brandName: {
    fontSize: "20px",
    fontWeight: "800",
    color: "white",
    fontFamily: "'Georgia', serif",
  },
  accent: { color: "#2dd4bf" },
  brandDesc: { color: "#99d6d0", fontSize: "14px", lineHeight: 1.6, margin: 0 },
  links: { display: "flex", gap: "48px" },
  linkCol: { display: "flex", flexDirection: "column", gap: "10px" },
  linkTitle: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#2dd4bf",
    letterSpacing: "1px",
    textTransform: "uppercase",
    marginBottom: "4px",
  },
  link: {
    color: "#99d6d0",
    textDecoration: "none",
    fontSize: "14px",
    transition: "color 0.2s",
  },
  bottom: {
    borderTop: "1px solid rgba(255,255,255,0.1)",
    padding: "20px 40px",
    textAlign: "center",
    fontSize: "13px",
    color: "#6ba8a2",
  },
};

export default Footer;