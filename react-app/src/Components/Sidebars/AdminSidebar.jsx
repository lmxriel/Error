import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    setShowModal(false);
    // Perform sign-out logic here, e.g., clearing auth tokens
    localStorage.removeItem("loggedInAdmin"); // Remove only the logged-in admin data
    navigate("/", { replace: true }); // Prevent going back to previous page
  };

  return (
    <>
      <div className="w-1/5 h-screen bg-sidebar-bg">
        <div>
          <h1 className="text-center text-2xl text-white font-bold mb-5 p-5 caret-transparent cursor-default">
            Attendance Monitoring System
          </h1>
        </div>
        <div>
          <Link to="/dashboard">
            <h1 className="text-center text-white font-bold hover:bg-green-600 p-5 caret-transparent cursor-pointer">
              Home
            </h1>
          </Link>
        </div>
        <div>
          <Link to="/add-account">
            <h1 className="text-center text-white font-bold hover:bg-green-600 p-5 caret-transparent cursor-pointer">
              Add Accounts
            </h1>
          </Link>
        </div>
        <div>
          <Link to="/add-subjects">
            <h1 className="text-center text-white font-bold hover:bg-green-600 p-5 caret-transparent cursor-pointer">
              Add Subjects
            </h1>
          </Link>
        </div>
        <div>
          <Link to="/account-record">
            <h1 className="text-center text-white font-bold hover:bg-green-600 p-5 caret-transparent cursor-pointer">
              Time in/out Records
            </h1>
          </Link>
        </div>
        <div>
          <Link to="/update-account">
            <h1 className="text-center text-white font-bold hover:bg-green-600 p-5 caret-transparent cursor-pointer">
              Update Account
            </h1>
          </Link>
        </div>
        <div>
          <div onClick={() => setShowModal(true)}>
            <h1 className="text-center text-white font-bold hover:bg-green-600 p-5 caret-transparent cursor-pointer">
              Sign Out
            </h1>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black opacity-50 absolute inset-0"></div>
          <div className="bg-[#9CA98D] p-5 rounded-lg shadow-lg z-10">
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

export default Sidebar;
