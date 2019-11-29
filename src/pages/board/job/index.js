import React, { useMemo } from "react";
import "./styles.css";

// Components
import ProgressBar from "../../../components/ProgressBar";

function Job({ job }) {
  const renderItems = useMemo(() => {
    const { id, progress, ...rest } = job;
    return Object.keys(rest).map(key => {
      return (
        <div className="job-item" key={`${id}${key}`}>
          <span className="job-title">{key}</span>
          <span className="job-body">{job[key]}</span>
        </div>
      );
    });
  }, [job]);

  return (
    <div className="job-wrapper">
      <div className="job">
        <span>#{job.id}</span>
        <div className="job-data">{renderItems}</div>
      </div>
      <ProgressBar progress={job.progress} />
    </div>
  );
}

export default Job;
