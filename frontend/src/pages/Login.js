import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

function Login({ setUser }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    accountNumber: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const updateForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await API.post("/auth/login", form);
      setUser(res.data.user);
      navigate("/dashboard");
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Customer Login</h1>
        <p>Login using username, account number, and password.</p>

        {message && <div className="error-box">{message}</div>}

        <form onSubmit={login}>
          <input name="username" placeholder="Username" onChange={updateForm} required />
          <input name="accountNumber" placeholder="Account Number" onChange={updateForm} required />
          <input name="password" type="password" placeholder="Password" onChange={updateForm} required />

          <button type="submit" className="primary-btn full">Login</button>
        </form>

        <p className="small-link">
          Need access? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;