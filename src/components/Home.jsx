import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import matter from "gray-matter";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Refs for GSAP animations
  const headerRef = useRef(null);
  const slideshowRef = useRef(null);
  const aboutRef = useRef(null);
  const categoriesRef = useRef(null);
  const featuredRef = useRef(null);
  const postsRef = useRef(null);
  const newsletterRef = useRef(null);

  // Professional slideshow images with Kenyan tech theme
  const slideshowImages = [
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80"
  ];

  const slideshowTitles = [
    "Tech Innovation in East Africa",
    "Digital Transformation Journey",
    "Startup Ecosystem Growth",
    "Future of African Technology"
  ];

  useEffect(() => {
    const importPosts = import.meta.glob("../../posts/*.md", { as: "raw" });
    const postList = [];

    const loadPosts = async () => {
      try {
        for (const path in importPosts) {
          const file = await importPosts[path]();
          const { data } = matter(file);

          postList.push({
            ...data,
            slug: path.split("/").pop().replace(".md", ""),
          });
        }

        // Sort newest first
        const sorted = postList.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setPosts(sorted);
      } catch (err) {
        console.error("Error loading posts:", err);
        setError("Failed to load posts.");
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  // GSAP Animations on component mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current, 
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      // Staggered badge animations
      gsap.fromTo(".header-badge", 
        { scale: 0, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.6, 
          stagger: 0.2,
          ease: "back.out(1.7)",
          delay: 0.5
        }
      );

      // About section animation
      gsap.fromTo(aboutRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Categories animation
      gsap.fromTo(".category-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: categoriesRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Featured post animation
      gsap.fromTo(featuredRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: featuredRef.current,
            start: "top 75%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Posts grid animation
      gsap.fromTo(".post-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: postsRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Newsletter animation
      gsap.fromTo(newsletterRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: newsletterRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

    });

    return () => ctx.revert(); // Cleanup
  }, []);

  // Enhanced slideshow animation with GSAP
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Slideshow image animation
      gsap.fromTo(".slideshow-image",
        { scale: 1.1 },
        {
          scale: 1,
          duration: 6,
          ease: "power2.inOut"
        }
      );

      // Slideshow content animation
      gsap.fromTo(".slideshow-content",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3,
          ease: "power3.out"
        }
      );

    }, slideshowRef);

    return () => ctx.revert();
  }, [currentSlide]);

  // Auto-advance slideshow with GSAP transition
  useEffect(() => {
    const timer = setInterval(() => {
      // Animate out current slide
      gsap.to(".slideshow-track", {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
          // Animate in next slide
          gsap.fromTo(".slideshow-track", 
            { opacity: 0 },
            { opacity: 1, duration: 0.8, ease: "power2.out" }
          );
        }
      });
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    gsap.to(".slideshow-track", {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
        gsap.fromTo(".slideshow-track", 
          { opacity: 0 },
          { opacity: 1, duration: 0.5, ease: "power2.out" }
        );
      }
    });
  };

  const prevSlide = () => {
    gsap.to(".slideshow-track", {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        setCurrentSlide((prev) => (prev - 1 + slideshowImages.length) % slideshowImages.length);
        gsap.fromTo(".slideshow-track", 
          { opacity: 0 },
          { opacity: 1, duration: 0.5, ease: "power2.out" }
        );
      }
    });
  };

  // Hover animations for interactive elements
  useEffect(() => {
    const setupHoverAnimations = () => {
      // Category card hover effects
      document.querySelectorAll(".category-card").forEach(card => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -10,
            duration: 0.3,
            ease: "power2.out"
          });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

      // Post card hover effects
      document.querySelectorAll(".post-card").forEach(card => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -8,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
          });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });
    };

    // Set up hover animations after posts are loaded
    if (!loading) {
      setTimeout(setupHoverAnimations, 100);
    }
  }, [loading]);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light-brown">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-primary">Brewing fresh content...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light-brown">
        <div className="text-center text-primary">
          <i className="bi bi-exclamation-triangle-fill display-4 mb-3"></i>
          <h4>{error}</h4>
          <button 
            className="btn btn-primary mt-3"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className="bg-light-brown min-vh-100" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
      {/* Header Section with GSAP ref */}
      <div className="professional-header-bg py-5" ref={headerRef}>
        <div className="container">
          <div className="text-center text-white">
            <h1 className="fw-bold mb-3 display-4">
              <i className="bi bi-cup-hot-fill me-3"></i>
              NgemiKenya
            </h1>
            <p className="lead opacity-90 mb-4">
              Honest perspectives, tech talk & real-world reflections
            </p>
            <div className="mt-4">
              <span className="badge bg-primary-light rounded-pill px-3 py-2 me-2 mb-2 header-badge">
                <i className="bi bi-code-slash me-1"></i>Tech
              </span>
              <span className="badge bg-primary-light rounded-pill px-3 py-2 me-2 mb-2 header-badge">
                <i className="bi bi-pencil me-1"></i>Thoughts
              </span>
              <span className="badge bg-primary-light rounded-pill px-3 py-2 mb-2 header-badge">
                <i className="bi bi-globe me-1"></i>Kenya
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Slideshow Section with GSAP ref */}
      <div className="container-fluid px-0 mb-5" ref={slideshowRef}>
        <div className="row g-0">
          <div className="col-12">
            <div className="slideshow-container position-relative">
              <div className="slideshow-track">
                <img 
                  src={slideshowImages[currentSlide]} 
                  alt={`Slide ${currentSlide + 1}`}
                  className="w-100 slideshow-image"
                />
                <div className="slideshow-overlay">
                  <div className="container">
                    <div className="row justify-content-center text-center">
                      <div className="col-lg-8 slideshow-content">
                        <h2 className="text-white fw-bold mb-3 display-5">
                          {slideshowTitles[currentSlide]}
                        </h2>
                        <p className="text-white lead mb-4">
                          Dive into insights, experiences, and perspectives from the heart of Kenya's tech scene
                        </p>
                        <div className="mt-4">
                          <Link to="/posts" className="btn btn-primary btn-lg rounded-pill me-3 px-4">
                            <i className="bi bi-journal-text me-2"></i>
                            Explore Posts
                          </Link>
                          <Link to="/about" className="btn btn-outline-light btn-lg rounded-pill px-4">
                            <i className="bi bi-person me-2"></i>
                            About
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Slideshow Navigation Buttons */}
              <button className="slideshow-btn slideshow-btn-prev" onClick={prevSlide}>
                <i className="bi bi-chevron-left"></i>
              </button>
              <button className="slideshow-btn slideshow-btn-next" onClick={nextSlide}>
                <i className="bi bi-chevron-right"></i>
              </button>
              
              {/* Enhanced Slideshow Indicators */}
              <div className="slideshow-indicators">
                {slideshowImages.map((_, index) => (
                  <button
                    key={index}
                    className={`indicator ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => {
                      gsap.to(".slideshow-track", {
                        opacity: 0,
                        duration: 0.3,
                        onComplete: () => setCurrentSlide(index)
                      });
                      gsap.fromTo(".slideshow-track", 
                        { opacity: 0 },
                        { opacity: 1, duration: 0.3 }
                      );
                    }}
                  >
                    <span className="indicator-progress"></span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container pb-5">
        {/* About Section with GSAP ref */}
        <div className="row justify-content-center mb-5" ref={aboutRef}>
          <div className="col-lg-10">
            <div className="card border-0 shadow-sm rounded-4 bg-white">
              <div className="card-body p-5">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <h2 className="fw-bold text-primary mb-4">
                      <i className="bi bi-person-circle me-3"></i>
                      About NgemiKenya
                    </h2>
                    <p className="lead text-secondary mb-4">
                      Welcome to my digital corner where technology meets authentic Kenyan perspectives. 
                      I'm passionate about sharing insights from my journey through the tech landscape, 
                      mixed with personal reflections and honest commentary.
                    </p>
                    <div className="row text-center">
                      <div className="col-4">
                        <div className="text-primary">
                          <i className="bi bi-journal-richtext display-6"></i>
                          <h5 className="mt-2 fw-bold">100+ Articles</h5>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="text-primary">
                          <i className="bi bi-eye display-6"></i>
                          <h5 className="mt-2 fw-bold">50K+ Reads</h5>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="text-primary">
                          <i className="bi bi-people display-6"></i>
                          <h5 className="mt-2 fw-bold">10K+ Community</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 text-center">
                    <div className="about-image-placeholder rounded-4 bg-primary-light p-5">
                      <i className="bi bi-cup-hot display-1 text-primary"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Categories with GSAP ref */}
        <div className="row mb-5" ref={categoriesRef}>
          <div className="col-12">
            <h3 className="fw-bold text-primary mb-4 text-center">
              <i className="bi bi-grid-3x3-gap me-3"></i>
              Explore Categories
            </h3>
            <div className="row g-4">
              {[
                { icon: 'bi-code-slash', title: 'Web Development', count: '24 Posts', color: 'bg-primary' },
                { icon: 'bi-phone', title: 'Mobile Tech', count: '18 Posts', color: 'bg-primary-light' },
                { icon: 'bi-lightbulb', title: 'Innovation', count: '15 Posts', color: 'bg-primary' },
                { icon: 'bi-graph-up', title: 'Tech Trends', count: '22 Posts', color: 'bg-primary-light' }
              ].map((category, index) => (
                <div className="col-md-3 col-6" key={index}>
                  <div className={`card border-0 text-white rounded-4 h-100 ${category.color} category-card`}>
                    <div className="card-body text-center p-4">
                      <i className={`bi ${category.icon} display-4 mb-3`}></i>
                      <h5 className="fw-bold">{category.title}</h5>
                      <p className="mb-0 opacity-90">{category.count}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Latest Post with GSAP ref */}
        {posts.length > 0 && (
          <div className="row mb-5" ref={featuredRef} id="featured">
            <div className="col-12">
              <div className="card border-0 shadow-lg rounded-4 overflow-hidden bg-white">
                <div className="row g-0">
                  <div className="col-md-6">
                    <img
                      src={posts[0].image || "/api/placeholder/600/400"}
                      alt={posts[0].title}
                      className="h-100 w-100"
                      style={{ objectFit: "cover", minHeight: "350px" }}
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="card-body h-100 d-flex flex-column p-4 p-lg-5">
                      <div className="mb-3">
                        <span className="badge bg-primary text-white rounded-pill px-3 py-2">
                          <i className="bi bi-star-fill me-1"></i>
                          Featured Post
                        </span>
                      </div>
                      <h2 className="card-title fw-bold mb-3 text-primary">
                        {posts[0].title}
                      </h2>
                      <p className="text-muted mb-3">
                        <i className="bi bi-calendar3 me-2"></i>
                        {new Date(posts[0].date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                      {posts[0].excerpt && (
                        <p className="card-text text-secondary mb-4 flex-grow-1 lead">
                          {posts[0].excerpt.slice(0, 200)}...
                        </p>
                      )}
                      <div className="mt-auto">
                        <Link
                          to={`/post/${posts[0].slug}`}
                          className="btn btn-primary btn-lg rounded-pill px-4"
                        >
                          Read Full Story 
                          <i className="bi bi-arrow-right ms-2"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Posts Grid with GSAP ref */}
        <div className="row" ref={postsRef}>
          {posts.slice(1, 10).map((post, index) => (
            <div
              className="col-xl-4 col-lg-6 mb-4 post-card"
              key={post.slug}
            >
              <div className="card border-0 shadow-sm h-100 rounded-4 overflow-hidden post-card-hover bg-white">
                {post.image && (
                  <div className="position-relative overflow-hidden">
                    <img
                      src={post.image}
                      className="card-img-top"
                      alt={post.title}
                      style={{ height: "220px", objectFit: "cover" }}
                    />
                    <div className="position-absolute top-0 end-0 m-3">
                      <span className="badge bg-white text-primary rounded-pill px-3 py-2 small">
                        <i className="bi bi-clock me-1"></i>
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                )}
                <div className="card-body d-flex flex-column p-4">
                  <h5 className="fw-semibold mb-3 text-primary line-clamp-2">
                    {post.title}
                  </h5>
                  {post.excerpt && (
                    <p className="text-secondary flex-grow-1 mb-3 line-clamp-3">
                      {post.excerpt.slice(0, 120)}...
                    </p>
                  )}
                  <div className="mt-auto">
                    <Link
                      to={`/post/${post.slug}`}
                      className="btn btn-outline-primary btn-sm rounded-pill w-100"
                    >
                      Read More 
                      <i className="bi bi-arrow-right ms-2"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Signup with GSAP ref */}
        <div className="row justify-content-center mt-5" ref={newsletterRef}>
          <div className="col-lg-8">
            <div className="card border-0 bg-primary text-white rounded-4 shadow-lg">
              <div className="card-body p-5 text-center">
                <i className="bi bi-envelope-paper display-1 mb-3"></i>
                <h3 className="fw-bold mb-3">Stay Updated</h3>
                <p className="lead mb-4 opacity-90">
                  Get the latest posts and insights delivered directly to your inbox
                </p>
                <div className="row justify-content-center">
                  <div className="col-md-8">
                    <div className="input-group input-group-lg">
                      <input 
                        type="email" 
                        className="form-control rounded-pill me-2 border-0" 
                        placeholder="Your email address" 
                      />
                      <button className="btn btn-light text-primary rounded-pill px-4 fw-bold">
                        <i className="bi bi-send me-2"></i>
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        .bg-light-brown {
          background-color: #f8f5f0;
        }
        .professional-header-bg {
          background: linear-gradient(135deg, #6D4C41 0%, #8D6E63 50%, #A1887F 100%);
          position: relative;
          overflow: hidden;
        }
        .professional-header-bg::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          animation: subtleFloat 20s ease-in-out infinite;
        }

        .text-primary {
          color: #6D4C41 !important;
        }
        .bg-primary {
          background-color: #6D4C41 !important;
        }
        .bg-primary-light {
          background-color: #8D6E63 !important;
        }
        .btn-primary {
          background-color: #6D4C41;
          border-color: #6D4C41;
          color: white;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s ease;
        }
        .btn-primary:hover::before {
          left: 100%;
        }
        .btn-primary:hover {
          background-color: #5D4037;
          border-color: #5D4037;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(109, 76, 65, 0.3);
        }
        .btn-outline-primary {
          border-color: #6D4C41;
          color: #6D4C41;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .btn-outline-primary:hover {
          background-color: #6D4C41;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(109, 76, 65, 0.2);
        }
        
        /* Enhanced Slideshow Styles */
        .slideshow-container {
          height: 600px;
          overflow: hidden;
          position: relative;
          background: #000;
        }
        .slideshow-image {
          height: 600px;
          object-fit: cover;
          filter: brightness(0.7);
          transform-origin: center center;
        }
        .slideshow-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          background: linear-gradient(
            135deg,
            rgba(109, 76, 65, 0.4) 0%,
            rgba(109, 76, 65, 0.2) 50%,
            rgba(109, 76, 65, 0.4) 100%
          );
          backdrop-filter: blur(2px);
        }
        
        /* Slideshow Navigation Buttons */
        .slideshow-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.15);
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: white;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          backdrop-filter: blur(20px);
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          z-index: 10;
          cursor: pointer;
        }
        .slideshow-btn:hover {
          background: rgba(255, 255, 255, 0.25);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-50%) scale(1.15);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        .slideshow-btn:active {
          transform: translateY(-50%) scale(0.95);
        }
        .slideshow-btn-prev {
          left: 30px;
        }
        .slideshow-btn-next {
          right: 30px;
        }
        
        /* Enhanced Slideshow Indicators */
        .slideshow-indicators {
          position: absolute;
          bottom: 40px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          gap: 12px;
          z-index: 10;
        }
        .indicator {
          width: 50px;
          height: 4px;
          border-radius: 2px;
          border: none;
          background: rgba(255, 255, 255, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
        }
        .indicator:hover {
          background: rgba(255, 255, 255, 0.5);
          transform: scaleY(1.5);
        }
        .indicator.active {
          background: rgba(255, 255, 255, 0.8);
        }
        .indicator.active .indicator-progress {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          background: #FFD54F;
          border-radius: 2px;
          transform-origin: left center;
          animation: progress 6s linear infinite;
        }
        
        /* About Section */
        .about-image-placeholder {
          background: linear-gradient(135deg, #f8f5f0 0%, #e0d6c9 100%);
          position: relative;
          overflow: hidden;
        }
        .about-image-placeholder::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          transform: rotate(45deg);
          animation: shimmer 3s ease-in-out infinite;
        }
        
        /* Category Cards */
        .category-card {
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          overflow: hidden;
        }
        .category-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transition: left 0.6s ease;
        }
        .category-card:hover::before {
          left: 100%;
        }
        .category-card:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 
            0 20px 40px rgba(109, 76, 65, 0.25),
            0 0 0 1px rgba(255, 255, 255, 0.1) inset;
        }
        
        /* Post Cards */
        .post-card {
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
        }
        .post-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 1rem;
          padding: 2px;
          background: linear-gradient(135deg, #6D4C41 0%, transparent 30%, transparent 70%, #8D6E63 100%);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: subtract;
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .post-card:hover::before {
          opacity: 1;
        }
        .post-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 
            0 25px 50px rgba(109, 76, 65, 0.15),
            0 0 0 1px rgba(109, 76, 65, 0.05) inset;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Animations */
        @keyframes progress {
          0% {
            transform: scaleX(0);
          }
          100% {
            transform: scaleX(1);
          }
        }
        
        @keyframes subtleFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(180deg);
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) rotate(45deg);
          }
        }
        
        /* Responsive design */
        @media (max-width: 768px) {
          .slideshow-container {
            height: 500px;
          }
          .slideshow-image {
            height: 500px;
          }
          .slideshow-btn {
            width: 50px;
            height: 50px;
            font-size: 1.2rem;
          }
          .slideshow-btn-prev {
            left: 15px;
          }
          .slideshow-btn-next {
            right: 15px;
          }
          .slideshow-indicators {
            bottom: 20px;
          }
          .professional-header-bg {
            padding: 3rem 0;
          }
          .display-4 {
            font-size: 2.5rem;
          }
          .display-5 {
            font-size: 2rem;
          }
        }
        
        @media (max-width: 576px) {
          .slideshow-container {
            height: 400px;
          }
          .slideshow-image {
            height: 400px;
          }
          .category-card,
          .post-card {
            margin-bottom: 1rem;
          }
        }
      `}</style>

      <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    </div>
  );
};

export default Home;