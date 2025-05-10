import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; 

const WriteBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handlePublish = async () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Please Login / Signup",
        text: "You need to be logged in to publish a blog.",
        confirmButtonColor: "#4a4e69",
      });
      return;
    }

    if (!title || !content || !author) {
      Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please fill in all fields before publishing.",
        confirmButtonColor: "#4a4e69",
      });
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("author", author);
    if (image) {
      formData.append("image", image);
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/blogs",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Blog Published!",
          text: "Your blog has been successfully published.",
          confirmButtonColor: "#4a4e69",
        });

        setTitle("");
        setContent("");
        setAuthor("");
        setImage(null);
        setImagePreview(null);
        navigate("/myblogs");
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to Publish",
          text: "Something went wrong while publishing the blog.",
          confirmButtonColor: "#4a4e69",
        });
      }
    } catch (error) {
      console.error("Error publishing blog:", error);
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Check the console for more details.",
        confirmButtonColor: "#4a4e69",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* Fixed Background */}
      <div className="fixed top-0 left-0 w-full h-full bg-cover bg-center z-[-1]"></div>
      <div
        className="overlay-after"
        style={{
          backgroundImage: "url('/W1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="container mx-auto py-10 flex justify-center items-start">
          <div
            className="bg-[#dcd6f7] p-8 rounded-xl shadow-2xl w-full max-w-xl text-gray-800 mt-10"
            style={{ backgroundColor: "rgba(220, 214, 247, 0.95)" }}
          >
            <h1 className="text-2xl font-bold text-center mb-4 text-[#4a4e69]">
              Write a Blog
            </h1>

            <label className="block text-md font-semibold mb-1 text-[#22223b]">
              Blog Title
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8c98] text-md"
              placeholder="Enter your blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label className="block text-md font-semibold mt-3 mb-1 text-[#22223b]">
              Blog Content
            </label>
            <textarea
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8c98] text-md"
              placeholder="Write your blog content here..."
              rows="7"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>

            <label className="block text-md font-semibold mt-3 mb-1 text-[#22223b]">
              Author Name
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8c98] text-md"
              placeholder="Enter author's name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />

            <label className="block text-md font-semibold mt-3 mb-1 text-[#22223b]">
              Upload Image
            </label>
            <input
              type="file"
              className="w-full p-2"
              onChange={handleImageChange}
            />

            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-3 rounded-lg w-full max-h-40 object-cover"
              />
            )}

            <button
              onClick={handlePublish}
              className="mt-4 w-full bg-[#4a4e69] hover:bg-[#22223b] text-white font-bold py-2 text-md rounded-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#22223b]"
            >
              Publish Blog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteBlog;
