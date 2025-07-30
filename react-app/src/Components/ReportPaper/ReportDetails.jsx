import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import SideBard from "../../Components/Sidebar";
import LeaveApplicationModal from "./LeaveApplicationModal"; // Assuming the modal component is in the same directory

function ReportDetails() {
  const [subjectData, setSubjectData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  // Fetch subject data from the API
  useEffect(() => {
    fetch("/subject_api")
      .then((response) => response.json())
      .then((data) => setSubjectData(data))
      .catch((error) => console.error("Error fetching subjects:", error));
  }, []);

  // Filter the subjects based on search term
  const filteredSubjects = subjectData.filter((subject) =>
    Object.values(subject).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handlePrint = (subject) => {
    setSelectedSubject(subject);
    setModalOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Subject Details</title>
      </Helmet>

      <div className="flex min-h-screen bg-gray-100">
        <SideBard />
        <main className="flex-grow p-8">
          <div className="flex flex-col space-y-6">
            {/* Header and Search Input */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <h1 className="text-3xl font-bold text-gray-800">
                Subject Details
              </h1>
              <div className="mt-4 md:mt-0">
                <input
                  type="text"
                  placeholder="Search subjects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Table Container */}
            <div className="bg-white shadow rounded-lg overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject Code
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time In
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time Out
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Faculty
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSubjects.length > 0 ? (
                    filteredSubjects.map((subject, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-700">
                          {subject.subject_code}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-700">
                          {subject.subject_description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-700">
                          {subject.subject_timeIn}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-700">
                          {subject.subject_timeOut}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-700">
                          {subject.first_name} {subject.middle_name}{" "}
                          {subject.last_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <button
                            onClick={() => handlePrint(subject)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
                          >
                            Print
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-4 text-center text-sm text-gray-500"
                      >
                        No subjects found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {isModalOpen && (
        <LeaveApplicationModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          ReportDetails={selectedSubject}
        />
      )}
    </>
  );
}

export default ReportDetails;
