import { pythonExecutor, javascriptExecutor, javaExecutor } from './languageExecutors';

const executeCode = async (code, input, language = 'javascript') => {
  try {
    // Clean up the code and handle both function and direct code
    const cleanedCode = preprocessCode(code, language);
    
    // Select appropriate executor based on language
    const executors = {
      'python': pythonExecutor,
      'javascript': javascriptExecutor,
      'java': javaExecutor
    };

    const executor = executors[language.toLowerCase()];
    if (!executor) {
      throw new Error(`Language ${language} is not supported`);
    }

    // Execute code with selected executor
    const result = executor(cleanedCode, input);

    return {
      success: true,
      result: result.result,
      output: result.output,
      executionTime: result.executionTime,
      memoryUsage: result.memoryUsage
    };

  } catch (error) {
    return {
      success: false,
      error: error.message,
      errorType: error.name,
      lineNumber: error.lineNumber
    };
  }
};

const preprocessCode = (code, language) => {
  switch (language.toLowerCase()) {
    case 'python':
      return preprocessPythonCode(code);
    case 'javascript':
      return preprocessJavaScriptCode(code);
    case 'java':
      return preprocessJavaCode(code);
    default:
      return code;
  }
};

const preprocessPythonCode = (code) => {
  // Handle both function and direct code
  const isFunction = code.includes('def ');
  
  if (!isFunction) {
    // Wrap direct code in a main block
    return `
if __name__ == "__main__":
    ${code.split('\n').join('\n    ')}
`;
  }
  return code;
};

const preprocessJavaScriptCode = (code) => {
  // Handle both function and direct code
  const isFunction = code.includes('function ');
  
  if (!isFunction) {
    // Wrap direct code in an IIFE (Immediately Invoked Function Expression)
    return `
(function() {
  ${code}
})();
`;
  }
  return code;
};

const preprocessJavaCode = (code) => {
  // Handle both function and direct code
  const isFunction = code.includes('public class') || code.includes('class');
  
  if (!isFunction) {
    // Wrap direct code in a main method
    return `
public class Solution {
    public static void main(String[] args) {
        ${code}
    }
}`;
  }
  return code;
};

export default executeCode; 