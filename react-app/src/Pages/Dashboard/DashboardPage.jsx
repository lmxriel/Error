import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OVSLogo from "../../assets/OVSLogo.png";
import SettingsLogo from "../../assets/SettingsLogo.svg";
import ChangePasswordModal from "../../Components/Modals/ChangePassword";

const API_BASE_URL = "http://localhost:8081";

function DashboardPage() {
  const navigate = useNavigate();
  const [userCount, setUserCount] = useState(0);
  const [pendingAdoptions, setPendingAdoptions] = useState(0);
  const [scheduledAppointments, setScheduledAppointments] = useState(0);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [pets, setPets] = useState(["pets"]);
  const [adoptionRequests, setAdoptionRequests] = useState(["adoption"]);
  const [appointments, setAppointments] = useState([]);
  const [messages, setMessages] = useState([]);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  
  
  const goToChangePassword = () => {
    setShowChangePasswordModal(true);
    setShowSettingsMenu(false);
  };


  const handleChangePassword = async (currentPassword, newPassword) => {
  try {
    const loggedInAdmin = JSON.parse(localStorage.getItem("loggedInAdmin"));

    const response = await fetch(`${API_BASE_URL}/admin/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        adminId: loggedInAdmin?.id,
        currentPassword,
        newPassword,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      alert("Password changed successfully.");
      setShowChangePasswordModal(false);
    } else {
      alert(result.message || "Failed to change password.");
    }
  } catch (error) {
    console.error("Error changing password:", error);
    alert("An error occurred. Please try again.");
  }
};

  const handleSignOut = () => {
    localStorage.removeItem("loggedInAdmin");
    navigate("/admin/login");
  };

  useEffect(() => {
    const loggedInAdmin = JSON.parse(localStorage.getItem("loggedInAdmin"));
    if (!loggedInAdmin) return;

    async function fetchDashboardData() {
      try {
        const [users, adoptions, appointments] = await Promise.all([
          fetch(`${API_BASE_URL}/users/count`).then((res) => res.json()),
          fetch(`${API_BASE_URL}/adoptions/pending/count`).then((res) => res.json()),
          fetch(`${API_BASE_URL}/appointments/scheduled/count`).then((res) => res.json()),
        ]);

        setUserCount(users.count || 0);
        setPendingAdoptions(adoptions.count || 0);
        setScheduledAppointments(appointments.count || 0);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    }

    fetchDashboardData();
  }, []);

  useEffect(() => {
    async function fetchTabData() {
      try {
        if (activeTab === "pets") {
          const res = await fetch(`${API_BASE_URL}/pets`);
          const data = await res.json();
          setPets(data || []);
        } else if (activeTab === "adoptions") {
          const res = await fetch(`${API_BASE_URL}/adoptions/pending`);
          const data = await res.json();
          setAdoptionRequests(data || []);
        } else if (activeTab === "appointments") {
          const res = await fetch(`${API_BASE_URL}/appointments`);
          const data = await res.json();
          setAppointments(data || []);
        } else if (activeTab === "messages") {
          const res = await fetch(`${API_BASE_URL}/messages`);
          const data = await res.json();
          setMessages(data || []);
        }
      } catch (error) {
        console.error("Error fetching tab data:", error);
      }
    }

    fetchTabData();
  }, [activeTab]);

  return (
    <div className="min-h-screen flex">
      <div className="flex-grow p-6 bg-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <img className="w-10 h-10 rounded-full mr-3" src={OVSLogo} alt="Logo" />
            <h1 className="text-xl font-semibold text-gray-800">
              Tacurong City Veterinary Services Office
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <img
              src={SettingsLogo}
              alt="Setting"
              onClick={() => setShowSettingsMenu(!showSettingsMenu)}
              className="w-10 h-10 p-2 bg-white border border-gray-300 rounded-full"
            />

            {showSettingsMenu && (
              <div className="absolute right-0 top-12 w-48 bg-white border border-gray-200 rounded shadow-lg z-50">
                <button
                  onClick={goToChangePassword}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Change Password
                </button>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-md shadow mb-6">
          <nav className="flex space-x-4 p-2">
            {["dashboard", "pets", "adoptions", "appointments", "messages"].map((tab) => (
              <button
                key={tab}
                 onClick={() => {
                  if (tab === "pets") {
                    navigate("/pets");
                  } else {
                    setActiveTab(tab);
                  }
                }}
                className={`px-4 py-2 rounded-md focus:outline-none ${
                  activeTab === tab ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-md shadow p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">User Management</h2>
              <div className="text-3xl font-bold text-gray-800">{userCount}</div>
            </div>
            <div className="bg-white rounded-md shadow p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Adoption Requests</h2>
              <div className="text-3xl font-bold text-gray-800">{pendingAdoptions}</div>
            </div>
            <div className="bg-white rounded-md shadow p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Appointment Management</h2>
              <div className="text-3xl font-bold text-gray-800">{scheduledAppointments}</div>
            </div>
          </div>
        )}

        {showChangePasswordModal && (
        <ChangePasswordModal
          isOpen={showChangePasswordModal}
          onClose={() => setShowChangePasswordModal(false)}
          onChangePassword={handleChangePassword}
        />
      )}

      </div>
    </div>
  );
}

export default DashboardPage;