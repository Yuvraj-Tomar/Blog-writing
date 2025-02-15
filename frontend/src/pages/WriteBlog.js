import { useState } from "react";
import axios from "axios";

const WriteBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // For previewing the image

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Show preview
    }
  };

  const handlePublish = async () => {
    if (!title || !content) {
      alert("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("author", "John Doe"); // Hardcoded for now, replace with dynamic author
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post("http://localhost:5000/api/blogs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        alert("Your blog has been published!");
        setTitle("");
        setContent("");
        setImage(null);
        setImagePreview(null);
      } else {
        alert("Failed to publish blog");
      }
    } catch (error) {
      console.error("Error publishing blog:", error);
      alert("Error publishing blog. Check console for details.");
    }
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center text-white px-4"
      style={{
        backgroundImage: "url('/online-blog.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <div className="bg-white/85 p-6 rounded-xl shadow-2xl w-full max-w-lg text-gray-800">
        <h1 className="text-2xl font-bold text-center mb-4">Write a Blog</h1>

        <label className="block text-md font-semibold mb-1">Blog Title</label>
        <input
          type="text"
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-md"
          placeholder="Enter your blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="block text-md font-semibold mt-3 mb-1">Blog Content</label>
        <textarea
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-md"
          placeholder="Write your blog content here..."
          rows="5"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <label className="block text-md font-semibold mt-3 mb-1">Upload Image</label>
        <input type="file" className="w-full p-2" onChange={handleImageChange} />

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="mt-3 rounded-lg w-full max-h-40 object-cover"
          />
        )}

        <button
          onClick={handlePublish}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 text-md rounded-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Publish Blog
        </button>
      </div>
    </div>
  );
};

export default WriteBlog;
