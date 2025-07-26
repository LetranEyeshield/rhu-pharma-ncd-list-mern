import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { updatePatient } from "../services/api";
// import type { Patient } from "../types";

export default function EditPatientForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    birthday: "",
    age: "",
    address: "",
    medicines: [] as string[],
  });

  // Fetch patient data to pre-fill form
  useEffect(() => {
    fetch(`http://localhost:5000/api/patient/${id}`)
      .then((res) => res.json())
      .then((data) => setForm(data));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    const birthdayISO = new Date(form.birthday).toISOString();
    const slicedBirthday = birthdayISO.slice(0, 10);
    const numAge: number = Number(form.age);
    const editPatient = {
      ...form,
      //   age,
      birthday: slicedBirthday,
      age: numAge,
    };
    // await updatePatient(id!, form);
    await updatePatient(id!, editPatient);
    alert("Patient updated!");
    navigate("/");
  };

  return (
    <>
      <div className="p-4 max-w-md mx-auto border rounded shadow bg-green-200 mt-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-xl md:text-4xl font-bold">UPDATE PATIENT</h2>
          <input
            className="w-full p-2 border rounded mt-2"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
          />
          <input
            className="w-full p-2 border rounded mt-2"
            name="middleName"
            value={form.middleName}
            onChange={handleChange}
          />
          <input
            className="w-full p-2 border rounded mt-2"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
          />
          <input
            className="w-full p-2 border rounded mt-2"
            type="date"
            name="birthday"
            value={form.birthday.split("T")[0]}
            onChange={handleChange}
          />
          <input
            className="w-full p-2 border rounded mt-2"
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
          />
          <input
            className="w-full p-2 border rounded mt-2"
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
          />

          <fieldset className="w-full p-2 border rounded mt-2 bg-gray-100">
            {["Medicine 1", "Medicine 2", "Medicine 3"].map((med) => (
              <div className="fieldset-div flex">
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
            className="mt-2 px-4 py-2 bg-blue-500 text-l md:text-xl text-white rounded hover:bg-blue-600"
            type="submit"
          >
            Update Patient
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
