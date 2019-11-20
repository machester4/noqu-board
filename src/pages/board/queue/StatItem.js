import React, { useCallback } from "react";

// Libs
import classNames from "classnames";

function StatItem({ name, value, handleQueueState, queueState }) {
  const handleChange = useCallback(() => {
    handleQueueState(name);
  }, [handleQueueState, name]);
  return (
    <div
      className={classNames("queue-state", {
        "queue-state-active": queueState === name
      })}
      onClick={handleChange}
    >
      <span className={classNames("queue-state-value", name)}>{value}</span>
      <span className="queue-state-name">{name}</span>
    </div>
  );
}

export default StatItem;
