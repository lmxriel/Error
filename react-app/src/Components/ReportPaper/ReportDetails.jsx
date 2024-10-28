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

      <div className="flex h-full">
        <SideBard />
        <main className="w-4/5 p-8">
          <h1 className="text-3xl font-bold mb-8">Subject Details</h1>

          <div className="bg-white p-4 rounded-lg shadow-md mb-8">
            <table className="w-full table-auto border text-left">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-center">Subject Code</th>
                  <th className="px-4 py-2 text-center">Description</th>
                  <th className="px-4 py-2 text-center">Time In</th>
                  <th className="px-4 py-2 text-center">Time Out</th>
                  <th className="px-4 py-2 text-center">Faculty</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubjects.map((subject, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 text-center">
                      {subject.subject_code}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {subject.subject_description}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {subject.subject_timeIn}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {subject.subject_timeOut}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {subject.first_name} {subject.middle_name} {subject.last_name}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => handlePrint(subject)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                      >
                        Print
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
