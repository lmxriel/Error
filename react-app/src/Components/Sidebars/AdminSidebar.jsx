import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    setShowModal(false);
    // Perform sign-out logic here, e.g., clearing auth tokens
    localStorage.removeItem("loggedInAdmin"); // Remove only the logged-in admin data
    navigate("/admin", { replace: true }); // Prevent going back to previous page
  };


}

export default Sidebar;
