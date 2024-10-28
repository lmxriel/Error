import React, { useRef } from "react";

// Modal Component
function ReportDetailsModal({ isOpen, onClose, ReportDetails }) {
  const modalRef = useRef(null);

  if (!isOpen || !ReportDetails) return null;

  const {
    subject_code,
    subject_description,
    subject_timeIn,
    subject_timeOut,
    first_name,
    middle_name,
    last_name,
  } = ReportDetails;

  const handlePrint = () => {
    if (modalRef.current) {
      const printContent = modalRef.current.innerHTML;
      const printWindow = window.open("", "", "width=800,height=600");

      printWindow.document.write(`
        <html>
        <head>
          <title>Subject Details</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
            .header, .subject-details-title, table, .signature-section {
              text-align: center;
              margin-bottom: 20px;
            }
            td, th {
              padding: 10px;
              border: 1px solid #ddd;
              text-align: left;
            }
            .signature-line {
              border-top: 1px solid #000;
              width: 200px;
              margin: 10px auto;
            }
            @media print {
              button, .no-print {
                display: none !important;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Subject Details</h1>
          </div>
          ${printContent}
          <div class="signature-section">
            <div class="signature-block">
              <div class="signature-line"></div>
              <div>Faculty Signature</div>
            </div>
          </div>
        </body>
        </html>
      `);

      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div
        ref={modalRef}
        className="bg-white w-full md:w-3/4 lg:w-1/2 p-8 rounded-lg shadow-lg relative max-h-screen overflow-y-auto"
      >
        <button
          className="absolute top-2 right-2 text-gray-600"
          onClick={onClose}
        >
          ✖
        </button>
        <div className="subject-details">
          <table className="w-full table-auto border mb-8 mt-10">
            <tbody>
              <tr>
                <td className="p-2 border font-semibold">Subject Code:</td>
                <td className="p-2 border">{subject_code}</td>
              </tr>
              <tr>
                <td className="p-2 border font-semibold">Description:</td>
                <td className="p-2 border">{subject_description}</td>
              </tr>
              <tr>
                <td className="p-2 border font-semibold">Time In:</td>
                <td className="p-2 border">{subject_timeIn}</td>
              </tr>
              <tr>
                <td className="p-2 border font-semibold">Time Out:</td>
                <td className="p-2 border">{subject_timeOut}</td>
              </tr>
              <tr>
                <td className="p-2 border font-semibold">Faculty Name:</td>
                <td className="p-2 border">
                  {first_name} {middle_name} {last_name}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-8 flex justify-end">
          <button
            onClick={handlePrint}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Print
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportDetailsModal;
