import { useState } from "react";
import { addPatient } from "../services/api";
import { Link } from "react-router-dom";

const medicinesList = ["Medicine 1", "Medicine 2", "Medicine 3"];

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
    alert(result.message);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
        />
        <input
          name="middleName"
          placeholder="Middle Name"
          onChange={handleChange}
        />
        <input
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
        />
        <input type="date" name="birthday" onChange={handleChange} />
        <input type="number" name="age" onChange={handleChange} />
        <input name="address" placeholder="Address" onChange={handleChange} />

        <fieldset>
          <legend>Select Medicines</legend>
          {medicinesList.map((medicine) => (
            <label key={medicine}>
              <input
                type="checkbox"
                checked={form.medicines.includes(medicine)}
                onChange={() => handleCheckbox(medicine)}
              />
              {medicine}
            </label>
          ))}
        </fieldset>

        <button type="submit">Add Patient</button>
      </form>
      <Link to={`/dashboard`}>Back</Link>
    </>
  );
}
