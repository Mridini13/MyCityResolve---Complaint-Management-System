import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div style={styles.container}>
        {toasts.map((toast) => (
          <div
            key={toast.id}
            style={{
              ...styles.toast,
              ...(toast.type === "success" ? styles.success : {}),
              ...(toast.type === "error" ? styles.error : {}),
              ...(toast.type === "info" ? styles.info : {}),
            }}
          >
            <span style={styles.icon}>
              {toast.type === "success" ? "✅" : toast.type === "error" ? "❌" : "ℹ️"}
            </span>
            <span style={styles.message}>{toast.message}</span>
            <button style={styles.close} onClick={() => removeToast(toast.id)}>×</button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}

const styles = {
  container: {
    position: "fixed",
    top: "90px",
    right: "24px",
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    pointerEvents: "none",
  },
  toast: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "14px 18px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
    minWidth: "280px",
    maxWidth: "360px",
    pointerEvents: "all",
    animation: "slideIn 0.3s ease",
    fontFamily: "'Segoe UI', sans-serif",
    fontSize: "14px",
  },
  success: { background: "#ecfdf5", border: "1px solid #a7f3d0", color: "#065f46" },
  error:   { background: "#fef2f2", border: "1px solid #fecaca", color: "#991b1b" },
  info:    { background: "#edfaf8", border: "1px solid #a8e8e1", color: "#074742" },
  icon:    { fontSize: "16px", flexShrink: 0 },
  message: { flex: 1, fontWeight: "500" },
  close: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
    color: "inherit",
    opacity: 0.6,
    padding: 0,
    lineHeight: 1,
    flexShrink: 0,
  },
};