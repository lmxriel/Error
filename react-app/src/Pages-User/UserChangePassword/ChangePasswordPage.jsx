import { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebars/UserSidebar";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://192.168.68.125:8081" || "http://localhost:8081";

function ChangepasswordPage() {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    user_id: "",
    password: "",
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [oldpassword, setOldpassword] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState({
    old: false,
    new: false,
    confirm: false,
  });
  const [modalOpen, setModalOpen] = useState(false);
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
          setUser({
            first_name: data.first_name,
            last_name: data.last_name,
            user_id: data.user_id,
            password: data.password,
          });
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }

      fetchUser();
    } else {
      // navigate("/");
    }
  }, [navigate]);

  const handleChangepassword = async () => {
    if (newpassword !== confirmpassword) {
      alert("New passwords do not match!");
      return;
    }

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    try {
      const response = await fetch(
        `${API_BASE_URL}/user_accounts/change_password/${loggedInUser.user_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ oldpassword, newpassword }),
        }
      );

      if (response.ok) {
        setOldpassword("");
        setNewpassword("");
        setConfirmpassword("");
        setModalOpen(true);
      } else {
        alert("Failed to change password");
      }
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  return (
    <>
      {/* Sidebar toggle button for mobile */}
      <button
        className="md:hidden p-3 bg-green-700 text-white fixed top-3 left-3 z-50 rounded-lg shadow-md transition-transform ease-in-out duration-300"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "Close" : "Menu"}
      </button>

      <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-green-600 to-green-400">
        {/* Sidebar */}
        <div
          className={`fixed inset-0 z-40 md:relative md:inset-auto transition-transform ease-in-out duration-300 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 w-3/4 md:w-1/4 lg:w-1/5 bg-green-800 flex flex-col items-center justify-start pt-10 md:pt-0 md:block shadow-lg`}
        >
          <Sidebar />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center p-5">
          <h1 className="text-3xl font-bold text-white mb-6">
            Change Password
          </h1>
          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
            {["old", "new", "confirm"].map((type, index) => (
              <div key={index} className="mb-4">
                <label className="block font-semibold text-gray-700 capitalize">
                  {type} Password:
                </label>
                <div className="relative">
                  <input
                    type={passwordVisible[type] ? "text" : "password"}
                    className="w-full border rounded p-2 focus:ring-2 focus:ring-green-500"
                    value={
                      type === "old"
                        ? oldpassword
                        : type === "new"
                        ? newpassword
                        : confirmpassword
                    }
                    onChange={(e) => {
                      if (type === "old") setOldpassword(e.target.value);
                      if (type === "new") setNewpassword(e.target.value);
                      if (type === "confirm")
                        setConfirmpassword(e.target.value);
                    }}
                  />
                  <span
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={() =>
                      setPasswordVisible((prev) => ({
                        ...prev,
                        [type]: !prev[type],
                      }))
                    }
                  >
                    {passwordVisible[type] ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            ))}
            <button
              onClick={handleChangepassword}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Change Password
            </button>
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

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-green-600 text-white p-6 rounded-lg text-center">
            <h2 className="text-xl font-bold mb-4">
              Password Changed Successfully!
            </h2>
            <button
              className="bg-white text-green-600 font-bold py-2 px-4 rounded"
              onClick={() => setModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChangepasswordPage;
