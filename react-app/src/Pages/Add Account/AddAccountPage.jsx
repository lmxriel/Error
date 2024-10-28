import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebars/AdminSidebar";
import Modal from "../../Components/Modals/AuthModalAdd"; // Assuming you will update this modal to include username and password fields

// Utility function to convert strings to Title Case
const toTitleCase = (str) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

function AddAccountPage() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Add state for search query
  const [filteredAccounts, setFilteredAccounts] = useState([]); // Add state for filtered accounts
  const [formData, setFormData] = useState({
    user_id: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    username: "", // New field for username
    password: "", // New field for password
  });

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // Fetch accounts from the backend
  useEffect(() => {
    fetch("http://localhost:8081/user_accounts")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setAccounts(data);
          setFilteredAccounts(data); // Initialize filtered accounts
        } else {
          console.error("Expected an array but received:", data);
          setAccounts([]);
        }
      })
      .catch((error) => console.error("Error fetching accounts:", error));
  }, []);

  // Handle search query and filter the accounts
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = accounts.filter(
      (account) =>
        account.first_name.toLowerCase().includes(query) ||
        account.middle_name.toLowerCase().includes(query) ||
        account.last_name.toLowerCase().includes(query)
    );
    setFilteredAccounts(filtered); // Update filtered accounts based on search query
  };

  // Update handleInputChange to format specific fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (
      name === "first_name" ||
      name === "middle_name" ||
      name === "last_name"
    ) {
      setFormData({
        ...formData,
        [name]: toTitleCase(value), // Convert these fields to title case
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleAddAccount = () => {
    openModal();
  };

  const addAccount = () => {
    fetch("http://localhost:8081/add_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("User added successfully:", data);
        // Refetch the accounts from the backend to get the latest data
        fetch("http://localhost:8081/user_accounts")
          .then((response) => response.json())
          .then((data) => {
            if (Array.isArray(data)) {
              setAccounts(data);
              setFilteredAccounts(data); // Update filtered accounts with new data
            } else {
              setAccounts([]);
            }
          })
          .catch((error) => console.error("Error fetching accounts:", error));

        // Reset the form
        setFormData({
          user_id: "",
          first_name: "",
          middle_name: "",
          last_name: "",
          username: "",
          password: "",
        });
        closeModal();
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });
  };

  return (
    <>
      <div className="w-full h-auto bg-dashboard-bg flex">
        <Sidebar />
        <div className="w-4/5 h-auto flex flex-col bg-dashboard-bg pl-10 pr-10">
          <div className="flex items-center gap-5 border-b-2 border-b-black pb-5">
            <h1 className="mt-5 text-2xl font-bold caret-transparent cursor-default">
              Add Account
            </h1>
          </div>
          <div className="relative mt-10 flex justify-end items-center caret-transparent cursor-default">
            <div className="relative max-w-md group hidden sm:block">
              <div className="sm:w-[200px] group-hover:w-[300px] transition-all duration-500">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery} // Bind search query to input
                  onChange={handleSearchChange} // Handle search query change
                  className="p-2 pl-4 pr-10 w-full border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1114.5 3.5 7.5 7.5 0 0116.65 16.65z"
                    ></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div className="w-auto h-full flex gap-10">
            <form
              className="w-2/5"
              onSubmit={(e) => {
                e.preventDefault();
                handleAddAccount();
              }}
            >
              <div className="grid grid-cols gap-5 items-start">
                <div className="w-96 flex gap-3 justify-between items-center mt-10">
                  <h1 className="text-center text-lg font-semibold rounded caret-transparent cursor-default">
                    First Name:
                  </h1>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    className="w-52 h-10 border rounded shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 p-3"
                    required
                  />
                </div>
                <div className="w-96 flex gap-3 justify-between items-center">
                  <h1 className="text-center text-lg font-semibold rounded caret-transparent cursor-default">
                    Middle Name:
                  </h1>
                  <input
                    type="text"
                    name="middle_name"
                    value={formData.middle_name}
                    onChange={handleInputChange}
                    className="w-52 h-10 border rounded shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 p-3"
                    required
                  />
                </div>
                <div className="w-96 flex gap-3 justify-between items-center">
                  <h1 className="text-center text-lg font-semibold rounded caret-transparent cursor-default">
                    Last Name:
                  </h1>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    className="w-52 h-10 border rounded shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 p-3"
                    required
                  />
                </div>
              </div>
              <div className="mt-10 flex items-center justify-end caret-transparent cursor-default">
                <button
                  type="submit"
                  className="w-32 p-2 text-white bg-green-700 rounded hover:bg-green-600"
                >
                  Add
                </button>
              </div>
            </form>

            <div className="w-3/5">
              <div className="mt-10 border rounded-lg shadow overflow-hidden dark:border-neutral-400 dark:shadow-gray-900 caret-transparent cursor-default">
                <div className="max-h-56 overflow-y-auto">
                  <table className="min-w-full bg-white border border-gray-300">
                    <thead className="bg-green-400 sticky top-0">
                      <tr>
                        <th className="text-center py-2 px-4">#</th>
                        <th className="text-center py-2 px-4">First Name</th>
                        <th className="text-center py-2 px-4">Middle Name</th>
                        <th className="text-center py-2 px-4">Last Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAccounts.map((account, index) => (
                        <tr key={account.user_id}>
                          <td className="text-center py-2 px-4 border-t">
                            {index + 1}
                          </td>
                          <td className="text-center py-2 px-4 border-t">
                            {account.first_name}
                          </td>
                          <td className="text-center py-2 px-4 border-t">
                            {account.middle_name}
                          </td>
                          <td className="text-center py-2 px-4 border-t">
                            {account.last_name}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          onAdd={addAccount}
          formData={formData}
          handleInputChange={handleInputChange} // Pass handleInputChange to handle username/password inputs
        />
      )}
    </>
  );
}

export default AddAccountPage;
