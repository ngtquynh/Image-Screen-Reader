import React from "react";
import "./Output.css";

import { CopyBlock, dracula } from "react-code-blocks";

const Output = ({ output }) => {
  return (
    <div className="container">
      <div className="output-container">
        {output ? (
          <CopyBlock
            text={output}
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
