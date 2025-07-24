import LogoutButton from "../components/LogoutButton";
import PatientForm from "../components/PatientForm";

export default function DashboardPage() {
  return (
    <div>
      <h1>PHARM NCD PATIENT LIST</h1>
      <PatientForm />
      <LogoutButton />
    </div>
  );
}
