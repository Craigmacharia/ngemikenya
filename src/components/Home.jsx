import React, { useEffect, useRef, useState, useCallback, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import matter from "gray-matter";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Lazy load components for better performance
const MotionComponent = lazy(() => import("framer-motion").then(mod => ({ default: mod.motion.div })));

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Check viewport on mount and resize
  useEffect(() => {
    const checkViewport = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // Refs for GSAP animations
  const headerRef = useRef(null);
  const slideshowRef = useRef(null);
  const slideshowImageRef = useRef(null);
  const aboutRef = useRef(null);
  const categoriesRef = useRef(null);
  const featuredRef = useRef(null);
  const featuredImageRef = useRef(null);
  const postsRef = useRef(null);
  const newsletterRef = useRef(null);
  
  // Use Map for better performance with post images
  const postImageRefs = useRef(new Map());

  // Optimized image URLs with lower resolutions for mobile
  const slideshowImages = {
    desktop: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    mobile: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ]
  };

  const slideshowTitles = [
    "Tech Innovation in East Africa",
    "Digital Transformation Journey",
    "Startup Ecosystem Growth",
    "Future of African Technology"
  ];

  // Memoized post loading function
  const loadPosts = useCallback(async () => {
    try {
      const importPosts = import.meta.glob("../../posts/*.md", { as: "raw" });
      const postList = [];
      
      for (const path in importPosts) {
        const file = await importPosts[path]();
        const { data } = matter(file);
        postList.push({
          ...data,
          slug: path.split("/").pop().replace(".md", ""),
        });
      }
      
      const sorted = postList.sort((a, b) => new Date(b.date) - new Date(a.date));
      setPosts(sorted);
    } catch (err) {
      console.error("Error loading posts:", err);
      setError("Failed to load posts.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  // Optimized GSAP animations with reduced complexity
  useEffect(() => {
    if (!posts.length) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: -30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "power2.out"
        }
      );

      // Optimized scroll animations with conditional triggers
      const scrollOptions = isMobile ? {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true
      } : {
        trigger: ".professional-header-bg",
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5
      };

      // About section with conditional animation
      if (!isMobile) {
        gsap.fromTo(aboutRef.current,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: aboutRef.current,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      }

      // Optimized categories animation
      gsap.fromTo(".category-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: categoriesRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      // Featured post with optimized animation
      gsap.fromTo(featuredRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: featuredRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      // Optimized posts grid animation
      if (!isMobile) {
        gsap.fromTo(".post-card",
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: postsRef.current,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      }

      // Newsletter animation
      gsap.fromTo(newsletterRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: newsletterRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

    });

    return () => ctx.revert();
  }, [posts, isMobile]);

  // Optimized slideshow animation
  useEffect(() => {
    if (!slideshowRef.current) return;

    const ctx = gsap.context(() => {
      if (slideshowImageRef.current) {
        gsap.fromTo(slideshowImageRef.current,
          { scale: 1.1 },
          {
            scale: 1,
            duration: 7,
            ease: "power2.inOut"
          }
        );
      }
    }, slideshowRef);

    return () => ctx.revert();
  }, [currentSlide]);

  // Optimized auto-advance slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.desktop.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [slideshowImages.desktop.length]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slideshowImages.desktop.length);
  }, [slideshowImages.desktop.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slideshowImages.desktop.length) % slideshowImages.desktop.length);
  }, [slideshowImages.desktop.length]);

  // Optimized hover animations
  useEffect(() => {
    if (loading || isMobile) return;

    const setupHoverAnimations = () => {
      // Category card hovers
      document.querySelectorAll(".category-card").forEach(card => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -10,
            scale: 1.05,
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

      // Post card hovers
      document.querySelectorAll(".post-card").forEach(card => {
        const img = card.querySelector(".post-image");
        
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -8,
            scale: 1.03,
            duration: 0.3,
            ease: "power2.out"
          });

          if (img) {
            gsap.to(img, {
              scale: 1.1,
              duration: 0.5,
              ease: "power2.out"
            });
          }
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });

          if (img) {
            gsap.to(img, {
              scale: 1,
              duration: 0.5,
              ease: "power2.out"
            });
          }
        });
      });
    };

    setTimeout(setupHoverAnimations, 100);
  }, [loading, isMobile]);

  // Loading state
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="premium-spinner"></div>
        <p className="loading-text">Curating Premium Content...</p>
        <style jsx>{`
          .loading-screen {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #f8f5f0 0%, #f0ebe4 100%);
          }
          .premium-spinner {
            width: 60px;
            height: 60px;
            border: 4px solid rgba(109, 76, 65, 0.1);
            border-top: 4px solid #6D4C41;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          .loading-text {
            margin-top: 20px;
            color: #6D4C41;
            font-family: 'Comfortaa', sans-serif;
            font-weight: 600;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-screen">
        <div className="error-content">
          <i className="bi bi-exclamation-triangle"></i>
          <h3>{error}</h3>
          <button onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      {/* Premium Header */}
      <div className="professional-header-bg" ref={headerRef}>
        <div className="container">
          <div className="header-content">
            <h1 className="brand-title">
              <i className="bi bi-cup-hot-fill"></i>
              NgemiKenya
            </h1>
            <p className="brand-subtitle">
              Honest perspectives, tech talk & real-world reflections
            </p>
            <div className="badge-container">
              <span className="badge">
                <i className="bi bi-code-slash"></i>Tech
              </span>
              <span className="badge">
                <i className="bi bi-pencil"></i>Thoughts
              </span>
              <span className="badge">
                <i className="bi bi-globe"></i>Kenya
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Slideshow */}
      <div className="slideshow-container" ref={slideshowRef}>
        <picture>
          <source 
            media="(max-width: 768px)" 
            srcSet={slideshowImages.mobile[currentSlide]}
          />
          <source 
            media="(min-width: 769px)" 
            srcSet={slideshowImages.desktop[currentSlide]}
          />
          <img
            src={slideshowImages.desktop[currentSlide]}
            alt={`Slide ${currentSlide + 1}`}
            className="slideshow-image"
            ref={slideshowImageRef}
            loading="eager"
          />
        </picture>
        
        <div className="slideshow-overlay">
          <div className="container">
            <div className="slideshow-content">
              <h2>{slideshowTitles[currentSlide]}</h2>
              <p>
                Dive into insights, experiences, and perspectives from the heart of Kenya's tech scene
              </p>
              <div className="cta-buttons">
                <Link to="/posts" className="btn btn-primary">
                  <i className="bi bi-journal-text"></i>
                  Explore Posts
                </Link>
                
              </div>
            </div>
          </div>
        </div>

        {/* Slideshow Navigation */}
       

        {/* Indicators */}
        <div className="slideshow-indicators">
          {slideshowImages.desktop.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Main Content Container */}
      <main className="container">
        {/* About Section */}
        <section className="about-section" ref={aboutRef}>
          <div className="about-card">
            <div className="about-grid">
              <div className="about-content">
                <h2>
                  <i className="bi bi-person-circle"></i>
                  About NgemiKenya
                </h2>
                <p className="lead">
                  Welcome to my digital corner where technology meets authentic Kenyan perspectives.
                  I'm passionate about sharing insights from my journey through the tech landscape,
                  mixed with personal reflections and honest commentary.
                </p>
                <div className="stats-grid">
                  <div className="stat">
                    <i className="bi bi-journal-richtext"></i>
                    <div>
                      <h3>100+</h3>
                      <p>Articles</p>
                    </div>
                  </div>
                  <div className="stat">
                    <i className="bi bi-eye"></i>
                    <div>
                      <h3>50K+</h3>
                      <p>Reads</p>
                    </div>
                  </div>
                  <div className="stat">
                    <i className="bi bi-people"></i>
                    <div>
                      <h3>10K+</h3>
                      <p>Community</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="about-visual">
                <div className="visual-placeholder">
                  <i className="bi bi-cup-hot"></i>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="categories-section" ref={categoriesRef}>
          <h2 className="section-title">
            <i className="bi bi-grid-3x3-gap"></i>
            Explore Categories
          </h2>
          <div className="categories-grid">
            {[
              { icon: 'code-slash', title: 'Web Development', count: '24 Posts' },
              { icon: 'phone', title: 'Mobile Tech', count: '18 Posts' },
              { icon: 'lightbulb', title: 'Innovation', count: '15 Posts' },
              { icon: 'graph-up', title: 'Tech Trends', count: '22 Posts' }
            ].map((category, index) => (
              <div className="category-card" key={index}>
                <div className="category-icon">
                  <i className={`bi bi-${category.icon}`}></i>
                </div>
                <h3>{category.title}</h3>
                <p>{category.count}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Post */}
        {posts.length > 0 && (
          <section className="featured-section" ref={featuredRef}>
            <div className="featured-card">
              <div className="featured-grid">
                <div className="featured-image">
                  <img
                    src={posts[0].image || "/api/placeholder/600/400"}
                    alt={posts[0].title}
                    ref={featuredImageRef}
                    loading="lazy"
                  />
                  <span className="featured-badge">
                    <i className="bi bi-star-fill"></i>
                    Featured Post
                  </span>
                </div>
                <div className="featured-content">
                  <h2>{posts[0].title}</h2>
                  <p className="date">
                    <i className="bi bi-calendar3"></i>
                    {new Date(posts[0].date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  {posts[0].excerpt && (
                    <p className="excerpt">
                      {posts[0].excerpt.slice(0, 200)}...
                    </p>
                  )}
                  <Link to={`/post/${posts[0].slug}`} className="btn btn-primary">
                    Read Full Story
                    <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Posts Grid */}
        <section className="posts-section" ref={postsRef}>
          <div className="posts-grid">
            {posts.slice(1, 10).map((post, index) => (
              <article className="post-card" key={post.slug}>
                {post.image && (
                  <div className="post-image-container">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="post-image"
                      ref={(el) => postImageRefs.current.set(index, el)}
                      loading="lazy"
                    />
                    <span className="date-badge">
                      <i className="bi bi-clock"></i>
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                  </div>
                )}
                <div className="post-content">
                  <h3>{post.title}</h3>
                  {post.excerpt && (
                    <p className="excerpt">
                      {post.excerpt.slice(0, 120)}...
                    </p>
                  )}
                  <Link to={`/post/${post.slug}`} className="post-link">
                    Read More
                    <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="newsletter-section" ref={newsletterRef}>
          <div className="newsletter-card">
            <div className="newsletter-icon">
              <i className="bi bi-envelope-paper"></i>
            </div>
            <h2>Stay Updated</h2>
            <p>
              Get the latest posts and insights delivered directly to your inbox
            </p>
            <form className="newsletter-form">
              <input
                type="email"
                placeholder="Your email address"
                aria-label="Email address for newsletter"
              />
              <button type="submit">
                <i className="bi bi-send"></i>
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Global Styles */}
      <style jsx global>{`
        :root {
          --primary-color: #6D4C41;
          --primary-light: #8D6E63;
          --accent-color: #FFD54F;
          --light-bg: #f8f5f0;
          --white: #FFFFFF;
          --shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: 'Comfortaa', -apple-system, BlinkMacSystemFont, sans-serif;
          background: var(--light-bg);
          color: #333;
          overflow-x: hidden;
        }

        .home-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8f5f0 0%, #f0ebe4 100%);
          position: relative;
        }

        .container {
          width: 100%;
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Header Styles */
        .professional-header-bg {
          background: linear-gradient(135deg, #6D4C41 0%, #8D6E63 100%);
          padding: 4rem 0;
          position: relative;
          overflow: hidden;
        }

        .header-content {
          text-align: center;
          color: var(--white);
        }

        .brand-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          background: linear-gradient(135deg, #FFFFFF 0%, var(--accent-color) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
        }

        .brand-title i {
          margin-right: 1rem;
        }

        .brand-subtitle {
          font-size: clamp(1rem, 2vw, 1.3rem);
          opacity: 0.9;
          margin-bottom: 2rem;
          font-weight: 300;
        }

        .badge-container {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .badge {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          padding: 0.75rem 1.5rem;
          border-radius: 50px;
          font-weight: 600;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: var(--transition);
        }

        .badge:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
        }

        .badge i {
          margin-right: 0.5rem;
        }

        /* Slideshow Styles */
        .slideshow-container {
          position: relative;
          height: clamp(400px, 50vh, 700px);
          overflow: hidden;
          margin-bottom: 4rem;
        }

        .slideshow-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.7);
          transition: transform 7s ease;
        }

        .slideshow-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          background: linear-gradient(135deg, 
            rgba(109, 76, 65, 0.7) 0%,
            rgba(109, 76, 65, 0.4) 50%,
            rgba(109, 76, 65, 0.7) 100%
          );
        }

        .slideshow-content {
          color: var(--white);
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
        }

        .slideshow-content h2 {
          font-size: clamp(2rem, 4vw, 3.5rem);
          margin-bottom: 1.5rem;
          font-weight: 700;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        .slideshow-content p {
          font-size: clamp(1rem, 2vw, 1.3rem);
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn {
          padding: 1rem 2rem;
          border-radius: 50px;
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: var(--transition);
          border: none;
          cursor: pointer;
          font-family: inherit;
        }

        .btn-primary {
          background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
          color: var(--white);
          box-shadow: 0 8px 25px rgba(109, 76, 65, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(109, 76, 65, 0.4);
        }

        .btn-outline {
          background: transparent;
          color: var(--white);
          border: 2px solid var(--white);
        }

        .btn-outline:hover {
          background: var(--white);
          color: var(--primary-color);
          transform: translateY(-3px);
        }

        .slideshow-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: var(--white);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          backdrop-filter: blur(10px);
          cursor: pointer;
          transition: var(--transition);
          z-index: 10;
        }

        .slideshow-nav:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-50%) scale(1.1);
        }

        .prev {
          left: 20px;
        }

        .next {
          right: 20px;
        }

        .slideshow-indicators {
          position: absolute;
          bottom: 30px;
          left: 0;
          right: 0;
          display: flex;
          gap: 10px;
          justify-content: center;
          z-index: 10;
        }

        .indicator {
          width: 40px;
          height: 4px;
          background: rgba(255, 255, 255, 0.3);
          border: none;
          border-radius: 2px;
          cursor: pointer;
          transition: var(--transition);
          padding: 0;
        }

        .indicator.active {
          background: var(--accent-color);
          transform: scaleX(1.2);
        }

        .indicator:hover {
          background: rgba(255, 255, 255, 0.5);
        }

        /* About Section */
        .about-section {
          margin-bottom: 4rem;
        }

        .about-card {
          background: var(--white);
          border-radius: 20px;
          padding: 3rem;
          box-shadow: var(--shadow);
          border: 1px solid rgba(109, 76, 65, 0.1);
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
        }

        @media (min-width: 992px) {
          .about-grid {
            grid-template-columns: 2fr 1fr;
          }
        }

        .about-content h2 {
          color: var(--primary-color);
          font-size: 2rem;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .about-content .lead {
          font-size: 1.2rem;
          line-height: 1.6;
          color: #666;
          margin-bottom: 2rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .stat {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .stat i {
          font-size: 2.5rem;
          color: var(--primary-color);
        }

        .stat h3 {
          font-size: 1.8rem;
          color: var(--primary-color);
          margin: 0;
        }

        .stat p {
          color: #666;
          margin: 0;
        }

        .about-visual {
          display: flex;
          justify-content: center;
        }

        .visual-placeholder {
          width: 200px;
          height: 200px;
          background: linear-gradient(135deg, #f8f5f0, #e0d6c9);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid rgba(109, 76, 65, 0.1);
        }

        .visual-placeholder i {
          font-size: 4rem;
          color: var(--primary-color);
        }

        /* Categories Section */
        .categories-section {
          margin-bottom: 4rem;
        }

        .section-title {
          text-align: center;
          color: var(--primary-color);
          font-size: 2rem;
          margin-bottom: 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .category-card {
          background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
          color: var(--white);
          padding: 2.5rem 2rem;
          border-radius: 15px;
          text-align: center;
          transition: var(--transition);
          box-shadow: 0 10px 30px rgba(109, 76, 65, 0.2);
        }

        .category-icon {
          font-size: 3rem;
          margin-bottom: 1.5rem;
          display: inline-block;
        }

        .category-card h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .category-card p {
          opacity: 0.9;
          font-size: 0.95rem;
        }

        /* Featured Section */
        .featured-section {
          margin-bottom: 4rem;
        }

        .featured-card {
          background: var(--white);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: var(--shadow);
        }

        .featured-grid {
          display: grid;
          grid-template-columns: 1fr;
          min-height: 400px;
        }

        @media (min-width: 768px) {
          .featured-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .featured-image {
          position: relative;
          overflow: hidden;
          min-height: 300px;
        }

        .featured-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .featured-badge {
          position: absolute;
          top: 20px;
          left: 20px;
          background: linear-gradient(135deg, var(--accent-color), #FFE082);
          color: #333;
          padding: 0.75rem 1.5rem;
          border-radius: 50px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .featured-content {
          padding: 3rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .featured-content h2 {
          color: var(--primary-color);
          font-size: 1.8rem;
          margin-bottom: 1rem;
          line-height: 1.3;
        }

        .featured-content .date {
          color: #666;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
        }

        .featured-content .excerpt {
          color: #666;
          line-height: 1.6;
          margin-bottom: 2rem;
          flex-grow: 1;
        }

        /* Posts Grid */
        .posts-section {
          margin-bottom: 4rem;
        }

        .posts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }

        .post-card {
          background: var(--white);
          border-radius: 15px;
          overflow: hidden;
          box-shadow: var(--shadow);
          transition: var(--transition);
        }

        .post-image-container {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .post-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .date-badge {
          position: absolute;
          top: 15px;
          right: 15px;
          background: rgba(255, 255, 255, 0.95);
          color: var(--primary-color);
          padding: 0.5rem 1rem;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
        }

        .post-content {
          padding: 1.5rem;
        }

        .post-content h3 {
          color: var(--primary-color);
          font-size: 1.2rem;
          margin-bottom: 1rem;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .post-content .excerpt {
          color: #666;
          font-size: 0.95rem;
          line-height: 1.5;
          margin-bottom: 1.5rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .post-link {
          color: var(--primary-color);
          text-decoration: none;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: var(--transition);
        }

        .post-link:hover {
          gap: 1rem;
        }

        /* Newsletter Section */
        .newsletter-section {
          margin-bottom: 4rem;
        }

        .newsletter-card {
          background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
          color: var(--white);
          padding: 4rem 2rem;
          border-radius: 20px;
          text-align: center;
          box-shadow: var(--shadow);
          position: relative;
          overflow: hidden;
        }

        .newsletter-icon {
          font-size: 4rem;
          margin-bottom: 1.5rem;
          display: inline-block;
        }

        .newsletter-card h2 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .newsletter-card p {
          font-size: 1.1rem;
          opacity: 0.9;
          margin-bottom: 2rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .newsletter-form {
          max-width: 500px;
          margin: 0 auto;
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .newsletter-form input {
          flex: 1;
          min-width: 250px;
          padding: 1rem 1.5rem;
          border-radius: 50px;
          border: none;
          font-family: inherit;
          font-size: 1rem;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .newsletter-form input:focus {
          outline: none;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        }

        .newsletter-form button {
          padding: 1rem 2rem;
          background: var(--white);
          color: var(--primary-color);
          border: none;
          border-radius: 50px;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .newsletter-form button:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        /* Responsive Breakpoints */
        @media (max-width: 768px) {
          .professional-header-bg {
            padding: 3rem 0;
          }
          
          .slideshow-container {
            height: 400px;
          }
          
          .slideshow-nav {
            width: 40px;
            height: 40px;
            font-size: 1.2rem;
          }
          
          .slideshow-nav.prev {
            left: 10px;
          }
          
          .slideshow-nav.next {
            right: 10px;
          }
          
          .about-card,
          .featured-content {
            padding: 2rem;
          }
          
          .categories-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
          }
          
          .category-card {
            padding: 1.5rem 1rem;
          }
          
          .posts-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }
          
          .btn {
            width: 100%;
            max-width: 300px;
            justify-content: center;
          }
          
          .newsletter-form {
            flex-direction: column;
          }
          
          .newsletter-form input,
          .newsletter-form button {
            width: 100%;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .categories-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .posts-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Performance Optimizations */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* Accessibility */
        .visually-hidden {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        /* Focus Styles */
        *:focus {
          outline: 3px solid var(--accent-color);
          outline-offset: 3px;
        }

        /* Touch Device Optimizations */
        @media (hover: none) and (pointer: coarse) {
          .category-card,
          .post-card {
            transform: none !important;
          }
          
          .slideshow-nav {
            width: 60px;
            height: 60px;
            font-size: 1.8rem;
          }
        }

        /* Print Styles */
        @media print {
          .slideshow-container,
          .slideshow-nav,
          .slideshow-indicators,
          .btn {
            display: none;
          }
          
          .home-container {
            background: white;
          }
        }
      `}</style>

      {/* Add Fonts and Icons */}
      <link 
        href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap" 
        rel="stylesheet"
      />
      <link 
        rel="stylesheet" 
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" 
      />
      {/* Preload critical images */}
      <link rel="preload" href={slideshowImages.mobile[0]} as="image" />
      <link rel="preload" href={slideshowImages.desktop[0]} as="image" />
    </div>
  );
};

export default Home;