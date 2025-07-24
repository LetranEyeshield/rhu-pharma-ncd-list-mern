import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updatePatient } from "../services/api";

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
    await updatePatient(id!, form);
    alert("Patient updated!");
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="firstName" value={form.firstName} onChange={handleChange} />
      <input
        name="middleName"
        value={form.middleName}
        onChange={handleChange}
      />
      <input name="lastName" value={form.lastName} onChange={handleChange} />
      <input
        type="date"
        name="birthday"
        value={form.birthday.split("T")[0]}
        onChange={handleChange}
      />
      <input name="age" value={form.age} onChange={handleChange} />
      <input name="address" value={form.address} onChange={handleChange} />

      <fieldset>
        {["Medicine 1", "Medicine 2", "Medicine 3"].map((med) => (
          <label key={med}>
            <input
              type="checkbox"
              checked={form.medicines.includes(med)}
              onChange={() => handleCheckbox(med)}
            />
            {med}
          </label>
        ))}
      </fieldset>

      <button type="submit">Update Patient</button>
    </form>
  );
}
