import { Link } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import PatientList from "../components/PatientList";

export default function DashboardPage() {
  return (
    <div>
      <Link
        to="/add-patient"
        className="dashboard-links inline-block mt-6 mx-4 p-2 bg-blue-500 text-l text-white rounded hover:bg-blue-600"
      >
        Add Patient
      </Link>
      <Link
        to="/purchase-list"
        className="dashboard-links inline-block mt-6 mx-4 p-2 bg-blue-500 text-l text-white rounded hover:bg-blue-600"
      >
        View Patient Purchases
      </Link>
      <LogoutButton />
      <PatientList />
    </div>
  );
}
