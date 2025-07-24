import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token and user data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <button onClick={handleLogout} style={{ marginLeft: "1rem" }}>
      Logout
    </button>
  );
}
