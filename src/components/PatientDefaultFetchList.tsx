import { useEffect, useState } from "react";
import type { Patient } from "../types";

const PatientDefaultFetchList = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPatients = async (name: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/patients/search?name=${encodeURIComponent(
          name
        )}`
      );
      if (!response.ok) throw new Error("Failed to fetch");

      const data: Patient[] = await response.json();
      setPatients(data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  // Fetch all patients initially
  useEffect(() => {
    fetchPatients("");
  }, []);

  // Fetch filtered patients whenever search changes
  useEffect(() => {
    fetchPatients(searchTerm);
  }, [searchTerm]);

  return (
    <div>
      <h2>Patient List</h2>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 mb-4 rounded"
      />

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

export default PatientDefaultFetchList;
