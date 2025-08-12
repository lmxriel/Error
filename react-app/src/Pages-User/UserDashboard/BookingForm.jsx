import React, { useState } from "react";
import BookingConfirmationModal from "../../Components/Modals/BookingConfirmationModal";

function BookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    date: "",
    time: "",
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);

    setShowModal(true);

    setTimeout(() => {
      setShowModal(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Appointment Booking
        </h2>

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 mb-4 border rounded-lg"
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 mb-4 border rounded-lg"
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Service Type
        </label>
        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          className={`w-full px-3 py-2 mb-4 border rounded-lg ${
            formData.service === "" ? "text-gray-400" : "text-gray-900"
          }`}
        >
          <option value="">Select a service</option>
          <option value="Pet Consultation">Pet Consultation</option>
          <option value="Vaccination">Vaccination</option>
        </select>

        <label className="block mb-2 text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className={`w-full px-3 py-2 mb-4 border rounded-lg ${
            formData.date === "" ? "text-gray-400" : "text-gray-900"
          }`}
          placeholder="mm/dd/yyyy"
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">Time</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          className={`w-full px-3 py-2 mb-4 border rounded-lg ${
            formData.time === "" ? "text-gray-400" : "text-gray-900"
          }`}
          placeholder="--:-- --"
        />

        <button
          type="submit"
          className="w-full py-2 bg-[#a16f4a] text-gray-900 font-semibold rounded-lg hover:bg-gray-300 transition duration-300"
        >
          Confirm Booking
        </button>
      </form>

      {/* Modal component */}
      <BookingConfirmationModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}

export default BookingForm;
