import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';

const CreateProfile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fieldOfWork: '',
    aboutMe: '',
    socialLink: '',
    profileImage: null
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        if (response.data.profile) {
          setFormData({
            fieldOfWork: response.data.profile.fieldOfWork || '',
            aboutMe: response.data.profile.aboutMe || '',
            socialLink: response.data.profile.socialLink || '',
            profileImage: null
          });
          if (response.data.profile.profileImage) {
            setImagePreview(`http://localhost:5000${response.data.profile.profileImage}`);
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (user) {
      fetchProfile();
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, profileImage: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append('fieldOfWork', formData.fieldOfWork);
    formDataToSend.append('aboutMe', formData.aboutMe);
    formDataToSend.append('socialLink', formData.socialLink);
    if (formData.profileImage) {
      formDataToSend.append('image', formData.profileImage);
    }

    try {
      await axios.put('http://localhost:5000/api/users/profile', formDataToSend, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Profile updated successfully',
        confirmButtonColor: '#3085d6',
      }).then(() => {
        navigate('/profile');
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to update profile',
        confirmButtonColor: '#d33',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-700 text-white flex items-center justify-center p-4">
      <div className="bg-white text-purple-800 p-6 md:p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Edit Your Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Field of Work</label>
            <input
              type="text"
              name="fieldOfWork"
              value={formData.fieldOfWork}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              placeholder="What do you do?"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">About Me</label>
            <textarea
              name="aboutMe"
              value={formData.aboutMe}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              rows="4"
              placeholder="Tell us about yourself"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Social Media Link (Optional)</label>
            <input
              type="url"
              name="socialLink"
              value={formData.socialLink}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              placeholder="https://example.com/yourprofile"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Profile Image</label>
            {imagePreview && (
              <div className="mb-2 flex justify-center">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-24 h-24 rounded-full object-cover border-2 border-purple-500"
                />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-lg font-medium ${loading ? 'bg-gray-400' : 'bg-purple-600 hover:bg-purple-700'} text-white transition-colors`}
          >
            {loading ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProfile;