import { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebars/UserSidebar";
import Profile from "./Profile.svg";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://192.168.68.125:8081" || "http://localhost:8081";

function UserProfilePage() {
  const [user, setUser] = useState({
    user_id: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    username: "",
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedInUser && loggedInUser.user_id) {
      async function fetchUser() {
        try {
          const response = await fetch(
            `${API_BASE_URL}/user/info/${loggedInUser.user_id}`
          );
          const data = await response.json();
          setUser({ ...data });
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
      fetchUser();
    } else {
      // navigate("/");
    }
  }, [navigate]);

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        className="md:hidden p-3 bg-green-700 text-white fixed top-3 left-3 z-50 rounded-lg shadow-md transition-transform ease-in-out duration-300"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "Close" : "Menu"}
      </button>

      <div className="flex flex-col md:flex-row w-full min-h-screen bg-gradient-to-br from-green-600 to-green-400">
        {/* Sidebar */}
        <div
          className={`fixed inset-0 z-40 md:relative md:inset-auto transition-transform ease-in-out duration-300 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 w-3/4 md:w-1/4 lg:w-1/5 bg-green-800 flex flex-col items-center justify-start pt-10 md:pt-0 md:block shadow-lg`}
        >
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 w-full p-6 pt-20 flex flex-col items-center">
          <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-3xl">
            <div className="flex flex-col items-center">
              <img
                className="w-24 h-24 md:w-32 md:h-32 rounded-full shadow-lg border-4 border-green-500"
                src={Profile}
                alt="Profile"
              />
              <h1 className="text-3xl font-bold mt-4 text-gray-800 text-center">
                My Profile
              </h1>
            </div>

            {/* User Details Grid */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                ["User ID", user.user_id],
                ["Username", user.username],
                ["First Name", user.first_name],
                ["Middle Name", user.middle_name || "N/A"],
                ["Last Name", user.last_name],
              ].map(([label, value], index) => (
                <div
                  key={index}
                  className="flex flex-col items-center md:items-start"
                >
                  <p className="text-gray-600 text-lg font-semibold">{label}</p>
                  <p className="text-gray-900 text-xl">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for Sidebar on Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </>
  );
}

export default UserProfilePage;
