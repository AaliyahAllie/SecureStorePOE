import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "./api";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    API.get("/auth/me")
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setCheckingSession(false));
  }, []);

  if (checkingSession) {
    return <div className="loading-screen">Checking secure session...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route
          path="/dashboard"
          element={
            user ? (
              <Dashboard user={user} setUser={setUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;