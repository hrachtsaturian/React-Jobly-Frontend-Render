import React from "react";
import JobRow from "./JobRow";

function JobsTable({ jobs }) {
  return (
    <div className="jobly-table">
      {jobs?.length > 0
        ? jobs.map((job) => <JobRow key={job.id} job={job} />)
        : "No results"}
    </div>
  );
}

export default JobsTable;
