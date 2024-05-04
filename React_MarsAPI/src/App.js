/**
@desc more optimized for browsing !
                                      **/
import React, { useState, useEffect } from "react";
import axios from "axios";
import './custom.css'

const API_KEY = "<you keyyyy>";

function App() {
  const [data, setData] = useState(null);
  const [sol, setSol] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/photos?sol=${sol}&api_key=${API_KEY}`);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [sol]);

  const handleClickNext = () => {
    setSol(prevSol => prevSol + 1);
  };

  const handleClickPrev = () => {
    setSol(prevSol => prevSol - 1);
  };

  return (
    <div>
      <h1 className="header1">Mars Rover Photos (Sol.{sol})</h1>
      <button className="buttonprevioussol" onClick={handleClickPrev}>To Previous Sol</button>
      <button className="buttonnextsol" onClick={handleClickNext}>To Next Sol</button>

      <div className="phot1">
        {data && data.photos.map(photo => (
          <a href={photo.img_src} key={photo.id}>
            <img className="photoclass" src={photo.img_src} alt={photo.id} loading="lazy" />
          </a>
        ))}
      </div>
    </div>
  );
}

export default App;
