import React, { useMemo } from "react";

// Libs
import classNames from "classnames";

// Utils
import { jobStates } from "../../../config/NoquBoard";

// Components
import StatItem from "./StatItem";

function Header({ handleExpand, handleFilter, jobFilter, expanded }) {
  const renderJobStates = useMemo(() => {
    return jobStates.map(state => (
      <StatItem
        name={state}
        value="3"
        handleFilter={handleFilter}
        jobFilter={jobFilter}
      />
    ));
  }, [handleFilter, jobFilter]);

  return (
    <div className="queue-header">
      <div className="queue-name-container">
        <span onClick={handleExpand}>
          <i
            className={classNames("icon-arrow", {
              down: expanded,
              right: !expanded
            })}
          ></i>
        </span>
        <span className="queue-name">Example</span>
      </div>
      <div className="queue-states">{renderJobStates}</div>
    </div>
  );
}

export default Header;
