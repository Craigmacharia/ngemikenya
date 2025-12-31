import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      {/* Decorative Coffee Steam */}
      <div className="coffee-steam">
        <div className="steam steam-1"></div>
        <div className="steam steam-2"></div>
        <div className="steam steam-3"></div>
      </div>

      <div className="privacy-header">
        <div className="header-icon">
          <i className="bi bi-shield-lock"></i>
        </div>
        <h1 className="privacy-title">
          Privacy <span className="highlight">Policy</span>
        </h1>
        <p className="privacy-subtitle">
          Brewed with transparency, served with trust
        </p>
      </div>

      <div className="privacy-content">
        <div className="privacy-card">
          <div className="card-header">
            <h2 className="card-title">
              <i className="bi bi-cup-hot"></i>
              Our Privacy Promise
            </h2>
            <div className="last-updated">
              <i className="bi bi-calendar-check"></i>
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>

          <div className="intro-section">
            <p className="intro-text">
              At <strong className="brand-name">NgemiKenya</strong>, we approach privacy like we approach our coffee — 
              with care, respect, and transparency. Just as we're committed to honest tech perspectives, 
              we're equally committed to protecting your digital space.
            </p>
            <div className="trust-badge">
              <i className="bi bi-check-circle"></i>
              <span>No data harvesting. No hidden agendas.</span>
            </div>
          </div>

          <div className="policy-sections">
            <section className="policy-section">
              <div className="section-header">
                <div className="section-icon">
                  <i className="bi bi-database"></i>
                </div>
                <h3>The Data We Collect</h3>
              </div>
              <div className="section-content">
                <p>
                  We keep it minimal — like a perfectly brewed espresso. You don't need an account to enjoy 
                  our insights. Any data collection is primarily through third-party services essential for 
                  delivering our content.
                </p>
                <div className="data-box">
                  <div className="data-item">
                    <i className="bi bi-check-lg essential"></i>
                    <span>Website analytics (anonymous)</span>
                  </div>
                  <div className="data-item">
                    <i className="bi bi-check-lg optional"></i>
                    <span>Newsletter subscriptions (opt-in)</span>
                  </div>
                  <div className="data-item">
                    <i className="bi bi-x-lg not-collected"></i>
                    <span>Personal identification data</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="policy-section">
              <div className="section-header">
                <div className="section-icon">
                  <i className="bi bi-cookie"></i>
                </div>
                <h3>Cookies & Tracking</h3>
              </div>
              <div className="section-content">
                <p>
                  We use cookies — think of them as the sugar in your coffee. They help personalize 
                  your experience but are entirely optional.
                </p>
                <div className="cookie-types">
                  <div className="cookie-type">
                    <div className="cookie-icon">
                      <i className="bi bi-star"></i>
                    </div>
                    <div className="cookie-info">
                      <h4>Essential Cookies</h4>
                      <p>Required for site functionality</p>
                    </div>
                  </div>
                  <div className="cookie-type">
                    <div className="cookie-icon">
                      <i className="bi bi-bar-chart"></i>
                    </div>
                    <div className="cookie-info">
                      <h4>Analytics Cookies</h4>
                      <p>Help us improve content</p>
                    </div>
                  </div>
                  <div className="cookie-type">
                    <div className="cookie-icon">
                      <i className="bi bi-megaphone"></i>
                    </div>
                    <div className="cookie-info">
                      <h4>Advertising Cookies</h4>
                      <p>Support our work (optional)</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="policy-section">
              <div className="section-header">
                <div className="section-icon">
                  <i className="bi bi-google"></i>
                </div>
                <h3>Google Services</h3>
              </div>
              <div className="section-content">
                <p>
                  We use Google AdSense to support our platform. Google's technology helps show relevant 
                  ads while respecting your privacy choices.
                </p>
                <div className="google-info">
                  <div className="google-option">
                    <i className="bi bi-toggle-on"></i>
                    <div>
                      <p><strong>You're in control</strong></p>
                      <p>Customize your ad experience anytime</p>
                    </div>
                    <a
                      href="https://policies.google.com/technologies/ads"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="google-link"
                    >
                      Manage Settings
                      <i className="bi bi-arrow-up-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <section className="policy-section">
              <div className="section-header">
                <div className="section-icon">
                  <i className="bi bi-shield-check"></i>
                </div>
                <h3>Third-Party Partners</h3>
              </div>
              <div className="section-content">
                <p>
                  We partner with trusted services to enhance your experience:
                </p>
                <div className="partners-showcase">
                  <div className="partner-card">
                    <div className="partner-logo google">
                      <i className="bi bi-google"></i>
                    </div>
                    <div className="partner-details">
                      <h4>Google Analytics</h4>
                      <p>Anonymous usage insights</p>
                    </div>
                  </div>
                  <div className="partner-card">
                    <div className="partner-logo social">
                      <i className="bi bi-share"></i>
                    </div>
                    <div className="partner-details">
                      <h4>Social Platforms</h4>
                      <p>Share & engagement tools</p>
                    </div>
                  </div>
                  <div className="partner-card">
                    <div className="partner-logo mail">
                      <i className="bi bi-envelope"></i>
                    </div>
                    <div className="partner-details">
                      <h4>Email Service</h4>
                      <p>Newsletter delivery</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="policy-section">
              <div className="section-header">
                <div className="section-icon">
                  <i className="bi bi-people"></i>
                </div>
                <h3>For Our Younger Readers</h3>
              </div>
              <div className="section-content">
                <p>
                  While our content is crafted for Kenya's tech community, we're mindful of all readers.
                </p>
                <div className="youth-protection">
                  <div className="protection-icon">
                    <i className="bi bi-shield-fill-check"></i>
                  </div>
                  <div className="protection-content">
                    <h4>Under 13? We've got you covered</h4>
                    <p>
                      We do not knowingly collect data from children under 13. If you believe information 
                      has been shared by a child, contact us immediately at{' '}
                      <strong>cmacharia482@gmail.com</strong>
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="policy-section">
              <div className="section-header">
                <div className="section-icon">
                  <i className="bi bi-globe-americas"></i>
                </div>
                <h3>Policy Scope</h3>
              </div>
              <div className="section-content">
                <p>
                  This policy applies to our online presence at NgemiKenya. It's our digital handshake — 
                  a commitment to transparency in our online interactions.
                </p>
                <div className="scope-visual">
                  <div className="scope-covered">
                    <i className="bi bi-check-circle"></i>
                    <span>Website & content</span>
                  </div>
                  <div className="scope-covered">
                    <i className="bi bi-check-circle"></i>
                    <span>Newsletter communications</span>
                  </div>
                  <div className="scope-covered">
                    <i className="bi bi-check-circle"></i>
                    <span>Community interactions</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="policy-section consent-section">
              <div className="section-header">
                <div className="section-icon">
                  <i className="bi bi-hand-thumbs-up-fill"></i>
                </div>
                <h3>Your Agreement</h3>
              </div>
              <div className="section-content">
                <div className="consent-card">
                  <div className="consent-visual">
                    <div className="coffee-mug">
                      <div className="mug-handle"></div>
                      <div className="coffee-liquid"></div>
                      <div className="coffee-foam"></div>
                    </div>
                  </div>
                  <div className="consent-message">
                    <h4>Like agreeing to brew rules</h4>
                    <p>
                      By engaging with NgemiKenya, you're accepting these terms — 
                      a simple agreement between tech enthusiasts who value transparency 
                      and community trust.
                    </p>
                    <p className="signature">
                      — The NgemiKenya Team
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="contact-ribbon">
            <i className="bi bi-chat-dots"></i>
            <div className="ribbon-content">
              <p>Questions about our privacy practices?</p>
              <a href="mailto:cmacharia482@gmail.com?subject=Privacy Policy Inquiry">
                Let's chat over (virtual) coffee
              </a>
            </div>
          </div>
        </div>

        <div className="navigation-actions">
          <Link to="/" className="nav-btn home-btn">
            <i className="bi bi-house"></i>
            Back to Home
          </Link>
          <Link to="/contact" className="nav-btn contact-btn">
            <i className="bi bi-envelope"></i>
            Contact Us
          </Link>
        </div>

        <div className="footer-commitment">
          <div className="commitment-icon">
            <i className="bi bi-cup-hot-fill"></i>
          </div>
          <p className="commitment-text">
            Brewing honest tech conversations while protecting your digital space
          </p>
        </div>
      </div>

      <style jsx>{`
        /* Base Container */
        .privacy-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #5D4037 0%, #6D4C41 30%, #8D6E63 100%);
          font-family: 'Comfortaa', -apple-system, BlinkMacSystemFont, sans-serif;
          color: #FAFAFA;
          position: relative;
          overflow: hidden;
          padding: 2rem 1rem 4rem;
        }

        /* Coffee Steam Animation */
        .coffee-steam {
          position: absolute;
          top: 100px;
          right: 10%;
          width: 100px;
          height: 200px;
          pointer-events: none;
          z-index: 1;
        }

        .steam {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          animation: steam-rise 8s infinite linear;
        }

        .steam-1 {
          width: 40px;
          height: 40px;
          left: 20px;
          animation-delay: 0s;
        }

        .steam-2 {
          width: 30px;
          height: 30px;
          left: 40px;
          animation-delay: 2s;
        }

        .steam-3 {
          width: 35px;
          height: 35px;
          left: 5px;
          animation-delay: 4s;
        }

        @keyframes steam-rise {
          0% {
            transform: translateY(0) scale(0.8);
            opacity: 0;
          }
          20% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.1;
          }
          100% {
            transform: translateY(-150px) scale(1.2);
            opacity: 0;
          }
        }

        /* Header */
        .privacy-header {
          text-align: center;
          margin-bottom: 3rem;
          position: relative;
          z-index: 2;
        }

        .header-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #FFD54F 0%, #FFB300 100%);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          color: #5D4037;
          font-size: 2.5rem;
          box-shadow: 0 10px 30px rgba(255, 213, 79, 0.3);
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .privacy-title {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 800;
          background: linear-gradient(135deg, #FFFFFF 0%, #FFD54F 50%, #FFFFFF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
          line-height: 1.2;
        }

        .highlight {
          color: #FFD54F;
          -webkit-text-fill-color: #FFD54F;
          text-shadow: 0 0 20px rgba(255, 213, 79, 0.4);
        }

        .privacy-subtitle {
          color: rgba(255, 255, 255, 0.8);
          font-size: 1.1rem;
          font-weight: 300;
          letter-spacing: 1px;
        }

        /* Main Content Card */
        .privacy-content {
          max-width: 1000px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .privacy-card {
          background: rgba(77, 58, 49, 0.9);
          backdrop-filter: blur(10px);
          border-radius: 24px;
          padding: 2.5rem;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 213, 79, 0.2);
          margin-bottom: 2rem;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 2px solid rgba(255, 213, 79, 0.3);
        }

        @media (max-width: 768px) {
          .card-header {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
        }

        .card-title {
          font-size: 1.8rem;
          color: #FFD54F;
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 0;
        }

        .card-title i {
          color: #FFD54F;
          font-size: 1.5rem;
        }

        .last-updated {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
          background: rgba(255, 213, 79, 0.1);
          padding: 0.5rem 1rem;
          border-radius: 10px;
          border: 1px solid rgba(255, 213, 79, 0.3);
        }

        .last-updated i {
          color: #FFD54F;
        }

        /* Intro Section */
        .intro-section {
          margin-bottom: 2.5rem;
        }

        .intro-text {
          font-size: 1.1rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 1.5rem;
        }

        .brand-name {
          color: #FFD54F;
          font-weight: 700;
        }

        .trust-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(76, 175, 80, 0.15);
          padding: 1rem 1.5rem;
          border-radius: 12px;
          border: 1px solid rgba(76, 175, 80, 0.3);
          color: #A5D6A7;
        }

        .trust-badge i {
          color: #4CAF50;
          font-size: 1.2rem;
        }

        /* Policy Sections */
        .policy-sections {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        .policy-section {
          padding-bottom: 2.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .policy-section:last-of-type {
          border-bottom: none;
          padding-bottom: 0;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .section-icon {
          width: 50px;
          height: 50px;
          background: rgba(255, 213, 79, 0.1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFD54F;
          font-size: 1.5rem;
          border: 1px solid rgba(255, 213, 79, 0.2);
        }

        .section-header h3 {
          font-size: 1.5rem;
          color: #FFD54F;
          margin: 0;
        }

        .section-content {
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.7;
        }

        .section-content p {
          margin-bottom: 1rem;
        }

        .section-content strong {
          color: #FFD54F;
        }

        /* Data Box */
        .data-box {
          background: rgba(93, 64, 55, 0.5);
          border-radius: 12px;
          padding: 1.5rem;
          margin: 1.5rem 0;
        }

        .data-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .data-item:last-child {
          border-bottom: none;
        }

        .data-item i {
          font-size: 1.2rem;
        }

        .essential {
          color: #4CAF50;
        }

        .optional {
          color: #FF9800;
        }

        .not-collected {
          color: #F44336;
        }

        /* Cookie Types */
        .cookie-types {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin: 1.5rem 0;
        }

        .cookie-type {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: transform 0.3s ease;
        }

        .cookie-type:hover {
          transform: translateY(-5px);
          border-color: rgba(255, 213, 79, 0.3);
        }

        .cookie-icon {
          width: 50px;
          height: 50px;
          background: rgba(255, 213, 79, 0.1);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          color: #FFD54F;
          font-size: 1.5rem;
        }

        .cookie-info h4 {
          color: #FFD54F;
          margin: 0 0 0.5rem 0;
          font-size: 1.1rem;
        }

        .cookie-info p {
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
          font-size: 0.9rem;
        }

        /* Google Info */
        .google-info {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(66, 133, 244, 0.1));
          border-radius: 12px;
          padding: 1.5rem;
          margin: 1.5rem 0;
          border: 1px solid rgba(66, 133, 244, 0.2);
        }

        .google-option {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        @media (max-width: 768px) {
          .google-option {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.5rem;
          }
        }

        .google-option i {
          color: #4285F4;
          font-size: 1.5rem;
        }

        .google-option > div {
          flex: 1;
        }

        .google-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #4285F4;
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .google-link:hover {
          background: #3367D6;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(66, 133, 244, 0.3);
        }

        /* Partners Showcase */
        .partners-showcase {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin: 1.5rem 0;
        }

        .partner-card {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .partner-card:hover {
          border-color: rgba(255, 213, 79, 0.3);
          transform: translateY(-3px);
        }

        .partner-logo {
          width: 50px;
          height: 50px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .google {
          background: rgba(66, 133, 244, 0.1);
          color: #4285F4;
        }

        .social {
          background: rgba(29, 161, 242, 0.1);
          color: #1DA1F2;
        }

        .mail {
          background: rgba(234, 67, 53, 0.1);
          color: #EA4335;
        }

        .partner-details h4 {
          color: #FFD54F;
          margin: 0 0 0.25rem 0;
          font-size: 1.1rem;
        }

        .partner-details p {
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
          font-size: 0.9rem;
        }

        /* Youth Protection */
        .youth-protection {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 1.5rem;
          margin: 1.5rem 0;
          display: flex;
          gap: 1.5rem;
          align-items: center;
          border: 1px solid rgba(255, 193, 7, 0.2);
        }

        @media (max-width: 768px) {
          .youth-protection {
            flex-direction: column;
            text-align: center;
          }
        }

        .protection-icon {
          width: 60px;
          height: 60px;
          background: rgba(255, 193, 7, 0.1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFC107;
          font-size: 2rem;
          flex-shrink: 0;
        }

        .protection-content h4 {
          color: #FFC107;
          margin: 0 0 0.5rem 0;
        }

        .protection-content p {
          margin: 0;
          color: rgba(255, 255, 255, 0.85);
        }

        /* Scope Visual */
        .scope-visual {
          background: rgba(93, 64, 55, 0.5);
          border-radius: 12px;
          padding: 1.5rem;
          margin: 1.5rem 0;
        }

        .scope-covered {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .scope-covered:last-child {
          border-bottom: none;
        }

        .scope-covered i {
          color: #4CAF50;
          font-size: 1.2rem;
        }

        .scope-covered span {
          color: rgba(255, 255, 255, 0.9);
        }

        /* Consent Section */
        .consent-section {
          background: linear-gradient(135deg, rgba(255, 213, 79, 0.05), rgba(255, 179, 0, 0.02));
          border-radius: 16px;
          padding: 2rem;
          margin-top: 1rem;
        }

        .consent-card {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        @media (max-width: 768px) {
          .consent-card {
            flex-direction: column;
            text-align: center;
          }
        }

        .consent-visual {
          flex-shrink: 0;
        }

        .coffee-mug {
          width: 100px;
          height: 100px;
          background: #8D6E63;
          border-radius: 50% 50% 10px 10px;
          position: relative;
          border: 3px solid #5D4037;
        }

        .mug-handle {
          position: absolute;
          right: -20px;
          top: 30px;
          width: 20px;
          height: 40px;
          background: #8D6E63;
          border-radius: 0 10px 10px 0;
          border: 3px solid #5D4037;
          border-left: none;
        }

        .coffee-liquid {
          position: absolute;
          bottom: 0;
          left: 5px;
          right: 5px;
          height: 70px;
          background: #5D4037;
          border-radius: 50% 50% 5px 5px;
        }

        .coffee-foam {
          position: absolute;
          top: 5px;
          left: 5px;
          right: 5px;
          height: 20px;
          background: rgba(255, 213, 79, 0.3);
          border-radius: 50%;
        }

        .consent-message h4 {
          color: #FFD54F;
          font-size: 1.3rem;
          margin: 0 0 1rem 0;
        }

        .consent-message p {
          color: rgba(255, 255, 255, 0.9);
          margin: 0 0 1rem 0;
        }

        .signature {
          color: #FFD54F;
          font-style: italic;
          font-weight: 300;
          margin-top: 1rem !important;
        }

        /* Contact Ribbon */
        .contact-ribbon {
          background: linear-gradient(135deg, #FFD54F 0%, #FFB300 100%);
          border-radius: 12px;
          padding: 1.5rem;
          margin-top: 2rem;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          color: #5D4037;
        }

        .contact-ribbon i {
          font-size: 2rem;
        }

        .ribbon-content {
          flex: 1;
        }

        .ribbon-content p {
          margin: 0 0 0.5rem 0;
          font-weight: 600;
        }

        .ribbon-content a {
          color: #5D4037;
          text-decoration: none;
          font-weight: 700;
          border-bottom: 2px solid currentColor;
          padding-bottom: 2px;
          transition: all 0.3s ease;
        }

        .ribbon-content a:hover {
          opacity: 0.8;
        }

        /* Navigation Actions */
        .navigation-actions {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin: 3rem 0;
        }

        @media (max-width: 768px) {
          .navigation-actions {
            flex-direction: column;
            align-items: center;
          }
        }

        .nav-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 2rem;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .home-btn {
          background: #5D4037;
          color: #FFD54F;
          border-color: #FFD54F;
        }

        .home-btn:hover {
          background: #FFD54F;
          color: #5D4037;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 213, 79, 0.3);
        }

        .contact-btn {
          background: transparent;
          color: #FFD54F;
          border-color: #FFD54F;
        }

        .contact-btn:hover {
          background: rgba(255, 213, 79, 0.1);
          transform: translateY(-2px);
        }

        /* Footer Commitment */
        .footer-commitment {
          text-align: center;
          padding: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          margin-top: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }

        .commitment-icon {
          color: #FFD54F;
          font-size: 1.5rem;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .commitment-text {
          color: rgba(255, 255, 255, 0.8);
          font-size: 1rem;
          font-style: italic;
          margin: 0;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .privacy-container {
            padding: 1.5rem 1rem 3rem;
          }

          .privacy-card {
            padding: 1.5rem;
          }

          .coffee-steam {
            display: none;
          }

          .header-icon {
            width: 60px;
            height: 60px;
            font-size: 2rem;
          }

          .card-title {
            font-size: 1.5rem;
          }

          .section-header h3 {
            font-size: 1.3rem;
          }

          .cookie-types {
            grid-template-columns: 1fr;
          }

          .partners-showcase {
            grid-template-columns: 1fr;
          }
        }

        /* Print Styles */
        @media print {
          .privacy-container {
            background: white !important;
            color: black !important;
          }

          .coffee-steam,
          .nav-btn,
          .contact-ribbon {
            display: none !important;
          }

          .privacy-card {
            background: white !important;
            box-shadow: none !important;
            border: 1px solid #ddd !important;
          }

          .privacy-title {
            background: none !important;
            -webkit-text-fill-color: black !important;
            color: black !important;
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
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" 
      />
    </div>
  );
};

export default PrivacyPolicy;
