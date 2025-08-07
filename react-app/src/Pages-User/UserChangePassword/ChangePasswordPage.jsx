import { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebars/UserSidebar";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons for the eye

function ChangepasswordPage() {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    user_id: "",
    password: "", // Include password in the state
  });
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar toggle state
  const [oldpassword, setOldpassword] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("  ");
  const [passwordVisible, setPasswordVisible] = useState({
    old: false,
    new: false,
    confirm: false,
  }); // Visibility states for each password field
  const [modalOpen, setModalOpen] = useState(false); // Modal state for success message
  const [passwordsMatchNotice, setPasswordsMatchNotice] = useState(false); // Notice state for same old/new password

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedInUser && loggedInUser.user_id) {
      async function fetchUser() {
        try {
          const response = await fetch(
            `http://localhost:8081/user/info/${loggedInUser.user_id}`
          );
          const data = await response.json();
          // Update the state with user_id, password, and other details
          setUser({
            first_name: data.first_name,
            last_name: data.last_name,
            user_id: data.user_id,
            password: data.password, // Assuming API returns password
          });
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }

      fetchUser();
    }
  }, []);

  const handleChangepassword = async () => {
    // Check if new password matches confirm password
    if (newpassword !== confirmpassword) {
      alert("New passwords do not match!");
      return;
    }

    // Check if old password is the same as new password
    if (oldpassword === newpassword) {
      setPasswordsMatchNotice(true);
      return;
    } else {
      setPasswordsMatchNotice(false);
    }

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    try {
      const response = await fetch(
        `http://localhost:8081/user_acconts/change_password/${loggedInUser.user_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            oldpassword,
            newpassword,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Clear the password fields on success
        setOldpassword("");
        setNewpassword("");
        setConfirmpassword("");
        // Open the modal on success
        setModalOpen(true);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  const togglePasswordVisibility = (field) => {
    setPasswordVisible((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  return (
    <>
      {/* Sidebar toggle button for mobile */}
      <button
        className="md:hidden p-2 bg-green-600 text-white fixed top-2 left-2 z-50 transition-transform ease-in-out duration-300 rounded"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "Close" : "Menu"}
      </button>

      <div className="flex flex-col md:flex-row w-full h-full bg-dashboard-bg">
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
          <div className="flex flex-col items-center md:flex-row px-5 gap-5 border-b-2 border-b-black pb-5">
            <h1
              className="text-2xl md:text-3xl font-bold text-center md:text-left"
              style={{ userSelect: "none" }} // Disable text selection
            >
              Change password
            </h1>
          </div>
          <div className="flex flex-1 w-full h-auto py-10 gap-10 transition-all justify-normal duration-300 ease-in-out">
            <div className="md:ml-12 ml-20 ">
              {/* Added wrapper div with background and shadow */}
              <div className="p-8 bg-green-400 shadow-lg rounded-lg">
                <h1
                  className="text-xl md:text-[20px] font-bold text-center"
                  style={{ userSelect: "none" }} // Disable text selection
                >
                  Old password :
                </h1>
                <div className="relative">
                  <input
                    type={passwordVisible.old ? "text" : "password"}
                    className="w-56 h-10 border rounded shadow-md focus:outline-none ms-[-5px] mt-5 focus:ring-2 focus:ring-green-500 p-3"
                    value={oldpassword}
                    onChange={(e) => setOldpassword(e.target.value)}
                    required
                    style={{ userSelect: "none" }} // Disable text selection
                  />
                  <span
                    className="absolute right-2 top-10 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => togglePasswordVisibility("old")}
                  >
                    {passwordVisible.old ? (
                      <FaEyeSlash className="text-gray-500" />
                    ) : (
                      <FaEye className="text-gray-500" />
                    )}
                  </span>
                </div>

                <h1
                  className="text-xl md:text-[20px] mt-8 font-bold text-center"
                  style={{ userSelect: "none" }} // Disable text selection
                >
                  New password :
                </h1>
                <div className="relative">
                  <input
                    type={passwordVisible.new ? "text" : "password"}
                    className="w-56 h-10 border rounded shadow-md focus:outline-none ms-[-5px] mt-5 focus:ring-2 focus:ring-green-500 p-3"
                    value={newpassword}
                    onChange={(e) => setNewpassword(e.target.value)}
                    required
                    style={{ userSelect: "none" }} // Disable text selection
                  />
                  <span
                    className="absolute right-2 top-10 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => togglePasswordVisibility("new")}
                  >
                    {passwordVisible.new ? (
                      <FaEyeSlash className="text-gray-500" />
                    ) : (
                      <FaEye className="text-gray-500" />
                    )}
                  </span>

                  {/* Notice message */}
                  {oldpassword === newpassword && newpassword !== "" && (
                    <p className="absolute left-0 top-full text-red-600 text-xs text-center">
                      New password cannot be the same as the old password.
                    </p>
                  )}
                </div>

                <h1
                  className="text-xl md:text-[20px] mt-8 font-bold text-center"
                  style={{ userSelect: "none" }} // Disable text selection
                >
                  Confirm password :
                </h1>
                <div className="relative">
                  <input
                    type={passwordVisible.confirm ? "text" : "password"}
                    className="w-56 h-10 border rounded shadow-md focus:outline-none ms-[-5px] mt-5 focus:ring-2 focus:ring-green-500 p-3"
                    value={confirmpassword}
                    onChange={(e) => setConfirmpassword(e.target.value)}
                    required
                    style={{ userSelect: "none" }} // Disable text selection
                  />
                  <span
                    className="absolute right-2 top-10 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => togglePasswordVisibility("confirm")}
                  >
                    {passwordVisible.confirm ? (
                      <FaEyeSlash className="text-gray-500" />
                    ) : (
                      <FaEye className="text-gray-500" />
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-start">
            <button
              onClick={handleChangepassword}
              className="md:ml-105px ml-36 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              style={{ userSelect: "none" }}
            >
              Change password
            </button>
          </div>
        </div>
      </div>

      {/* Modal for success message */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-green-600 p-6 rounded-lg shadow-lg text-center">
            <h2
              className="text-xl font-bold mb-4 text-white"
              style={{ userSelect: "none" }} // Disable text selection
            >
              Password Changed Successfully!
            </h2>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

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

export default ChangepasswordPage;
