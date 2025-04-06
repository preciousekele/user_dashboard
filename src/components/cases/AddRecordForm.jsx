import { useState } from "react";
import Header from "../common/Header";

const AddRecordForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    studentName: "",
    matricNumber: "",
    offense: "",
    punishment: "",
    date: "",
    status: "pending"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData); // Pass data to parent or API
    }
    console.log("Submitted Record:", formData);
    // Optionally reset
    setFormData({
      studentName: "",
      matricNumber: "",
      offense: "",
      punishment: "",
      date: "",
      status: "pending"
    });
  };

  return (
    <div className='flex-1 overflow-auto relative z-10'>
			<Header title='Add New Record' />

    <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900 p-6 text-white">

      <div>
        <label className="block mb-1">Student Name</label>
        <input
          type="text"
          name="studentName"
          value={formData.studentName}
          onChange={handleChange}
          className="w-full bg-gray-700 rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Matric Number</label>
        <input
          type="text"
          name="matricNumber"
          value={formData.matricNumber}
          onChange={handleChange}
          className="w-full bg-gray-700 rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Offense</label>
        <input
          type="text"
          name="offense"
          value={formData.offense}
          onChange={handleChange}
          className="w-full bg-gray-700 rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Punishment</label>
        <input
          type="text"
          name="punishment"
          value={formData.punishment}
          onChange={handleChange}
          className="w-full bg-gray-700 rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full bg-gray-700 rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full bg-gray-700 rounded p-2"
        >
          <option value="pending">Pending</option>
          <option value="resolved">Resolved</option>
          <option value="review">Under Review</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Submit Record
      </button>
    </form>
    </div>
  );
};

export default AddRecordForm;
