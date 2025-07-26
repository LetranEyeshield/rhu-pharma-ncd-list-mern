import { useEffect, useState } from "react";
import { searchPurchase } from "../services/api";
import type { Purchase } from "../types";
import { Link } from "react-router-dom";

export default function PatientList() {
  const [purchase, setPurchase] = useState<Purchase[]>([]);
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
        const result = await searchPurchase(debouncedTerm);
        setPurchase(result);
      } catch (error) {
        console.error("Error fetching patient purchase:", error);
      }
    };

    fetchData();
  }, [debouncedTerm]);

  return (
    <div>
      <h2>Patient Purchase List</h2>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 mb-4 rounded"
      />
      <table border={1} cellPadding={6} style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Birthday</th>
            <th>Age</th>
            <th>Address</th>
            <th>Medicines</th>
            <th>Purchase Date</th>
          </tr>
        </thead>

        <tbody>
          {purchase.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ textAlign: "center" }}>
                No records found.
              </td>
            </tr>
          ) : (
            purchase.map((purchase: Purchase, pid) => (
              <tr key={pid}>
                <td>
                  {purchase.firstName} {purchase.middleName} {purchase.lastName}
                </td>
                <td>{purchase.birthday?.slice(0, 10)}</td>
                <td>{purchase.age}</td>
                <td>{purchase.address}</td>
                <td>
                  {purchase.medicines?.map((m: string, i: number) => (
                    <div key={i}>{m}</div>
                  ))}
                </td>
                <td>{new Date(purchase.createdAt).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <Link to={`/dashboard`}>Back</Link>
    </div>
  );
}
