// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import LoginPage from "./pages/LoginPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import PatientForm from "./pages/PatientForm";
import EditPatientForm from "./pages/EditPatientForm";
import PurchasePatientForm from "./pages/PurchasePatientForm";
import PurchaseList from "./pages/PurchaseList";
import pharmBanner from "./images/pharm-banner.jpg";

import { Toaster } from "react-hot-toast";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      {/* <Toaster /> */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#defce6",
            color: "#000",
          },
        }}
      />

      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      <h1 className="h1 text-3xl font-bold md:text-5xl mb-6">
        PHARM NCD PATIENT LIST
      </h1>
      <img src={pharmBanner} alt="Banner Image" className="banner-image" />
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/add-patient" element={<PatientForm />} />
          <Route path="/edit-patient/:id" element={<EditPatientForm />} />
          <Route path="/purchase-list" element={<PurchaseList />} />
          <Route
            path="/purchase-patient/:pid"
            element={<PurchasePatientForm />}
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                {/* insted of <App /> I dont know why this works! just don't touch the code */}
                <DashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
