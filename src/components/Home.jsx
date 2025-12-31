import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import matter from "gray-matter";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import nyiImage from "../assets/nyi.png";



// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Refs for animations
  const heroRef = useRef(null);
  const welcomeRef = useRef(null);
  const storiesRef = useRef(null);
  const communityRef = useRef(null);

  // Kenyan-themed hero images
  const heroImages = {
    desktop: [
      nyiImage, // Nairobi skyline (local image)
  "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",

      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Tea plantation
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Market scene
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"  // City life
    ],
    mobile: [
      "https://images.unsplash.com/photo-1596027175726-c49e8b2b4d61?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ]
  };

  const heroTitles = [
    "Real Stories from Kenya",
    "Everyday Perspectives",
    "Local Insights, Global Relevance",
    "Conversations That Matter"
  ];

  // Check viewport
  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // Load posts
  useEffect(() => {
    const loadPosts = async () => {
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
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  // GSAP animations
  useEffect(() => {
    if (!posts.length) return;

    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo(heroRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );

      // Section animations
      const sections = [
        { ref: welcomeRef, direction: -30 },
        { ref: storiesRef, direction: 30 },
        { ref: communityRef, direction: -30 }
      ];

      sections.forEach(({ ref, direction }) => {
        if (ref.current) {
          gsap.fromTo(ref.current,
            { opacity: 0, x: direction },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              scrollTrigger: {
                trigger: ref.current,
                start: "top 80%",
                toggleActions: "play none none none"
              }
            }
          );
        }
      });

      // Post cards animation
      gsap.fromTo(".story-card",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".stories-section",
            start: "top 70%",
            toggleActions: "play none none none"
          }
        }
      );

    });

    return () => ctx.revert();
  }, [posts]);

  // Auto-advance slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.desktop.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-icon">
          <div className="tea-cup"></div>
        </div>
        <p>Brewing fresh stories...</p>
      </div>
    );
  }

  return (
    <div className="home-container">
      {/* Hero Section - Minimalist */}
      <section className="hero-section" ref={heroRef}>
        <div className="hero-image-container">
          <picture>
            <source 
              media="(max-width: 768px)" 
              srcSet={heroImages.mobile[currentSlide]}
            />
            <source 
              media="(min-width: 769px)" 
              srcSet={heroImages.desktop[currentSlide]}
            />
            <img
              src={heroImages.desktop[currentSlide]}
              alt="Kenyan landscape"
              className="hero-image"
              loading="eager"
            />
          </picture>
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-content">
          <div className="brand-mark">
            <div className="mark-icon">
              <i className="bi bi-cup-hot"></i>
            </div>
          </div>
          
          <h1 className="hero-title">
            <span className="highlight">Ngemi</span>Kenya
          </h1>
          
          <p className="hero-subtitle">
            Honest conversations about life, economics, and everything in between — 
            from a Kenyan perspective.
          </p>

          <div className="hero-indicators">
            {heroImages.desktop.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Welcome Message */}
      <section className="welcome-section" ref={welcomeRef}>
        <div className="container">
          <div className="welcome-card">
            <div className="welcome-header">
              <div className="icon-wrapper">
                <i className="bi bi-house-door"></i>
              </div>
              <h2>Karibu, Welcome</h2>
            </div>
            
            <div className="welcome-content">
              <p className="lead-text">
                This is where we talk about real things — the economy, daily life, 
                challenges, and opportunities in Kenya. No tech jargon, just honest 
                perspectives.
              </p>
              
              <div className="simple-stats">
                <div className="stat-item">
                  <i className="bi bi-chat-square-text"></i>
                  <div>
                    <h3>Stories</h3>
                    <p>Real experiences shared</p>
                  </div>
                </div>
                <div className="stat-item">
                  <i className="bi bi-people"></i>
                  <div>
                    <h3>Community</h3>
                    <p>Conversations that matter</p>
                  </div>
                </div>
                <div className="stat-item">
                  <i className="bi bi-lightbulb"></i>
                  <div>
                    <h3>Insights</h3>
                    <p>Practical perspectives</p>
                  </div>
                </div>
              </div>

              <Link to="/about" className="simple-btn">
                <i className="bi bi-person-circle"></i>
                More About This Space
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Stories */}
      {posts.length > 0 && (
        <section className="featured-story-section">
          <div className="container">
            <div className="section-header">
              <div className="icon-wrapper">
                <i className="bi bi-star"></i>
              </div>
              <h2>Featured Story</h2>
            </div>

            <div className="featured-story-card">
              <div className="story-image">
                <img
                  src={posts[0].image || "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                  alt={posts[0].title}
                  loading="lazy"
                />
                <div className="story-badge">
                  <i className="bi bi-bookmark-heart"></i>
                  Current Read
                </div>
              </div>
              
              <div className="story-content">
                <div className="story-meta">
                  <span className="date">
                    <i className="bi bi-calendar3"></i>
                    {new Date(posts[0].date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                
                <h3>{posts[0].title}</h3>
                
                {posts[0].excerpt && (
                  <p className="story-excerpt">
                    {posts[0].excerpt.slice(0, 150)}...
                  </p>
                )}
                
                <Link to={`/post/${posts[0].slug}`} className="story-link">
                  Read this story
                  <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* More Stories */}
      {posts.length > 1 && (
        <section className="stories-section" ref={storiesRef}>
          <div className="container">
            <div className="section-header">
              <div className="icon-wrapper">
                <i className="bi bi-journal-text"></i>
              </div>
              <h2>More Stories</h2>
              <p className="section-subtitle">
                Recent conversations and perspectives
              </p>
            </div>

            <div className="stories-grid">
              {posts.slice(1, 7).map((post, index) => (
                <article className="story-card" key={post.slug}>
                  <div className="card-image">
                    {post.image && (
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                      />
                    )}
                    <span className="card-date">
                      <i className="bi bi-clock"></i>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  
                  <div className="card-content">
                    <h4>{post.title}</h4>
                    
                    {post.excerpt && (
                      <p className="card-excerpt">
                        {post.excerpt.slice(0, 100)}...
                      </p>
                    )}
                    
                    <Link to={`/post/${post.slug}`} className="card-link">
                      Continue reading
                      <i className="bi bi-arrow-right"></i>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {posts.length > 7 && (
              <div className="stories-footer">
                <Link to="/posts" className="view-all-btn">
                  <i className="bi bi-grid"></i>
                  View all stories
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Community & Newsletter */}
      <section className="community-section" ref={communityRef}>
        <div className="container">
          <div className="community-card">
            <div className="community-icon">
              <i className="bi bi-chat-heart"></i>
            </div>
            
            <div className="community-content">
              <h3>Join the Conversation</h3>
              
              <p>
                Share your thoughts, experiences, and perspectives. 
                Let's build a community where Kenyan voices are heard.
              </p>
              
              <div className="community-actions">
                <Link to="/contact" className="community-btn">
                  <i className="bi bi-envelope"></i>
                  Share Your Story
                </Link>
                
                <form className="simple-newsletter">
                  <input
                    type="email"
                    placeholder="Your email for updates"
                    aria-label="Email for updates"
                  />
                  <button type="submit" className="subscribe-btn">
                    <i className="bi bi-send"></i>
                    Stay Updated
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Styles */}
      <style jsx global>{`
        :root {
          --coffee-brown: #6D4C41;
          --coffee-light: #8D6E63;
          --coffee-cream: #D7CCC8;
          --accent-gold: #FFD54F;
          --warm-white: #F5F1EA;
          --text-dark: #5D4037;
          --shadow-subtle: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
          background: var(--warm-white);
          color: var(--text-dark);
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
        }

        .home-container {
          min-height: 100vh;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        /* Loading State */
        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: var(--warm-white);
        }

        .loading-icon {
          width: 60px;
          height: 60px;
          margin-bottom: 1.5rem;
        }

        .tea-cup {
          width: 40px;
          height: 40px;
          border: 3px solid var(--coffee-brown);
          border-radius: 0 0 15px 15px;
          position: relative;
          margin: 0 auto;
          animation: brew 2s infinite;
        }

        .tea-cup:before {
          content: '';
          position: absolute;
          top: -10px;
          right: -15px;
          width: 15px;
          height: 25px;
          border: 3px solid var(--coffee-brown);
          border-left: none;
          border-radius: 0 10px 10px 0;
        }

        @keyframes brew {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        /* Hero Section */
        .hero-section {
          position: relative;
          height: 70vh;
          min-height: 500px;
          overflow: hidden;
        }

        .hero-image-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .hero-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.6);
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, 
            rgba(93, 64, 55, 0.3) 0%,
            rgba(93, 64, 55, 0.6) 100%
          );
        }

        .hero-content {
          position: relative;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
          text-align: center;
          padding: 2rem;
          z-index: 2;
        }

        .brand-mark {
          margin-bottom: 1.5rem;
        }

        .mark-icon {
          width: 60px;
          height: 60px;
          background: var(--accent-gold);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          color: var(--coffee-brown);
          margin: 0 auto;
        }

        .hero-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 300;
          margin-bottom: 0.5rem;
          letter-spacing: -0.5px;
        }

        .highlight {
          color: var(--accent-gold);
          font-weight: 700;
        }

        .hero-subtitle {
          font-size: clamp(1rem, 2vw, 1.3rem);
          max-width: 600px;
          opacity: 0.9;
          margin-bottom: 2rem;
          font-weight: 300;
        }

        .hero-indicators {
          display: flex;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .indicator {
          width: 30px;
          height: 2px;
          background: rgba(255, 255, 255, 0.3);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }

        .indicator.active {
          background: var(--accent-gold);
          width: 40px;
        }

        /* Welcome Section */
        .welcome-section {
          padding: 4rem 0;
          background: var(--warm-white);
        }

        .welcome-card {
          background: white;
          border-radius: 16px;
          padding: 3rem;
          box-shadow: var(--shadow-subtle);
          border: 1px solid var(--coffee-cream);
          max-width: 800px;
          margin: 0 auto;
        }

        .welcome-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .icon-wrapper {
          width: 60px;
          height: 60px;
          background: var(--coffee-cream);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          font-size: 1.8rem;
          color: var(--coffee-brown);
        }

        .welcome-header h2 {
          font-size: 2rem;
          color: var(--coffee-brown);
          font-weight: 600;
        }

        .lead-text {
          font-size: 1.2rem;
          color: var(--text-dark);
          text-align: center;
          margin-bottom: 2.5rem;
          line-height: 1.8;
        }

        .simple-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: var(--warm-white);
          border-radius: 12px;
          border: 1px solid var(--coffee-cream);
        }

        .stat-item i {
          font-size: 1.5rem;
          color: var(--coffee-brown);
        }

        .stat-item h3 {
          font-size: 1.1rem;
          color: var(--coffee-brown);
          margin-bottom: 0.25rem;
        }

        .stat-item p {
          font-size: 0.9rem;
          color: var(--text-dark);
          opacity: 0.8;
        }

        .simple-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: var(--coffee-brown);
          color: white;
          padding: 1rem 2rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 500;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          margin: 0 auto;
        }

        .simple-btn:hover {
          background: var(--coffee-light);
          transform: translateY(-2px);
        }

        /* Featured Story */
        .featured-story-section {
          padding: 4rem 0;
          background: var(--warm-white);
        }

        .section-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .section-header h2 {
          font-size: 1.8rem;
          color: var(--coffee-brown);
          margin-top: 0.5rem;
        }

        .section-subtitle {
          color: var(--text-dark);
          opacity: 0.8;
          margin-top: 0.5rem;
        }

        .featured-story-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: var(--shadow-subtle);
          border: 1px solid var(--coffee-cream);
          max-width: 900px;
          margin: 0 auto;
        }

        @media (min-width: 768px) {
          .featured-story-card {
            display: grid;
            grid-template-columns: 1fr 1fr;
            min-height: 350px;
          }
        }

        .story-image {
          position: relative;
          min-height: 250px;
        }

        .story-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .story-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: var(--accent-gold);
          color: var(--coffee-brown);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .story-content {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .story-meta {
          margin-bottom: 1rem;
        }

        .date {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-dark);
          opacity: 0.8;
          font-size: 0.9rem;
        }

        .story-content h3 {
          font-size: 1.5rem;
          color: var(--coffee-brown);
          margin-bottom: 1rem;
          line-height: 1.4;
        }

        .story-excerpt {
          color: var(--text-dark);
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .story-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--coffee-brown);
          text-decoration: none;
          font-weight: 600;
          transition: gap 0.3s ease;
        }

        .story-link:hover {
          gap: 0.75rem;
        }

        /* Stories Grid */
        .stories-section {
          padding: 4rem 0;
          background: white;
        }

        .stories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .story-card {
          background: var(--warm-white);
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid var(--coffee-cream);
          transition: all 0.3s ease;
        }

        .story-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-subtle);
        }

        .card-image {
          position: relative;
          height: 180px;
          overflow: hidden;
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .card-date {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(255, 255, 255, 0.9);
          color: var(--coffee-brown);
          padding: 0.5rem 0.75rem;
          border-radius: 4px;
          font-size: 0.85rem;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
        }

        .card-content {
          padding: 1.5rem;
        }

        .card-content h4 {
          font-size: 1.1rem;
          color: var(--coffee-brown);
          margin-bottom: 0.75rem;
          line-height: 1.4;
        }

        .card-excerpt {
          color: var(--text-dark);
          font-size: 0.95rem;
          line-height: 1.5;
          margin-bottom: 1rem;
          opacity: 0.9;
        }

        .card-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--coffee-brown);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.9rem;
        }

        .stories-footer {
          text-align: center;
        }

        .view-all-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: transparent;
          color: var(--coffee-brown);
          padding: 1rem 2rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 500;
          border: 1px solid var(--coffee-cream);
          transition: all 0.3s ease;
        }

        .view-all-btn:hover {
          background: var(--coffee-cream);
          transform: translateY(-2px);
        }

        /* Community Section */
        .community-section {
          padding: 4rem 0;
          background: var(--warm-white);
        }

        .community-card {
          background: white;
          border-radius: 16px;
          padding: 3rem;
          text-align: center;
          box-shadow: var(--shadow-subtle);
          border: 1px solid var(--coffee-cream);
          max-width: 600px;
          margin: 0 auto;
        }

        .community-icon {
          font-size: 3rem;
          color: var(--coffee-brown);
          margin-bottom: 1.5rem;
        }

        .community-content h3 {
          font-size: 1.8rem;
          color: var(--coffee-brown);
          margin-bottom: 1rem;
        }

        .community-content p {
          color: var(--text-dark);
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .community-actions {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: center;
        }

        .community-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: var(--coffee-brown);
          color: white;
          padding: 1rem 2rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .community-btn:hover {
          background: var(--coffee-light);
          transform: translateY(-2px);
        }

        .simple-newsletter {
          display: flex;
          gap: 0.5rem;
          width: 100%;
          max-width: 400px;
        }

        .simple-newsletter input {
          flex: 1;
          padding: 1rem;
          border: 1px solid var(--coffee-cream);
          border-radius: 8px;
          font-family: inherit;
          font-size: 1rem;
        }

        .simple-newsletter input:focus {
          outline: none;
          border-color: var(--coffee-brown);
        }

        .subscribe-btn {
          padding: 1rem 1.5rem;
          background: var(--accent-gold);
          color: var(--coffee-brown);
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .subscribe-btn:hover {
          background: #FFE082;
          transform: translateY(-2px);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .hero-section {
            height: 60vh;
            min-height: 400px;
          }
          
          .welcome-card,
          .community-card {
            padding: 2rem;
          }
          
          .stories-grid {
            grid-template-columns: 1fr;
          }
          
          .featured-story-card {
            grid-template-columns: 1fr;
          }
          
          .simple-newsletter {
            flex-direction: column;
          }
          
          .simple-stats {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 2rem;
          }
          
          .hero-subtitle {
            font-size: 1rem;
          }
          
          .welcome-card,
          .community-card {
            padding: 1.5rem;
          }
        }

        /* Accessibility */
        button:focus,
        a:focus {
          outline: 2px solid var(--accent-gold);
          outline-offset: 2px;
        }

        /* Print Styles */
        @media print {
          .hero-section,
          .community-section {
            display: none;
          }
        }
      `}</style>

      {/* Add Fonts and Icons */}
      <link 
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" 
        rel="stylesheet"
      />
    </div>
  );
};

export default Home;