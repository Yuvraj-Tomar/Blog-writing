import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-700 text-white flex items-center justify-center">
      <div className="bg-white text-purple-800 p-10 rounded-lg shadow-lg w-full max-w-4xl transform transition duration-500 hover:scale-105">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          {/* Profile Image */}
          <div className="w-32 h-32 md:w-48 md:h-48 bg-gray-300 rounded-full overflow-hidden mb-6 md:mb-0">
            <img
              src="/avatar.avif" // Correct path from the public folder
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Profile Details */}
          <div className="md:ml-10 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-bold mb-2">Yuvraj Singh Tomar</h1>
            <p className="text-lg md:text-2xl mb-4">Full Stack Developer</p>
            <p className="text-sm md:text-base mb-4">
              Passionate developer with experience in building web applications
              using React, Node.js, and other modern technologies.
            </p>

            {/* Social Media Links */}
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="https://facebook.com" className="text-2xl transform transition duration-300 hover:scale-125">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" className="text-2xl transform transition duration-300 hover:scale-125">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" className="text-2xl transform transition duration-300 hover:scale-125">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* About Me Section */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">About Me</h2>
          <p className="text-sm md:text-base leading-relaxed">
            I have over 5 years of experience in software development, focusing
            on creating scalable and efficient web applications. My expertise
            includes working with JavaScript frameworks, RESTful APIs, and
            database management. I am committed to continuous learning and
            staying updated with the latest industry trends.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
