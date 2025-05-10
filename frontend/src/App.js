import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import WriteBlog from "./pages/WriteBlog";
import BlogDetails from "./pages/BlogDetails";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import CreateProfile from "./pages/profile-creation"; 
import { AuthProvider } from "./context/AuthContext";
import Myblogs from "./pages/Myblogs";



function App() {
  return (
    <div className="pt-16"> {/* This pushes the content down */}
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/write" element={<WriteBlog />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile-creation" element={<CreateProfile />} /> 
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/myblogs" element={<Myblogs />} />
          
          
        </Routes>
      </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
