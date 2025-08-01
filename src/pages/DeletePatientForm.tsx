import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
// import { medicinesList } from "./PatientForm";

export default function DeletePatientForm() {
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

  // Fetch patient data to show before deleting
  useEffect(() => {
    fetch(
      `https://rhu-pharma-ncd-list-mern.onrender.com/api/delete-patient/${id}`
    )
      .then((res) => res.json())
      .then((data) => setForm(data));
  }, [id]);

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this patient?"
    );
    if (!confirm) return;

    try {
      const res = await fetch(
        `https://rhu-pharma-ncd-list-mern.onrender.com/api/delete-patient/${id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        toast.success("Patient Deleted!");
        navigate("/");
      } else {
        toast.error("Error deleting patient");
      }
    } catch (error) {
      toast.error("Server error");
      console.error(error);
    }
  };

  return (
    <>
      <div className="p-4 max-w-md mx-auto border rounded shadow bg-red-100 mt-8">
        <h2 className="text-xl md:text-4xl font-bold text-center mb-4">
          DELETE PATIENT
        </h2>
        <div className="flex flex-col gap-2">
          <div>
            <strong>Name:</strong> {form.firstName} {form.middleName}{" "}
            {form.lastName}
          </div>
          <div>
            <strong>Birthday:</strong> {form.birthday.split("T")[0]}
          </div>
          <div>
            <strong>Age:</strong> {form.age}
          </div>
          <div>
            <strong>Address:</strong> {form.address}
          </div>
          <div>
            <strong>Medicines:</strong>
            <ul className="list-disc pl-5">
              {form.medicines.map((med) => (
                <li key={med}>{med}</li>
              ))}
            </ul>
          </div>
        </div>

        <button
          onClick={handleDelete}
          className="mt-6 w-full px-4 py-2 bg-red-600 text-white text-lg rounded hover:bg-red-700"
        >
          Delete Patient
        </button>
      </div>

      <Link
        to={`/dashboard`}
        className="back-link inline-block mt-6 mx-4 px-4 py-2 bg-gray-400 text-xl text-white rounded hover:bg-gray-500"
      >
        Cancel
      </Link>
    </>
  );
}
