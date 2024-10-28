import React from 'react';

const AuthModalSave = ({ isOpen, onClose, onSave }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center caret-transparent cursor-default">
      <div className="bg-[#9CA98D] rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">Save Changes?</h2>
        <p className="mb-4 text-center py-5">Are you sure you want to save changes?</p>
        <div className="flex justify-center gap-10">
          <button
            onClick={() => {
              onSave();  // Trigger the onSave function
              onClose(); // Close the modal
            }}
            className="w-20 p-2 justify-end text-white bg-green-700 rounded hover:bg-green-600"
          >
            Save
          </button>
          <button onClick={onClose} className="w-20 p-2 justify-end text-white bg-green-700 rounded hover:bg-green-600">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModalSave;
