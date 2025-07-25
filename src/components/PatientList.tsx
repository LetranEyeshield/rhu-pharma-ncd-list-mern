import { useEffect, useState, useCallback } from "react";
import { getPatients } from "../services/api";
import { Link } from "react-router-dom";
import type { Patient } from "../types";

export default function DashboardPage() {
  //const [patients, setPatients] = useState([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getPatients();
        setPatients(data);
      } catch (error) {
        console.error("Error fetching patients:", error);
        setLoading(true);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div>
      <h1>Patient List</h1>

      <table border={1} cellPadding={6} style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Birthday</th>
            <th>Age</th>
            <th>Address</th>
            <th>Medicines</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* {patients.map((patient: any, index) => ( */}
          {loading && <p>Loading...</p>}
          {patients.map((patient: Patient, index) => (
            <tr key={index}>
              <td>
                {patient.firstName} {patient.middleName} {patient.lastName}
              </td>
              <td>{patient.birthday?.slice(0, 10)}</td>
              <td>{patient.age}</td>
              <td>{patient.address}</td>
              <td>
                {patient.medicines?.map((m: string, i: number) => (
                  <div key={i}>{m}</div>
                ))}
              </td>
              <td>
                <Link to={`/edit-patient/${patient._id}`}>Edit</Link>
                <Link to={`/purchase-patient/${patient._id}`}>
                  Add Purchase
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
