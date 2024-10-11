import React from "react";
import { NavLink } from "react-router-dom";

function CompanyRow({ company }) {
  return (
    <NavLink className="jobly-table-row jobly-table-row-company" to={company.handle}>
        <p><b>{company.name}</b></p>
        <p>{company.description}</p>
    </NavLink>
  );
}

export default CompanyRow;
