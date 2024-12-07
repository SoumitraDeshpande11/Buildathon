import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/landingPage.scss';

function LandingPage() {
  return (
    <div className="landing-page">
      <section className="hero">
        <h1>Welcome to CodeSprout</h1>
        <p>Your interactive coding playground for learning and growth</p>
        <div className="cta-buttons">
          <Link to="/code" className="primary-button">
            Start Coding
          </Link>
          <Link to="/learn" className="secondary-button">
            Learn More
          </Link>
        </div>
      </section>
      
      <section className="features">
        <h2>Why CodeSprout?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Interactive Learning</h3>
            <p>Learn by doing with our interactive code editor</p>
          </div>
          <div className="feature-card">
            <h3>Real-time Feedback</h3>
            <p>Get instant feedback on your code</p>
          </div>
          <div className="feature-card">
            <h3>Multiple Languages</h3>
            <p>Support for various programming languages</p>
          </div>
          <div className="feature-card">
            <h3>Save & Share</h3>
            <p>Save your progress and share with others</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage; 