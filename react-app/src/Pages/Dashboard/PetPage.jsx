import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebars/AdminSidebar";
import Logo from "../Dashboard/Logo.png";
import Setting from "../Dashboard/Setting.svg";
import Notification from "../Dashboard/Notification.svg";

const API_BASE_URL = "http://localhost:8081";

function PetPage() {
  const [pets, setPet] = useState([]);

  useEffect(() => {

    async function fetchPet() {
      try {
        const response = await fetch(`${API_BASE_URL}/pets`);
        const data = await response.json();
        setPet(data || []);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    }

    fetchPet();
  }, []);

  return (
    <div className="min-h-screen flex">
      <Sidebar />

      <div className="flex-grow p-6 bg-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <img className="w-10 h-10 rounded-full mr-3" src={Logo} alt="Logo" />
            <h1 className="text-xl font-semibold text-gray-800">
              Tacurong City Veterinary Services Office
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <img src={Setting} alt="Setting" className="w-10 h-10 p-2 bg-white border border-gray-300 rounded-full" />
            <img src={Notification} alt="Notification" className="w-10 h-10 p-2 bg-white border border-gray-300 rounded-full" />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-md shadow mb-6">
          <nav className="flex space-x-4 p-2">
            <button className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100">Dashboard</button>
            <button className="px-4 py-2 rounded-md bg-gray-900 text-white">Pets</button>
            <button className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100">Adoption Requests</button>
            <button className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100">Appointments</button>
            <button className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100">Messages</button>
          </nav>
        </div>

        {/* Pet Table */}
        <div className="bg-white p-6 rounded-md shadow">
          <h2 className="text-lg font-semibold mb-4">Pet List</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-2">Image</th>
                <th className="py-2">Name</th>
                <th className="py-2">Breed</th>
                <th className="py-2">Size</th>
                <th className="py-2">Gender</th>
                <th className="py-2">Color</th>
                <th className="py-2">Weight</th>
                <th className="py-2">Status</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pets.map((pet, index) => (
                <tr key={index} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="py-2">
                    <img src={pet.imageUrl} alt={pet.name} className="w-12 h-12 rounded object-cover" />
                  </td>
                  <td className="py-2">{pet.name}</td>
                  <td className="py-2">{pet.breed}</td>
                  <td className="py-2">{pet.size}</td>
                  <td className="py-2">{pet.gender}</td>
                  <td className="py-2">{pet.color}</td>
                  <td className="py-2">{pet.weight}</td>
                  <td className="py-2 font-semibold">
                    {pet.status === "Approved" && <span className="text-green-600">Approved</span>}
                    {pet.status === "Pending" && <span className="text-yellow-600">Pending</span>}
                    {pet.status === "Available" && <span className="text-blue-600">Available</span>}
                  </td>
                  <td className="py-2">
                    <button className="text-blue-500 hover:underline mr-2">Edit</button>
                    <button className="text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PetPage;