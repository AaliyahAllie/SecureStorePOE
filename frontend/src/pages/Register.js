import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

function Register({ setUser }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    idNumber: "",
    username: "",
    accountNumber: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const updateForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const register = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await API.post("/auth/register", form);
      setUser(res.data.user);
      navigate("/dashboard");
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create Account</h1>
        <p>Register for secure international payment access.</p>

        {message && <div className="error-box">{message}</div>}

        <form onSubmit={register}>
          <input name="fullName" placeholder="Full Name" onChange={updateForm} required />
          <input name="idNumber" placeholder="13-digit ID Number" onChange={updateForm} required />
          <input name="username" placeholder="Username" onChange={updateForm} required />
          <input name="accountNumber" placeholder="Account Number" onChange={updateForm} required />
          <input name="password" type="password" placeholder="Strong Password" onChange={updateForm} required />

          <button type="submit" className="primary-btn full">Register Securely</button>
        </form>

        <p className="small-link">
          Already registered? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;