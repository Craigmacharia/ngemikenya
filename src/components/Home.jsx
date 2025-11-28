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
  const slideshowImageRef = useRef(null);
  const aboutRef = useRef(null);
  const categoriesRef = useRef(null);
  const featuredRef = useRef(null);
  const featuredImageRef = useRef(null);
  const postsRef = useRef(null);
  const postImageRefs = useRef([]);
  const newsletterRef = useRef(null);

  // Premium slideshow images with Kenyan tech theme
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
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          ease: "power3.out",
          delay: 0.3
        }
      );

      // Staggered badge animations
      gsap.fromTo(".header-badge",
        { scale: 0, opacity: 0, rotation: -10 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.7)",
          delay: 0.8
        }
      );

      // Enhanced parallax on header background
      gsap.to(".professional-header-bg::before", {
        y: "40%",
        ease: "none",
        scrollTrigger: {
          trigger: ".professional-header-bg",
          scrub: 1.5,
          start: "top bottom",
          end: "bottom top",
        }
      });

      // About section animation with enhanced effects
      gsap.fromTo(aboutRef.current,
        { opacity: 0, x: -80, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Enhanced categories animation
      gsap.fromTo(".category-card",
        { y: 80, opacity: 0, rotationX: 15 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: categoriesRef.current,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Premium featured post animation
      gsap.fromTo(featuredRef.current,
        { opacity: 0, scale: 0.92, rotationY: 5 },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: featuredRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Enhanced parallax on featured image
      if (featuredImageRef.current) {
        gsap.to(featuredImageRef.current, {
          y: "25%",
          ease: "none",
          scrollTrigger: {
            trigger: featuredRef.current,
            scrub: 2,
            start: "top bottom",
            end: "bottom top",
          }
        });
      }

      // Enhanced posts grid animation
      gsap.fromTo(".post-card",
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: postsRef.current,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Enhanced parallax on post images
      postImageRefs.current.forEach((img) => {
        if (img) {
          gsap.to(img, {
            y: "30%",
            ease: "none",
            scrollTrigger: {
              trigger: img.parentElement,
              scrub: 1.5,
              start: "top bottom",
              end: "bottom top",
            }
          });
        }
      });

      // Premium newsletter animation
      gsap.fromTo(newsletterRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: newsletterRef.current,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Enhanced timeline for about stats
      gsap.timeline({
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 75%",
        }
      })
        .fromTo(".about-stat", 
          { scale: 0.3, opacity: 0, rotation: -15, y: 30 },
          { 
            scale: 1, 
            opacity: 1, 
            rotation: 0, 
            y: 0,
            duration: 0.7, 
            stagger: 0.15, 
            ease: "back.out(1.7)" 
          }
        );
    });

    return () => ctx.revert();
  }, [posts]);

  // Enhanced slideshow animation with GSAP
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Premium slideshow image animation
      gsap.fromTo(".slideshow-image",
        { scale: 1.15, rotation: 0.5 },
        {
          scale: 1,
          rotation: 0,
          duration: 7,
          ease: "power2.inOut"
        }
      );

      // Enhanced slideshow content animation
      gsap.fromTo(".slideshow-content",
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          delay: 0.4,
          ease: "power3.out"
        }
      );

      // Premium parallax on slideshow image
      if (slideshowImageRef.current) {
        gsap.to(slideshowImageRef.current, {
          y: "-20%",
          ease: "none",
          scrollTrigger: {
            trigger: slideshowRef.current,
            scrub: 2,
            start: "top bottom",
            end: "bottom top",
          }
        });
      }
    }, slideshowRef);

    return () => ctx.revert();
  }, [currentSlide]);

  // Auto-advance slideshow with enhanced GSAP transition
  useEffect(() => {
    const timer = setInterval(() => {
      gsap.to(".slideshow-track", {
        opacity: 0,
        scale: 1.05,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
          gsap.fromTo(".slideshow-track",
            { opacity: 0, scale: 0.95 },
            { 
              opacity: 1, 
              scale: 1, 
              duration: 0.8, 
              ease: "power2.out" 
            }
          );
        }
      });
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    gsap.to(".slideshow-track", {
      opacity: 0,
      scale: 1.05,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
        gsap.fromTo(".slideshow-track",
          { opacity: 0, scale: 0.95 },
          { 
            opacity: 1, 
            scale: 1, 
            duration: 0.6, 
            ease: "power2.out" 
          }
        );
      }
    });
  };

  const prevSlide = () => {
    gsap.to(".slideshow-track", {
      opacity: 0,
      scale: 1.05,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        setCurrentSlide((prev) => (prev - 1 + slideshowImages.length) % slideshowImages.length);
        gsap.fromTo(".slideshow-track",
          { opacity: 0, scale: 0.95 },
          { 
            opacity: 1, 
            scale: 1, 
            duration: 0.6, 
            ease: "power2.out" 
          }
        );
      }
    });
  };

  // Premium hover animations for interactive elements
  useEffect(() => {
    const setupHoverAnimations = () => {
      // Enhanced category card hover effects
      document.querySelectorAll(".category-card").forEach(card => {
        const icon = card.querySelector("i.bi");
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -20,
            scale: 1.08,
            rotationY: 5,
            duration: 0.5,
            ease: "power3.out"
          });
          gsap.to(icon, {
            scale: 1.3,
            rotation: 8,
            y: -5,
            duration: 0.5,
            ease: "elastic.out(1, 0.5)"
          });
          gsap.to(card, {
            boxShadow: "0 35px 70px rgba(109, 76, 65, 0.5)",
            duration: 0.5
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            rotationY: 0,
            duration: 0.5,
            ease: "power3.out"
          });
          gsap.to(icon, {
            scale: 1,
            rotation: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.5)"
          });
          gsap.to(card, {
            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
            duration: 0.5
          });
        });
      });

      // Enhanced post card hover effects
      document.querySelectorAll(".post-card").forEach(card => {
        const img = card.querySelector(".card-img-top");
        const overlay = card.querySelector(".post-overlay");
        const content = card.querySelector(".card-body");
        
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -15,
            scale: 1.05,
            rotationY: 2,
            duration: 0.5,
            ease: "power3.out"
          });

          if (img) {
            gsap.to(img, {
              scale: 1.15,
              duration: 0.5,
              ease: "power2.out"
            });
          }

          if (overlay) {
            gsap.to(overlay, {
              opacity: 0.4,
              duration: 0.5
            });
          }

          if (content) {
            gsap.to(content, {
              y: -5,
              duration: 0.5,
              ease: "power2.out"
            });
          }

          gsap.to(card, {
            boxShadow: "0 40px 80px rgba(109, 76, 65, 0.4)",
            duration: 0.5
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            rotationY: 0,
            duration: 0.5,
            ease: "power3.out"
          });

          if (img) {
            gsap.to(img, {
              scale: 1,
              duration: 0.5,
              ease: "power2.out"
            });
          }

          if (overlay) {
            gsap.to(overlay, {
              opacity: 0,
              duration: 0.5
            });
          }

          if (content) {
            gsap.to(content, {
              y: 0,
              duration: 0.5,
              ease: "power2.out"
            });
          }

          gsap.to(card, {
            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
            duration: 0.5
          });
        });
      });

      // Enhanced slideshow button hovers
      document.querySelectorAll(".slideshow-btn").forEach(btn => {
        btn.addEventListener("mouseenter", () => {
          gsap.to(btn, {
            scale: 1.3,
            rotation: 8,
            duration: 0.4,
            ease: "power2.out"
          });
        });

        btn.addEventListener("mouseleave", () => {
          gsap.to(btn, {
            scale: 1,
            rotation: 0,
            duration: 0.4,
            ease: "power2.out"
          });
        });
      });
    };

    if (!loading) {
      setTimeout(setupHoverAnimations, 100);
    }
  }, [loading]);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light-brown">
        <div className="text-center">
          <div className="premium-spinner mb-4"></div>
          <p className="mt-3 text-primary fw-semibold">Curating premium content...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light-brown">
        <div className="text-center text-primary">
          <i className="bi bi-exclamation-triangle-fill display-4 mb-3"></i>
          <h4 className="fw-bold">{error}</h4>
          <button
            className="btn btn-primary mt-3 px-4 py-2 rounded-pill fw-semibold"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className="bg-light-brown min-vh-100" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
      {/* Premium Header Section */}
      <div className="professional-header-bg py-5" ref={headerRef}>
        <div className="container">
          <div className="text-center text-white">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "back.out" }}
            >
              <h1 className="fw-bold mb-3 display-4 header-title">
                <i className="bi bi-cup-hot-fill me-3"></i>
                NgemiKenya
              </h1>
            </motion.div>
            <p className="lead opacity-90 mb-4 header-subtitle">
              Honest perspectives, tech talk & real-world reflections
            </p>
            <div className="mt-4">
              <span className="badge bg-primary-light rounded-pill px-4 py-2 me-3 mb-2 header-badge">
                <i className="bi bi-code-slash me-2"></i>Tech
              </span>
              <span className="badge bg-primary-light rounded-pill px-4 py-2 me-3 mb-2 header-badge">
                <i className="bi bi-pencil me-2"></i>Thoughts
              </span>
              <span className="badge bg-primary-light rounded-pill px-4 py-2 mb-2 header-badge">
                <i className="bi bi-globe me-2"></i>Kenya
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Slideshow Section */}
      <div className="container-fluid px-0 mb-5" ref={slideshowRef}>
        <div className="row g-0">
          <div className="col-12">
            <div className="slideshow-container position-relative">
              <div className="slideshow-track">
                <img
                  src={slideshowImages[currentSlide]}
                  alt={`Slide ${currentSlide + 1}`}
                  className="w-100 slideshow-image"
                  ref={slideshowImageRef}
                />
                <div className="slideshow-overlay">
                  <div className="container">
                    <div className="row justify-content-center text-center">
                      <div className="col-lg-8 col-xl-6 slideshow-content">
                        <h2 className="text-white fw-bold mb-4 display-5 slideshow-title">
                          {slideshowTitles[currentSlide]}
                        </h2>
                        <p className="text-white lead mb-4 slideshow-description">
                          Dive into insights, experiences, and perspectives from the heart of Kenya's tech scene
                        </p>
                        <div className="mt-4">
                          <Link to="/posts" className="btn btn-primary btn-lg rounded-pill me-3 px-5 py-3 fw-semibold">
                            <i className="bi bi-journal-text me-2"></i>
                            Explore Posts
                          </Link>
                          <Link to="/about" className="btn btn-outline-light btn-lg rounded-pill px-5 py-3 fw-semibold">
                            <i className="bi bi-person me-2"></i>
                            About
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
             
              {/* Premium Slideshow Navigation */}
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
                        scale: 1.05,
                        duration: 0.4,
                        onComplete: () => setCurrentSlide(index)
                      });
                      gsap.fromTo(".slideshow-track",
                        { opacity: 0, scale: 0.95 },
                        { opacity: 1, scale: 1, duration: 0.4 }
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
        {/* Premium About Section */}
        <div className="row justify-content-center mb-5" ref={aboutRef}>
          <div className="col-lg-10">
            <div className="card border-0 shadow-lg rounded-4 bg-white about-card">
              <div className="card-body p-5">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <h2 className="fw-bold text-primary mb-4 about-title">
                      <i className="bi bi-person-circle me-3"></i>
                      About NgemiKenya
                    </h2>
                    <p className="lead text-secondary mb-4 about-description">
                      Welcome to my digital corner where technology meets authentic Kenyan perspectives.
                      I'm passionate about sharing insights from my journey through the tech landscape,
                      mixed with personal reflections and honest commentary.
                    </p>
                    <div className="row text-center">
                      <div className="col-4 about-stat">
                        <div className="text-primary">
                          <i className="bi bi-journal-richtext display-6 mb-3"></i>
                          <h5 className="fw-bold about-stat-number">100+</h5>
                          <p className="text-muted mb-0">Articles</p>
                        </div>
                      </div>
                      <div className="col-4 about-stat">
                        <div className="text-primary">
                          <i className="bi bi-eye display-6 mb-3"></i>
                          <h5 className="fw-bold about-stat-number">50K+</h5>
                          <p className="text-muted mb-0">Reads</p>
                        </div>
                      </div>
                      <div className="col-4 about-stat">
                        <div className="text-primary">
                          <i className="bi bi-people display-6 mb-3"></i>
                          <h5 className="fw-bold about-stat-number">10K+</h5>
                          <p className="text-muted mb-0">Community</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 text-center">
                    <div className="about-image-placeholder rounded-4 bg-primary-light p-5 position-relative">
                      <i className="bi bi-cup-hot display-1 text-primary"></i>
                      <div className="floating-elements">
                        <div className="floating-element element-1"></div>
                        <div className="floating-element element-2"></div>
                        <div className="floating-element element-3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Categories Section */}
        <div className="row mb-5" ref={categoriesRef}>
          <div className="col-12">
            <h3 className="fw-bold text-primary mb-5 text-center section-title">
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
                    <div className="card-body text-center p-4 position-relative">
                      <div className="category-icon-wrapper mb-3">
                        <i className={`bi ${category.icon} display-4`}></i>
                      </div>
                      <h5 className="fw-bold mb-2">{category.title}</h5>
                      <p className="mb-0 opacity-90">{category.count}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Premium Featured Post */}
        {posts.length > 0 && (
          <div className="row mb-5" ref={featuredRef} id="featured">
            <div className="col-12">
              <div className="card border-0 shadow-xl rounded-4 overflow-hidden bg-white featured-card">
                <div className="row g-0">
                  <div className="col-md-6 position-relative overflow-hidden">
                    <img
                      src={posts[0].image || "/api/placeholder/600/400"}
                      alt={posts[0].title}
                      className="h-100 w-100 featured-image"
                      style={{ objectFit: "cover", minHeight: "400px" }}
                      ref={featuredImageRef}
                    />
                    <div className="featured-badge position-absolute top-0 start-0 m-4">
                      <span className="badge bg-gold text-dark rounded-pill px-4 py-2 fw-semibold">
                        <i className="bi bi-star-fill me-2"></i>
                        Featured Post
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card-body h-100 d-flex flex-column p-4 p-lg-5">
                      <h2 className="card-title fw-bold mb-3 text-primary featured-post-title">
                        {posts[0].title}
                      </h2>
                      <p className="text-muted mb-3 featured-post-date">
                        <i className="bi bi-calendar3 me-2"></i>
                        {new Date(posts[0].date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                      {posts[0].excerpt && (
                        <p className="card-text text-secondary mb-4 flex-grow-1 lead featured-post-excerpt">
                          {posts[0].excerpt.slice(0, 200)}...
                        </p>
                      )}
                      <div className="mt-auto">
                        <Link
                          to={`/post/${posts[0].slug}`}
                          className="btn btn-primary btn-lg rounded-pill px-5 py-3 fw-semibold featured-post-btn"
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

        {/* Premium Posts Grid */}
        <div className="row" ref={postsRef}>
          {posts.slice(1, 10).map((post, index) => (
            <div
              className="col-xl-4 col-lg-6 mb-4 post-card"
              key={post.slug}
            >
              <div className="card border-0 shadow-lg h-100 rounded-4 overflow-hidden post-card-hover bg-white position-relative">
                {post.image && (
                  <div className="position-relative overflow-hidden">
                    <img
                      src={post.image}
                      className="card-img-top post-image"
                      alt={post.title}
                      style={{ height: "240px", objectFit: "cover" }}
                      ref={(el) => (postImageRefs.current[index] = el)}
                    />
                    <div className="post-overlay position-absolute top-0 start-0 w-100 h-100 bg-primary"></div>
                    <div className="position-absolute top-0 end-0 m-3">
                      <span className="badge bg-white text-primary rounded-pill px-3 py-2 small fw-semibold">
                        <i className="bi bi-clock me-1"></i>
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                )}
                <div className="card-body d-flex flex-column p-4">
                  <h5 className="fw-semibold mb-3 text-primary line-clamp-2 post-title">
                    {post.title}
                  </h5>
                  {post.excerpt && (
                    <p className="text-secondary flex-grow-1 mb-3 line-clamp-3 post-excerpt">
                      {post.excerpt.slice(0, 120)}...
                    </p>
                  )}
                  <div className="mt-auto">
                    <Link
                      to={`/post/${post.slug}`}
                      className="btn btn-outline-primary btn-sm rounded-pill w-100 py-2 fw-semibold post-btn"
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

        {/* Premium Newsletter Section */}
        <div className="row justify-content-center mt-5" ref={newsletterRef}>
          <div className="col-lg-8">
            <div className="card border-0 bg-primary text-white rounded-4 shadow-xl newsletter-card">
              <div className="card-body p-5 text-center position-relative">
                <div className="newsletter-icon mb-4">
                  <i className="bi bi-envelope-paper display-1"></i>
                </div>
                <h3 className="fw-bold mb-3 newsletter-title">Stay Updated</h3>
                <p className="lead mb-4 opacity-90 newsletter-description">
                  Get the latest posts and insights delivered directly to your inbox
                </p>
                <div className="row justify-content-center">
                  <div className="col-md-8">
                    <div className="input-group input-group-lg">
                      <input
                        type="email"
                        className="form-control rounded-pill me-2 border-0 px-4 newsletter-input"
                        placeholder="Your email address"
                      />
                      <button className="btn btn-light text-primary rounded-pill px-4 fw-bold newsletter-btn">
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

      {/* Premium CSS Styles */}
      <style jsx>{`
        .bg-light-brown {
          background: linear-gradient(135deg, #f8f5f0 0%, #f0ebe4 50%, #f8f5f0 100%);
          position: relative;
        }

        .bg-light-brown::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%236d4c41' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E");
          animation: subtleFloat 30s ease-in-out infinite;
        }

        .professional-header-bg {
          background: linear-gradient(135deg, #6D4C41 0%, #8D6E63 30%, #A1887F 70%, #8D6E63 100%);
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
          background: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Ccircle cx='40' cy='40' r='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          animation: premiumFloat 25s ease-in-out infinite;
        }

        .header-title {
          background: linear-gradient(135deg, #FFFFFF 0%, #FFD54F 50%, #FFFFFF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 4px 20px rgba(255, 213, 79, 0.3);
        }

        .header-subtitle {
          font-size: 1.3rem;
          font-weight: 300;
          letter-spacing: 0.5px;
        }

        .text-primary {
          color: #6D4C41 !important;
        }

        .bg-primary {
          background: linear-gradient(135deg, #6D4C41 0%, #8D6E63 100%) !important;
        }

        .bg-primary-light {
          background: linear-gradient(135deg, #8D6E63 0%, #A1887F 100%) !important;
        }

        .bg-gold {
          background: linear-gradient(135deg, #FFD54F 0%, #FFE082 100%) !important;
        }

        .btn-primary {
          background: linear-gradient(135deg, #6D4C41 0%, #8D6E63 100%);
          border: none;
          color: white;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          box-shadow: 0 8px 25px rgba(109, 76, 65, 0.3);
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.6s ease;
        }

        .btn-primary:hover::before {
          left: 100%;
        }

        .btn-primary:hover {
          background: linear-gradient(135deg, #5D4037 0%, #7B5B53 100%);
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 15px 40px rgba(109, 76, 65, 0.4);
        }

        .btn-outline-primary {
          border: 2px solid #6D4C41;
          color: #6D4C41;
          background: transparent;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .btn-outline-primary:hover {
          background: #6D4C41;
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(109, 76, 65, 0.3);
        }

        /* Premium Spinner */
        .premium-spinner {
          width: 60px;
          height: 60px;
          border: 4px solid rgba(109, 76, 65, 0.2);
          border-left: 4px solid #6D4C41;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto;
        }

        /* Enhanced Slideshow Styles */
        .slideshow-container {
          height: 700px;
          overflow: hidden;
          position: relative;
          background: #000;
        }

        .slideshow-image {
          height: 700px;
          object-fit: cover;
          filter: brightness(0.6) contrast(1.1);
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
            rgba(109, 76, 65, 0.6) 0%,
            rgba(109, 76, 65, 0.3) 50%,
            rgba(109, 76, 65, 0.6) 100%
          );
          backdrop-filter: blur(4px);
        }

        .slideshow-title {
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .slideshow-description {
          font-size: 1.3rem;
          font-weight: 300;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        /* Premium Slideshow Navigation */
        .slideshow-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.2);
          border: 2px solid rgba(255, 255, 255, 0.4);
          color: white;
          width: 70px;
          height: 70px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          backdrop-filter: blur(20px);
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          z-index: 10;
          cursor: pointer;
        }

        .slideshow-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.7);
          transform: translateY(-50%) scale(1.2);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
        }

        .slideshow-btn-prev {
          left: 40px;
        }

        .slideshow-btn-next {
          right: 40px;
        }

        /* Enhanced Slideshow Indicators */
        .slideshow-indicators {
          position: absolute;
          bottom: 50px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          gap: 15px;
          z-index: 10;
        }

        .indicator {
          width: 60px;
          height: 4px;
          border-radius: 2px;
          border: none;
          background: rgba(255, 255, 255, 0.3);
          cursor: pointer;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
        }

        .indicator:hover {
          background: rgba(255, 255, 255, 0.6);
          transform: scaleY(2);
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
          background: linear-gradient(90deg, #FFD54F, #FFE082, #FFD54F);
          border-radius: 2px;
          transform-origin: left center;
          animation: progress 7s linear infinite;
        }

        /* Premium About Section */
        .about-card {
          background: linear-gradient(135deg, #FFFFFF 0%, #F8F5F0 100%);
          border: 1px solid rgba(109, 76, 65, 0.1);
          position: relative;
          overflow: hidden;
        }

        .about-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent,
            rgba(255, 255, 255, 0.8),
            transparent
          );
          transform: rotate(45deg);
          animation: premiumShimmer 4s ease-in-out infinite;
        }

        .about-title {
          font-size: 2.2rem;
          position: relative;
        }

        .about-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 0;
          width: 80px;
          height: 3px;
          background: linear-gradient(90deg, #6D4C41, #FFD54F);
          border-radius: 2px;
        }

        .about-image-placeholder {
          background: linear-gradient(135deg, #f8f5f0 0%, #e0d6c9 100%);
          position: relative;
          overflow: hidden;
          border: 2px solid rgba(109, 76, 65, 0.1);
        }

        .floating-elements {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

        .floating-element {
          position: absolute;
          background: rgba(255, 213, 79, 0.3);
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
        }

        .element-1 {
          width: 20px;
          height: 20px;
          top: 20%;
          left: 20%;
          animation-delay: 0s;
        }

        .element-2 {
          width: 15px;
          height: 15px;
          top: 60%;
          left: 70%;
          animation-delay: 2s;
        }

        .element-3 {
          width: 25px;
          height: 25px;
          top: 80%;
          left: 30%;
          animation-delay: 4s;
        }

        .about-stat-number {
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
        }

        /* Premium Category Cards */
        .category-card {
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          overflow: hidden;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.1);
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
            rgba(255, 255, 255, 0.3),
            transparent
          );
          transition: left 0.8s ease;
        }

        .category-card:hover::before {
          left: 100%;
        }

        .category-icon-wrapper {
          position: relative;
          display: inline-block;
        }

        .category-icon-wrapper::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80px;
          height: 80px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          z-index: 0;
        }

        /* Premium Post Cards */
        .post-card {
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
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
          transition: opacity 0.5s ease;
        }

        .post-card:hover::before {
          opacity: 1;
        }

        .post-overlay {
          background: linear-gradient(135deg, rgba(109, 76, 65, 0.6) 0%, rgba(109, 76, 65, 0.3) 100%);
          transition: opacity 0.5s ease;
          opacity: 0;
        }

        .post-image {
          transition: all 0.5s ease;
        }

        .post-title {
          font-size: 1.1rem;
          line-height: 1.4;
        }

        .post-excerpt {
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .post-btn {
          transition: all 0.3s ease;
        }

        /* Premium Featured Post */
        .featured-card {
          background: linear-gradient(135deg, #FFFFFF 0%, #F8F5F0 100%);
          border: 1px solid rgba(109, 76, 65, 0.1);
        }

        .featured-image {
          filter: brightness(0.9) contrast(1.1);
        }

        .featured-badge {
          z-index: 2;
        }

        .featured-post-title {
          font-size: 2rem;
          line-height: 1.3;
        }

        .featured-post-date {
          font-size: 1.1rem;
        }

        .featured-post-excerpt {
          font-size: 1.1rem;
          line-height: 1.6;
        }

        .featured-post-btn {
          font-size: 1.1rem;
        }

        /* Premium Newsletter */
        .newsletter-card {
          background: linear-gradient(135deg, #6D4C41 0%, #8D6E63 50%, #6D4C41 100%);
          position: relative;
          overflow: hidden;
        }

        .newsletter-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          transform: rotate(45deg);
          animation: newsletterShimmer 5s ease-in-out infinite;
        }

        .newsletter-icon {
          position: relative;
          z-index: 2;
        }

        .newsletter-title {
          position: relative;
          z-index: 2;
          font-size: 2.2rem;
        }

        .newsletter-description {
          position: relative;
          z-index: 2;
          font-size: 1.2rem;
        }

        .newsletter-input {
          background: rgba(255, 255, 255, 0.95);
          font-size: 1.1rem;
          padding: 0.75rem 1.5rem;
        }

        .newsletter-btn {
          background: white;
          border: none;
          font-size: 1.1rem;
          padding: 0.75rem 1.5rem;
          transition: all 0.3s ease;
        }

        .newsletter-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }

        .section-title {
          font-size: 2rem;
          position: relative;
          display: inline-block;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 3px;
          background: linear-gradient(90deg, #6D4C41, #FFD54F);
          border-radius: 2px;
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

        /* Premium Animations */
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes progress {
          0% {
            transform: scaleX(0);
          }
          100% {
            transform: scaleX(1);
          }
        }

        @keyframes premiumFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-15px) rotate(120deg);
          }
          66% {
            transform: translateY(-8px) rotate(240deg);
          }
        }

        @keyframes premiumShimmer {
          0% {
            transform: translateX(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) rotate(45deg);
          }
        }

        @keyframes newsletterShimmer {
          0% {
            transform: translateX(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) rotate(45deg);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes subtleFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        /* Premium Responsive Design */
        @media (max-width: 1200px) {
          .slideshow-container {
            height: 600px;
          }
          .slideshow-image {
            height: 600px;
          }
        }

        @media (max-width: 768px) {
          .slideshow-container {
            height: 500px;
          }
          .slideshow-image {
            height: 500px;
          }
          .slideshow-btn {
            width: 55px;
            height: 55px;
            font-size: 1.4rem;
          }
          .slideshow-btn-prev {
            left: 20px;
          }
          .slideshow-btn-next {
            right: 20px;
          }
          .slideshow-indicators {
            bottom: 30px;
          }
          .professional-header-bg {
            padding: 3rem 0;
          }
          .display-4 {
            font-size: 2.8rem;
          }
          .display-5 {
            font-size: 2.2rem;
          }
          .about-title,
          .section-title,
          .newsletter-title {
            font-size: 1.8rem;
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
            margin-bottom: 1.5rem;
          }
          .btn-lg {
            padding: 0.75rem 1.5rem;
            font-size: 1rem;
          }
        }
      `}</style>

      <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    </div>
  );
};

export default Home;