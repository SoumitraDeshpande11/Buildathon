import React, { useRef } from 'react';
import { useTypewriter, useParticles } from '../utils/animations';
import '../styles/aiFeature.scss';

const AIFeature = () => {
  const particlesRef = useRef(null);
  const { displayText, isTyping } = useTypewriter(`if stuck_on_problem:
    ai_assistant.help()
    understanding += 1
while learning:
    skills.grow()`);

  useParticles(particlesRef);

  return (
    <section className="ai-feature">
      <h2>AI-Powered Learning Companion</h2>
      <div className="ai-feature-container">
        <div className="ai-feature-visual">
          <div className="code-animation">
            <pre>
              <code className="typing-code">{displayText}</code>
              <div className={`cursor ${!isTyping ? 'blink' : ''}`} />
            </pre>
          </div>
          <div ref={particlesRef} className="ai-particles" />
        </div>
        <div className="ai-feature-content">
          <h3>Meet Your Personal AI Coding Mentor</h3>
          <ul className="ai-benefits">
            <li>
              <i className="material-icons">psychology</i>
              <div>
                <h4>Smart Hints</h4>
                <p>Get contextual hints that guide you without giving away the solution</p>
              </div>
            </li>
            <li>
              <i className="material-icons">school</i>
              <div>
                <h4>Learn Concepts</h4>
                <p>Understand the underlying principles through AI-powered explanations</p>
              </div>
            </li>
            <li>
              <i className="material-icons">trending_up</i>
              <div>
                <h4>Adaptive Learning</h4>
                <p>Receive personalized guidance based on your progress and learning style</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AIFeature; 