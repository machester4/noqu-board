import React from "react";

// Components
import StatItem from "./StatItem";

function Header() {
  return (
    <div className="queue-header">
      <span className="queue-name">Example</span>
      <div className="queue-stats">
        <StatItem name="Active" value="3" />
        <StatItem name="Waiting" value="3" />
        <StatItem name="Completed" value="120" />
        <StatItem name="Failed" value="0" />
        <StatItem name="Delayed" value="0" />
        <StatItem name="Paused" value="0" />
      </div>
    </div>
  );
}

export default Header;
