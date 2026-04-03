import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import { useToast } from "../components/Toast";

function Login() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      addToast("Please fill all fields!", "error");
      return;
    }
    setLoading(true);
    const data = await loginUser(form.email, form.password);
    setLoading(false);

    if (data.error) {
      addToast(data.error, "error");
    } else {
      localStorage.setItem("user", JSON.stringify(data));
      addToast(`Welcome back, ${data.name}! 👋`, "success");
      navigate("/");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        <div style={styles.cardHeader}>
          <div style={styles.headerIcon}>🔐</div>
          <h2 style={styles.title}>Welcome Back</h2>
          <p style={styles.subtitle}>Login to your CityResolve account</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Email Address</label>
            <input
              style={styles.input}
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              style={styles.input}
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <button
            style={{
              ...styles.button,
              ...(hovered ? styles.buttonHover : {}),
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login →"}
          </button>

          <p style={styles.switchText}>
            Don't have an account?{" "}
            <Link to="/register" style={styles.switchLink}>Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "calc(100vh - 80px)",
    background: "linear-gradient(180deg, #edfaf8 0%, #f8fffe 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 16px",
  },
  card: {
    background: "white",
    borderRadius: "20px",
    boxShadow: "0 8px 40px rgba(7,71,66,0.12)",
    width: "100%",
    maxWidth: "420px",
    overflow: "hidden",
    border: "1px solid #e0f5f2",
  },
  cardHeader: {
    background: "linear-gradient(135deg, #053d38, #074742)",
    padding: "36px 40px 32px",
    textAlign: "center",
  },
  headerIcon: { fontSize: "36px", marginBottom: "12px" },
  title: {
    margin: 0,
    fontSize: "26px",
    fontWeight: "800",
    color: "white",
    fontFamily: "'Georgia', serif",
  },
  subtitle: { margin: "8px 0 0", color: "#99d6d0", fontSize: "14px" },
  form: { padding: "36px 40px" },
  field: { marginBottom: "20px", display: "flex", flexDirection: "column" },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "6px",
    letterSpacing: "0.3px",
  },
  input: {
    padding: "11px 14px",
    borderRadius: "8px",
    border: "1.5px solid #d1faf5",
    fontSize: "14px",
    color: "#111827",
    background: "#f8fffe",
    outline: "none",
    fontFamily: "inherit",
    width: "100%",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "14px",
    marginTop: "4px",
    background: "linear-gradient(135deg, #0d9488, #074742)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "15px",
    boxShadow: "0 4px 14px rgba(13,148,136,0.3)",
    transition: "all 0.2s ease",
  },
  buttonHover: {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 20px rgba(13,148,136,0.4)",
  },
  switchText: {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "14px",
    color: "#6b9e99",
  },
  switchLink: {
    color: "#0d9488",
    fontWeight: "600",
    textDecoration: "none",
  },
};

export default Login;