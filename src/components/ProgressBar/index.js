import React from "react";
import "./styles.css";

function ProgressBar({ percentage = 0 }) {
  return (
    <div className="bar-container">
      <span>Progress {percentage}%</span>
      <div className="bar-light-grey bar-tiny">
        <div className="bar-green" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

export default ProgressBar;
