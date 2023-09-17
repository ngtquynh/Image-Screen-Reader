import React, { useState } from "react";
import Options from "./components/Options";
import Input from "./components/Input";
import Output from "./components/Output";
import "./App.css";

function App() {
  const [code, setCode] = useState(["", "", ""]); // Initialize code as an array
  const [selectedOptions, setSelectedOptions] = useState({
    language: "",
    framework: "",
  });

  const handleOptionsChange = (updatedOptions) => {
    setSelectedOptions(updatedOptions);
  };

  const handleGenerateOutput = (inputText) => {
    // Check if both options are selected
    if (selectedOptions.language && selectedOptions.framework) {
      // Update the code array with inputText, language, and framework
      setCode([inputText, selectedOptions.language, selectedOptions.framework]);

      // Send the code array to the backend
      sendCodeToBackend([inputText, selectedOptions.language, selectedOptions.framework]);
    } else {
      // Display an error message if options are not selected
      setCode([
        "Please select both language and testing framework before generating output.",
        "",
        "",
      ]);
    }
  };

  const sendCodeToBackend = (codeArray) => {
    // Send the code array to the Express backend
    fetch("http://localhost:8000/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: codeArray }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend if needed
        console.log("Backend response:", data);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error sending data to backend:", error);
      });
  };

  return (
    <div className="app-container">
      <h1>Test Cases Generator</h1>
      <div className="options-section">
        <Options onChange={handleOptionsChange} selectedOptions={selectedOptions} />
      </div>
      <div className="input-output-row">
        <div className="input-section dark-mode">
          <h2>Input</h2>
          <Input onGenerateOutput={handleGenerateOutput} selectedOptions={selectedOptions} />
        </div>
        <div className="output-section">
          <h2>Generated Test Cases</h2>
          <Output output={code[0]} /> {/* Display the inputText from the code array */}
        </div>
      </div>
    </div>
  );
}

export default App;
