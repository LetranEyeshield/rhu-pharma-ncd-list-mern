import { Link } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import PatientList from "../components/PatientList";

export default function DashboardPage() {
  return (
    <div>
      <h1>PHARM NCD PATIENT LIST</h1>
      <PatientList />
      <Link to="/add-patient">Add Patient</Link>
      <LogoutButton />
    </div>
  );
}
