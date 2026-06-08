import axios from "axios";

export async function login(username, password) {
  try {
    // Step 1: Get CSRF token
    const { data } = await axios.get("/api/csrf-token", { withCredentials: true });
    const csrfToken = data.csrfToken;

    // Step 2: Send login request with token
    const res = await axios.post(
      "/api/employee/auth/login",
      { username, password },
      {
        headers: { "X-CSRF-Token": csrfToken },
        withCredentials: true
      }
    );

    return res.data;
  } catch (err) {
    console.error("Login failed:", err);
    throw err;
  }
}
