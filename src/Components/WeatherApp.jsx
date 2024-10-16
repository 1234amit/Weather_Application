import React, { useEffect, useState } from "react";
import "./WeatherApp.css";
import sunny from "../assets/images/sunny.png";
import cloudy from "../assets/images/cloudy.png";
import rainy from "../assets/images/rainy.png";
import snowy from "../assets/images/snowy.png";

const WeatherApp = () => {
  const [data, setData] = useState([]);
  const [location, setLocation] = useState("");
  const API_KEY = "c4dc1fa5be1836d8ca38f7cc8f36db8f";

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  // default location
  useEffect(() => {
    const fetchDefaultWeather = async () => {
      const defaultLocation = "Israel";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&appid=${API_KEY}`;
      const res = await fetch(url);
      const defaultData = await res.json();
      setData(defaultData);
    };
    fetchDefaultWeather();
  }, []);

  const search = async () => {
    if (location.trim() !== "") {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;
      const res = await fetch(url);
      const searchData = await res.json();
      console.log(searchData);
      setData(searchData);
      setLocation("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  const weatherImages = {
    Clear: sunny,
    Clouds: cloudy,
    Rain: rainy,
    Snow: snowy,
    Haze: cloudy,
    Mist: cloudy,
  };

  const weatherImage = data.weather
    ? weatherImages[data.weather[0].main]
    : null;

  const backgroundImages = {
    Clear: "linear-gradient(to right, #f3b07c, #fcd283)",
    Clouds: "linear-gradient(to right, #57d6d4, #71eeec)",
    Rain: "linear-gradient(to right, #5bc8fb, #80eaff)",
    Snow: "linear-gradient(to right, #aff2ff, #fff)",
    Haze: "linear-gradient(to right, #f1f1f1, #e6e6e6)",
    Mist: "linear-gradient(to right, #f1f1f1, #e6e6e6)",
  };

  const backgroundImage = data.weather
    ? backgroundImages[data.weather[0].main]
    : "linear-gradient(to right, #f3b07c, #fcd283)";

  return (
    <>
      <div className="container" style={{ backgroundImage }}>
        <div className="weather-app">
          <div className="search">
            <div className="search-top">
              <i className="fa solid fa-location-dot"></i>
              <div className="location">{data.name}</div>
            </div>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Enter Location"
                value={location}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
              <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
            </div>
          </div>

          <div className="weather">
            <img src={weatherImage} alt="sunny-img" />
            <div className="weather-type">
              {data.weather ? data.weather[0].main : null}
            </div>
            <div className="temp">
              {data.main ? `${Math.floor(data.main.temp)}°` : null}
            </div>
          </div>

          <div className="weather-date">
            <p>Fri, 3 May</p>
          </div>

          <div className="weather-data">
            <div className="humidity">
              <div className="data-name">Humidity</div>
              <i className="fa-solid fa-droplet"></i>
              <div className="data">
                {data.main ? data.main.humidity : null}%
              </div>
            </div>

            <div className="wind">
              <div className="data-name">Wind</div>
              <i className="fa-solid fa-wind"></i>
              <div className="data">
                {data.main ? data.wind.speed : null} km/h
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherApp;
