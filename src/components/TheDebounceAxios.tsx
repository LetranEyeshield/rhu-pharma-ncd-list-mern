import { useEffect, useState } from "react";
import { searchPatient } from "../services/api";
import type { Patient } from "../types";

const TheDebounceAxios = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Fetch patients when debounced term changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await searchPatient(debouncedTerm);
        setPatients(result);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchData();
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

export default TheDebounceAxios;
