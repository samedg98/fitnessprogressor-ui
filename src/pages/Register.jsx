import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import ErrorMessage from "../components/ErrorMessage";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/auth/register", { email, password });
      navigate("/"); // go back to login
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="page-container">
      <div className="auth-card">
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>Create Account</h2>

        <ErrorMessage message={error} />

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-block btn-lg">
            Create Account
          </button>
        </form>

        <p style={{ marginTop: 20, textAlign: "center" }}>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}
