import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import WriteBlog from "./pages/WriteBlog";
import BlogDetails from "./pages/BlogDetails";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

function App() {
  return (
    <div className="pt-16"> {/* This pushes the content down */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/write" element={<WriteBlog />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}


export default App;
