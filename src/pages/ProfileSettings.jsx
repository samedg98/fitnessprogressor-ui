import { useState } from "react";
import api from "../api/axios";
import ErrorMessage from "../components/ErrorMessage";

export default function ProfileSettings() {
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");

      const res = await api.put(
        "/auth/update",
        {
          email,
          currentPassword,
          newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccess(res.data.message);
      setCurrentPassword("");
      setNewPassword("");

    } catch (err) {
      console.error("Profile update error:", err);
      setError(err.response?.data?.error || "Failed to update profile");
    }
  };

  return (
    <div className="page-container">
      <div className="auth-card">
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>
          Profile Settings
        </h2>

        <ErrorMessage message={error} />

        {success && (
          <p style={{ color: "var(--accent)", marginBottom: 15 }}>
            {success}
          </p>
        )}

        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label>New Email</label>
            <input
              type="email"
              placeholder="Enter new email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn-block btn-lg" type="submit">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
