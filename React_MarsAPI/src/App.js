import React, { useState,useEffect} from "react";
import axios from "axios";
import './custom.css'

const API_KEY = "<Your Key>";

function App() {
  const [data,setData] = useState(null);
  const [sol, setSol] = useState(1);

useEffect(() => {
 axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/photos?sol=${sol}&api_key=${API_KEY}`)
.then((response) => setData(response.data))
})

  const handleClicknext = () => {
    setSol(sol + 1);
    axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/photos?sol=${sol}&api_key=${API_KEY}`)
    .then((response) => setData(response.data))
  }

 const handleClickprev = () => {
    // Increment sol value and make API request
    setSol(sol - 1);
    axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/photos?sol=${sol}&api_key=${API_KEY}`)
    .then((response) => setData(response.data))
  }
return(
  <div>
<head>
  <meta name="description" content="Raw Images From Perseverance Rover. Made by 0xFreDi"/>
  <meta name="author" content="0xFreDi"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
    <h1 className="header1"> Mars rover photos (Sol.{sol})</h1>
  <button className="buttonprevioussol" onClick={handleClickprev}> To Previous Sol </button>
   <button className="buttonnextsol" onClick={handleClicknext}> To Next Sol </button>
  <title>Perseverance Rover (Sol.{sol})</title>
    <div className="phot1">
      {data && data.photos.map((photo) => (
      <a href={photo.img_src}><img className="photoclass" src={photo.img_src} alt={photo.id} /></a> 
      ))}
    </div>
  </div>
);
}

export default App;
