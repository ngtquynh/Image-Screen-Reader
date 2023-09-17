// Output.js
import React from 'react';
import './Output.css';

const Output = ({ output }) => {
  return (
    <div className="container">
      <div className="output-container">
        <pre className="output-content">{output}</pre>
      </div>
    </div>
  );
};

export default Output;
