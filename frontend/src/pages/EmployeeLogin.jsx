import { useState } from "react";
import { useNavigate } from "react-router-dom";
import employeeApi from "../services/employeeApi";

export default function EmployeeLogin({
  setEmployee,
}) {
  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  async function login() {
    try {
      setError("");

      // Login
      const loginResponse =
        await employeeApi.post(
          "/employee/auth/login",
          {
            username,
            password,
          }
        );

      console.log(
        "Login successful:",
        loginResponse.data
      );

      // Get employee session
      const meResponse =
        await employeeApi.get(
          "/employee/auth/me"
        );

      console.log(
        "Employee session:",
        meResponse.data
      );

      setEmployee(
        meResponse.data.employee
      );

      navigate(
        "/employee/dashboard"
      );
    } catch (error) {
      console.error(
        "Employee login error:",
        error
      );

      if (error.response) {
        console.error(
          "Response:",
          error.response.data
        );

        setError(
          error.response.data.message ||
            "Login failed"
        );
      } else {
        setError(
          error.message ||
            "Connection error"
        );
      }
    }
  }

  return (
    <div>
      <h1>Employee Login</h1>

      {error && (
        <p
          style={{
            color: "red",
          }}
        >
          {error}
        </p>
      )}

      <input
        placeholder="Username"
        value={username}
        onChange={(e) =>
          setUsername(
            e.target.value
          )
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }
      />

      <button onClick={login}>
        Login
      </button>
    </div>
  );
}