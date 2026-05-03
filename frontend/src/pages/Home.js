import { Link } from "react-router-dom";

function Home({ user }) {
  return (
    <div className="home-page">
      <nav className="navbar">
        <div className="brand">GlobalBank</div>
        <div className="nav-links">
          {user ? (
            <Link to="/dashboard">Customer Portal</Link>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="nav-button">Register</Link>
            </>
          )}
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">Secure International Payments</p>
          <h1>Bank globally with confidence.</h1>
          <p className="hero-text">
            GlobalBank allows customers to register, log in securely, and create
            international SWIFT payments through a protected online portal.
          </p>

          <div className="hero-actions">
            <Link to="/register" className="primary-btn">Open Secure Access</Link>
            <Link to="/login" className="secondary-btn">Customer Login</Link>
          </div>
        </div>

        <div className="hero-card">
          <h3>Security First</h3>
          <ul>
            <li>Password hashing and salting</li>
            <li>Strict input whitelisting</li>
            <li>Secure session login</li>
            <li>Protected payment submission</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Home;