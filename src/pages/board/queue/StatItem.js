import React from "react";

function StatItem({ name, value }) {
  return (
    <div className="queue-stat">
      <span className="queue-stat-value">{value}</span>
      <span className="queue-stat-name">{name}</span>
    </div>
  );
}

export default StatItem;
