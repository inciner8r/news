import React from "react";
import { auth } from "../../firebase";
import "../../components/Auth/authStyles.css";

const Logout = () => {
  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("Logout successful");
      localStorage.removeItem("token");
      window.location.reload();
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
