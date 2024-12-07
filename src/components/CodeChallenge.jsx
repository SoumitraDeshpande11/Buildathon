import React from 'react';
import { useCodeChallenges, useTreeGrowth, useAIChat } from '../utils/animations';
import '../styles/codeChallenge.scss';

const challenges = [
  {
    id: 1,
    title: 'Calculate Factorial',
    description: 'Write a function that calculates the factorial of a given number n.',
    example: {
      input: 'n = 5',
      output: '120',
      explanation: '5! = 5 × 4 × 3 × 2 × 1 = 120'
    },
    starterCode: `def factorial(n):
    # Write your code here
    pass

# Test your function
print(factorial(5))`
  },
  {
    id: 2,
    title: 'Palindrome Check',
    description: 'Write a function to check if a given string is a palindrome.',
    example: {
      input: '"radar"',
      output: 'True',
      explanation: '"radar" reads the same forwards and backwards'
    },
    starterCode: `def is_palindrome(text):
    # Write your code here
    pass

# Test your function
print(is_palindrome("radar"))
print(is_palindrome("hello"))`
  },
  {
    id: 3,
    title: 'FizzBuzz',
    description: 'Write a function that prints numbers from 1 to n. For multiples of 3, print "Fizz". For multiples of 5, print "Buzz". For numbers that are multiples of both 3 and 5, print "FizzBuzz".',
    example: {
      input: 'n = 15',
      output: '1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz',
      explanation: 'Numbers divisible by 3 and 5 show different outputs'
    },
    starterCode: `def fizzbuzz(n):
    # Write your code here
    pass

# Test your function
fizzbuzz(15)`
  }
];

const CodeChallenge = () => {
  const { currentChallenge, goToNextChallenge, goToPrevChallenge, isFirstChallenge, isLastChallenge } = 
    useCodeChallenges(challenges.length);
  const { level, isGrowing, growTree } = useTreeGrowth();
  const { messages, isTyping, simulateAIResponse, showHint } = useAIChat();

  const currentProblem = challenges[currentChallenge - 1];

  const handleRunCode = () => {
    // In a real implementation, this would validate the code
    growTree();
  };

  return (
    <section id="demo-challenge" className="demo-challenge">
      <h2>Try Demo Challenges</h2>
      <div className="challenge-container">
        <div className="challenge-wrapper">
          <div className="question-area">
            <h3>{currentProblem.title}</h3>
            <div className="problem-description">
              <p>{currentProblem.description}</p>
              <div className="example">
                <p><strong>Example:</strong></p>
                <p>Input: {currentProblem.example.input}</p>
                <p>Output: {currentProblem.example.output}</p>
                <p>Explanation: {currentProblem.example.explanation}</p>
              </div>
            </div>
          </div>
          <div className="code-area">
            <div className="code-editor">
              <div className="editor-header">
                <span className="language-label">Python</span>
                <button className="run-button" onClick={handleRunCode}>Run Code</button>
              </div>
              <div className="editor-content">
                <pre><code className="language-python">{currentProblem.starterCode}</code></pre>
              </div>
            </div>
            <div className="side-panel">
              <div className="tree-visualization">
                <h4>Your Progress Tree</h4>
                <div className="tree-container">
                  <div className={`growing-tree-visual ${isGrowing ? 'growing' : ''}`} />
                  <div className="tree-level">Level {level}</div>
                </div>
              </div>
              <div className="ai-helper">
                <div className="ai-helper-header">
                  <h4>AI Learning Assistant</h4>
                  <button className="help-button" onClick={showHint}>Get Help</button>
                </div>
                <div className="ai-chat-container">
                  <div className="ai-messages">
                    {messages.map(message => (
                      <div key={message.id} className={`ai-message ${message.type}`}>
                        {message.text}
                      </div>
                    ))}
                    {isTyping && <div className="ai-message typing">AI is typing...</div>}
                  </div>
                  <div className="ai-input">
                    <input 
                      type="text" 
                      placeholder="Ask about this challenge..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          simulateAIResponse(e.target.value);
                          e.target.value = '';
                        }
                      }}
                    />
                    <button 
                      className="send-button"
                      onClick={(e) => {
                        const input = e.target.closest('.ai-input').querySelector('input');
                        simulateAIResponse(input.value);
                        input.value = '';
                      }}
                    >
                      <i className="material-icons">send</i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="challenge-navigation">
            <button 
              className="nav-button prev-challenge" 
              disabled={isFirstChallenge}
              onClick={goToPrevChallenge}
            >
              Previous Challenge
            </button>
            <span className="challenge-counter">Challenge {currentChallenge}/3</span>
            <button 
              className="nav-button next-challenge"
              disabled={isLastChallenge}
              onClick={goToNextChallenge}
            >
              Next Challenge
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodeChallenge; 