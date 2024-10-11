import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./helpers/JoblyAPI";
import Loader from "./Loader";
import JobsTable from "./JobsTable";

function Company() {
  const { handle } = useParams();

  const [company, setCompany] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function getData() {
      try {
        const res = await JoblyApi.getCompany(handle);
        setCompany(res);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    }
    getData();
  }, [handle]);

  if (error) {
    return (
      <div class="alert alert-danger" role="alert">
        {error || "Failed to find company info"}
      </div>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="company-header">
        <h5>{company.name}</h5>
        <p>{company.description}</p>
      </div>
      <div>
        <JobsTable jobs={company.jobs} />
      </div>
    </>
  );
}

export default Company;
