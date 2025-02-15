import React from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-700 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl flex flex-col md:flex-row items-center"
      >
        {/* Contact Form Section */}
        <div className="w-full md:w-2/3 p-4">
          <h1 className="text-2xl font-bold text-purple-800 text-center mb-4">
            Get in Touch
          </h1>

          <form className="space-y-4">
            <motion.div whileFocus={{ scale: 1.05 }}>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </motion.div>

            <motion.div whileFocus={{ scale: 1.05 }}>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </motion.div>

            <motion.div whileFocus={{ scale: 1.05 }}>
              <textarea
                placeholder="Your Message"
                rows="3"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              ></textarea>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-full bg-purple-700 text-white py-2 rounded-lg shadow-lg font-semibold transition"
            >
              Send Message
            </motion.button>
          </form>
        </div>

        {/* Contact Details Section */}
        <div className="w-full md:w-1/3 p-4 flex flex-col items-center md:items-start">
          <h2 className="text-xl font-semibold text-purple-800 mb-4">
            Contact Information
          </h2>

          <div className="space-y-3 text-gray-700">
            <div className="flex items-center space-x-3">
              <FaPhone className="text-purple-700" />
              <span>+91 9755124554</span>
            </div>
            <div className="flex items-center space-x-3">
              <FaEnvelope className="text-purple-700" />
              <span>manusinghtomar@gmail.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <FaMapMarkerAlt className="text-purple-700" />
              <span>Gwalior, Madhya Pradesh, India</span>
            </div>
          </div>

          {/* Social Icons */}
          <div className="mt-6 flex space-x-4 text-purple-700">
            <motion.a whileHover={{ scale: 1.2 }} href="https://facebook.com" className="text-2xl">
              <FaFacebook />
            </motion.a>
            <motion.a whileHover={{ scale: 1.2 }} href="https://twitter.com" className="text-2xl">
              <FaTwitter />
            </motion.a>
            <motion.a whileHover={{ scale: 1.2 }} href="https://instagram.com" className="text-2xl">
              <FaInstagram />
            </motion.a>
            <motion.a whileHover={{ scale: 1.2 }} href="https://linkedin.com" className="text-2xl">
              <FaLinkedin />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
