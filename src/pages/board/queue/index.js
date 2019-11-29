import React, { useState, useCallback, useMemo, useEffect } from "react";
import "./styles.css";

// Libs
import classNames from "classnames";
import ReactJson from "react-json-view";

// Services
import { getJobsByStatus } from "../../../services/noqu";

// Utils
import { queuePageSize, jobStates } from "../../../config/NoquBoard";
import { formatDate, TS } from "../../../utils/TimeStamp";

// Components
import Header from "./header";
import Job from "../job/index";

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
      <Job
        job={{
          id: job.id,
          created: formatDate(job.timestamp),
          waited: TS(job.processedOn, job.timestamp),
          procesed: formatDate(job.processedOn),
          finished: formatDate(job.finishedOn),
          run: TS(job.finishedOn, job.processedOn),
          attempts: job.attemptsMade,
          data: (
            <ReactJson
              src={job.data}
              collapseStringsAfterLength={5}
              collapsed
              enableClipboard={false}
              onEdit={false}
              onAdd={false}
              onDelete={false}
            />
          ),
          options: (
            <ReactJson
              src={job.opts}
              collapseStringsAfterLength={5}
              collapsed
              enableClipboard={false}
              onEdit={false}
              onAdd={false}
              onDelete={false}
            />
          ),
          progress: job.progress
        }}
      />
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
        {renderQueuesDetails}
      </div>
    </div>
  );
}

export default Queue;
