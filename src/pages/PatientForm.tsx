import { useState } from "react";
import { addPatient } from "../services/api";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export const medicinesList = [
  "AMLODIPINE",
  "ASPIRIN",
  "ATORVASTATIN",
  "CAPTOPRIL",
  "CARVEDILOL",
  "CLONIDINE",
  "CLOPIDOGREL",
  "DIGOXIN",
  "FELODIPINE",
  "FUROSEMIDE",
  "GLICLAZIDE",
  "IRBESARTAN",
  "LOSARTAN",
  "LOSARTAN + HCTZ",
  "METFORMIN",
  "METHYLDOPA",
  "METOPROLOL",
  "ROSUVASTATIN",
  "TRIMETAZIDINE",
  "SIMVASTATIN",
  "SPIRONOLACTONE",
];

export default function PatientForm() {
  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    birthday: "",
    age: "",
    address: "",
    medicines: [] as string[],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (medicine: string) => {
    setForm((prev) => ({
      ...prev,
      medicines: prev.medicines.includes(medicine)
        ? prev.medicines.filter((m) => m !== medicine)
        : [...prev.medicines, medicine],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // const birthdayDate = new Date(form.birthday);
    // const today = new Date();
    //const age = today.getFullYear() - birthdayDate.getFullYear();

    const birthdayISO = new Date(form.birthday).toISOString();
    const slicedBirthday = birthdayISO.slice(0, 10);
    const numAge: number = Number(form.age);

    const newPatient = {
      ...form,
      //   age,
      birthday: slicedBirthday,
      age: numAge,
    };

    const result = await addPatient(newPatient);
    console.log(slicedBirthday);
    //alert(result.message);
    toast(result.message);
  };

  return (
    <>
      <div className="p-4 max-w-md mx-auto border rounded shadow bg-green-200 mt-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-l md:text-3xl font-bold">ADD PATIENT RECORD</h2>
          <input
            className="w-full p-2 border rounded mt-2"
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
          />
          <input
            className="w-full p-2 border rounded mt-2"
            name="middleName"
            placeholder="Middle Name"
            onChange={handleChange}
          />
          <input
            className="w-full p-2 border rounded mt-2"
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
          />
          <input
            className="w-full p-2 border rounded mt-2"
            type="date"
            name="birthday"
            onChange={handleChange}
          />
          <input
            className="w-full p-2 border rounded mt-2"
            type="number"
            name="age"
            onChange={handleChange}
          />
          <input
            className="w-full p-2 border rounded mt-2"
            name="address"
            placeholder="Address"
            onChange={handleChange}
          />

          <fieldset className="w-full p-2 border rounded mt-2 bg-gray-100">
            {medicinesList.map((med) => (
              <div className="fieldset-div flex border p-2">
                <span className="label-span">
                  <label key={med}> {med}</label>
                </span>
                <span className="checkbox-span">
                  <input
                    className="w-full p-2 border rounded mt-2"
                    type="checkbox"
                    checked={form.medicines.includes(med)}
                    onChange={() => handleCheckbox(med)}
                  />
                </span>
              </div>
            ))}
          </fieldset>

          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-500 text-l md:text-xl text-white rounded hover:bg-blue-600"
          >
            Add Patient
          </button>
        </form>
      </div>
      <Link
        to={`/dashboard`}
        className="back-link inline-block mt-6 mx-4 px-4 py-2 bg-blue-500 text-xl text-white rounded hover:bg-blue-600"
      >
        Back
      </Link>
    </>
  );
}
