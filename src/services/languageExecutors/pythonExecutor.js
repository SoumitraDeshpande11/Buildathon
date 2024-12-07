export const pythonExecutor = (code, input) => {
  try {
    // Prepare Python code with input handling
    const preparedCode = preparePythonCode(code, input);
    
    // Set up Python environment (using Pyodide)
    const pyodide = window.pyodide;
    
    // Create output capture
    const stdout = [];
    pyodide.setStdout({ write: (text) => stdout.push(text) });
    
    const startTime = performance.now();
    const result = pyodide.runPython(preparedCode);
    const endTime = performance.now();
    
    return {
      success: true,
      result: formatPythonResult(result),
      output: stdout.join(''),
      executionTime: endTime - startTime,
      memoryUsage: null
    };
  } catch (error) {
    throw new Error(`Python Error: ${error.message}`);
  }
};

const preparePythonCode = (code, input) => {
  // Handle both function and direct code
  const isFunctionDef = code.includes('def ');
  
  if (isFunctionDef) {
    const functionName = getFunctionName(code);
    return `
${code}

# Execute function with input
result = ${functionName}(*${JSON.stringify(input)})
print(result)
`;
  } else {
    // For direct code, make input available as variables
    const inputSetup = input.map((val, idx) => `input_${idx} = ${JSON.stringify(val)}`).join('\n');
    return `
${inputSetup}
${code}
`;
  }
};

const getFunctionName = (code) => {
  const match = code.match(/def\s+([a-zA-Z_][a-zA-Z0-9_]*)/);
  return match ? match[1] : '';
};

const formatPythonResult = (result) => {
  if (result === null) return 'None';
  if (typeof result === 'boolean') return result ? 'True' : 'False';
  return result;
}; 