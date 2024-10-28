import React from "react";

const ViewModal = ({
  isOpen,
  closeModal,
  fullName,
  subjects,
  deleteSubject,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-25"
        onClick={closeModal}
      ></div>

      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div className="max-w-screen-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
          <h3 className="text-lg font-medium leading-6 text-center text-gray-900">
            Subjects for {fullName}
          </h3>

          <div className="mt-2">
            <table className="min-w-auto bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-center">
                    Subject Code
                  </th>
                  <th className="py-2 px-4 border-b text-center">
                    Description
                  </th>
                  <th className="py-2 px-4 border-b text-center">Schedule</th>
                  <th className="py-2 px-4 border-b text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject) => (
                  <tr key={subject.subject_id}>
                    <td className="py-2 px-4 border-b text-center">
                      {subject.subject_code}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {subject.subject_description}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {subject.subject_timeIn} - {subject.subject_timeOut}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        onClick={() => deleteSubject(subject.subject_id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
