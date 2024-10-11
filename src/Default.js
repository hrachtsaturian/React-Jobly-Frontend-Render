import React from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

function Default() {
  return (
    <div className="default">
      <h1>Jobly</h1>
      <h3>All the jobs in one, convenient place.</h3>

      <div className="default-buttons">
        <Link to="login" style={{ marginRight: "12px" }}>
          <Button
            className="default-button"
            color="primary"
            style={{ width: "100px" }}
          >
            Log In
          </Button>
        </Link>
        <Link to="signup">
          <Button
            className="default-button"
            color="primary"
            style={{ width: "100px" }}
          >
            Sign Up
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Default;
