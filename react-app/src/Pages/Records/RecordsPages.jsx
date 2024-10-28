import Sidebar from "../../Components/Sidebars/AdminSidebar";
import React, { useState } from "react";
import ReportDetailsModal from "../../Components/Modals/ReportDetailsModal"; // Use the new ReportDetailsModal

function RecordPage() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null); // Store selected report details

  const openModal = (report) => {
    setSelectedReport(report); // Set the selected report details to display in the modal
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  // Example report data (you can replace this with actual data from the backend)
  const reportData = {
    subject_code: "CS101",
    subject_description: "Introduction to Computer Science",
    subject_timeIn: "08:00 AM",
    subject_timeOut: "10:00 AM",
    first_name: "John",
    middle_name: "D.",
    last_name: "Doe",
  };

  return (
    <>
      <div className="w-full h-auto bg-dashboard-bg flex">
        <Sidebar />
        <div className="w-80% h-auto flex flex-col bg-dashboard-bg pl-10 pr-10">
          <div className="flex items-center gap-5 border-b-2 border-b-black pb-5">
            <h1 className="mt-5 text-2xl font-bold caret-transparent cursor-default">
              Time In/Out Records
            </h1>
          </div>
          <div className="relative mt-10 mb-5 flex justify-end items-center caret-transparent cursor-default">
            <div className="relative max-w-md group hidden sm:block">
              <div className="sm:w-[200px] group-hover:w-[300px] transition-all duration-500">
                <input
                  type="text"
                  placeholder="Search"
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
          <div className="w-100% h-full flex justify-center">
            <form className="w-full h-auto">
              <div className="border rounded-lg shadow overflow-hidden dark:border-neutral-400 dark:shadow-gray-900 flex justify-center caret-transparent cursor-default">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead className="bg-green-400 ">
                    <tr className="divide-x dark:divide-neutral-600">
                      <th className="text-center py-2 px-4">#</th>
                      <th className="text-center py-2 px-4">Name</th>
                      <th className="text-center py-2 px-4">Date</th>
                      <th className="text-center py-2 px-4">Time in</th>
                      <th className="text-center py-2 px-4">Time out</th>
                      <th className="text-center py-2 px-4">Work Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      className="hover:bg-green-300 divide-x dark:divide-neutral-600"
                      onClick={() => openModal(reportData)} // Pass data when row is clicked
                    >
                      <td className="text-center py-2 px-4 border-t-2 border-gray-500">
                        1
                      </td>
                      <td className="text-center py-2 px-4 border-t-2 border-gray-500">
                        Mariella Vallarta, C
                      </td>
                      <td className="text-center py-2 px-4 border-t-2 border-gray-500">
                        2024-08-31
                      </td>
                      <td className="text-center py-2 px-4 border-t-2 border-gray-500">
                        10:30 AM
                      </td>
                      <td className="text-center py-2 px-4 border-t-2 border-gray-500">
                        12:30 PM
                      </td>
                      <td className="text-center py-2 px-4 border-t-2 border-gray-500">
                        2:00
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-10 flex items-center justify-center caret-transparent cursor-default">
                <button
                  type="button"
                  onClick={() => openModal(reportData)} // Trigger modal on button click
                  className="w-32 p-2 text-white bg-green-700 rounded hover:bg-green-600"
                >
                  View Records
                </button>
                {/* Use ReportDetailsModal instead of ModalRecord */}
                {isModalOpen && (
                  <ReportDetailsModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    ReportDetails={selectedReport} // Pass selected report data
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default RecordPage;
