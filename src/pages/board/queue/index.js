import React, { useState, useCallback, useMemo } from "react";
import "./styles.css";

// Libs
import classNames from "classnames";
import ReactJson from "react-json-view";

// Utils
import { queuePageSize, jobStates } from "../../../config/NoquBoard";

// Components
import Header from "./header";
import ProgressBar from "../../../components/ProgressBar";

function Queue({ name }) {
  const [expanded, setExpanded] = useState(false);
  const [jobStateFilter, setJobStateFilter] = useState(null);
  const [paginator, setPaginator] = useState(0);

  const jobs = Array(40).fill({
    id: "_abc",
    date: "21/11/19",
    progress: 100,
    attemps: 0,
    data: { name: "test", age: 24 },
    opts: {}
  });

  const handleExpandDetails = useCallback(() => {
    if (!jobStateFilter) {
      setJobStateFilter(jobStates[0]);
    }
    setExpanded(!expanded);
  }, [expanded, jobStateFilter]);

  const handleJobStateFilter = useCallback(
    state => {
      setJobStateFilter(state);
      if (!expanded) handleExpandDetails();
    },
    [handleExpandDetails]
  );

  const handleChangePaginator = useCallback(
    dir => {
      if (dir === "prev") {
        if (paginator > 0) setPaginator(paginator - 1);
      } else if (paginator * queuePageSize < jobs.length) {
        setPaginator(paginator + 1);
      }
    },
    [paginator]
  );

  const renderQueuesDetails = useMemo(() => {
    if (!jobStateFilter) return null;

    const start = queuePageSize * paginator;
    const end = queuePageSize * (paginator + 1);

    return jobs.slice(start, end).map(job => (
      <tr key={job.id}>
        <td>{job.id}</td>
        <td>{job.date}</td>
        <td>
          <ProgressBar percentage={job.progress} />
        </td>
        <td>{job.attemps}</td>
        <td>
          <ReactJson
            src={job.data}
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
            src={job.opts}
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
  }, [jobStateFilter, paginator]);

  return (
    <div className="queue">
      <Header
        handleExpand={handleExpandDetails}
        handleFilter={handleJobStateFilter}
        expanded={expanded}
        jobFilter={jobStateFilter}
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
          <tfoot>
            <tr>
              <td colSpan={6}>
                <div className="paginator">
                  <span
                    className="prev-page"
                    onClick={() => handleChangePaginator("prev")}
                  >
                    <i className="icon-arrow left"></i>
                    <i className="icon-arrow left"></i>
                  </span>
                  <span className="page-count">
                    showing {queuePageSize * (paginator + 1)} of {jobs.length}
                  </span>
                  <span
                    className="next-page"
                    onClick={() => handleChangePaginator("next")}
                  >
                    <i className="icon-arrow right"></i>
                    <i className="icon-arrow right"></i>
                  </span>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default Queue;
