import React, { useState } from 'react';
import './App.css';

import { Button, Form, FormControl, Row, Col, Dropdown, DropdownButton } from 'react-bootstrap';

const PhotoUploadForm = () => {
  const [photo, setPhoto] = useState(null);
  const [selectedDropdown, setSelectedDropdown] = useState(null);
  const [yourName, setYourName] = useState("");
  const [lovedOne, setLovedOne] = useState("");
  const [message, setMessage] = useState("");
  // { { } }
  const handleChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  // const handleDropdownSelect = (event) => {
  //   setSelectedDropdown(event);
  // };

  const onChangeYourName = (event) => {
    setYourName(event.target.value);
  }

  const onChangeLovedOne = (event) => {
    setLovedOne(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submited");
    try {
      console.log(yourName);
      console.log(lovedOne);
      const res = await fetch("https://backend.valentai.repl.co/process-data", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
          person_1: yourName,
          person_2: lovedOne
        })
      });
      const resJson = await res.json();
      console.log("resJson: " + resJson)
      if (res.status === 200) {
        setMessage(resJson);
        console.log("Success");
      } else {
        console.log("Error");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="background-pattern" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px #ccc' }}>
        <Form style={{ marginTop: '20px' }}>
          <h3 className="text-center" style={{ marginBottom: '20px' }}>ValentAI</h3>
          <h6 className="text-center" style={{ marginBottom: '20px' }}>Write sweet poems to your significant other (or pet) for Valentines Day</h6>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <input type="text" defaultValue="Your name" style={{ color: 'grey', justifyContent: 'center', alignItems: 'center' }} onChange={onChangeYourName} />
            <img src="pixel_heart.jpg" width={50} height={50}></img>
            <input type="text" defaultValue="Loved one's name" style={{ color: 'grey', justifyContent: 'center', alignItems: 'center' }} onChange={onChangeLovedOne} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="primary" style={{ cursor: 'pointer', display: 'inline-block', marginTop: '20px', marginBottom: '10px' }} onClick={handleSubmit}>Submit</Button>
          </div>
          <div className="message">{message ? <p>{message}</p> : null}</div>
        </Form>
      </div>
    </div>
  );
};

export default PhotoUploadForm;


/*
try {
      const res = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          Content-Type: application/json,
          "Authorization: Bearer YOUR_API_KEY"
        },
        body: JSON.stringify({
          person_1: yourName,
          person_2: lovedOne
        })
      });
      const resJson = await res.json();
      if (res.status === 200) {
        console.log("Success");
      } else {
        console.log("Error");
      }
    } catch (err) {
      console.log(err);
    }
  }

*/

/*          <FormControl type="file" onChange={handleChange} style={{ display: 'inline-block', marginBottom: '10px' }} />
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
              DropdownButton>*/