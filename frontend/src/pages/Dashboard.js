import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import API from "../api";
import { validationRules } from "../utils/validationRules";
import { errorMessages } from "../utils/errorMessages";
import FormError from "../components/FormError";

function Dashboard({ user, setUser }) {
  const navigate = useNavigate();

  const [payments, setPayments] = useState([]);
  const [message, setMessage] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = useForm({
    mode: "onChange",
    defaultValues: {
      amount: "",
      currency: "USD",
      provider: "SWIFT",
      payeeName: "",
      payeeAccountNumber: "",
      swiftCode: "",
    }
  });

  const loadPayments = async () => {
    try {
      const res = await API.get("/payments/my-payments");
      setPayments(res.data.payments);
    } catch {
      setPayments([]);
    }
  };

  useEffect(() => {
    loadPayments();
  }, []);

  const onSubmitPayment = async (data) => {
    setMessage("");

    try {
      await API.post("/payments", data);
      setMessage("Payment submitted successfully.");
      reset();
      loadPayments();
      setShowConfirm(false);
    } catch (err) {
      setMessage(err.response?.data?.message || "Payment failed.");
      setShowConfirm(false);
    }
  };

  const handlePaymentSubmit = (data) => {
    setShowConfirm(true);
  };

  const confirmPayment = () => {
    handleSubmit(onSubmitPayment)();
  };

  const logout = async () => {
    await API.post("/auth/logout");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>GlobalBank</h2>
        <p>Customer Portal</p>
        <button onClick={logout} className="logout-btn">Logout</button>
      </aside>

      <main className="dashboard-main">
        <div className="dashboard-header">
          <div>
            <h1>Welcome, {user.fullName}</h1>
            <p>Account: ****{user.accountNumber.slice(-4)}</p>
          </div>
          <div className="secure-badge">Secure Session Active</div>
        </div>

        <section className="stats-grid">
          <div className="stat-card">
            <h3>{payments.length}</h3>
            <p>Total Payments</p>
          </div>
          <div className="stat-card">
            <h3>SWIFT</h3>
            <p>Payment Provider</p>
          </div>
          <div className="stat-card">
            <h3>Protected</h3>
            <p>RegEx Validated Inputs</p>
          </div>
        </section>

        <section className="content-grid">
          <div className="panel">
            <h2>New International Payment</h2>

            {message && <div className="info-box">{message}</div>}

            <form onSubmit={handleSubmit(handlePaymentSubmit)}>
              <div>
                <input
                  {...register("amount", {
                    required: errorMessages.amount.required,
                    pattern: {
                      value: validationRules.amount,
                      message: errorMessages.amount.pattern
                    }
                  })}
                  placeholder="Amount"
                  type="number"
                  step="0.01"
                />
                <FormError error={errors.amount?.message} />
              </div>

              <div>
                <select
                  {...register("currency", {
                    required: errorMessages.currency.required,
                    pattern: {
                      value: validationRules.currency,
                      message: errorMessages.currency.pattern
                    }
                  })}
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="ZAR">ZAR</option>
                  <option value="AED">AED</option>
                </select>
                <FormError error={errors.currency?.message} />
              </div>

              <div>
                <select
                  {...register("provider", {
                    required: errorMessages.provider.required,
                    pattern: {
                      value: validationRules.provider,
                      message: errorMessages.provider.pattern
                    }
                  })}
                >
                  <option value="SWIFT">SWIFT</option>
                </select>
                <FormError error={errors.provider?.message} />
              </div>

              <div>
                <input
                  {...register("payeeName", {
                    required: errorMessages.payeeName.required,
                    pattern: {
                      value: validationRules.fullName,
                      message: errorMessages.payeeName.pattern
                    }
                  })}
                  placeholder="Payee Full Name"
                />
                <FormError error={errors.payeeName?.message} />
              </div>

              <div>
                <input
                  {...register("payeeAccountNumber", {
                    required: errorMessages.payeeAccountNumber.required,
                    pattern: {
                      value: validationRules.accountNumber,
                      message: errorMessages.payeeAccountNumber.pattern
                    }
                  })}
                  placeholder="Payee Account Number"
                />
                <FormError error={errors.payeeAccountNumber?.message} />
              </div>

              <div>
                <input
                  {...register("swiftCode", {
                    required: errorMessages.swiftCode.required,
                    pattern: {
                      value: validationRules.swiftCode,
                      message: errorMessages.swiftCode.pattern
                    }
                  })}
                  placeholder="SWIFT Code"
                  style={{ textTransform: 'uppercase' }}
                />
                <FormError error={errors.swiftCode?.message} />
              </div>

              <button type="submit" className="primary-btn full" disabled={!isValid}>
                Pay Now
              </button>
            </form>

            {showConfirm && (
              <div className="confirm-dialog">
                <div className="confirm-content">
                  <h3>Confirm Payment</h3>
                  <p>Are you sure you want to submit this payment?</p>
                  <div className="confirm-buttons">
                    <button onClick={() => setShowConfirm(false)} className="secondary-btn">
                      Cancel
                    </button>
                    <button onClick={confirmPayment} className="primary-btn">
                      Confirm Payment
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="panel">
            <h2>Payment History</h2>

            {payments.length === 0 ? (
              <p>No payments submitted yet.</p>
            ) : (
              <div className="payment-list">
                {payments.map((item) => (
                  <div className="payment-item" key={item._id}>
                    <div>
                      <strong>{item.currency} {item.amount}</strong>
                      <p>{item.payeeName}</p>
                      <small>{item.swiftCode}</small>
                    </div>
                    <span>{item.status}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;