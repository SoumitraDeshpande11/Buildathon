import React, { useState, useEffect } from 'react';
import { generateCodingQuestion, evaluateCode } from '../services/geminiService';
import '../styles/codeeditor.scss';

function CodeEditor() {
  const [question, setQuestion] = useState(null);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [evaluation, setEvaluation] = useState(null);
  const [evaluating, setEvaluating] = useState(false);

  useEffect(() => {
    loadNewQuestion();
  }, []);

  const loadNewQuestion = async () => {
    try {
      setLoading(true);
      setError(null);
      setEvaluation(null);
      const newQuestion = await generateCodingQuestion();
      setQuestion(newQuestion);
      setCode('// Write your code here\n\n');
    } catch (err) {
      setError('Failed to load question: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRunCode = async () => {
    try {
      setEvaluating(true);
      setError(null);
      const result = await evaluateCode(code, question);
      setEvaluation(result);
    } catch (err) {
      setError('Failed to evaluate code: ' + err.message);
    } finally {
      setEvaluating(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading question...</div>;
  }

  if (error) {
    return (
      <div className="error">
        {error}
        <button onClick={loadNewQuestion}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="code-editor">
      <div className="question-panel">
        <h2>{question?.title}</h2>
        <div className="difficulty">{question?.difficulty}</div>
        <div className="description">{question?.description}</div>
        
        <h3>Examples:</h3>
        {question?.examples.map((example, index) => (
          <div key={index} className="example">
            <div><strong>Input:</strong> {example.input}</div>
            <div><strong>Output:</strong> {example.output}</div>
            <div><strong>Explanation:</strong> {example.explanation}</div>
          </div>
        ))}

        <h3>Constraints:</h3>
        <ul>
          {question?.constraints.map((constraint, index) => (
            <li key={index}>{constraint}</li>
          ))}
        </ul>

        <button onClick={loadNewQuestion} className="new-question">
          Generate New Question
        </button>

        {evaluation && (
          <div className={`evaluation ${evaluation.isCorrect ? 'correct' : 'incorrect'}`}>
            <h3>Evaluation Results:</h3>
            <div className="result">
              <strong>Status:</strong> {evaluation.isCorrect ? 'Correct!' : 'Incorrect'}
            </div>
            <div className="output">
              <strong>Output:</strong> {evaluation.output}
            </div>
            <div className="feedback">
              <strong>Feedback:</strong> {evaluation.feedback}
            </div>
            {evaluation.suggestions.length > 0 && (
              <div className="suggestions">
                <strong>Suggestions:</strong>
                <ul>
                  {evaluation.suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            )}
            {evaluation.timeComplexity && (
              <div className="complexity">
                <strong>Time Complexity:</strong> {evaluation.timeComplexity}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="editor-panel">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Write your solution here..."
          className="code-textarea"
        />
        <button 
          onClick={handleRunCode} 
          className="run-code"
          disabled={evaluating}
        >
          {evaluating ? 'Evaluating...' : 'Run Code'}
        </button>
      </div>
    </div>
  );
}

export default CodeEditor; 