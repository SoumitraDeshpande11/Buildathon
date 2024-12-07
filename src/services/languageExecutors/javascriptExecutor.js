export const javascriptExecutor = (code, input) => {
  try {
    // Create a safe execution context
    const context = {
      input: input,
      console: {
        log: (...args) => context.output.push(args.join(' ')),
        error: (...args) => context.output.push(args.join(' '))
      },
      output: []
    };

    // Wrap code to capture return value and handle both function and direct code
    const wrappedCode = `
      try {
        ${code}
        // If code contains a function, try to execute it with input
        if (typeof ${getFunctionName(code)} === 'function') {
          return ${getFunctionName(code)}(...input);
        }
        // For direct code, return the last evaluated expression
        return eval('undefined'); // Default return if no explicit return
      } catch (e) {
        throw new Error(e.message);
      }
    `;

    const startTime = performance.now();
    const result = new Function('input', 'console', wrappedCode)
      .call(context, context.input, context.console);
    const endTime = performance.now();

    return {
      success: true,
      result: result,
      output: context.output.join('\n'),
      executionTime: endTime - startTime,
      memoryUsage: null
    };
  } catch (error) {
    throw new Error(`JavaScript Error: ${error.message}`);
  }
};

const getFunctionName = (code) => {
  const match = code.match(/function\s+([a-zA-Z_$][0-9a-zA-Z_$]*)/);
  return match ? match[1] : '';
}; 