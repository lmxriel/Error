import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebars/AdminSidebar";
import ViewModal from "../../Components/Modals/ViewModal";

function AddSubjectPage() {
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [selectedFullName, setSelectedFullName] = useState("");
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [formData, setFormData] = useState({
    subject_id: "",
    subject_code: "",
    subject_description: "",
    subject_timeIn: "",
    subject_timeOut: "",
    user_id: "",
  });
  const [subjects, setSubjects] = useState([]);

  const closeViewModal = () => setViewModalOpen(false);

  useEffect(() => {
    fetch("http://localhost:8081/subject_api")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const uniqueAccounts = Array.from(
            new Map(data.map((account) => [account.user_id, account])).values()
          );

          const accountsWithNames = uniqueAccounts.map((account) => {
            const middleInitial = account.middle_name
              ? `${account.middle_name.charAt(0)}.`
              : "";
            const fullName =
              `${account.first_name} ${middleInitial} ${account.last_name}`.trim();

            // Handle cases where subject information might be null
            return {
              ...account,
              fullName,
              subject_id: account.subject_id,
              subject_code: account.subject_code || "N/A",
              subject_description: account.subject_description || "No subject",
              subject_timeIn: account.subject_timeIn || "N/A",
              subject_timeOut: account.subject_timeOut || "N/A",
            };
          });

          setAccounts(accountsWithNames);
          setFilteredAccounts(accountsWithNames);
        } else {
          console.error("Expected an array but received:", data);
          setAccounts([]);
        }
      })
      .catch((error) => console.error("Error fetching accounts:", error));
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = accounts.filter((account) =>
      account.fullName.toLowerCase().includes(query)
    );
    setFilteredAccounts(filtered);
  };

  const handleDeleteSubject = (subjectID) => {
    fetch(`http://localhost:8081/subject_delete/${subjectID}`, {
      method: "DELETE",
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          // Filter out the deleted subject from the list of subjects
          const updatedSubjects = subjects.filter(
            (subject) => subject.subject_id !== subjectID
          );
          setSubjects(updatedSubjects);

          // Ensure the user's account remains in the table, unaffected
          console.log("Subject deleted successfully:", data.message);
        } else {
          console.error(data.error || "Failed to delete subject.");
        }
      })
      .catch((error) => {
        console.error("Error deleting subject:", error);
      });
  };

  // Function to convert string to Title Case
  const toTitleCase = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "subject_code") {
      setFormData({
        ...formData,
        [name]: value.toUpperCase(), // Convert subject_code to uppercase
      });
    } else if (name === "subject_description") {
      setFormData({
        ...formData,
        [name]: toTitleCase(value), // Convert subject_description to title case
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleViewSubjects = (account) => {
    fetch(`http://localhost:8081/subject_api?user_id=${account.user_id}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const facultySubjects = data.filter(
            (item) => item.user_id === account.user_id
          );
          setSubjects(facultySubjects);
          setSelectedFullName(account.fullName);
          setSelectedAccount(account);
          setViewModalOpen(true);
        } else {
          console.error("Expected an array but received:", data);
        }
      })
      .catch((error) => console.error("Error fetching subjects:", error));
  };

  const handleRowClick = (account) => {
    setSelectedFullName(account.fullName); // Set selected full name
    setFormData({ ...formData, user_id: account.user_id }); // Set user_id in the form data
  };

  const handleAddSubject = (e) => {
    e.preventDefault();

    if (!formData.user_id) {
      console.error("No faculty selected");
      return; // Ensure a faculty is selected
    }

    fetch("http://localhost:8081/subject_add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // Sending the form data to the backend
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          // Optionally, reset the form
          setFormData({
            subject_id: "",
            subject_code: "",
            subject_description: "",
            subject_timeIn: "",
            subject_timeOut: "",
            user_id: "", // Reset user_id
          });
          console.log("Subject added successfully");
        } else {
          console.error(data.error || "Failed to add subject.");
        }
      })
      .catch((error) => {
        console.error("Error adding subject:", error);
      });
  };

  return (
    <>
      <div className="w-full h-full bg-dashboard-bg flex">
        <Sidebar />
        <div className="w-4/5 h-auto flex flex-col bg-dashboard-bg pl-10 pr-10">
          <div className="flex items-center gap-5 border-b-2 border-b-black pb-5">
            <h1 className="mt-5 text-2xl font-bold caret-transparent cursor-default">
              Add Subject
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
            <p className="text-lg font-semibold capitalize mb-3 sm:mb-0">
              Full Name: {selectedFullName || "None Selected"}
            </p>

            <div className="relative max-w-md group">
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="p-2 pl-4 pr-10 w-full border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          <div className="w-auto h-full flex flex-col md:flex-row gap-10 mt-5">
            <form className="w-full md:w-2/5" onSubmit={handleAddSubject}>
              <div className="grid grid-cols-1 gap-5 items-start">
                <div className="flex flex-col sm:flex-row gap-3 justify-between items-center mt-10">
                  <label className="text-lg font-semibold">Subject Code:</label>
                  <input
                    type="text"
                    name="subject_code"
                    value={formData.subject_code}
                    onChange={handleInputChange}
                    className="w-52 h-10 border rounded shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 p-3"
                    required
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
                  <label className="text-lg font-semibold">
                    Subject Description:
                  </label>
                  <input
                    type="text"
                    name="subject_description"
                    value={formData.subject_description}
                    onChange={handleInputChange}
                    className="w-52 h-10 border rounded shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 p-3"
                    required
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
                  <label className="text-lg font-semibold">
                    Subject Schedule:
                  </label>
                  <div className="flex ml-14 gap-2">
                    <input
                      type="time"
                      name="subject_timeIn"
                      value={formData.subject_timeIn}
                      onChange={handleInputChange}
                      className="w-24 h-10 border rounded shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 p-2 text-sm"
                      required
                      style={{
                        fontSize: "0.875rem",
                      }}
                    />
                    <span className="self-center">to</span>
                    <input
                      type="time"
                      name="subject_timeOut"
                      value={formData.subject_timeOut}
                      onChange={handleInputChange}
                      className="w-24 h-10 border rounded shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 p-2 text-sm"
                      required
                      style={{
                        fontSize: "0.875rem",
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center ml-36 mt-5">
                <button
                  type="submit"
                  className="py-2 px-5 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Add Subject
                </button>
              </div>
            </form>

            <div className="w-full md:w-3/5">
              <div className="mt-10 border rounded-lg shadow overflow-hidden dark:border-neutral-400 dark:shadow-gray-900">
                <div className="max-h-56 overflow-y-auto">
                  <table className="min-w-full bg-white border border-gray-300">
                    <thead className="bg-green-400 sticky top-0">
                      <tr>
                        <th className="text-center py-2 px-4 border border-gray-300">
                          #
                        </th>
                        <th className="text-center py-2 px-4 border border-gray-300">
                          Name
                        </th>
                        <th className="text-center py-2 px-4 border border-gray-300">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAccounts.map((account, index) => (
                        <tr
                          key={account.user_id}
                          className="hover:bg-gray-200 cursor-pointer"
                          onClick={() => handleRowClick(account)}
                        >
                          <td className="text-center py-2 px-4 border border-gray-300">
                            {index + 1}
                          </td>
                          <td className="text-center py-2 px-4 border border-gray-300">
                            {account.fullName}
                          </td>
                          <td className="text-center py-2 px-4 border border-gray-300">
                            <button
                              className="p-2 text-white bg-blue-700 rounded hover:bg-blue-600"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewSubjects(account);
                              }}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                      {filteredAccounts.length === 0 && (
                        <tr>
                          <td
                            colSpan="3"
                            className="text-center py-4 text-gray-500"
                          >
                            No accounts found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* ViewModal */}
          {isViewModalOpen && (
            <ViewModal
              isOpen={isViewModalOpen}
              closeModal={closeViewModal}
              fullName={selectedFullName}
              subjects={subjects}
              deleteSubject={handleDeleteSubject}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default AddSubjectPage;
