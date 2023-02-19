import { useState } from "react";

import "./App.css";

function App() {
  const [inputUrl, setInputString] = useState("");
  const [goodReviews, setGoodReviews] = useState("");
  const [percentGood, setPercentGood] = useState("");
  const [badReviews, setBadReviews] = useState("");
  const [percentBad, setPercentBad] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [image, setImage] = useState("");

  const handleInputChange = (event) => {
    setInputString(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setImage(null);
    setBadReviews("Loading...");
    setPercentBad(null);
    setGoodReviews("Loading...");
    setPercentGood(null);
    setRecommendation(null);
    try {
      console.log(inputUrl);
      const res = await fetch("http://127.0.0.1:5000/", {
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
        setImage(resJson["image"]);
        setGoodReviews(resJson["goodReviews"]);
        setPercentGood(resJson["percentGood"]);
        setBadReviews(resJson["badReviews"]);
        setPercentBad(resJson["percentBad"]);
        setRecommendation(resJson["recommendation"]);
        console.log(image);
        console.log("Success");
      } else {
        console.log("Error");
      }
    } catch (err) {
      setBadReviews("Please paste a valid link");
      console.log(err);
    }
  };

  return (
    <div class="search-container">
      <img src="logo.png" alt="Description of the image"></img>


<div class="message-box">
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
      {recommendation ? <p class="recommendation">{recommendation}</p> : null}
    {image ? <img src={image} alt="Not found"></img> : null}
  </div>
      
  <div class="columns-container">
    <div class="column-left">
      {percentGood ? <p class="percent">{percentGood}%</p> : null}
      {goodReviews ? <p>{goodReviews}</p> : null}
    </div>
    <div class="column-right">
      {percentBad ? <p class="percent">{percentBad}%</p> : null}
      {badReviews ? <p>{badReviews}</p> : null}
    </div>
  </div>
  
  
</div>
  );
}

export default App;


