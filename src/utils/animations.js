import { useEffect, useRef, useState } from 'react';

// Custom hook for scroll reveal animation
export const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach(element => observer.observe(element));

    return () => {
      elements.forEach(element => observer.unobserve(element));
    };
  }, []);
};

// Custom hook for smooth scrolling
export const useSmoothScroll = () => {
  useEffect(() => {
    const handleClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;

      e.preventDefault();
      const element = document.querySelector(target.getAttribute('href'));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
};

// Custom hook for particle animation
export const useParticles = (containerRef) => {
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'ai-particle';
      
      const left = Math.random() * 100;
      const delay = Math.random() * 2;
      const duration = 3 + Math.random() * 2;
      
      particle.style.left = `${left}%`;
      particle.style.animation = `particle-float ${duration}s ${delay}s infinite`;
      
      container.appendChild(particle);
    }

    return () => {
      container.innerHTML = '';
    };
  }, []);
};

// Custom hook for typing animation
export const useTypewriter = (text, speed = 50) => {
  const [displayText, setDisplayText] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);

  useEffect(() => {
    if (cursorPosition < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[cursorPosition]);
        setCursorPosition(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [text, cursorPosition, speed]);

  return { displayText, isTyping: cursorPosition < text.length };
};

// Custom hook for code challenge navigation
export const useCodeChallenges = (totalChallenges) => {
  const [currentChallenge, setCurrentChallenge] = useState(1);

  const goToNextChallenge = () => {
    if (currentChallenge < totalChallenges) {
      setCurrentChallenge(prev => prev + 1);
    }
  };

  const goToPrevChallenge = () => {
    if (currentChallenge > 1) {
      setCurrentChallenge(prev => prev - 1);
    }
  };

  return {
    currentChallenge,
    goToNextChallenge,
    goToPrevChallenge,
    isFirstChallenge: currentChallenge === 1,
    isLastChallenge: currentChallenge === totalChallenges
  };
};

// Custom hook for tree growth animation
export const useTreeGrowth = () => {
  const [level, setLevel] = useState(1);
  const [isGrowing, setIsGrowing] = useState(false);

  const growTree = () => {
    setIsGrowing(true);
    setTimeout(() => {
      setLevel(prev => prev + 1);
      setIsGrowing(false);
    }, 2000); // Match the animation duration
  };

  return { level, isGrowing, growTree };
};

// Custom hook for AI chat
export const useAIChat = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const addMessage = (text, type) => {
    setMessages(prev => [...prev, { text, type, id: Date.now() }]);
  };

  const simulateAIResponse = (question) => {
    addMessage(question, 'user');
    setIsTyping(true);

    setTimeout(() => {
      const response = "Here's a hint: Try breaking down the problem into smaller steps. First, think about how you would calculate this manually, then convert those steps into code.";
      addMessage(response, 'ai');
      setIsTyping(false);
    }, 1000);
  };

  const showHint = () => {
    const hint = "Let me help you get started! Here's a step-by-step approach to solve this challenge...";
    addMessage(hint, 'ai');
  };

  return { messages, isTyping, simulateAIResponse, showHint };
};

// Custom hook for floating code elements
export const useFloatingElements = () => {
  const elements = [
    '{}', '</>', 'if()', '=>', '[ ]', 'def', 'class', '&&',
    'for()', 'while', 'return', 'import', 'print()', '#code',
    'var', 'const'
  ];

  const binaryElements = ['01', '10', '00', '11'];

  return { elements, binaryElements };
}; 