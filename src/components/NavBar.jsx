import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav
      style={{
        display: "flex",
        gap: "20px",
        padding: "10px",
        borderBottom: "1px solid #ccc",
        marginBottom: "20px",
      }}
    >
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/log">Log Workout</Link>
      <Link to="/history">History</Link>

      <button onClick={handleLogout} style={{ marginLeft: "auto" }}>
        Logout
      </button>
    </nav>
  );
}
