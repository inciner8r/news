// src/components/Auth/Login.js
import React, { useState } from "react";
import { auth, googleProvider } from "../../firebase";
import "../../components/Auth/authStyles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const creds = await auth.signInWithEmailAndPassword(email, password);
      const token = creds.user.getIdToken();
      console.log("Login successful");
      localStorage.setItem("token", token);
      window.location.reload();
    } catch (error) {
      setError(error.message);
      console.error("Login error:", error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const creds = await auth.signInWithPopup(googleProvider);
      const token = creds.user.getIdToken();
      console.log("Google login successful");
      localStorage.setItem("token", token);
      window.location.reload();
    } catch (error) {
      setError(error.message);
      console.error("Google login error:", error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>

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
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleGoogleLogin}>Login with Google</button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Login;
