import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { FaHeart, FaShareAlt } from "react-icons/fa";

const LandingPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [likes, setLikes] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const blogsLoadedRef = useRef(false);

  // Fetch blogs
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/blogs")
      .then((response) => {
        setBlogs(response.data);
        const storedLikes = JSON.parse(localStorage.getItem("blogLikes")) || {};
        setLikes(storedLikes);
        blogsLoadedRef.current = true; // Mark blogs as loaded
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setIsLoading(false);
      });
  }, []);

  // Scroll to the target blog when URL hash changes
  useEffect(() => {
    if (!blogsLoadedRef.current || isLoading) return;

    const scrollToBlog = () => {
      const hash = location.hash.replace("#", "");
      if (!hash) return;

      const targetBlog = document.getElementById(hash);
      if (targetBlog) {
        // Calculate scroll position (center of the screen)
        const offset = 100; // Adjust if you have a fixed header
        const targetPosition = targetBlog.offsetTop - offset;
        const windowHeight = window.innerHeight;
        const scrollTo = targetPosition - windowHeight / 2 + targetBlog.offsetHeight / 2;

        // Smooth scroll
        window.scrollTo({
          top: scrollTo,
          behavior: "smooth",
        });

        // Highlight the blog temporarily
        targetBlog.classList.add("ring-4", "ring-yellow-400", "transition-all", "duration-500");
        setTimeout(() => {
          targetBlog.classList.remove("ring-4", "ring-yellow-400");
        }, 2000);
      }
    };

    // Small delay to ensure DOM is fully ready
    const timer = setTimeout(scrollToBlog, 100);
    return () => clearTimeout(timer);
  }, [location.hash, isLoading]);

  const handleLike = (blogId) => {
    setLikes((prevLikes) => {
      const newLikes = {
        ...prevLikes,
        [blogId]: (prevLikes[blogId] || 0) + 1,
      };
      localStorage.setItem("blogLikes", JSON.stringify(newLikes));
      return newLikes;
    });
  };

  const handleShare = (blog) => {
    if (navigator.share) {
      navigator
        .share({
          title: blog.title,
          text: `Check out this blog: ${blog.title}`,
          url: `${window.location.origin}/landing#${blog._id}`,
        })
        .catch((error) => console.log("Error sharing:", error));
    } else {
      alert("Sharing not supported in this browser.");
    }
  };

  return (
    <div className="relative w-full min-h-screen">
      <video autoPlay loop muted className="fixed top-0 left-0 w-full h-full object-cover -z-10">
        <source src="/vedio4.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="relative z-10 w-full pt-8 pb-16">
        <h1 className="text-4xl font-extrabold text-center text-white mb-8 animate-fadeIn">
          Published Blogs
        </h1>

        {isLoading ? (
          <p className="text-center text-white">Loading blogs...</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-11/12 mx-auto">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                id={blog._id}
                className="p-6 shadow-lg rounded-2xl text-gray-900 bg-gray-100 hover:-translate-y-2 transition-transform duration-300 hover:shadow-2xl border border-gray-300"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={`http://localhost:5000${blog.imageUrl}`}
                      alt="Blog"
                      className="w-10 h-10 rounded-full border-2 border-gray-500"
                    />
                    <h3 className="text-lg font-semibold text-gray-700">{blog.author}</h3>
                  </div>
                  <div className="flex space-x-3 items-center">
                    <button 
                      className="flex items-center space-x-1" 
                      onClick={() => handleLike(blog._id)}
                    >
                      <FaHeart
                        className={`cursor-pointer text-xl ${
                          likes[blog._id] ? "text-red-500" : "text-gray-500"
                        }`}
                      />
                      <span className="text-gray-700 text-sm">{likes[blog._id] || 0}</span>
                    </button>
                    <button onClick={() => handleShare(blog)}>
                      <FaShareAlt className="cursor-pointer text-xl text-gray-500" />
                    </button>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-purple-700 mb-3">{blog.title}</h2>
                <p className="text-gray-700 leading-relaxed">{blog.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;