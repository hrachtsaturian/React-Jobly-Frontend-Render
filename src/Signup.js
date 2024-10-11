import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Container } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import JoblyApi from "./helpers/JoblyAPI";
import { useNavigate } from "react-router-dom";

const Signup = ({ login }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await JoblyApi.register(formData);
      login(token);
      navigate("/");
    } catch (error) {
      setError(error || 'Failed to sign up');
    }
  };

  return (
    <div className="login-bg">
      <Container className="d-flex justify-content-center align-items-center">
        <Form
          className="bg-white p-4 rounded shadow"
          style={{ width: "400px" }}
          onSubmit={handleSubmit}
        >
          <h3 className="text-center mb-4">Sign Up</h3>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              type="text"
              name="username"
              id="username"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input
              type="text"
              name="firstName"
              id="firstName"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input
              type="text"
              name="lastName"
              id="lastName"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="text"
              name="email"
              id="email"
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
    </div>
  );
};

export default Signup;
