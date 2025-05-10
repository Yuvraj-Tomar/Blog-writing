import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      const { token, fullName, email: userEmail, isAdmin } = response.data;
      login({ token, fullName, email: userEmail, isAdmin });

      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: 'You have successfully logged in.',
        confirmButtonColor: '#3085d6',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(isAdmin ? "/admin/dashboard" : "/home");
        }
      });
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.response?.data?.message || 'Invalid email or password.',
        confirmButtonColor: '#d33',
      });
    }
  };

  const handleAdminClick = () => {
    Swal.fire({
      icon: 'warning',
      title: 'Restricted Page!',
      html: `
        <div style="color: #c0392b; font-size: 16px; line-height: 1.6;">
          <strong>This is the Restricted Page.</strong><br/>
          It is blocked by <strong>Technogiq IT Solution</strong>.<br/>
          <strong>Only admin can login it.</strong>
        </div>
      `,
      confirmButtonColor: '#d33',
      background: '#ffe6e6',
    });
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg">Login</button>
        </form>

        {/* Admin login alert link */}
        <div className="mt-6 text-center">
          <button
            onClick={handleAdminClick}
            className="text-red-600 hover:text-red-800 font-semibold underline"
          >
            Admin Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
