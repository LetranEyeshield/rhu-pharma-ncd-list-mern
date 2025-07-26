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
      <h2 className="text-2xl md:text-5xl my-6 font-bold">
        Patient Purchase Record
      </h2>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border py-1 px-2 mb-4 rounded bg-green-100"
      />
      <table className="list-table w-full border border-gray-300 border-collapse text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-center">
              Name
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-center">
              Birthday
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-center">
              Age
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-center">
              Address
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-center">
              Medicines
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-center">
              Purchase Date
            </th>
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
              <tr key={pid} className="hover:bg-blue-50 even:bg-gray-100">
                <td className="border border-gray-300 px-4 py-3">
                  {purchase.firstName} {purchase.middleName} {purchase.lastName}
                </td>
                <td className="border border-gray-300 px-4 py-3">
                  {purchase.birthday?.slice(0, 10)}
                </td>
                <td className="border border-gray-300 px-4 py-3">
                  {purchase.age}
                </td>
                <td className="border border-gray-300 px-4 py-3">
                  {purchase.address}
                </td>
                <td className="border border-gray-300 px-4 py-3">
                  {purchase.medicines?.map((m: string, i: number) => (
                    <div key={i}>{m}</div>
                  ))}
                </td>
                <td className="border border-gray-300 px-4 py-3">
                  {new Date(purchase.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <Link
        to={`/dashboard`}
        className="back-link inline-block mt-6 mx-4 px-4 py-2 bg-blue-500 text-xl text-white rounded hover:bg-blue-600"
      >
        Back
      </Link>
    </div>
  );
}
