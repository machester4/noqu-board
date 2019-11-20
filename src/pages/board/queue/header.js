import React, { useMemo } from "react";

// Libs
import classNames from "classnames";

// Utils
import { queueStates } from "../../../utils/constants";

// Components
import StatItem from "./StatItem";

function Header({ handleExpand, handleQueueState, queueState, expanded }) {
  const renderQueueStates = useMemo(() => {
    return queueStates.map(state => (
      <StatItem
        name={state}
        value="3"
        handleQueueState={handleQueueState}
        queueState={queueState}
      />
    ));
  }, [handleQueueState, queueState]);

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
      <div className="queue-states">{renderQueueStates}</div>
    </div>
  );
}

export default Header;
