import React, { useState, useCallback, useMemo, useEffect } from "react";
import "./styles.css";

// Libs
import classNames from "classnames";
import ReactJson from "react-json-view";

// Services
import { getJobsByStatus } from "../../../services/noqu";

// Utils
import { queuePageSize, jobStates } from "../../../config/NoquBoard";

// Components
import Header from "./header";
import ProgressBar from "../../../components/ProgressBar";

function Queue({ name, statuses }) {
  const [expanded, setExpanded] = useState(false);
  const [jobStateFilter, setJobStateFilter] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [paginator, setPaginator] = useState(0);

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

  const fetchJobsOnFilter = useCallback(async () => {
    console.log("CALL");
    try {
      setExpanded(false);
      const start = queuePageSize * paginator;
      const end = queuePageSize * (paginator + 1);
      const { data } = await getJobsByStatus(name, jobStateFilter);
      setJobs(data);
      setExpanded(true);
    } catch (error) {
      console.error(error);
    }
  }, [jobStateFilter]);

  useEffect(() => {
    if (jobStateFilter) {
      fetchJobsOnFilter();
    }
  }, [fetchJobsOnFilter]);

  const renderQueuesDetails = useMemo(() => {
    return jobs.map(job => (
      <tr key={job.id}>
        <td>{job.id}</td>
        <td>{job.date}</td>
        <td>
          <ProgressBar percentage={job.progress} />
        </td>
        <td>{job.attemptsMade}</td>
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
  }, [jobs]);

  return (
    <div className="queue">
      <Header
        name={name}
        statuses={statuses}
        handleExpand={setExpanded}
        handleFilter={setJobStateFilter}
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
