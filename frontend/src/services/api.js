const BASE_URL = "http://localhost:8080";

// GET all complaints
export const getComplaints = async () => {
  const res = await fetch(`${BASE_URL}/complaints`);
  return res.json();
};

// ADD complaint
export const addComplaint = async (complaint) => {
  const res = await fetch(`${BASE_URL}/complaint`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(complaint),
  });
  return res.json();
};

// UPDATE status
export const updateComplaintStatus = async (id, status) => {
  const res = await fetch(`${BASE_URL}/complaint/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return res.json();
};

// DELETE complaint
export const deleteComplaint = async (id) => {
  await fetch(`${BASE_URL}/complaint/${id}`, { method: "DELETE" });
};

// REGISTER
export const registerUser = async (name, email, password) => {
  try {
    const res = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    return res.json();
  } catch {
    return { error: "Server not reachable. Is Spring Boot running?" };
  }
};

// LOGIN
export const loginUser = async (email, password) => {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  } catch {
    return { error: "Server not reachable. Is Spring Boot running?" };
  }
};