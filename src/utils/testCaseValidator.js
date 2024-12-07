export const validateTestCase = (result, expected, language) => {
  // Handle different output formats per language
  const formatters = {
    'python': formatPythonOutput,
    'javascript': formatJavaScriptOutput,
    'java': formatJavaOutput
  };

  const formatter = formatters[language.toLowerCase()] || formatJavaScriptOutput;
  
  const formattedResult = formatter(result);
  const formattedExpected = formatter(expected);
  
  return {
    passed: formattedResult === formattedExpected,
    expected: formattedExpected,
    received: formattedResult
  };
};

const formatPythonOutput = (output) => {
  // Handle Python-specific output formatting
  return String(output).trim()
    .replace(/\r\n/g, '\n')
    .replace(/None/g, 'None')
    .replace(/True/g, 'true')
    .replace(/False/g, 'false');
};

const formatJavaScriptOutput = (output) => {
  // Handle JavaScript-specific output formatting
  return String(output).trim();
};

const formatJavaOutput = (output) => {
  // Handle Java-specific output formatting
  return String(output).trim()
    .replace(/\r\n/g, '\n')
    .replace(/null/g, 'null');
}; 