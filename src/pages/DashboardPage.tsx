import { Link } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import PatientListDefaultAxios from "../components/PatientListDefaultAxios";
import PatientDefaultFetchList from "../components/PatientDefaultFetchList";
import TheDebounceDefaultAxios from "../components/TheDebounceDefaultAxios";
import DefaultDebounce from "../components/DefaultDebounce";
import TheDebounceAxios from "../components/TheDebounceAxios";
import PatientList from "../components/PatientList";

export default function DashboardPage() {
  return (
    <div>
      <h1>PHARM NCD PATIENT LIST</h1>
      {/* <PatientDefaultFetchList /> */}
      {/* <DefaultDebounce /> */}
      {/* <PatientListDefaultAxios /> */}
      {/* <TheDebounceDefaultAxios /> */}
      {/* <TheDebounceAxios /> */}
      <PatientList />
      <Link to="/add-patient">Add Patient</Link>
      <LogoutButton />
    </div>
  );
}
