import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addComplaint } from "../services/api";
import { useToast } from "./Toast";

function AddComplaint() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [form, setForm] = useState({ title: "", description: "", category: "", location: "" });
  const [loading, setLoading] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, category, location } = form;
    if (!title || !description || !category || !location) {
      addToast("Please fill all fields!", "error");
      return;
    }
    setLoading(true);
    await addComplaint(form);
    setLoading(false);
    addToast("Complaint submitted successfully! ✅", "success");
    navigate("/complaints");
  };

  const categories = ["Road", "Water", "Electricity", "Garbage", "Sewage", "Street Lights", "Other"];

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <div style={styles.headerIcon}>📝</div>
          <h2 style={styles.title}>Report an Issue</h2>
          <p style={styles.subtitle}>Help us improve your city by reporting a complaint</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Issue Title</label>
            <input style={styles.input} type="text" name="title"
              placeholder="e.g. Pothole on Main Street"
              value={form.title} onChange={handleChange} />
          </div>

          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Category</label>
              <select style={styles.input} name="category"
                value={form.category} onChange={handleChange}>
                <option value="">Select a category</option>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Location</label>
              <input style={styles.input} type="text" name="location"
                placeholder="e.g. Banjara Hills, Hyderabad"
                value={form.location} onChange={handleChange} />
            </div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Description</label>
            <textarea style={{ ...styles.input, height: "120px", resize: "vertical" }}
              name="description" placeholder="Describe the issue in detail..."
              value={form.description} onChange={handleChange} />
          </div>

          <button
            style={{ ...styles.button, ...(hovered ? styles.buttonHover : {}) }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            type="submit" disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Complaint →"}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "calc(100vh - 80px)",
    background: "linear-gradient(180deg, #edfaf8 0%, #f8fffe 100%)",
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: "40px 16px",
  },
  card: {
    background: "white", borderRadius: "20px",
    boxShadow: "0 8px 40px rgba(7,71,66,0.12)",
    width: "100%", maxWidth: "560px",
    overflow: "hidden", border: "1px solid #e0f5f2",
  },
  cardHeader: {
    background: "linear-gradient(135deg, #053d38, #074742)",
    padding: "36px 40px 32px", textAlign: "center",
  },
  headerIcon: { fontSize: "32px", marginBottom: "12px" },
  title: { margin: 0, fontSize: "26px", fontWeight: "800", color: "white", fontFamily: "'Georgia', serif" },
  subtitle: { margin: "8px 0 0", color: "#99d6d0", fontSize: "14px" },
  form: { padding: "36px 40px" },
  field: { marginBottom: "20px", display: "flex", flexDirection: "column" },
  row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
  label: { fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px", letterSpacing: "0.3px" },
  input: {
    padding: "11px 14px", borderRadius: "8px", border: "1.5px solid #d1faf5",
    fontSize: "14px", color: "#111827", background: "#f8fffe", outline: "none",
    fontFamily: "inherit", width: "100%", boxSizing: "border-box",
  },
  button: {
    width: "100%", padding: "14px", marginTop: "8px",
    background: "linear-gradient(135deg, #0d9488, #074742)",
    color: "white", border: "none", borderRadius: "10px",
    cursor: "pointer", fontWeight: "700", fontSize: "15px",
    boxShadow: "0 4px 14px rgba(13,148,136,0.3)", transition: "all 0.2s ease",
  },
  buttonHover: { transform: "translateY(-2px)", boxShadow: "0 8px 20px rgba(13,148,136,0.4)" },
};

export default AddComplaint;