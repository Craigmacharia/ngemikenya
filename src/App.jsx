import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components (all from components folder)
import Home from "./components/Home";
import Posts from "./components/Posts";
import Post from "./components/Post";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;


