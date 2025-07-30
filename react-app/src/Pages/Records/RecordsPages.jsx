import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebars/AdminSidebar";
import ReportDetailsModal from "../../Components/Modals/ReportDetailsModal";

const API_BASE_URL = "http://localhost:8081";

function RecordPage() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [facultyRecords, setFacultyRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const loggedInAdmin = JSON.parse(localStorage.getItem("loggedInAdmin"));
    const userDept = loggedInAdmin?.dept_name;

    if (!userDept) {
      console.error("No department found for logged-in admin.");
      return;
    }

    let url = `${API_BASE_URL}/api/faculty`;
    if (selected !== "ALL DEPT") {
      url += `?dept_name=${encodeURIComponent(selected)}`;
    }

    setLoading(true);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setFacultyRecords(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching faculty records:", error);
        setLoading(false);
      });
  }, [selected]); // Add 'selected' as a dependency

  const fetchReportDetails = async (user_id) => {
    try {
      setModalLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/faculty/subjects/${user_id}`
      );
      if (!response.ok) throw new Error("Failed to fetch report details");
      const data = await response.json();
      setSelectedReport(data);
      setModalOpen(true);
    } catch (error) {
      console.error("Error fetching report details:", error);
      setSelectedReport([]);
      setModalOpen(false);
    } finally {
      setModalLoading(false);
    }
  };

  // Filter faculty records based on searchQuery
  const filteredRecords = facultyRecords.filter((record) =>
    `${record.first_name} ${record.middle_name} ${record.last_name}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    // The outermost div uses a gradient background that spans the entire page
    <div className="min-h-screen flex bg-gradient-to-r from-green-600 to-green-400 overflow-h">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main Content on the right */}
      <div className="flex-1 p-10">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-gray-800 pb-4 mb-6">
          <h1 className="text-3xl font-bold text-white">Time In/Out Records</h1>
          <div className="w-40 h-10 bg-green-800 flex items-center justify-center relative transform translate-x-[-10%] mx-auto rounded-lg">
            <select
              className="w-full h-full bg-green-800 text-white border-none outline-none cursor-pointer rounded-lg px-2"
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
            >
              <option value="ALL DEPT">All Department</option>
              <option value="CON">CON</option>
              <option value="CBTV">CBTV</option>
              <option value="CASED">CASED</option>
            </select>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 pl-4 pr-10 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                className="w-5 h-5 text-gray-500"
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

        {/* Table of Records */}
        {loading ? (
          <div className="text-center text-gray-700">Loading...</div>
        ) : (
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="text-xs text-white uppercase bg-gradient-to-r from-green-500 to-green-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-center">
                    User ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Full Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Username
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Department Name
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((record, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b hover:bg-green-50 cursor-pointer transition-colors"
                      onClick={() => fetchReportDetails(record.user_id)}
                    >
                      <td className="px-6 py-4 text-center">
                        {record.user_id}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {`${record.first_name} ${record.middle_name} ${record.last_name}`}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {record.username}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {record.dept_name}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No Data Available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal Overlay */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <ReportDetailsModal
              isOpen={isModalOpen}
              onClose={() => setModalOpen(false)}
              ReportDetails={modalLoading ? null : selectedReport}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default RecordPage;
