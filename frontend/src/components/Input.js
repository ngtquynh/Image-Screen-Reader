import React, { useState, useEffect } from "react";
import "./Input.css";

const Input = ({ selectedOptions, onGenerateOutput }) => {
  // Pass onGenerateOutput as a prop
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
        // Call the callback function to pass the output data
        onGenerateOutput(data.output);
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
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};

export default Input;
