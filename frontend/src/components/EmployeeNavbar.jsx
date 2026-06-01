import { Link } from "react-router-dom";

export default function EmployeeNavbar() {
  return (
    <nav
      style={{
        padding: "1rem",
        borderBottom:
          "1px solid #ccc",
        marginBottom: "2rem",
      }}
    >
      <Link
        to="/employee/dashboard"
      >
        Dashboard
      </Link>

      {" | "}

      <Link to="/employee/audit">
        Audit Logs
      </Link>
    </nav>
  );
}