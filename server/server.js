import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { generateUnitTests } from "./index.mjs";

const app = express();

const port = process.env.PORT || 8000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

// Get route
app.get("/message", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// Route to generate unit tests
app.post("/generate-tests", async (req, res) => {
  try {
    const { functionCode, language, framework } = req.body;

    console.log("Received request with functionCode:", functionCode);
    console.log("Language:", language);
    console.log("Framework:", framework);

    // Call the OpenAI API with the provided data and get unit tests
    const unitTests = await generateUnitTests(
      functionCode,
      language,
      framework
    );

    console.log("Generated unit tests:", unitTests);

    res.json({ unitTests });
  } catch (error) {
    console.error("Error generating unit tests:", error);
    res
      .status(500)
      .json({ error: "An error occurred while generating unit tests." });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port 8000.`);
});
