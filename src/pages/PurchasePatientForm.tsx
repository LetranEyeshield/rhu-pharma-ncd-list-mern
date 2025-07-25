import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { purchasePatient } from "../services/api";

export default function PurchasePatientForm() {
  //const { pid } = useParams();
  const { pid: paramPid } = useParams();
  const [GID, setGID] = useState(paramPid || "");
  //const navigate = useNavigate();

  const [form, setForm] = useState({
    pid: "",
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
    fetch(`http://localhost:5000/api/patient/${GID}`)
      .then((res) => res.json())
      .then((data) => setForm(data));
  }, [GID]);

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

    const { _id, ...cleanForm } = form as typeof form & { _id?: string };

    const editPurchase = {
      ...cleanForm,
      pid: GID,
      birthday: slicedBirthday,
      age: numAge,
    };
    // await updatePatient(id!, form);
    // await purchasePatient(pid!, editPurchase);
    await purchasePatient(editPurchase);
    alert("Purchased Success!");
    //navigate("/");
  };

  // const handleSubmit = async () => {
  //   await purchasePatient({
  //     patientId: selectedPatientId,
  //     medicine: selectedMedicine,
  //     quantity: 2,
  //   });
  // };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          name="pid"
          value={GID}
          onChange={(e) => setGID(e.target.value)}
        />

        <input
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
        />
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

        <button type="submit">Submit</button>
      </form>
      <Link to={`/dashboard`}>Back</Link>
    </>
  );
}
