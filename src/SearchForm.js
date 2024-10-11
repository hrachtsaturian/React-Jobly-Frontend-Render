import { React, useState } from "react";
import { Input, Button, Container } from "reactstrap";

const SearchForm = ({ getData }) => {
  const [searchName, setSearchName] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchName(value);
  };

  const handleSubmit = async () => {
    await getData(searchName);
  };

  return (
    <Container style={{ width: '66%' }}className="d-flex justify-content-left">
      <Input style={{ width: '500px' }}placeholder="Enter search term..." onChange={handleChange} />
      <Button style={{ width: "100px", marginLeft: '12px' }} color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Container>
  );
};

export default SearchForm;
