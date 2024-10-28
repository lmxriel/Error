import React from 'react';

const AuthModalAdd = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center caret-transparent cursor-default">
      <div className="bg-[#9CA98D] rounded-lg p-6 w-96 shadow-lg caret-transparent cursor-default">
        <h2 className="text-xl font-semibold mb-4 text-center">Delete User?</h2>
        <p className="mb-4 text-center py-5">User</p>
        <div className="flex justify-center gap-10">
          <button 
            onClick={() => {
              onDelete(); 
              onClose();
            }} 
            className="w-20 p-2 justify-end text-white bg-green-700 rounded hover:bg-green-600"
          >
            Delete
          </button>
          <button onClick={onClose} className="w-20 p-2 justify-end text-white bg-green-700 rounded hover:bg-green-600">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AuthModalAdd;
