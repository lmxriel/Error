import { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebars/UserSidebar";
import Profile from "./Profile.svg";

function UserDashboardPage() {
  const [user, setUser] = useState({ first_name: "", last_name: "" });
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar toggle state

  useEffect(() => {
    // Get the logged-in user from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedInUser && loggedInUser.user_id) {
      // Fetch the user details from the backend based on user_id
      async function fetchUser() {
        try {
          const response = await fetch(
            `http://localhost:8081/user/${loggedInUser.user_id}`
          );
          const data = await response.json();
          setUser({ first_name: data.first_name, last_name: data.last_name });
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }

      fetchUser();
    }
  }, []);

  return (
    <>
      {/* Sidebar toggle button for mobile */}
      <button
        className="md:hidden p-2 bg-green-600 text-white fixed top-2 left-2 z-50 transition-transform ease-in-out duration-300 rounded"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "Close" : "Menu"}
      </button>

      <div className="flex flex-col md:flex-row w-full h-screen bg-dashboard-bg">
        {/* Sidebar */}
        <div
          className={`fixed inset-0 z-40 md:relative md:inset-auto transition-transform ease-in-out duration-300 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 w-3/4 md:w-1/4 lg:w-1/5 bg-sidebar-bg flex flex-col items-center justify-start pt-10 md:pt-0 md:block`}
        >
          <Sidebar />
        </div>

        {/* Content */}
        <div className="flex-1 w-full h-auto p-5 transition-all duration-300 ease-in-out">
          <div className="flex flex-col items-center md:flex-row gap-5 border-b-2 border-b-black pb-5">
            <img
              className="w-24 h-24 md:w-32 md:h-32 rounded-full"
              src={Profile}
              alt="Profile"
            />
            <p className="text-2xl md:text-3xl capitalize font-bold text-center md:text-left">
              Welcome!&nbsp;{user.first_name} {user.last_name}
            </p>
          </div>
          <div className="bg-dashboard-bg w-full h-auto mt-5">
            <h1 className="text-xl caret-transparent text-center cursor-default">
              Empowering attendance, simplifying tracking our Fingerprint
              Attendance Monitoring System enhances accuracy and efficiency,
              ensuring seamless and reliable attendance management.
            </h1>
          </div>
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </>
  );
}

export default UserDashboardPage;
