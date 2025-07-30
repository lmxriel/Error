import { useState, useEffect, useRef } from "react";
import Sidebar from "../../Components/Sidebars/UserSidebar";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://192.168.68.125:8081" || "http://localhost:8081";

function UserReportPages() {
  const [user, setUser] = useState({ first_name: "", last_name: "" });
  const [attendance, setAttendance] = useState([]);
  const [filter, setFilter] = useState("daily");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const tableRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser && loggedInUser.user_id) {
      fetchUser(loggedInUser.user_id);
      fetchAttendance(loggedInUser.user_id, filter);
    } else {
      // navigate("/");
    }
  }, [filter, navigate]);

  async function fetchUser(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/user/${userId}`);
      const data = await response.json();
      setUser({ first_name: data.first_name, last_name: data.last_name });
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }

  async function fetchAttendance(userId, filterType) {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/teacher/attendance/${userId}?filter=${filterType}`
      );
      const data = await response.json();
      setAttendance(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching attendance records:", error);
      setAttendance([]);
    }
    setLoading(false);
  }
  // Function to format time to 12-hour format
  const formatTime = (time) => {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const handlePrint = () => {
    if (attendance.length === 0) return;

    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(`
      <html>
        <head>
          <title>Attendance Report</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; background: none; margin: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid black; padding: 8px; text-align: center; }
            th { background-color: #f2f2f2; }
            @media print {
              body { visibility: visible; }
            }
          </style>
        </head>
        <body>
          <h2>Attendance Report</h2>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Time In</th>
                <th>Time Out</th>
                <th>Start Remarks</th>
                <th>End Remarks</th>
              </tr>
            </thead>
            <tbody>
              ${attendance
                .map(
                  (record, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${record.subject_code} - ${
                    record.subject_description
                  }</td>
                  <td>${new Date(record.time_in).toLocaleDateString()}</td>
                  <td>${new Date(record.time_in).toLocaleTimeString()}</td>
                  <td>${
                    record.time_out
                      ? new Date(record.time_out).toLocaleTimeString()
                      : "-"
                  }</td>
                  <td>${record.time_start_remarks}</td>
                  <td>${record.time_end_remarks}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
          <script>
            window.focus();
            window.print();
            window.close();
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <>
      <button
        className="md:hidden p-2 bg-green-600 text-white fixed top-2 left-2 z-50 rounded"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "Close" : "Menu"}
      </button>

      <div className="flex flex-col md:flex-row w-full h-screen bg-gradient-to-r from-green-400 to-green-600">
        <div
          className={`fixed inset-0 z-40 md:relative transition-transform duration-300 transform
                      ${
                        sidebarOpen ? "translate-x-0" : "-translate-x-full"
                      } md:translate-x-0 
                      w-3/4 md:w-1/4 lg:w-1/5 bg-green-800 flex flex-col items-center`}
        >
          <Sidebar />
        </div>

        <div className="flex-1 w-full h-auto px-5 pt-16 md:pt-5">
          <div className="flex flex-col items-center md:flex-row gap-5 border-b-2 border-b-black pb-5">
            <p className="text-2xl md:text-3xl capitalize font-bold text-center md:text-left text-white">
              Welcome! {user.first_name} {user.last_name}
            </p>
          </div>

          <div className="w-full h-auto mt-5">
            <h1 className="text-xl caret-transparent text-center cursor-default text-white">
              Empowering attendance, simplifying tracking. Our Fingerprint
              Attendance Monitoring System enhances accuracy and efficiency.
            </h1>
          </div>

          <div className="flex justify-center gap-4 mt-5">
            <button
              className={`px-4 py-2 rounded ${
                filter === "daily" ? "bg-blue-600 text-white" : "bg-gray-300"
              }`}
              onClick={() => setFilter("daily")}
            >
              Daily
            </button>
            <button
              className={`px-4 py-2 rounded ${
                filter === "monthly" ? "bg-blue-600 text-white" : "bg-gray-300"
              }`}
              onClick={() => setFilter("monthly")}
            >
              Monthly
            </button>
          </div>

          <div className="mt-10 rounded-lg bg-white p-2 shadow-lg">
            <div className="max-h-[40vh] overflow-x-auto overflow-y-auto">
              <table className="min-w-full bg-white" ref={tableRef}>
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b text-center">#</th>
                    <th className="py-2 px-4 border-b text-center">Subject</th>
                    <th className="py-2 px-4 border-b text-center">Date</th>
                    <th className="py-3 px-4 border-b text-center">
                      Time Starts
                    </th>
                    <th className="py-3 px-4 border-b text-center">
                      Time Ends
                    </th>
                    <th className="py-3 px-4 border-b text-center">
                      Start Remarks
                    </th>
                    <th className="py-3 px-4 border-b text-center">
                      End Remarks
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="py-2 px-4 border-b text-center"
                      >
                        Loading...
                      </td>
                    </tr>
                  ) : attendance.length > 0 ? (
                    attendance.map((record, index) => (
                      <tr key={index}>
                        <td className="py-2 px-4 border-b text-center">
                          {index + 1}
                        </td>
                        <td className="py-2 px-4 border-b text-center">
                          {record.subject_code} - {record.subject_description}
                        </td>
                        <td className="py-2 px-4 border-b text-center">
                          {new Date(record.time_in).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {record.time_start_remarks.toLowerCase() === "absent"
                            ? "N/A"
                            : formatTime(record.time_in)}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {record.time_out
                            ? formatTime(record.time_out)
                            : "N/A"}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {record.time_start_remarks || "N/A"}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {record.time_end_remarks || "N/A"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="py-2 px-4 border-b text-center"
                      >
                        No attendance records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-center mt-5">
            <button
              className={`px-6 py-2 rounded shadow-md ${
                attendance.length === 0 || window.innerWidth < 768
                  ? "bg-gray-400 cursor-not-allowed md:block hidden"
                  : "bg-blue-600 text-white hover:bg-blue-700 md:block hidden"
              }`}
              onClick={handlePrint}
              disabled={attendance.length === 0 || window.innerWidth < 768}
            >
              Print
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserReportPages;
