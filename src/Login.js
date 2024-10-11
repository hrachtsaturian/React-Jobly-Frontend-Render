import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Container } from "reactstrap";
import JoblyApi from "./helpers/JoblyAPI";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = ({ login }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await JoblyApi.authenticate(formData);
      login(token);
      navigate("/");
    } catch (error) {
      console.log(error)
      setError(error || 'Failed to sign in');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Form
        className="bg-white p-4 rounded shadow"
        style={{ width: "400px" }}
        onSubmit={handleSubmit}
      >
        <h3 className="text-center mb-4">Log In</h3>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            type="text"
            name="username"
            id="username"
            placeholder="Enter your username"
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            onChange={handleChange}
          />
        </FormGroup>
        {error && (
          <div class="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <Button color="primary" block>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
