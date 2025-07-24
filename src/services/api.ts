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

const API_URL = "http://localhost:5000/api/auth"; // your backend base URL

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
export const loginUser = async (
  username: string,
  password: string
): Promise<{
  success: boolean;
  token?: string;
  user?: { username: string };
}> => {
  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
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

// src/services/api.ts
export const addPatient = async (
  patientData: any
): Promise<{ success: boolean; message: string }> => {
  try {
    const res = await fetch("http://localhost:5000/api/patient", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patientData),
    });

    const data = await res.json();
    return { success: res.ok, message: data.message || "Something happened" };
  } catch (error) {
    return { success: false, message: "Network error" };
  }
};
