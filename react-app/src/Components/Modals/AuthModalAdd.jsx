import React from "react";

function AuthModalAdd({ isOpen, onClose, onAdd, formData, handleInputChange }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-[#9CA98D] p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Add Account Details
        </h2>

        <form className="flex flex-col items-center">
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                username:
              </label>
              <input
                type="text"
                name="username"
                placeholder="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full p-2 border rounded shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
                autocomplete="username" // Add this line
              />
            </div>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="w-full p-2 border rounded shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              value={formData.password}
              onChange={handleInputChange}
              autocomplete="new-password" // Add this line
            />
          </div>
        </form>

        <div className="flex justify-center gap-10 mt-6">
          <button
            className="text-white bg-green-700 px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="text-white bg-green-700 px-4 py-2 rounded"
            onClick={onAdd}
          >
            Add Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthModalAdd;
