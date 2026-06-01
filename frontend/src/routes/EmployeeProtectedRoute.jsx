import { Navigate } from "react-router-dom";

export default function EmployeeProtectedRoute({
  employee,
  children,
}) {
  if (!employee) {
    return (
      <Navigate to="/employee/login" />
    );
  }

  return children;
}