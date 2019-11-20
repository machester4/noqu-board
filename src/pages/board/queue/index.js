import React, { useState, useCallback, useMemo } from "react";
import "./styles.css";

// Libs
import classNames from "classnames";
import ReactJson from "react-json-view";

// Components
import Header from "./header";
import ProgressBar from "../../../components/ProgressBar";

function Queue() {
  const [expanded, setExpanded] = useState(false);
  const [queueState, setQueueState] = useState(null);

  const handleExpandDetails = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);

  const handleQueueState = useCallback(
    state => {
      setQueueState(state);
      if (!expanded) {
        handleExpandDetails();
      }
    },
    [handleExpandDetails]
  );

  const renderQueuesDetails = useMemo(() => {
    return Array(10)
      .fill("a")
      .map(() => (
        <tr>
          <td>1</td>
          <td>20/11</td>
          <td>
            <ProgressBar percentage={80} />
          </td>
          <td>0</td>
          <td>
            <ReactJson
              src={{ name: "Test" }}
              collapseStringsAfterLength={5}
              collapsed
              enableClipboard={false}
              onEdit={false}
              onAdd={false}
              onDelete={false}
            />
          </td>
          <td>
            <ReactJson
              src={{ name: "Test" }}
              collapseStringsAfterLength={5}
              collapsed
              enableClipboard={false}
              onEdit={false}
              onAdd={false}
              onDelete={false}
            />
          </td>
        </tr>
      ));
  }, []);

  return (
    <div className="queue">
      <Header
        handleExpand={handleExpandDetails}
        handleQueueState={handleQueueState}
        expanded={expanded}
        queueState={queueState}
      />
      <div
        className={classNames("panel", {
          "panel-expanded": expanded,
          "panel-no-expanded": !expanded
        })}
      >
        <hr />
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>timestamps</th>
              <th>progress</th>
              <th>attemps</th>
              <th>data</th>
              <th>opts</th>
            </tr>
          </thead>
          <tbody>{renderQueuesDetails}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Queue;
