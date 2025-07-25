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
      <h2>Patient List</h2>
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
            <th>Actions</th>
          </tr>
        </thead>
        {patients.length === 0 ? (
          <p>No patients found.</p>
        ) : (
          <tbody>
            {patients.map((patient: Patient, _id) => (
              <tr key={_id}>
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
        )}
      </table>
    </div>
  );
}
