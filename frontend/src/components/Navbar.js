import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-purple-800 text-white py-3 px-6 shadow-lg fixed w-full top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo with animation */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center animate-pulse">
            <span className="text-purple-800 text-lg font-bold">B</span>
          </div>
          <h1 className="text-xl font-semibold tracking-wide">Blog Website</h1>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-300 transition duration-300">Home</Link>
          <Link to="/write" className="hover:text-gray-300 transition duration-300">Write Blog</Link>
          <Link to="/profile" className="hover:text-gray-300 transition duration-300">Profile</Link>
          <Link to="/contact" className="hover:text-gray-300 transition duration-300">Contact</Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          <Link to="/signup" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full shadow-md transition duration-300">
            Sign Up
          </Link>
          <Link to="/login" className="bg-white text-purple-800 px-4 py-2 rounded-full border border-purple-800 hover:bg-purple-700 hover:text-white transition duration-300">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
