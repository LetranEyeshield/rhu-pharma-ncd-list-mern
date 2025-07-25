import { useEffect, useState } from "react";
import type { Patient } from "../types";

const DefaultDebounce = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500); // wait 500ms after last input

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Fetch on debounced term
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/patients/search?name=${encodeURIComponent(
            debouncedTerm
          )}`
        );

        if (!res.ok) throw new Error("Failed to fetch patients");

        const data: Patient[] = await res.json();
        setPatients(data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, [debouncedTerm]);

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

      {patients.length === 0 ? (
        <p>No patients found.</p>
      ) : (
        <ul>
          {patients.map((p) => (
            <li key={p._id}>
              {p.firstName} {p.middleName} {p.lastName} - {p.age} years old
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DefaultDebounce;
