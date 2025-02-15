import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaFacebook, FaTwitter, FaInstagram, FaLaugh } from "react-icons/fa";

const Home = () => {
  const [showVideo, setShowVideo] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [latestBlog, setLatestBlog] = useState(null); // State for the latest blog

  // Fetch all blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/blogs");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  // Fetch the latest blog
  useEffect(() => {
    const fetchLatestBlog = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/blogs/latest");
        setLatestBlog(response.data);
      } catch (error) {
        console.error("Error fetching latest blog:", error);
      }
    };
    fetchLatestBlog();
  }, [blogs]);

  // Scroll effect for video
  useEffect(() => {
    const handleScroll = () => {
      const featuredSection = document.getElementById("featured-section");
      if (featuredSection) {
        const rect = featuredSection.getBoundingClientRect();
        setShowVideo(rect.top > 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-purple-700 to-blue-500 min-h-screen text-white">
      {/* Video Section */}
      <div
        className={`fixed top-0 left-0 w-full h-screen transition-opacity duration-700 ${
          showVideo ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <video className="w-full h-full object-cover" autoPlay loop muted>
          <source src="/vedio3.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight animate-fadeIn">
          Express Your Thoughts Through <span className="text-yellow-300">Blogging</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl opacity-80 animate-fadeInSlow">
          Share your stories, experiences, and knowledge with the world.
        </p>
        <div className="mt-6 flex justify-center gap-4 animate-bounce">
          <Link
            to="/write"
            className="bg-yellow-400 text-purple-800 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition duration-300"
          >
            Start Writing
          </Link>
          <Link
            to="/signup"
            className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-800 transition duration-300"
          >
            Join Now
          </Link>
        </div>
      </div>

      {/* Featured Blogs Section */}
<section id="featured-section" className="relative bg-gradient-to-r from-purple-800 to-blue-600 text-white py-16 px-4 md:px-10">
  <h2 className="text-3xl font-bold text-center mb-8">Featured Blogs</h2>
  <div className="grid md:grid-cols-3 gap-8">
    {blogs.length > 0 ? (
      blogs.map((blog) => (
        <div
          key={blog._id}
          className="bg-purple-900 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
        >
          {/* Image and Title Section */}
          <div className="flex items-center gap-4">
            {/* Blog Image (Larger Size) */}
            {blog.imageUrl && (
              <img
                src={`http://localhost:5000${blog.imageUrl}`}
                alt="Blog"
                className="rounded-full w-20 h-20 object-cover"
              />
            )}
            {/* Blog Title & Author Name (Aligned Middle-Right) */}
            <div className="flex flex-col justify-center">
              <h3 className="text-white font-semibold text-lg">{blog.title}</h3>
              <p className="text-yellow-300 text-md font-bold">By {blog.author}</p>
            </div>
          </div>

          {/* Content (Below Image, Title & Author) */}
          <p className="opacity-80 mt-4">{blog.content.substring(0, 100)}...</p>
        </div>
      ))
    ) : (
      <p className="text-center w-full">No blogs available.</p>
    )}
  </div>
</section>


{/* Latest Blogs Section */}
<section className="py-16 px-4 md:px-10 bg-purple-900 text-white relative">
  <h2 className="text-3xl font-bold text-center mb-8">Latest Blogs</h2>
  <p className="text-lg text-center mb-6">So here are the blogs that are published on this website</p>
  <div className="flex items-center justify-between">
    <button className="text-white text-4xl px-4 hover:text-yellow-400 transition duration-300">
      &#8592;
    </button>
    {latestBlog ? (
      <div className="bg-white text-purple-800 p-10 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 w-96 relative">
        {/* Blog Image - Bigger Circular Thumbnail */}
        {latestBlog.imageUrl && (
          <div className="flex items-center">
            <img
              src={`http://localhost:5000${latestBlog.imageUrl}`}
              alt="Latest Blog"
              className="w-20 h-20 object-cover rounded-full border-2 border-white"
            />
            {/* Author Name - Middle-Right of Image */}
            <p className="text-yellow-600 font-semibold text-lg ml-4">By {latestBlog.author}</p>
          </div>
        )}
        {/* Title */}
        <h3 className="text-2xl font-semibold text-center mt-6">{latestBlog.title}</h3>
        {/* Content */}
        <p className="opacity-80 mt-2 text-center">{latestBlog.content.substring(0, 100)}...</p>
      </div>
    ) : (
      <p className="text-center w-full">No latest blog available.</p>
    )}
    <button className="text-white text-4xl px-4 hover:text-yellow-400 transition duration-300">
      &#8594;
    </button>
  </div> 
</section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-10 px-4 md:px-10 flex justify-between items-center">
        <div className="text-left">
          <h3 className="text-2xl font-semibold mb-4">Contact Us</h3>
          <p>Email: manusinghtomar2001@gmail.com</p>
          <p>Phone: +91 9755124554</p>
          <p>Address: 123 Blog Street, Gwalior, Madhya Pradesh, India</p>
        </div>
        <div className="flex flex-col items-end">
          <FaLaugh className="text-yellow-400 text-6xl" />
          <p className="text-3xl font-bold">Stay happy and keep blogging!</p>
          <div className="mt-4 flex gap-4 text-3xl">
            <a
              href="https://www.facebook.com/login"
              className="hover:text-yellow-400 transition duration-300"
            >
              <FaFacebook />
            </a>
            <a
              href="https://x.com/i/flow/login"
              className="hover:text-yellow-400 transition duration-300"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.instagram.com/accounts/login"
              className="hover:text-yellow-400 transition duration-300"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;