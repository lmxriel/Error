import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Sidebars/AdminSidebar";
import Profile from "../Dashboard/Profile.svg";

function DashboardPage() {
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Get the logged-in user from localStorage
    const loggedInAdmin = JSON.parse(localStorage.getItem("loggedInAdmin"));

    // If no user is logged in, redirect to login page
    if (!loggedInAdmin) {
      navigate("/"); // Redirect to login page if no user is found in local storage
      return; // Stop further execution if the user is not logged in
    }

    // If user is logged in, check their role
    if (loggedInAdmin && loggedInAdmin.user_id) {
      // Fetch the user's role from the backend based on user_id
      async function fetchUserRole() {
        try {
          const response = await fetch(
            `http://localhost:8081/admin_login/${loggedInAdmin.user_id}`
          );
          const data = await response.json();

          if (data.role) {
            // Check if the user is an admin
            if (data.role !== "admin") {
              navigate("/"); // Redirect non-admin users to the homepage
            }
          } else {
            console.error("No role found for the user.");
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }

      fetchUserRole();
    }
  }, [navigate]);

  return (
    <div className="w-full h-auto bg-dashboard-bg flex">
      <Sidebar />
      <div className="w-[80%] h-auto bg-dashboard-bg pl-10 pr-10">
        <div className="flex items-center gap-5 border-b-2 border-b-black pb-5">
          <img
            className="ms-10 size-32 caret-transparent"
            src={Profile}
            alt="Profile"
          />
          <h1 className="text-2xl font-bold caret-transparent cursor-default">
            Admin
          </h1>
        </div>
        <div className="bg-dashboard-bg w-full h-auto mt-5">
          <h1 className="text-xl caret-transparent text-center cursor-default">
            Empowering attendance, simplifying tracking. Our Fingerprint
            Attendance Monitoring System enhances accuracy and efficiency,
            ensuring seamless and reliable attendance management.
          </h1>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
