import React, { useState } from "react";
import { motion } from "framer-motion";

const SignUp = () => {
  // State for user input
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Signup successful!"); 
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
      <video autoPlay loop muted className="fixed top-0 left-0 w-full h-full object-cover">
        <source src="/vedio.mp4" type="video/mp4" />
      </video>

      <div className="fixed inset-0 bg-black/30"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative bg-white/50 backdrop-blur-md p-8 rounded-lg shadow-lg max-w-md w-full text-gray-900"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div whileFocus={{ scale: 1.05 }}>
            <label className="block mb-1 text-sm text-gray-800">Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={user.fullName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white/70 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </motion.div>

          <motion.div whileFocus={{ scale: 1.05 }}>
            <label className="block mb-1 text-sm text-gray-800">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={user.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white/70 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </motion.div>

          <motion.div whileFocus={{ scale: 1.05 }}>
            <label className="block mb-1 text-sm text-gray-800">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={user.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white/70 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-lg font-semibold transition"
          >
            Sign Up
          </motion.button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUp;
