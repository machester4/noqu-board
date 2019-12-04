import React, { useState, useCallback, useMemo, useEffect } from "react";
import "./styles.css";

// Libs
import classNames from "classnames";
import ReactJson from "react-json-view";

// Utils
import { queuePageSize, jobStates } from "../../../config/NoquBoard";
import { formatDate, TS } from "../../../utils/TimeStamp";

// Components
import Header from "./header";
import Job from "../job/index";

function Queue({ queue: { name, statuses, jobs }, isCurrent, setCurrent }) {
  const [jobFilter, setJobFilter] = useState(null);
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

  const handleSetCurrent = useCallback(() => {
    console.log("call set current", name);
    const start = queuePageSize * paginator;
    const end = queuePageSize * (paginator + 1);
    setCurrent({ name: name, status: jobFilter, start, end });
  }, [jobFilter]);

  useEffect(() => {
    if (jobFilter) {
      handleSetCurrent();
    }
  }, [isCurrent, jobFilter]);

  const renderQueuesDetails = useMemo(() => {
    return jobs.map(job => (
      <Job
        key={job.id}
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
  }, [jobs.length, isCurrent]);

  return (
    <div className="queue">
      <Header
        name={name}
        statuses={statuses}
        handleExpand={handleSetCurrent}
        handleFilter={setJobFilter}
        expanded={isCurrent}
        jobFilter={jobFilter}
      />
      <div
        className={classNames("panel", {
          "panel-expanded": isCurrent,
          "panel-no-expanded": !isCurrent
        })}
      >
        <hr />
        {renderQueuesDetails}
      </div>
    </div>
  );
}

export default Queue;
