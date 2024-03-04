import React, { useState } from 'react';
import APIForm from "./components/APIForm.jsx";
import Gallery from './components/Gallery.jsx';
import './App.css';

function App() {
  const [inputs, setInputs] = useState({
    url: "",
    format: "",
    no_ads: "",
    no_cookie_banners: "",
    width: "",
    height: "",
  });

  
  const [currentImage, setCurrentImage] = useState(null);
  const [prevImages, setPrevImages] = useState([]);
  const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

  const makeQuery = () => {
    let wait_until = "network_idle";
    let response_type = "json";
    let fail_on_status = "400%2C404%2C500-511";
    let url_starter = "https://";
    let fullURL = url_starter + inputs.url;

    // Assemble other input values into the query string format
    let query = `https://api.apiflash.com/v1/urltoimage?access_key=${ACCESS_KEY}&url=${fullURL}&format=${inputs.format}&width=${inputs.width}&height=${inputs.height}&no_cookie_banners=${inputs.no_cookie_banners}&no_ads=${inputs.no_ads}&wait_until=${wait_until}&response_type=${response_type}&fail_on_status=${fail_on_status}`;
    callAPI(query).catch(console.error);
    return query;
  };

  const callAPI = async (query) => {
    const response = await fetch(query);
    const json = await response.json();
    console.log(json); // Logging the response JSON for inspection
    if (json.url == null) {
      alert("Oops! Something went wrong with that query, let's try again!")
        }
    else {
      setCurrentImage(json.url);
      setPrevImages((images) => [...images, json.url]);
      reset();
    }
  };
  
  const reset = () => {
    setInputs({
      url: "",
      format: "",
      no_ads: "",
      no_cookie_banners: "",
      width: "",
      height: "",
    });
  };

  const submitForm = () => {
    let defaultValues = {
      format: "jpeg",
      no_ads: "true",
      no_cookie_banners: "true",
      width: "1920",
      height: "1080",
    };
  
    if (inputs.url.trim() === "") {
      alert("You forgot to submit a URL!");
    } else {
      for (const [key, value] of Object.entries(inputs)) {
        if (value === "") {
          inputs[key] = defaultValues[key];
        }
      }
      
      // Call makeQuery after setting input values
      makeQuery();
    }
  };

  return (
    <div className="whole-page" style={{ textAlign: "center" }}>
      <h1>Build Your Own Screenshot! 📸</h1>
      <APIForm
        inputs={inputs}
        handleChange={(e) =>
          setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value.trim(),
          }))
        }
        onSubmit={submitForm}
      />
      {/* Conditional rendering to display current image */}
      {currentImage ? (
        <img
          className="screenshot"
          src={currentImage}
          alt="Screenshot returned"
        />
      ) : (
        <div> </div>
      )}
      {/* Container for displaying mock query string */}
      <div className="container">
        <h3>Current Query Status:</h3>
        <p>
          https://api.apiflash.com/v1/urltoimage?access_key=ACCESS_KEY
          <br />
          &url={inputs.url} <br />
          &format={inputs.format} <br />
          &width={inputs.width} <br />
          &height={inputs.height} <br />
          &no_cookie_banners={inputs.no_cookie_banners} <br />
          &no_ads={inputs.no_ads} <br />
        </p>
      </div>
      <br />
      {/* Container for displaying the Gallery component */}
      <div className="container">
        <Gallery images={prevImages} />
      </div>
    </div>
  );
  
  
}

export default App;