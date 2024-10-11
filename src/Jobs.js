import React, { useEffect, useState } from "react";
import JoblyApi from "./helpers/JoblyAPI";
import Loader from "./Loader";
import JobsTable from "./JobsTable";
import SearchForm from "./SearchForm";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  async function getJobs(searchTitle) {
    try {
      const res = await JoblyApi.getJobs(searchTitle);
      setJobs(res);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  }

  useEffect(() => {
    getJobs();
  }, []);

  if (error) {
    return (
      <div class="alert alert-danger" role="alert">
        {error || "Failed to find jobs"}
      </div>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <SearchForm getData={getJobs} />
      <JobsTable jobs={jobs} />;
    </>
  );
}

export default Jobs;
