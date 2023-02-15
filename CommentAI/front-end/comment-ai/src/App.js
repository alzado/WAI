import { useState } from "react";

import "./App.css";

function App() {
  const [inputUrl, setInputString] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");

  const handleInputChange = (event) => {
    setInputString(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setImage(null);
    setMessage("Loading...");
    try {
      console.log(inputUrl);
      const res = await fetch("http://127.0.0.1:5000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputUrl: inputUrl,
        }),
      });

      const resJson = await res.json();

      if (res.status === 200) {
        setMessage(resJson["summary"]);
        setImage(resJson["image"]);
        console.log(image);
        console.log("Success");
      } else {
        console.log("Error");
      }
    } catch (err) {
      setMessage("Please paste a valid link");
      console.log(err);
    }
  };

  return (
    <div class="search-container">
      <h1>Review SummarAIzer</h1>
      <div>
        <label for="search-input" class="visually-hidden">
          Search Google or type a URL
        </label>
        <input
          type="text"
          id="search-input"
          class="search-box"
          onChange={handleInputChange}
          placeholder="Type a product URL"
        />
        <button type="submit" class="search-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <div class="message-box">
        {image ? <img src={image} alt="Not found"></img> : null}
        {message ? <p>{message}</p> : null}
      </div>
    </div>
  );
}

export default App;
