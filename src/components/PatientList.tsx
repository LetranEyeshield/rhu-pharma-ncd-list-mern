// import { useEffect, useState } from "react";
// import { getPatients } from "../services/api";
// import { Link } from "react-router-dom";
// import type { Patient } from "../types";

// export default function PatientList() {
//   //const [patients, setPatients] = useState([]);
//   const [patients, setPatients] = useState<Patient[]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchPatients = async () => {
//       try {
//         const data = await getPatients();
//         setPatients(data);
//       } catch (error) {
//         console.error("Error fetching patients:", error);
//         setLoading(true);
//       }
//     };

//     fetchPatients();
//   }, []);

//   return (
//     <div>
//       <h1>Patient List</h1>

//       <table border={1} cellPadding={6} style={{ borderCollapse: "collapse" }}>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Birthday</th>
//             <th>Age</th>
//             <th>Address</th>
//             <th>Medicines</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {/* {patients.map((patient: any, index) => ( */}
//           {loading && <p>Loading...</p>}
//           {patients.map((patient: Patient, index) => (
//             <tr key={index}>
//               <td>
//                 {patient.firstName} {patient.middleName} {patient.lastName}
//               </td>
//               <td>{patient.birthday?.slice(0, 10)}</td>
//               <td>{patient.age}</td>
//               <td>{patient.address}</td>
//               <td>
//                 {patient.medicines?.map((m: string, i: number) => (
//                   <div key={i}>{m}</div>
//                 ))}
//               </td>
//               <td>
//                 <Link to={`/edit-patient/${patient._id}`}>Edit</Link>
//                 <Link to={`/purchase-patient/${patient._id}`}>
//                   Add Purchase
//                 </Link>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { searchPatient } from "../services/api";
import type { Patient } from "../types";
import { Link } from "react-router-dom";

export default function PatientList() {
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
      <h2 className="text-2xl md:text-5xl my-6 font-bold">Patient List</h2>
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
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
              Name
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
              Birthday
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
              Age
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
              Address
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
              Medicines
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {patients.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ textAlign: "center" }}>
                No records found.
              </td>
            </tr>
          ) : (
            patients.map((patient: Patient, _id) => (
              <tr key={_id} className="hover:bg-blue-50 even:bg-gray-100">
                <td className="border border-gray-300 px-4 py-3">
                  {patient.firstName} {patient.middleName} {patient.lastName}
                </td>
                <td className="border border-gray-300 px-4 py-3">
                  {patient.birthday?.slice(0, 10)}
                </td>
                <td className="border border-gray-300 px-4 py-3">
                  {patient.age}
                </td>
                <td className="border border-gray-300 px-4 py-3">
                  {patient.address}
                </td>
                <td className="border border-gray-300 px-4 py-3">
                  {patient.medicines?.map((m: string, i: number) => (
                    <div key={i}>{m}</div>
                  ))}
                </td>
                <td className="border border-gray-300 px-4 py-3">
                  <Link
                    to={`/edit-patient/${patient._id}`}
                    className="td-links mt-2 mr-4 px-3 py-1 bg-green-500 text-m text-white rounded hover:bg-gree-600"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/purchase-patient/${patient._id}`}
                    className="td-links mt-2 px-3 py-1 bg-green-500 text-m text-white rounded hover:bg-green-600"
                  >
                    Add Purchase
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
