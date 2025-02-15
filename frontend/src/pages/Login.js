import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios"; // Import axios for API requests
import { useNavigate } from "react-router-dom"; // For navigation after login

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      // If login is successful, store token & navigate
      localStorage.setItem("token", response.data.token);
      alert("Login Successful!");
      navigate("/Home"); // Redirect to dashboard or homepage
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="fixed top-0 left-0 w-full h-full object-cover"
      >
        <source src="/vedio2.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="fixed inset-0 bg-black/40"></div>

      {/* Glassmorphic Login Form */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative bg-white/10 backdrop-blur-lg p-8 rounded-lg shadow-xl max-w-md w-full text-white border border-white/20"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <motion.div whileFocus={{ scale: 1.05 }}>
            <label className="block mb-1 text-sm">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </motion.div>

          <motion.div whileFocus={{ scale: 1.05 }}>
            <label className="block mb-1 text-sm">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </motion.div>

          <div className="text-right">
            <a href="#" className="text-blue-300 hover:underline text-sm">
              Forgot Password?
            </a>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md font-semibold transition"
          >
            Login
          </motion.button>
        </form>

        <p className="text-center text-sm mt-5">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-300 hover:underline">
            Sign Up
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
