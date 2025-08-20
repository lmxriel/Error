import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdoptionForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    income: "",
    purpose: "",
    street: "",
    barangay: "",
    city: "",
    province: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Wait 2 seconds then navigate back
    setTimeout(() => {
      navigate("/adoption");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Adoption Form</h2>

        {/* Show confirmation*/}
        {submitted ? (
          <div className="text-center py-10">
            <h3 className="text-xl font-semibold text-green-600 mb-2">
              ✅ Application Submitted!
            </h3>
            <p className="text-gray-600">
              Redirecting you back to the adoption page...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block font-medium">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-2 mt-1"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-2 mt-1"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block font-medium">Phone Number</label>
              <div className="flex">
                <span className="px-3 py-2 bg-gray-200 border border-r-0 rounded-l-lg">
                  +63
                </span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="9123456789"
                  className="w-full border rounded-r-lg p-2 mt-0"
                />
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block font-medium">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-2 mt-1 text-black"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block font-medium">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-2 mt-1 text-black"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* Address */}
            <div>
              <label className="block font-medium">Address</label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                required
                placeholder="Purok/Street/Block No."
                className="w-full border rounded-lg p-2 mt-1 mb-2 text-black"
              />

              <select
                name="barangay"
                value={formData.barangay}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-2 mt-1 mb-2 text-black"
              >
                <option value="">Select Barangay</option>
                <option value="Baras">Baras</option>
                <option value="Buenaflor">Buenaflor</option>
                <option value="Calean">Calean</option>
                <option value="D'Ledesma">D'Ledesma</option>
                <option value="E.J.C. Montilla">E.J.C. Montilla</option>
                <option value="Griño">Griño</option>
                <option value="Kalandagan">Kalandagan</option>
                <option value="Lancheta">Lancheta</option>
                <option value="New Carmen">New Carmen</option>
                <option value="New Isabela">New Isabela</option>
                <option value="New Lagao">New Lagao</option>
                <option value="New Passi">New Passi</option>
                <option value="Poblacion">Poblacion</option>
                <option value="Rajah Muda">Rajah Muda</option>
                <option value="San Antonio">San Antonio</option>
                <option value="San Emmanuel">San Emmanuel</option>
                <option value="San Pablo">San Pablo</option>
                <option value="San Rafael">San Rafael</option>
                <option value="Tina">Tina</option>
                <option value="Upper Katungal">Upper Katungal</option>
              </select>

              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-2 mt-1 mb-2 text-black"
              >
                <option value="">Select City</option>
                <option value="Tacurong City">Tacurong City</option>
              </select>

              <select
                name="province"
                value={formData.province}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-2 mt-1 mb-2 text-black"
              >
                <option value="">Select Province</option>
                <option value="Sultan Kudarat">Sultan Kudarat</option>
              </select>
            </div>

            {/* Monthly Income */}
            <div className="mb-2">
              <label className="block font-medium">Monthly Income</label>
              <div className="flex items-center border rounded-lg p-2 mt-1">
                <span className="text-gray-500 mr-2">₱</span>
                <input
                  type="text"
                  name="income"
                  value={formData.income}
                  onChange={handleChange}
                  required
                  placeholder="Enter amount"
                  className="w-full outline-none"
                />
              </div>
            </div>

            {/* Purpose */}
            <div>
              <label className="block font-medium mt-1">
                Purpose of Adoption
              </label>
              <p className="text-xs italic mt-1 mb-1 text-gray-500">
                Note: This section helps ensure that the adopter is responsible
                and understands the commitment of providing a safe and loving
                home for the pet.
              </p>
              <textarea
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-2 mt-1"
                rows="3"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-700 transition"
            >
              Submit Application
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default AdoptionForm;
