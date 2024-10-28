import React, { useRef } from "react";

const ModalRecord = ({ isOpen, onClose }) => {
  const printRef = useRef();

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    // Set the content for printing and open the print dialog
    document.body.innerHTML = printContents;
    window.print();

    // Restore original content after printing
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-1/2" ref={printRef}>
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-3 no-print">
          <h2 className="text-xl font-semibold">Record Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            Close
          </button>
        </div>

        {/* Modal Body */}
        <div className="mt-4">
          <p className="mb-2">
            <strong>Name:</strong> Mariella Vallarta, C
          </p>
          <p className="mb-2">
            <strong>Date:</strong> 2024-08-31
          </p>
          <p className="mb-2">
            <strong>Time In:</strong> 10:30 AM
          </p>
          <p className="mb-2">
            <strong>Time Out:</strong> 12:30 PM
          </p>
          <p className="mb-2">
            <strong>Work Duration:</strong> 2 hours
          </p>
        </div>

        {/* Print Button */}
        <div className="mt-4 flex justify-end no-print">
          <button
            onClick={handlePrint}
            className="mr-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Print
          </button>
        </div>
      </div>

      {/* Print-specific styles */}
      <style jsx>{`
        @media print {
          .no-print {
            display: none;
          }

          /* Optionally, you can also adjust the page margins, font size, etc. for print */
          body {
            margin: 20px;
          }

          .bg-white {
            border: none;
            box-shadow: none;
          }

          p {
            font-size: 14px;
          }

          h2 {
            font-size: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default ModalRecord;
