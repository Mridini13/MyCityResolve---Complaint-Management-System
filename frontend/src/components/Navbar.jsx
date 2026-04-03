import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "./Toast";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [hoveredLink, setHoveredLink] = useState(null);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("user");
    addToast("Logged out successfully!", "info");
    navigate("/login");
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/add", label: "Report Issue" },
    { to: "/complaints", label: "Complaints" },
    { to: "/dashboard", label: "Dashboard" },
  ];

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.left}>
        <div style={styles.logoMark}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#053d38"/>
            <circle cx="12" cy="9" r="2.5" fill="#2dd4bf"/>
            <path d="M7 20h10v2H7z" fill="#053d38" opacity="0.4"/>
          </svg>
        </div>
        <div>
          <div style={styles.logo}>My <span style={styles.logoAccent}>CityResolve</span></div>
          <div style={styles.tagline}>Your Voice · Your City · Resolved</div>
        </div>
      </Link>

      <div style={styles.right}>
        {navLinks.map((link) => {
          const isActive = location.pathname === link.to;
          const isHovered = hoveredLink === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              style={{
                ...styles.link,
                ...(isActive ? styles.activeLink : {}),
                ...(isHovered && !isActive ? styles.hoveredLink : {}),
              }}
              onMouseEnter={() => setHoveredLink(link.to)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {link.label}
            </Link>
          );
        })}

        {user ? (
          <div style={styles.userArea}>
            <span style={styles.userName}>👤 {user.name}</span>
            <button
              style={{
                ...styles.logoutBtn,
                ...(hoveredLink === "logout" ? styles.logoutHover : {}),
              }}
              onMouseEnter={() => setHoveredLink("logout")}
              onMouseLeave={() => setHoveredLink(null)}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            style={{
              ...styles.loginBtn,
              ...(hoveredLink === "login" ? styles.loginHover : {}),
            }}
            onMouseEnter={() => setHoveredLink("login")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 52px",
    height: "80px",
    background: "linear-gradient(135deg, #053d38 0%, #074742 60%, #0a5c55 100%)",
    boxShadow: "0 2px 24px rgba(5,61,56,0.45)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    textDecoration: "none",
  },
  logoMark: {
    width: "50px",
    height: "50px",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #2dd4bf, #14b8a6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 3px 12px rgba(45,212,191,0.4)",
    flexShrink: 0,
  },
  logo: {
    fontSize: "26px",
    fontWeight: "800",
    color: "white",
    letterSpacing: "-0.4px",
    fontFamily: "'Georgia', serif",
    lineHeight: 1.1,
  },
  logoAccent: { color: "#2dd4bf" },
  tagline: { fontSize: "11.5px", color: "#99d6d0", letterSpacing: "0.4px", marginTop: "2px" },
  right: { display: "flex", alignItems: "center", gap: "4px" },
  link: {
    padding: "9px 18px",
    color: "#c9ecea",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "14.5px",
    borderRadius: "8px",
    transition: "all 0.2s ease",
  },
  activeLink: {
    background: "rgba(45,212,191,0.18)",
    color: "#2dd4bf",
    fontWeight: "700",
  },
  hoveredLink: {
    background: "rgba(255,255,255,0.1)",
    color: "white",
  },
  userArea: { display: "flex", alignItems: "center", gap: "10px", marginLeft: "8px" },
  userName: { color: "#99d6d0", fontSize: "13px", fontWeight: "600" },
  logoutBtn: {
    padding: "8px 16px",
    background: "rgba(220,38,38,0.15)",
    color: "#fca5a5",
    border: "1px solid rgba(220,38,38,0.3)",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
    transition: "all 0.2s ease",
  },
  logoutHover: {
    background: "rgba(220,38,38,0.3)",
    color: "white",
  },
  loginBtn: {
    padding: "9px 20px",
    background: "rgba(45,212,191,0.18)",
    color: "#2dd4bf",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "700",
    fontSize: "14px",
    border: "1px solid rgba(45,212,191,0.3)",
    marginLeft: "8px",
    transition: "all 0.2s ease",
  },
  loginHover: {
    background: "rgba(45,212,191,0.3)",
    color: "white",
  },
};

export default Navbar;