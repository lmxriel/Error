import React, { useRef, useState } from "react";

function TeacherReportDetails({ isOpen, onClose, ReportDetails }) {
  const modalRef = useRef(null);
  const [filterType, setFilterType] = useState("daily"); // Default to daily view

  if (!isOpen || !ReportDetails || ReportDetails.length === 0) return null; // Handle case for empty or undefined data

  // Function to format time to 12-hour format
  const formatTime = (time) => {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  // Function to filter data based on selected type
  const filterRecords = () => {
    const today = new Date();
    return ReportDetails.filter((record) => {
      const recordDate = new Date(record.subject_timeIn);
      if (filterType === "daily") {
        return (
          recordDate.getDate() === today.getDate() &&
          recordDate.getMonth() === today.getMonth() &&
          recordDate.getFullYear() === today.getFullYear()
        );
      } else if (filterType === "monthly") {
        return (
          recordDate.getMonth() === today.getMonth() &&
          recordDate.getFullYear() === today.getFullYear()
        );
      }
      return false;
    });
  };

  const handlePrint = () => {
    if (modalRef.current) {
      const printContent = modalRef.current.innerHTML;
      const printWindow = window.open("", "", "width=800,height=600");

      printWindow.document.write(`
        <html>
          <head>
            <title>Faculty Attendance Monitoring System</title>
            <style>
              /* 1) Force the printed page to be "Letter" size with a 20mm margin. */
              @page {
                size: Letter;
                margin: 15mm;
              }
  
              /* Remove default margins/padding */
              html, body {
                margin: 0;
                padding: 0;
                height: 100%;
              }
  
              /* 2) Slightly scale down in print view to help fit content on one page. */
              @media print {
                body {
                  zoom: 0.85;
                }
              }
  
              body {
                font-family: Arial, sans-serif;
                background: #f5f5f5;
              }
  
              /* A single container that will be treated as one page. */
              .print-page {
                position: relative;
                min-height: 100%;
                page-break-inside: avoid; /* Attempt to keep everything on one page */
                background: #fff;
                padding: 20px;
                box-sizing: border-box;
              }
  
              /* Main content area (attendance logs, etc.). */
              .content {
                text-align: center;
                margin-bottom: 80px; /* Reserve space for the signature */
              }
  
              /* Heading text styling */
              .header-title {
                font-size: 1.8rem;
                font-weight: bold;
                margin-bottom: 20px;
              }
  
              /* Table styling: smoother, modern look, now wider at 95%. */
              table {
                margin: 10px auto;
                border-collapse: collapse;
                width: 100%; /* Adjust as needed: 100% if you want maximum width */
                font-size: 1.1rem;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                border-radius: 8px;
                overflow: hidden;
              }
              th, td {
                padding: 10px;
                border: 1px solid #ddd;
              }
              thead th {
                background-color: #333;
                color: #fff;
                font-weight: bold;
                text-align: center;
                -webkit-print-color-adjust: exact;
              }
              td {
                text-align: left;
                background-color: #fff;
              }
  
              /* Faculty signature pinned to the bottom of this single page. */
              .signature-section {
                position: absolute;
                bottom: 20px;
                left: 0;
                width: 100%;
                text-align: center;
              }
              .signature-block {
                display: inline-block;
              }
              .signature-line {
                border-top: 2px solid #333;
                width: 200px;
                margin: 0 auto 5px;
              }
              .signature-text {
                font-size: 1rem;
                color: #333;
              }
  
              /* Hide "no-print" elements when printing */
              @media print {
                .no-print {
                  display: none !important;
                }
              }
            </style>
          </head>
          <body>
            <div class="print-page">
              <div class="content">
                <!-- Re-introduce the heading at the top -->
                <div class="header-title">Faculty Attendance Monitoring System</div>
                <!-- Insert the existing modal content below the heading -->
                ${printContent}
              </div>
              <div class="signature-section">
                <div class="signature-block">
                  <div class="signature-line"></div>
                  <div class="signature-text">Faculty Signature</div>
                </div>
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className="w-full max-w-4xl p-6 rounded-lg shadow-lg relative overflow-y-auto max-h-full bg-gradient-to-br from-green-700 to-green-600"
      >
        {/* Header */}
        <div className="relative mb-4">
          <h2 className="text-2xl font-bold text-white text-center">
            Attendance Logs
          </h2>
          <button
            onClick={onClose}
            className="absolute top-0 right-0 text-white hover:text-gray-300 no-print"
          >
            ✖
          </button>
        </div>

        {/* Dropdown Filter */}
        <div className="flex justify-end mb-4 no-print">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="p-2 border rounded-lg bg-gray-100"
          >
            <option value="daily">Daily Records</option>
            <option value="monthly">Monthly Records</option>
          </select>
        </div>

        {/* Table Container with Smooth, Rounded Styling */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full table-auto divide-y divide-gray-200">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="py-3 px-4">Subject Code</th>
                <th className="py-3 px-4">Faculty Name</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Time Starts</th>
                <th className="py-3 px-4">Time Ends</th>
                <th className="py-3 px-4">Start Remarks</th>
                <th className="py-3 px-4">End Remarks</th>
              </tr>
            </thead>
            <tbody>
              {filterRecords().map((report, index) => {
                const {
                  subject_code,
                  subject_description,
                  first_name,
                  middle_name,
                  last_name,
                  time_start_remarks,
                  time_end_remarks,
                } = report;

                return (
                  <tr
                    key={index}
                    className="hover:bg-green-50 transition-colors"
                  >
                    <td className="py-3 px-4 text-center">{subject_code}</td>
                    <td className="py-3 px-4">
                      {first_name} {middle_name} {last_name}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {subject_description}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {getDate(time_in)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {time_start_remarks.toLowerCase() === "absent"
                        ? "N/A"
                        : formatTime(time_in)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {time_out ? formatTime(time_out) : "N/A"}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {time_start_remarks || "N/A"}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {time_end_remarks || "N/A"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Print Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handlePrint}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 no-print"
          >
            Print
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeacherReportDetails;
