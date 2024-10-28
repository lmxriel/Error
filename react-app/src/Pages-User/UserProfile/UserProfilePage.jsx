import { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebars/UserSidebar";
import Profile from "./Profile.svg";
import { useNavigate } from "react-router-dom";

function UserProfilePage() {
  const [user, setUser] = useState({
    user_id: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    username: "",
    password: "",
  });
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar toggle state
  const navigate = useNavigate(); // Use navigate for redirecting

  useEffect(() => {
    // Get the logged-in user from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedInUser && loggedInUser.user_id) {
      // Fetch the user details from the backend based on user_id
      async function fetchUser() {
        try {
          const response = await fetch(
            `http://localhost:8081/user/info/${loggedInUser.user_id}`
          );
          const data = await response.json();
          setUser({
            user_id: data.user_id,
            first_name: data.first_name,
            middle_name: data.middle_name,
            last_name: data.last_name,
            username: data.username,
            password: data.password,
          });
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }

      fetchUser();
    } else {
      navigate("/login"); // Redirect to login if no user is found
    }
  }, [navigate]);

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
            <h1 className="text-2xl md:text-3xl font-bold text-center md:text-left">
              My Profile
            </h1>
          </div>
          <div className="flex flex-1 w-full h-auto py-10 gap-10 transition-all justify-normal duration-300 ease-in-out">
            <div className="md:ml-20 ml-10">
              <h1 className="text-[15px] md:text-[16px] font-bold">
                User ID: <span className="font-normal">{user.user_id}</span>
              </h1>
              <h1 className="text-[15px] md:text-[16px] mt-14 font-bold">
                First Name:{" "}
                <span className="font-normal">{user.first_name}</span>
              </h1>
              <h1 className="text-[15px] md:text-[16px] mt-14 font-bold">
                Last Name: <span className="font-normal">{user.last_name}</span>
              </h1>
            </div>
            <div className="md:ml-36 ml-14">
              <h1 className="text-[15px] md:text-[16px] font-bold">
                Middle Name:{" "}
                <span className="font-normal">{user.middle_name}</span>
              </h1>
              <h1 className="text-[15px] md:text-[16px] mt-14 font-bold">
                Username: <span className="font-normal">{user.username}</span>
              </h1>
              <h1 className="text-[15px] md:text-[16px] mt-14 font-bold">
                Password: <span className="font-normal">{user.password}</span>
              </h1>
            </div>
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

export default UserProfilePage;
