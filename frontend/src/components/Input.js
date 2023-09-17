import React, { useState } from "react";
import "./Input.css";

const Input = ({ onGenerateOutput, selectedOptions }) => {
  const [code, setCode] = useState("");

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedOptions.language && selectedOptions.framework) {
      // Send input data to the backend
      // Use the `code` state to send the user-entered code
      fetch("http://localhost:8000/generate-tests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          functionCode: code, // Use the `code` state here
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
          // Handle the response data if needed
          // For example, you can update state or display a message to the user
          onGenerateOutput(data.output);
        })
        .catch((error) => {
          // Handle errors
          console.error(error);
        });
    }
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
            disabled={!selectedOptions.language || !selectedOptions.framework}
          >
            Generate Output
          </button>
        </div>
      </form>
    </div>
  );
};

export default Input;
