import React, { useState } from 'react';
import { Button, Form, FormControl, Row, Col, Dropdown, DropdownButton } from 'react-bootstrap';

const PhotoUploadForm = () => {
  const [photo, setPhoto] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedDropdown, setSelectedDropdown] = useState(null);

  const handleChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleDropdownSelect = (event) => {
    // eventKey
    setSelectedDropdown(event);
  };

  return (
    <div style={{ background: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px #ccc' }}>
        <Form style={{ marginTop: '20px' }}>
          <h3 className="text-center" style={{ marginBottom: '20px' }}>Upload a photo</h3>
          <FormControl type="file" onChange={handleChange} style={{ display: 'inline-block', marginBottom: '10px' }} />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
          <DropdownButton
            id="dropdown-basic-button"
            title={selectedDropdown || "Select a Style"}
            onSelect={handleDropdownSelect}
            style={{ marginTop: '20px' }}
          >
            <Dropdown.Item eventKey="princess">Princess</Dropdown.Item>
            <Dropdown.Item eventKey="superhero">Superhero</Dropdown.Item>
            <Dropdown.Item eventKey="pixar character">Pixar Character</Dropdown.Item>
          </DropdownButton>
          </div>
          {photo && <p>{photo.name}</p>}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="primary" style={{ cursor: 'pointer', display: 'inline-block', marginTop: '20px', marginBottom: '10px' }}>Submit</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default PhotoUploadForm;