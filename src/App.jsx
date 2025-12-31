import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components (all from components folder)
import Home from "./components/Home";
import Posts from "./components/Posts";
import Post from "./components/Post";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import About from "./components/About";
import PrivacyPolicy from "./components/PrivacyPolicy";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />

        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/post/:slug" element={<Post />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/about" element={<About />} /> {/* ✅ Fixed: removed space */}
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;


