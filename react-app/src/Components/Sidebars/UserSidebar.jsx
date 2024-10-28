import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function UserSidebar() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    setShowModal(false);
    // Perform sign-out logic here, e.g., clearing auth tokens
    navigate("/user/login", { replace: true }); // Prevent going back to previous page
  };

  return (
    <>
      {/* Sidebar */}
      <div className="bg-sidebar-bg h-screen w-full fixed top-0 left-0 flex flex-col justify-between">
        <div className="flex flex-col items-center justify-center flex-1 space-y-5">
          <div className="text-center text-2xl text-white font-bold p-5 caret-transparent cursor-default">
            Attendance Monitoring System
          </div>

          <div className="w-full">
            <Link to="/user/dashboard">
              <h1 className="text-center text-white font-bold hover:bg-green-600 p-5 caret-transparent cursor-pointer">
                Home
              </h1>
            </Link>
          </div>

          <div className="w-full">
            <Link to="/user/profile">
              <h1 className="text-center text-white font-bold hover:bg-green-600 p-5 caret-transparent cursor-pointer">
                My Profile
              </h1>
            </Link>
          </div>

          <div className="w-full">
            <Link to="/user/report">
              <h1 className="text-center text-white font-bold hover:bg-green-600 p-5 caret-transparent cursor-pointer">
                My Report
              </h1>
            </Link>
          </div>

          <div className="w-full">
            <Link to="/user/change-password">
              <h1 className="text-center text-white font-bold hover:bg-green-600 p-5 caret-transparent cursor-pointer">
                Change password
              </h1>
            </Link>
          </div>

          <div className="w-full">
            <div onClick={() => setShowModal(true)}>
              <h1 className="text-center text-white font-bold hover:bg-green-600 p-5 caret-transparent cursor-pointer">
                Sign Out
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black opacity-50 absolute inset-0"></div>
          <div className="bg-[#9CA98D] p-5 rounded-lg shadow-lg z-10 max-w-md mx-auto text-center">
            <h2 className="text-xl font-bold pb-10 px-5">
              Are you sure you want to sign out?
            </h2>
            <div className="flex justify-center gap-5 pb-5">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserSidebar;
