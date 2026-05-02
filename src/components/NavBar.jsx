import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/log">Log Workout</Link>
      <Link to="/history">History</Link>
      <Link to="/profile">Profile</Link> {/* <-- ADDED */}

      <button
        className="btn-ghost"
        style={{ marginLeft: "auto" }}
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  );
}
