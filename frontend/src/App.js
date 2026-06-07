import {
  import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import API from "./api";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import EmployeeLogin from "./pages/EmployeeLogin";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AuditLogs from "./pages/AuditLogs";
import About from "./pages/About";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

import "./styles/theme.scss";
import "./styles/global.scss";
import "./App.css";

function App() {

  const [user, setUser] =
    useState(null);

  const [employee,
    setEmployee] =
    useState(null);

  const [checkingSession,
    setCheckingSession] =
    useState(true);

  const [sidebarOpen,
    setSidebarOpen] =
    useState(false);

  useEffect(() => {

    async function checkSessions() {

      try {

        const userRes =
          await API.get(
            "/auth/me"
          );

        setUser(
          userRes.data.user
        );

      } catch {

        setUser(null);

      }

      try {

        const employeeRes =
          await API.get(
            "/employee/auth/me"
          );

        setEmployee(
          employeeRes.data.employee
        );

      } catch {

        setEmployee(null);

      }

      setCheckingSession(false);

    }

    checkSessions();

  }, []);

  if (checkingSession) {

    return (
      <div className="loading-screen">
        Checking secure session...
      </div>
    );

  }

  return (

    <BrowserRouter>

      <Routes>

        {/* Public Routes */}

        <Route
          path="/"
          element={
            <Home user={user} />
          }
        />

        <Route
          path="/login"
          element={
            <Login
              setUser={setUser}
            />
          }
        />

        <Route
          path="/register"
          element={
            <Register
              setUser={setUser}
            />
          }
        />

        {/* About Page */}

        <Route
          path="/about"
          element={
            <EmployeeLayout
              sidebarOpen={sidebarOpen}
              onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
              onCloseSidebar={() => setSidebarOpen(false)}
            >
              <About />
            </EmployeeLayout>
          }
        />

        {/* Customer Dashboard */}

        <Route
          path="/dashboard"
          element={
            user ? (
              <Dashboard
                user={user}
                setUser={setUser}
              />
            ) : (
              <Navigate
                to="/login"
              />
            )
          }
        />

        {/* Employee Login */}

        <Route
          path="/employee/login"
          element={
            <EmployeeLogin
              setEmployee={
                setEmployee
              }
            />
          }
        />

        {/* Employee Dashboard */}

        <Route
          path="/employee/dashboard"
          element={
            employee ? (
              <EmployeeLayout
                sidebarOpen={sidebarOpen}
                onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                onCloseSidebar={() => setSidebarOpen(false)}
              >
                <EmployeeDashboard
                  employee={
                    employee
                  }
                />
              </EmployeeLayout>
            ) : (
              <Navigate
                to="/employee/login"
              />
            )
          }
        />



      </Routes>

    </BrowserRouter>

  );

}

function EmployeeLayout({ children, sidebarOpen, onToggleSidebar, onCloseSidebar }) {
  return (
    <div className="app-container">
      <Header onToggleSidebar={onToggleSidebar} />
      <div className="app-shell">
        <Sidebar open={sidebarOpen} onClose={onCloseSidebar} />
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default App;
