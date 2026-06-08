import { useState } from "react";
import { useNavigate } from "react-router-dom";
import employeeApi from "../services/employeeApi";
import FormError from "../components/FormError";

export default function EmployeeLogin({ setEmployee }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      // Login request
      const loginResponse = await employeeApi.post("/employee/auth/login", {
        username,
        password,
      });

      console.log("Login successful:", loginResponse.data);

      // Get employee session
      const meResponse = await employeeApi.get("/employee/auth/me");
      console.log("Employee session:", meResponse.data);

      setEmployee(meResponse.data.employee);
      navigate("/employee/dashboard");
    } catch (err) {
      console.error("Employee login error:", err);

      if (err.response) {
        setError(err.response.data.message || "Login failed");
      } else {
        setError(err.message || "Connection error");
      }
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Employee Login</h1>
        <p>Login using your employee credentials.</p>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleLogin}>
          <div>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
            <FormError error={!username && "Username is required"} />
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <FormError error={!password && "Password is required"} />
          </div>

          <button type="submit" className="primary-btn full">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
