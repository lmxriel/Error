import React, { useState } from "react";

const AuthModalRecord = ({ isOpen, onClose }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 caret-transparent cursor-default">
      <div className="bg-[#9CA98D] p-6 rounded-md w-[110]">
        <h2 className="text-xl font-semibold mb-4 text-center">Reports</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-center pb-5">Choose Date in Range</label>
          <div className="flex justify-evenly items-center mt-2 pb-5 gap-5">
            <div className="flex items-center justify-between mb-2 w-full">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full"
                placeholder="Start Date"
              />
            </div>
            <h1 className="text-center justify-center items-center">To</h1>
            <div className="flex items-center justify-between mb-2 w-full">
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full"
                placeholder="End Date"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-10 justify-evenly">
          <div className="flex justify-center py-5">
            <button className="w-24 hover:bg-green-600 bg-green-700 text-white shadow-md font-semibold py-2 px-4 rounded caret-transparent cursor-default">
              Generate
            </button>
          </div>
          <div className="flex justify-center py-5">
            <button onClick={onClose} className="w-24 hover:bg-green-600 bg-green-700 text-white shadow-md font-semibold py-2 px-4 rounded caret-transparent cursor-default">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModalRecord;
