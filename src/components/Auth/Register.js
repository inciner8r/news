// src/components/Auth/Register.js
import React, { useState } from "react";
import { auth } from "../../firebase";
import "../../components/Auth/authStyles.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      console.log("Registration successful");
      alert("Registration successful");
      setEmail("");
      setPassword("");
    } catch (error) {
      setError(error.message);
      console.error("Registration error:", error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Register;
