import React, { useContext, useState } from "react";
import { Button } from "reactstrap";
import JoblyApi from "./helpers/JoblyAPI";
import Context from "./Context";

/**
 * @param {Object} job - { id, title, salary ...}
 */
function JobRow({ job }) {
  const { currentUser, setCurrentUser } = useContext(Context);

  const [error, setError] = useState();

  const hasApplied = currentUser?.applications?.includes(job.id);

  const handleClick = async (e) => {
    e.preventDefault();
    setError();
    // optimistic update, will save an api call
    // update currentUser state by adding id to applications
    setCurrentUser({
      ...currentUser,
      applications: [...currentUser.applications, job.id],
    });
    try {
      await JoblyApi.applyJob(currentUser.username, job.id);
    } catch (error) {
      // if error, update the currentuser again by removing the added id of the application
      setCurrentUser({ ...currentUser });
      setError(error);
    }
  };

  return (
    <div className="jobly-table-row">
      <p>
        <b>{job.title}</b>
      </p>
      <p>{job.companyName}</p>
      <p>
        Salary: {job.salary || "N/A"}
        <br />
        Equity: {job.equity || "N/A"}
      </p>
      {error && (
        <div class="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Button
          disabled={hasApplied}
          onClick={handleClick}
          color="danger"
          style={{ width: "100px" }}
        >
          <b>{hasApplied ? "APPLIED" : "APPLY"}</b>
        </Button>
      </div>
    </div>
  );
}

export default JobRow;
