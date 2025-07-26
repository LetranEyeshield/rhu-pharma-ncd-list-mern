//MOCK VERSION
//
//
// export const loginUser = async (
//   username: string,
//   password: string
// ): Promise<boolean> => {
//   // Simulate an API call delay
//   await new Promise((res) => setTimeout(res, 500));

//   // Mocked validation (you can adjust this later)
//   if (username === "renica" && password === "orpiano") {
//     return true; // login success
//   }

//   return false; // login failed
// };

//const API_URL = "http://localhost:5000/api/auth"; // your backend base URL

// export const loginUser = async (
//   username: string,
//   password: string
// ): Promise<{ success: boolean }> => {
//   try {
//     const res = await fetch(`${API_URL}/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ username, password }),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       return { success: false };
//     }

//     return { success: true };
//   } catch (error) {
//     return { success: false };
//   }

// export const loginUser = async (
//   username: string,
//   password: string
// ): Promise<boolean> => {
//   try {
//     const res = await fetch(`${API_URL}/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ username, password }),
//     });

//     return res.ok;
//   } catch (error) {
//     return false;
//   }
//
//
//
//NON AXIOS
// export const loginUser = async (
//   username: string,
//   password: string
// ): Promise<{
//   success: boolean;
//   token?: string;
//   user?: { username: string };
// }> => {
//   try {
//     const res = await fetch("http://localhost:5000/api/auth/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ username, password }),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       return { success: false };
//     }

//     return {
//       success: true,
//       token: data.token,
//       user: data.user,
//     };
//   } catch (error) {
//     return { success: false };
//   }
// };

// // src/services/api.ts
// export const addPatient = async (
//   patientData: any
// ): Promise<{ success: boolean; message: string }> => {
//   try {
//     const res = await fetch("http://localhost:5000/api/patient", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(patientData),
//     });

//     const data = await res.json();
//     return {
//       success: res.ok,
//       message: data.message || "Something happened Try Again Later!",
//     };
//   } catch (error) {
//     return { success: false, message: "Network Error! Try Again Later!" };
//   }
// };

// export const getPatients = async () => {
//   const res = await fetch("http://localhost:5000/api/patient");
//   if (!res.ok)
//     throw new Error("Failed to fetch patients, Reload or Refresh Page!");
//   return res.json();
// };

// export const updatePatient = async (id: string, data: any) => {
//   const res = await fetch(`http://localhost:5000/api/patient/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });
//   return res.json();
// };
//
//
//
//
//AXIOS
import axios from "./axiosInstance";
import type { Patient } from "../types";
export interface Purchase {
  _id: string;
  pid: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  birthday: string;
  age: number;
  address: string;
  medicines: string[];
  createdAt: string;
}
export const loginUser = async (
  username: string,
  password: string
): Promise<{
  success: boolean;
  token?: string;
  user?: { username: string };
}> => {
  try {
    // const res = await fetch("http://localhost:5000/api/auth/login", {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false };
    }

    return {
      success: true,
      token: data.token,
      user: data.user,
    };
  } catch (error) {
    return { success: false };
  }
};

//RAILWAY DEPLOYMENT
//axios.get(`${import.meta.env.VITE_API_URL}/api/patient`);

// Add Patient
export async function addPatient(data: Omit<Patient, "_id">) {
  // const res = await axios.post("/patient", data);
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/patient`, data);
  return res.data;
}

// Get all patients
export async function getPatients(): Promise<Patient[]> {
  // const res = await axios.get("/patient");
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/patient`);
  return res.data;
}

// Get single patient by ID
export async function getPatient(id: string): Promise<Patient> {
  // const res = await axios.get(`/patient/${id}`);
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/patient${id}`);
  return res.data;
}

// Update patient
export async function updatePatient(id: string, data: Partial<Patient>) {
  // const res = await axios.put(`/patient/${id}`, data);
  const res = await axios.put(
    `${import.meta.env.VITE_API_URL}/patient${id}`,
    data
  );
  return res.data;
}

// Delete patient
export async function deletePatient(id: string) {
  const res = await axios.delete(`/patient/${id}`);
  return res.data;
}

// Purchase Patient
// export async function purchasePatient(pid: string, data: Partial<Purchase>) {
//   const res = await axios.post(`/patient/${pid}`, data);
//   return res.data;
// }

export async function purchasePatient(data: Omit<Purchase, "_id">) {
  // const res = await axios.post("/purchase", data);
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/purchase`,
    data
  );
  return res.data;
}

export async function searchPurchase(name: string): Promise<Purchase[]> {
  // const response = await axios.get(`/purchase/search`, {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/purchase/search`,
    {
      params: { name },
    }
  );
  return response.data;
}

export async function searchPatient(name: string): Promise<Patient[]> {
  // const response = await axios.get(`/patients/search`, {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/patients/search`,
    {
      params: { name },
    }
  );
  return response.data;
}

// Search purchases by name
// export async function searchPatientByName(name: string): Promise<Patient[]> {
//   const res = await axios.get(`/patient/search`, {
//     params: { name },
//   });
//   return res.data;
// }
// export const searchPatients = async (name: string) => {
//   const res = await axios.get(
//     `http://localhost:5000/api/patients/search?name=${name}`
//   );
//   return res.data;
// };

// export const searchPatients = async (name: string): Promise<Patient[]> => {
//   const response = await axios.get(`/api/patient/search`, {
//     params: { name },
//   });
//   return response.data;
// };
