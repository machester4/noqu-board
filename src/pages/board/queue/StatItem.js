import React, { useCallback } from "react";

// Libs
import classNames from "classnames";

function StatItem({ name, value, handleFilter, jobFilter }) {
  const handleChange = useCallback(() => {
    handleFilter(name);
  }, [handleFilter, name]);
  return (
    <div
      className={classNames("queue-state", {
        "queue-state-active": jobFilter === name
      })}
      onClick={handleChange}
    >
      <span className={classNames("queue-state-value", name)}>{value}</span>
      <span className="queue-state-name">{name}</span>
    </div>
  );
}

export default StatItem;
