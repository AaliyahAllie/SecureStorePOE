import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import API from "../api";
import { validationRules } from "../utils/validationRules";
import { errorMessages } from "../utils/errorMessages";
import FormError from "../components/FormError";
import PasswordStrength from "../components/PasswordStrength";

function Register({ setUser }) {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullName: "",
      idNumber: "",
      username: "",
      accountNumber: "",
      password: "",
    }
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    setMessage("");

    try {
      const res = await API.post("/auth/register", data);
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

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              {...register("fullName", {
                required: errorMessages.fullName.required,
                pattern: {
                  value: validationRules.fullName,
                  message: errorMessages.fullName.pattern
                }
              })}
              placeholder="Full Name"
            />
            <FormError error={errors.fullName?.message} />
          </div>

          <div>
            <input
              {...register("idNumber", {
                required: errorMessages.idNumber.required,
                pattern: {
                  value: validationRules.idNumber,
                  message: errorMessages.idNumber.pattern
                }
              })}
              placeholder="13-digit ID Number"
            />
            <FormError error={errors.idNumber?.message} />
          </div>

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
              placeholder="Strong Password"
            />
            <FormError error={errors.password?.message} />
            <PasswordStrength password={password} />
          </div>

          <button type="submit" className="primary-btn full" disabled={!isValid}>
            Register Securely
          </button>
        </form>

        <p className="small-link">
          Already registered? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;