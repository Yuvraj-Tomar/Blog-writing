import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGlobe } from 'react-icons/fa';

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch profile data',
        });
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleEditProfile = () => {
    navigate('/profile-creation');
  };

  // Function to detect social media platform
  const getSocialIcon = (url) => {
    if (!url) return null;
    
    url = url.toLowerCase();
    if (url.includes('facebook')) return <FaFacebook className="text-blue-600 text-2xl" />;
    if (url.includes('twitter')) return <FaTwitter className="text-blue-400 text-2xl" />;
    if (url.includes('instagram')) return <FaInstagram className="text-pink-600 text-2xl" />;
    if (url.includes('linkedin')) return <FaLinkedin className="text-blue-700 text-2xl" />;
    return <FaGlobe className="text-gray-600 text-2xl" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  // Construct full image URL
  const profileImageUrl = profile?.profile?.profileImage 
    ? `http://localhost:5000${profile.profile.profileImage}`
    : '/avatar.avif';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-700 text-white flex items-center justify-center p-4">
      <div className="bg-white text-purple-800 p-6 md:p-10 rounded-lg shadow-lg w-full max-w-2xl">
        {/* Profile Header - Image on left, details on right */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          {/* Image on left */}
          <div className="w-32 h-32 bg-gray-300 rounded-full overflow-hidden flex-shrink-0">
            <img
              src={profileImageUrl}
              alt="Profile"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = '/avatar.avif';
              }}
            />
          </div>

          {/* Details on right */}
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">{user.fullName}</h1>
            {profile?.profile?.fieldOfWork && (
              <p className="text-lg text-gray-600 mb-4">{profile.profile.fieldOfWork}</p>
            )}
            
            {profile?.profile?.socialLink && (
              <div className="flex items-center justify-center md:justify-start space-x-4 mt-3">
                <span className="text-sm text-gray-600">Connect:</span>
                <a 
                  href={profile.profile.socialLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform"
                  title={profile.profile.socialLink}
                >
                  {getSocialIcon(profile.profile.socialLink)}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* About Me Section */}
        {profile?.profile?.aboutMe && (
          <div className="mt-6 border-t pt-6">
            <h2 className="text-xl font-semibold mb-2">About Me</h2>
            <p className="text-gray-700 whitespace-pre-line">{profile.profile.aboutMe}</p>
          </div>
        )}

        {/* Edit Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleEditProfile}
            className="px-6 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;