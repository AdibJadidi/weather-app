import axios from "axios";
import "../index.css";
import React, { useEffect, useState } from "react";
import API from "./WeatherAPI";

function Weather() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  const search = (e) => {
    if (e.key === "Enter") {
      axios
        .get(`${API.base}weather?q=${query}&units=metric&APPID=${API.key}`)
        .then((result) => {
          setWeather(result);
          console.log(result);
        });
    }
  };
  return (
    <div
      className={
        typeof weather.data != "undefined"
          ? Math.round(weather.data.main.temp) > 16
            ? "container"
            : "container cold"
          : "container"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            placeholder="search.."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
            className="search-bar"
          />
        </div>
        {typeof weather.data != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">{`${weather.data.name}, ${weather.data.sys.country}`}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.data.main.temp)}°C</div>
              <div className="weather">{weather.data.weather[0].main}</div>
            </div>
          </div>
        ) : (
          console.log(weather.data)
        )}
      </main>
    </div>
  );
}

export default Weather;
