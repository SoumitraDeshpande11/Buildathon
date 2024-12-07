import executeCode from '../services/codeExecutionService';

const runCode = async (code, language) => {
  try {
    const result = await executeCode(code, [], language);
    return result;
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

export default runCode;