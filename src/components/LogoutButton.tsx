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
    <button
      onClick={handleLogout}
      className="inline-block mt-6 mx-4 px-3 py-2 bg-blue-500 text-l text-white rounded hover:bg-blue-600"
    >
      Logout
    </button>
  );
}
