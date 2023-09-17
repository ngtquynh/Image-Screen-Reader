import OpenAI from "openai";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Retrieve the API key from the environment variables
const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({ apiKey: apiKey });

export async function generateUnitTests(inputCode, language, framework) {
  try {
    // Check if the input is valid code
    if (!isValidCode(inputCode)) {
      return "The input is not code. Please provide valid code for unit test generation.";
    }

    // Generate unit tests using OpenAI
    const completion = await openai.completions.create({
      model: "text-davinci-003",
      prompt: `Generate unit tests for this function written in ${language} using the ${framework} testing framework: ${inputCode}`,
      max_tokens: 300,
      temperature: 0,
    });

    return completion.choices[0].text;
  } catch (error) {
    console.error("Error generating unit tests:", error);
    return "An error occurred while generating unit tests.";
  }
}

function isValidCode(code) {
  // You can implement a basic code validation check here
  // For simplicity, let's check if it contains the word 'function'
  return code.includes("function");
}

console.log(await generateUnitTests("function add(a,b) return a + b", "JavaScript", "Jest"));
