import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔥 Function to generate user initials
  const getInitials = (name) => {
    if (!name) return "U"; // Default to "U" if no name
    const words = name.trim().split(" ");
    if (words.length === 1) return words[0][0].toUpperCase();
    return words[0][0].toUpperCase() + words[1][0].toUpperCase();
  };

  return (
    <nav className="bg-purple-800 text-white py-3 px-6 shadow-lg fixed w-full top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center animate-pulse">
            <span className="text-purple-800 text-lg font-bold">B</span>
          </div>
          <h1 className="text-xl font-semibold tracking-wide">BlogNest 🏡📝</h1>
        </div>

        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/write" className="hover:text-gray-300">Write Blog</Link>
          <Link to="/landing" className="hover:text-gray-300">Landing Page</Link>
          {user && <Link to="/profile" className="hover:text-gray-300">Profile</Link>}
          <Link to="/contact" className="hover:text-gray-300">Contact</Link>
        </div>

        <div className="flex items-center space-x-4 relative">
          {!user ? (
            <>
              <Link to="/signup" className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full">Sign Up</Link>
              <Link to="/login" className="bg-white text-purple-800 px-4 py-2 rounded-full">Login</Link>
            </>
          ) : (
            <>
              {/* 🔥 User initials button (Dropdown Toggle) */}
              <div className="relative" ref={dropdownRef}>
                <div
                  className="w-10 h-10 bg-green-500 text-white flex items-center justify-center rounded-full text-lg font-bold shadow-md cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {getInitials(user.fullName)}
                </div>

                {/* 🔥 Dropdown Menu (Moved Further Right) */}
                {dropdownOpen && (
                  <div 
                    className="absolute right-[-35px] mt-3 w-48 bg-white rounded-lg shadow-xl border border-purple-200 z-50"
                  >
                    <Link 
                      to="/MyBlogs" 
                      className="block px-4 py-3 text-gray-800 hover:bg-purple-100 hover:text-purple-800 transition"
                    >
                      📝 My Blogs
                    </Link>
                    <button 
                      onClick={() => navigate("/profile")} 
                      className="block w-full text-left px-4 py-3 text-gray-800 hover:bg-purple-100 hover:text-purple-800 transition"
                    >
                      👤 My Profile
                    </button>
                    <button 
                      onClick={() => navigate("/profile-creation")} 
                      className="block w-full text-left px-4 py-3 text-gray-800 hover:bg-purple-100 hover:text-purple-800 transition"
                    >
                      ✏️ Edit Profile
                    </button>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-100 transition"
                    >
                      🚪 Logout
                    </button>
                    
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
