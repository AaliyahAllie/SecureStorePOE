import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Dashboard({ user, setUser }) {
  const navigate = useNavigate();

  const [payment, setPayment] = useState({
    amount: "",
    currency: "USD",
    provider: "SWIFT",
    payeeName: "",
    payeeAccountNumber: "",
    swiftCode: "",
  });

  const [payments, setPayments] = useState([]);
  const [message, setMessage] = useState("");

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

  const updatePayment = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  const submitPayment = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await API.post("/payments", payment);
      setMessage("Payment submitted successfully.");
      setPayment({
        amount: "",
        currency: "USD",
        provider: "SWIFT",
        payeeName: "",
        payeeAccountNumber: "",
        swiftCode: "",
      });
      loadPayments();
    } catch (err) {
      setMessage(err.response?.data?.message || "Payment failed.");
    }
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

            <form onSubmit={submitPayment}>
              <input name="amount" value={payment.amount} placeholder="Amount" onChange={updatePayment} required />

              <select name="currency" value={payment.currency} onChange={updatePayment}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="ZAR">ZAR</option>
                <option value="AED">AED</option>
              </select>

              <select name="provider" value={payment.provider} onChange={updatePayment}>
                <option value="SWIFT">SWIFT</option>
              </select>

              <input name="payeeName" value={payment.payeeName} placeholder="Payee Full Name" onChange={updatePayment} required />
              <input name="payeeAccountNumber" value={payment.payeeAccountNumber} placeholder="Payee Account Number" onChange={updatePayment} required />
              <input name="swiftCode" value={payment.swiftCode} placeholder="SWIFT Code" onChange={updatePayment} required />

              <button type="submit" className="primary-btn full">Pay Now</button>
            </form>
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