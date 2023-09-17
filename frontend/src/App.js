import React, { useState } from "react";
import Options from "./components/Options";
import Input from "./components/Input";
import Output from "./components/Output"; // Import the Output component
import "./App.css";

function App() {
  const [code, setCode] = useState("");
  const [selectedOptions, setSelectedOptions] = useState({
    language: "",
    framework: "",
  });
  const [output, setOutput] = useState(""); // Add state for output

  const handleOptionsChange = (updatedOptions) => {
    setSelectedOptions(updatedOptions);
  };

  const handleGenerateOutput = (functionCode) => {
    // Check if both options are selected
    if (selectedOptions.language && selectedOptions.framework) {
      // Combine the input text with selected options
      const outputText =
        functionCode +
        " " +
        selectedOptions.language +
        " " +
        selectedOptions.framework;
      // setCode(outputText);

      // Set the output state with the generated output
      setOutput(outputText);
    } else {
      // Display an error message if options are not selected
      setCode(
        "Please select both language and testing framework before generating output."
      );
    }
  };

  return (
    <div className="app-container">
      <h1>Test Cases Generator</h1>
      <div className="options-section">
        <Options
          onChange={handleOptionsChange}
          selectedOptions={selectedOptions}
        />
      </div>
      <div className="input-output-row">
        <div className="input-section dark-mode">
          <h2>Input</h2>
          <Input
            onGenerateOutput={handleGenerateOutput}
            selectedOptions={selectedOptions}
          />
        </div>
        <div className="output-section">
          <h2>Generated Test Cases</h2>
          <Output output={output} /> {/* Pass the output data as a prop */}
        </div>
      </div>
    </div>
  );
}

export default App;
