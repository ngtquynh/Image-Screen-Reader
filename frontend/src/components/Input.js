import React, { useState, useEffect } from "react";
import "./Input.css";
import { CodeBlock, dracula } from "react-code-blocks";

const Input = ({ selectedOptions }) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [output, setOutput] = useState(""); // State to store the generated output

  const handleChange = (e) => {
    setCode(e.target.value);
    setError(null);
  };

  useEffect(() => {
    if (!selectedOptions.language || !selectedOptions.framework) {
      setError("Please select both language and testing framework.");
    } else {
      setError(null);
    }
  }, [selectedOptions]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedOptions.language || !selectedOptions.framework) {
      return;
    }

    setLoading(true);

    fetch("http://localhost:8000/generate-tests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        functionCode: code,
        language: selectedOptions.language,
        framework: selectedOptions.framework,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error sending input data to the server");
        }
      })
      .then((data) => {
        // Set the output state with the generated output
        setOutput(data.unitTests);
      })
      .catch((error) => {
        setError(
          "An error occurred while generating unit tests. Please try again."
        );
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <textarea
            id="codeInput"
            className="form-control code-input"
            placeholder="Enter your code here"
            value={code}
            onChange={handleChange}
            disabled={!selectedOptions.language || !selectedOptions.framework}
          />
        </div>
        <div className="form-group">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={
              !selectedOptions.language || !selectedOptions.framework || loading
            }
          >
            {loading ? "Generating..." : "Generate Output"}
          </button>
        </div>
        
      </form>
      {error && <div className="error-message">{error}</div>}

        {/* Display the output here */}
        {output && (
          <div className="output">
            <h2>Generated Test Cases</h2>
            <CodeBlock
              text={output}
              language={selectedOptions.language} // Specify the language as needed
              showLineNumbers={true} // Specify whether to show line numbers
              theme={dracula}
              wrapLines={true}
            />
          </div>
        )}
    </div>
  );
};

export default Input;
