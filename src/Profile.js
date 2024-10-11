import React, { useContext, useEffect, useState } from "react";
import { Form, FormGroup, Label, Input, Button, Container } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import JoblyApi from "./helpers/JoblyAPI";
import Context from "./Context";

const Profile = () => {
  const { currentUser = {}, setCurrentUser } = useContext(Context);

  const [formData, setFormData] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const { firstName, lastName, email } = currentUser;
    setFormData({
      firstName,
      lastName,
      email,
    });
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await JoblyApi.updateProfile(
        currentUser.username,
        formData
      );
      setCurrentUser(updatedUser);
      setIsSuccess(true);
      setError();
    } catch (error) {
      setError(error || 'Failed to update profile');
      setIsSuccess(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Form
        className="bg-white p-4 rounded shadow"
        style={{ width: "400px" }}
        onSubmit={handleSubmit}
      >
        <h3 className="text-center mb-4">Profile</h3>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            disabled
            type="text"
            name="username"
            id="username"
            value={currentUser.username}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="firstName">First Name</Label>
          <Input
            type="text"
            name="firstName"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="lastName">Last Name</Label>
          <Input
            type="text"
            name="lastName"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="text"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
        </FormGroup>
        {isSuccess && (
          <div class="alert alert-success" role="alert">
            Updated successfully
          </div>
        )}
        {error && (
          <div class="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <Button color="primary" block>
          Save Changes
        </Button>
      </Form>
    </Container>
  );
};

export default Profile;
