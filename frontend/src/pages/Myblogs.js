import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { CheckCircleIcon, TrashIcon } from '@heroicons/react/24/solid'; // Import TrashIcon
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

function Myblogs() {
  const [myBlogs, setMyBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    content: '',
    imageUrl: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/blogs/user/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMyBlogs(response.data);
      } catch (error) {
        console.error('Error fetching my blogs:', error);
      }
    };

    if (user && user.token) {
      fetchMyBlogs();
    }
  }, [user]);

  const handleEditClick = (blog) => {
    setEditingBlog(blog._id);
    setEditForm({
      title: blog.title,
      content: blog.content,
      imageUrl: blog.imageUrl || ''
    });
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditForm(prev => ({
        ...prev,
        imageFile: file,
        imageUrl: URL.createObjectURL(file)
      }));
    }
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('title', editForm.title);
      formData.append('content', editForm.content);
      if (editForm.imageFile) {
        formData.append('image', editForm.imageFile);
      } else {
        formData.append('imageUrl', editForm.imageUrl);
      }

      const response = await axios.put(
        `http://localhost:5000/api/blogs/${editingBlog}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setMyBlogs(prev => prev.map(blog =>
        blog._id === editingBlog ? response.data : blog
      ));

      setEditingBlog(null);
      setSuccessMessage('Changes saved successfully!');
      setErrorMessage('');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error updating blog:', error);
      setErrorMessage('Failed to save changes.');
      setSuccessMessage('');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const handleCancelEdit = () => {
    setEditingBlog(null);
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleDeleteClick = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/blogs/${blogId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMyBlogs(prev => prev.filter(blog => blog._id !== blogId));
        setSuccessMessage('Blog deleted successfully!');
        setErrorMessage('');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        console.error('Error deleting blog:', error);
        setErrorMessage('Failed to delete blog.');
        setSuccessMessage('');
        setTimeout(() => setErrorMessage(''), 3000);
      }
    }
  };

  const handleWriteNowClick = () => {
    navigate('/write');
  };

  return (
    <div className="min-h-screen py-10 bg-gray-100 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">My Published Blogs</h2>
        {myBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myBlogs.map((blog) => (
              <div key={blog._id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                {editingBlog === blog._id ? (
                  <div className="p-4 flex-grow">
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">Title</label>
                      <input
                        type="text"
                        name="title"
                        value={editForm.title}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">Content</label>
                      <textarea
                        name="content"
                        value={editForm.content}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border rounded-lg h-32"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">Image</label>
                      <div className="w-32 h-32 overflow-hidden">
                        <img
                          src={editForm.imageUrl.startsWith('blob:') ?
                            editForm.imageUrl :
                            `http://localhost:5000${editForm.imageUrl}`}
                          alt="Preview"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={handleCancelEdit}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveChanges}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col flex-grow">
                    {blog.imageUrl && (
                      <div className="w-full h-32 overflow-hidden">
                        <img
                          src={`http://localhost:5000${blog.imageUrl}`}
                          alt={blog.title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    <div className="p-4 flex-grow">
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">{blog.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">
                        Published on {new Date(blog.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-gray-800 text-base mb-4 whitespace-pre-line flex-grow">
                        {blog.content}
                      </p>
                      <div className="flex justify-start space-x-2">
                        <button
                          onClick={() => handleEditClick(blog)}
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                        >
                          Edit Blog
                        </button>
                        <button
                          onClick={() => handleDeleteClick(blog._id)}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-600 mb-4">You haven't published any blogs yet.</p>
            <button
              onClick={handleWriteNowClick}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold"
            >
              Write Blog Now
            </button>
          </div>
        )}
      </div>

      {successMessage && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-green-500 text-green-700 px-6 py-4 rounded-md shadow-lg z-20">
          <div className="flex items-center justify-center space-x-2">
            <CheckCircleIcon className="h-8 w-8 text-green-500" />
            <p className="text-lg font-semibold">{successMessage}</p>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-red-500 text-red-700 px-6 py-4 rounded-md shadow-lg z-20">
          <div className="flex items-center justify-center space-x-2">
            <TrashIcon className="h-8 w-8 text-red-500" />
            <p className="text-lg font-semibold">{errorMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Myblogs;