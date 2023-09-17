import React from "react";
import "./Output.css";

import { CodeBlock, dracula } from "react-code-blocks";

const Output = ({ unitTests }) => {
  return (
    <div className="container">
      <div className="output-container">
        {unitTests ? (
          <CodeBlock
            text={unitTests}
            language="javascript" // Specify the language as needed
            showLineNumbers={true} // Specify whether to show line numbers
            theme={dracula}
            
          />
        ) : (
          <p>No output available.</p>
        )}
      </div>
    </div>
  );
};

export default Output;
