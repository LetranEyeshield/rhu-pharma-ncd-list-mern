import { useEffect, useState } from "react";
import axios from "axios";
import type { Patient } from "../types";

const PatientListDefaultAxios = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    axios
      .get<Patient[]>("http://localhost:5000/api/")
      .then((res) => setPatients(res.data))
      .catch((err) => console.error("Failed to fetch patients:", err));
  }, []);

  return (
    <div>
      <h2>Patient List</h2>
      <ul>
        {patients.map((p) => (
          <li key={p._id}>
            {p.firstName} {p.middleName} {p.lastName} - {p.age} years old
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientListDefaultAxios;
