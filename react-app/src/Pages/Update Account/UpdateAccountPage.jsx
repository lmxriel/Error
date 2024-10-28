import Sidebar from "../../Components/Sidebars/AdminSidebar";
import React, { useState, useEffect } from "react";
import ModalSave from "../../Components/Modals/AuthModalSave";
import ModalDelete from "../../Components/Modals/AuthModalDelete";

function UpdateAccountPage() {
  const [selectedUser, setSelectedUser] = useState({
    user_id: "",
    username: "",
    first_name: "",
    middle_name: "",
    last_name: "",
  });

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [isSaveModalOpen, setSaveModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8081/user_accounts");
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const openSaveModal = () => setSaveModalOpen(true);
  const closeSaveModal = () => setSaveModalOpen(false);
  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);

  const handleRowClick = (user) => {
    setSelectedUser({
      user_id: user.user_id || "",
      username: user.username || "",
      first_name: user.first_name || "",
      middle_name: user.middle_name || "",
      last_name: user.last_name || "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!selectedUser?.user_id) return;
    const updatedUser = {
      username: selectedUser.username,
      first_name: selectedUser.first_name,
      middle_name: selectedUser.middle_name,
      last_name: selectedUser.last_name,
    };

    try {
      const response = await fetch(
        `http://localhost:8081/user_accounts_update/${selectedUser.user_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );
      if (response.ok) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.user_id === selectedUser.user_id ? selectedUser : user
          )
        );
        closeSaveModal();
        window.location.reload();
      } else {
        console.error("Failed to update user:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async () => {
    if (!selectedUser?.user_id) return;
    try {
      const response = await fetch(
        `http://localhost:8081/user_accounts_delete/${selectedUser.user_id}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.user_id !== selectedUser.user_id)
        );
        setSelectedUser({
          user_id: "",
          username: "",
          first_name: "",
          middle_name: "",
          last_name: "",
        });
        closeDeleteModal();
        window.location.reload();
      } else {
        console.error("Failed to delete user:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // New function to handle resetting password
  const handleResetPassword = async () => {
    if (!selectedUser?.user_id) return;
    try {
      const response = await fetch(
        `http://localhost:8081/user_accounts_reset_password/${selectedUser.user_id}`,
        {
          method: "PUT",
        }
      );
      if (response.ok) {
        alert("Password has been reset to '1234'.");
      } else {
        console.error("Failed to reset password:", response.statusText);
      }
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.middle_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-auto bg-dashboard-bg flex">
      <Sidebar />
      <div className="w-80% h-auto flex flex-col bg-dashboard-bg pl-10 pr-10">
        <div className="flex items-center gap-5 border-b-2 border-b-black pb-5">
          <h1 className="mt-5 text-2xl font-bold caret-transparent cursor-default">
            Update Accounts
          </h1>
        </div>

        <div className="relative mt-10 flex justify-end items-center caret-transparent cursor-default">
          <div className="relative max-w-md group sm:block">
            <div className="sm:w-[200px] group-hover:w-[300px] transition-all duration-500">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update search term
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
          <form className="w-40%">
            <div className="grid grid-cols gap-5 items-start">
              {[
                {
                  label: "Username",
                  value: selectedUser.username,
                  key: "username",
                },
                {
                  label: "First Name",
                  value: selectedUser.first_name,
                  key: "first_name",
                },
                {
                  label: "Middle Name",
                  value: selectedUser.middle_name,
                  key: "middle_name",
                },
                {
                  label: "Last Name",
                  value: selectedUser.last_name,
                  key: "last_name",
                },
              ].map(({ label, value, key }) => (
                <div
                  className="w-96 flex gap-3 justify-between items-center"
                  key={key}
                >
                  <h1 className="text-center text-lg font-semibold rounded caret-transparent cursor-default">
                    {label}:
                  </h1>
                  <input
                    type="text"
                    name={key}
                    value={value}
                    onChange={(e) => handleInputChange(e)}
                    className="w-52 h-10 border rounded shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 p-3"
                  />
                </div>
              ))}
            </div>
            <div className="mt-10 flex items-center justify-end caret-transparent cursor-default">
              <button
                type="button"
                onClick={openSaveModal}
                className="w-24 p-2 text-white bg-green-700 rounded hover:bg-green-600"
              >
                Save
              </button>
              {isSaveModalOpen && (
                <ModalSave
                  isOpen={isSaveModalOpen}
                  onClose={closeSaveModal}
                  onSave={handleSave}
                />
              )}
            </div>
          </form>

          <form className="w-3/5">
            <div className="mt-5 mr-5 border rounded-lg shadow overflow-hidden dark:border-neutral-400 dark:shadow-gray-900 caret-transparent cursor-default">
              <div className="max-h-56 overflow-y-auto">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead className="bg-green-400 sticky top-0">
                    <tr>
                      <th className="text-center py-2 px-4">#</th>
                      <th className="text-center py-2 px-4">username</th>
                      <th className="text-center py-2 px-4">First Name</th>
                      <th className="text-center py-2 px-4">Middle Name</th>
                      <th className="text-center py-2 px-4">Last Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user, index) => (
                      <tr
                        key={user.user_id}
                        className="border-t cursor-pointer hover:bg-green-100"
                        onClick={() => handleRowClick(user)}
                      >
                        <td className="py-2 px-4 text-center">{index + 1}</td>
                        <td className="py-2 px-4 text-center">
                          {user.username}
                        </td>
                        <td className="py-2 px-4 text-center">
                          {user.first_name}
                        </td>
                        <td className="py-2 px-4 text-center">
                          {user.middle_name}
                        </td>
                        <td className="py-2 px-4 text-center">
                          {user.last_name}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex flex-row gap-10 justify-center">
              <div className="flex justify-center py-5">
                <button
                  type="button"
                  onClick={openDeleteModal}
                  className="w-24 hover:bg-green-600 bg-green-700 text-white shadow-md font-semibold py-2 px-4 rounded caret-transparent cursor-default"
                >
                  Delete
                </button>
                {isDeleteModalOpen && (
                  <ModalDelete
                    isOpen={isDeleteModalOpen}
                    onClose={closeDeleteModal}
                    onDelete={handleDelete} // Pass handleDelete as a prop
                  />
                )}
              </div>

              {/* New Reset Password Button */}
              <div className="flex justify-center py-5">
                <button
                  type="button"
                  onClick={handleResetPassword}
                  className="w-40 hover:bg-green-600 bg-green-700 text-white shadow-md font-semibold py-2 px-4 rounded caret-transparent cursor-default"
                >
                  Reset Password
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateAccountPage;
