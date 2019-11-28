import React, { useMemo, useCallback } from "react";

// Libs
import classNames from "classnames";

// Components
import StatItem from "./StatItem";

function Header({
  name,
  statuses,
  handleExpand,
  handleFilter,
  jobFilter,
  expanded
}) {
  const renderJobStates = useMemo(() => {
    return statuses.map(item => {
      const name = Object.keys(item)[0];
      return (
        <StatItem
          name={name}
          value={item[name]}
          handleFilter={handleFilter}
          jobFilter={jobFilter}
        />
      );
    });
  }, [handleFilter, jobFilter]);

  const onExpand = useCallback(() => {
    handleExpand(!expanded);
  }, [expanded]);

  return (
    <div className="queue-header">
      <div className="queue-name-container">
        <span onClick={onExpand}>
          <i
            className={classNames("icon-arrow", {
              down: expanded,
              right: !expanded
            })}
          ></i>
        </span>
        <span className="queue-name">{name}</span>
      </div>
      <div className="queue-states">{renderJobStates}</div>
    </div>
  );
}

export default Header;
