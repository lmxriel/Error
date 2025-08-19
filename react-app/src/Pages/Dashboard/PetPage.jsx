import React, { useState, useEffect } from "react";
import OVSLogo from "../../assets/OVSLogo.png";
import Delete from "../../assets/Delete.svg";
import Edit from "../../assets/Edit.svg";
import { useNavigate } from "react-router-dom";
/* What to do? fix the add pets which is the create in the database and also in the frontend there is more problem 
  in the frontend than backend immediate fix add setEditng or add another which is setAddingPet instead
  this will finish the crud for the pets in the admin side next will be the adoption phase😒😒😒 */
function PetPage() {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPet, setEditingPet] = useState(null);

  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [petToDelete, setPetToDelete] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    size: "",
    gender: "",
    weight: "",
    medical: "",
    color: "",
    status: "Available",
    image: "",       // ✅ URL string for preview
    imageFile: null, // ✅ actual file for upload
  });

  useEffect(() => {
    fetch("http://localhost:8081/api/pets")
      .then((res) => res.json())
      .then((data) => setPets(data))
      .catch((err) => console.error("Error fetching pets:", err));
  }, []);

  const fetchPets = () => {
  fetch("http://localhost:8081/api/pets")
    .then((res) => res.json())
    .then((data) => setPets(data))
    .catch((err) => console.error("Error fetching pets:", err));
  };

  useEffect(() => {
    fetchPets();
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name || "");
    formDataToSend.append("breed", formData.breed || "");
    formDataToSend.append("size", formData.size || "");
    formDataToSend.append("gender", formData.gender || "");
    formDataToSend.append("weight", formData.weight || "");
    formDataToSend.append("color", formData.color || "");
    formDataToSend.append("status", formData.status || "");
    formDataToSend.append("medical", formData.medical || "");

    if (formData.imageFile) {
      formDataToSend.append("image", formData.imageFile);
    }

    let url = "http://localhost:8081/api/pets";
    let method = "POST";

    if (editingPet) {
      url = `http://localhost:8081/update/pets/${editingPet.pet_id}`;
      method = "PUT";
    }

    await fetch(url, {
      method,
      body: formDataToSend
    });

    // ✅ Refresh data from backend
    fetchPets();

    closeForm();
  };

  const confirmDelete = async () => {
    if (petToDelete) {
      await fetch(`http://localhost:8081/delete/pets/${petToDelete.pet_id}`, {
        method: "DELETE",
      });
      setPets((prev) => prev.filter((pet) => pet.pet_id !== petToDelete.pet_id));
      setShowDeleteModal(false);
      setPetToDelete(null);
    }
  };
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

    const handleImageChange = (e) => {
  const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        imageFile: file
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result // For preview only
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  //Open form
   const openForm = (pet = null) => {
    if (pet) {
      setEditingPet(pet);
      setFormData({
        name: pet.name || "",
        breed: pet.breed || "",
        size: pet.size || "",
        gender: pet.gender || "",
        weight: pet.weight || "",
        medical: pet.medical || "",
        color: pet.color || "",
        status: pet.status || "Available",
        image: pet.image || "",
        imageFile: null,
      });
    } else {
      setEditingPet(null);
      setFormData({
        name: "",
        breed: "",
        size: "",
        gender: "",
        weight: "",
        medical: "",
        color: "",
        status: "Available",
        image: "",
        imageFile: null,
      });
    }
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingPet(null);
    setFormData({
      name: "",
      breed: "",
      size: "",
      gender: "",
      weight: "",
      medical: "",
      color: "",
      status: "Available",
      image: "",
      imageFile: null,
    });
  };
  // Open delete handler
  const openDeleteModal = (pet) => 
  {
  setPetToDelete(pet);
  setShowDeleteModal(true);
  };

  // Cancel delete handler
  const cancelDelete = () => 
  {
    setShowDeleteModal(false);
    setPetToDelete(null);
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="flex-grow p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <img className="w-10 h-10 rounded-full mr-3" src={OVSLogo} alt="Logo" />
            <h1 className="text-xl font-semibold text-gray-800">
              Tacurong City Veterinary Services Office
            </h1>
          </div>
          <div className="flex items-center space-x-4"></div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-md shadow mb-6">
          <nav className="flex space-x-4 p-2">
            <button
              onClick={() => navigate("/dashboard")}
              className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate("/pets")}
              className="px-4 py-2 rounded-md bg-gray-900 text-white"
            >
              Pets
            </button>
            <button
              onClick={() => navigate("/adoptions/pending")}
              className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Adoptions
            </button>
            <button
              onClick={() => navigate("/appointments")}
              className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Appointments
            </button>
            <button
              onClick={() => navigate("/messages")}
              className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Messages
            </button>
          </nav>
        </div>

        {/* Pet Table */}
        <div className="bg-white p-6 rounded-md shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Pet List</h2>
            <button
              onClick={() => openForm()}
              className="bg-[#560705] text-white px-4 py-2 rounded hover:bg-black transition"
            >
              + Add Pet
            </button>
          </div>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-sm text-gray-600">
                <th className="py-3">Image</th>
                <th className="py-3">Name</th>
                <th className="py-3">Breed</th>
                <th className="py-3">Size</th>
                <th className="py-3">Gender</th>
                <th className="py-3">Color</th>
                <th className="py-3">Weight</th>
                <th className="py-3">Medical</th>
                <th className="py-3">Status</th>
                <th className="py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pets.map((pet) => (
                <tr
                  key={pet.pet_id} // ✅ unique and stable
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="py-2">
                    <img
                      src={pet.imageUrl} // already base64 string
                      className="w-12 h-12 rounded object-cover"
                      alt={pet.name}
                    />
                  </td>
                  <td className="py-2">{pet.name}</td>
                  <td className="py-2">{pet.breed}</td>
                  <td className="py-2">{pet.size}</td>
                  <td className="py-2">{pet.gender}</td>
                  <td className="py-2">{pet.color}</td>
                  <td className="py-2">{pet.weight}</td>
                  <td className="py-2">{pet.medical}</td>
                  <td className="py-2 font-semibold">
                    {pet.status === "Approved" && (
                      <span className="text-green-600">Approved</span>
                    )}
                    {pet.status === "Pending" && (
                      <span className="text-yellow-600">Pending</span>
                    )}
                    {pet.status === "Available" && (
                      <span className="text-blue-600">Available</span>
                    )}
                  </td>
                  <td className="py-2 space-x-2">
                    <button
                      onClick={() => openForm(pet)}
                      className="text-blue-500 hover:underline"
                    >
                    <img src={Edit} alt="Edit Icon" className="h-6 w-6 relative top-1" />
                    </button>
                    <button
                    onClick={() => openDeleteModal(pet)}
                    className="hover:opacity-70"
                    aria-label={`Delete ${pet.name}`}
                    title="Delete"
                  >
                    <img src={Delete} alt="Delete Icon" className="h-7 w-7 relative top-1" />
                  </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-96">
              <h2 className="text-lg font-semibold mb-4">
                {editingPet ? "Edit Pet" : "Add Pet"}
              </h2>
              <form className="space-y-3" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Pet Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
                <input
                  type="text"
                  name="breed"
                  placeholder="Breed"
                  value={formData.breed}
                  onChange={handleChange}
                  className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
                <input
                  type="text"
                  name="size"
                  placeholder="Size"
                  value={formData.size}
                  onChange={handleChange}
                  className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <input
                  type="text"
                  name="color"
                  placeholder="Color"
                  value={formData.color}
                  onChange={handleChange}
                  className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="text"
                  name="weight"
                  placeholder="Weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="text"
                  name="medical" // ✅ matches formData.medical
                  placeholder="Medical Status"
                  value={formData.medical}
                  onChange={handleChange} // ✅ will now update the correct state property
                  className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <div>
                  <label className="block mb-1 font-medium">Upload Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {formData.image && (
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="mt-2 w-24 h-24 object-cover rounded"
                      />
                    )}
                </div>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                >
                  <option value="Available">Available</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                </select>

                <div className="flex justify-end space-x-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#560705] text-white px-4 py-2 rounded hover:bg-black"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-80">
              <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
              <p>
                Are you sure you want to delete{" "}
                <strong>{petToDelete?.name}</strong>?
              </p>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={cancelDelete}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="bg-[#703736] text-white px-4 py-2 rounded hover:bg-slate-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PetPage;
