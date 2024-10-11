import React, { useEffect, useState } from "react";
import JoblyApi from "./helpers/JoblyAPI";
import Loader from "./Loader";
import CompaniesTable from "./CompaniesTable";
import SearchForm from "./SearchForm";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  async function getCompanies(searchName) {
    try {
      const res = await JoblyApi.getCompanies(searchName);
      setCompanies(res);
      setIsLoading(false);
    } catch (error) {
      setError(error || "Failed to find companies");
    }
  }

  useEffect(() => {
    getCompanies();
  }, []);

  if (error) {
    return (
      <div class="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <SearchForm getData={getCompanies} />
      <CompaniesTable companies={companies} />
    </>
  );
}

export default Companies;
