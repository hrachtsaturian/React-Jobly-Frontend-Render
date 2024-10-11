import React from "react";
import CompanyRow from "./CompanyRow";

function CompaniesTable({ companies }) {
  return (
    <div className="jobly-table">
      {companies?.length > 0
        ? companies.map((company) => (
            <CompanyRow key={company.handle} company={company} />
          ))
        : "No results"}
    </div>
  );
}

export default CompaniesTable;
