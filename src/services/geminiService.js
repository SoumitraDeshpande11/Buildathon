import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generateCodingQuestion(difficulty = 'medium', topic = 'general') {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Generate a coding question and return it in JSON format with these exact fields:
    {
      "title": "Brief title of the problem",
      "difficulty": "${difficulty}",
      "description": "Detailed problem description",
      "examples": [
        {
          "input": "Example input",
          "output": "Expected output",
          "explanation": "Explanation of the example"
        }
      ],
      "constraints": ["List of constraints"],
      "testCases": [
        {
          "input": "Test input",
          "output": "Expected output"
        }
      ]
    }

    Make it a ${difficulty} difficulty ${topic} programming question.
    Return ONLY the JSON object, no markdown, no code blocks, no additional text.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean up the response by removing any markdown code blocks
    const cleanJson = text.replace(/```json\n?|\n?```/g, '').trim();
    
    try {
      return JSON.parse(cleanJson);
    } catch (parseError) {
      console.error('Failed to parse JSON:', parseError);
      console.log('Raw response:', text);
      throw new Error('Invalid response format from AI');
    }
  } catch (error) {
    console.error('Error generating question:', error);
    throw error;
  }
}

export async function evaluateCode(code, question) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
    Evaluate this code solution for the following programming question:

    QUESTION:
    ${question.title}
    ${question.description}

    TEST CASES:
    ${JSON.stringify(question.testCases, null, 2)}

    USER'S CODE:
    ${code}

    Please evaluate the solution and return a JSON object with this exact structure:
    {
      "isCorrect": boolean,
      "output": "What the code outputs",
      "feedback": "Detailed feedback about the solution",
      "suggestions": ["List of improvement suggestions"],
      "timeComplexity": "Big O notation if applicable"
    }

    Return ONLY the JSON object, no markdown, no code blocks, no additional text.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const cleanJson = text.replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error('Error evaluating code:', error);
    throw new Error('Failed to evaluate code solution');
  }
} 