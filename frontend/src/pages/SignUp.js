import React, { useState } from "react";
import { motion } from "framer-motion";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SignUp = () => {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

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
        Swal.fire({
          icon: 'success',
          title: 'Signup Successful!',
          text: 'Your account has been created successfully.',
          confirmButtonColor: '#3085d6',
          // Add the then() block to handle the button click
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/login'); // Redirect to the login page
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Signup Failed',
          text: data.message || 'Something went wrong during signup.',
          confirmButtonColor: '#d33',
        });
      }
    } catch (error) {
      console.error("Signup Error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Signup Failed',
        text: 'There was a network error. Please try again later.',
        confirmButtonColor: '#d33',
      });
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-7 rounded-lg shadow-lg max-w-md w-full mt-0"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div whileFocus={{ scale: 1.02 }}>
            <label className="block mb-1 text-sm text-gray-800">Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={user.fullName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </motion.div>
          <motion.div whileFocus={{ scale: 1.02 }}>
            <label className="block mb-1 text-sm text-gray-800">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={user.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </motion.div>
          <motion.div whileFocus={{ scale: 1.02 }}>
            <label className="block mb-1 text-sm text-gray-800">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={user.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
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