import { useEffect, useState } from "react";
import axios from "axios";
import type { Patient } from "../types";

const TheDebounceDefaultAxios = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

  // Debounce logic: update debouncedTerm after 500ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    return () => clearTimeout(handler); // clear on cleanup or re-render
  }, [searchTerm]);

  // Fetch patients when debouncedTerm changes
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get<Patient[]>(
          `http://localhost:5000/api/patients/search?name=${debouncedTerm}`
        );
        setPatients(res.data);
      } catch (err) {
        console.error("Error fetching patients:", err);
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
        className="border p-2 rounded mb-4"
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

export default TheDebounceDefaultAxios;
