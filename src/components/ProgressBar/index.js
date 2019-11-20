import React from "react";
import "./styles.css";

function ProgressBar({ percentage = 0 }) {
  return (
    <div className="bar-light-grey bar-tiny">
      <div
        className="bar-container bar-green"
        style={{ width: `${percentage}%` }}
      >
        {percentage}%
      </div>
    </div>
  );
}

export default ProgressBar;
