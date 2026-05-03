import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import API from "../api";
import { validationRules } from "../utils/validationRules";
import { errorMessages } from "../utils/errorMessages";
import FormError from "../components/FormError";

function Login({ setUser }) {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: "",
      accountNumber: "",
      password: "",
    }
  });

  const onSubmit = async (data) => {
    setMessage("");

    try {
      const res = await API.post("/auth/login", data);
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

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              {...register("username", {
                required: errorMessages.username.required,
                pattern: {
                  value: validationRules.username,
                  message: errorMessages.username.pattern
                }
              })}
              placeholder="Username"
            />
            <FormError error={errors.username?.message} />
          </div>

          <div>
            <input
              {...register("accountNumber", {
                required: errorMessages.accountNumber.required,
                pattern: {
                  value: validationRules.accountNumber,
                  message: errorMessages.accountNumber.pattern
                }
              })}
              placeholder="Account Number"
            />
            <FormError error={errors.accountNumber?.message} />
          </div>

          <div>
            <input
              {...register("password", {
                required: errorMessages.password.required,
                pattern: {
                  value: validationRules.password,
                  message: errorMessages.password.pattern
                }
              })}
              type="password"
              placeholder="Password"
            />
            <FormError error={errors.password?.message} />
          </div>

          <button type="submit" className="primary-btn full" disabled={!isValid}>
            Login
          </button>
        </form>

        <p className="small-link">
          Need access? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;