import React, { useState } from "react";
import axios from "axios";

const weatherCodeMap = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  71: "Slight snow fall",
  73: "Moderate snow fall",
  75: "Heavy snow fall",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
};

function Weather() {
  const [city, setCity] = useState("Toronto");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
    try {
      setError("");
      setWeatherData(null);
      const response = await axios.get(
        `http://localhost:5001/api/weather/${city}`
      );
      setWeatherData(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Error fetching weather");
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: 600,
        margin: "auto",
        padding: 20,
      }}
    >
      <h2>World Weather</h2>

      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city or town name"
        style={{ padding: 10, fontSize: 16, width: "70%" }}
      />
      <button onClick={getWeather} style={{ padding: 10, marginLeft: 10 }}>
        Get Weather
      </button>

      {error && <p style={{ color: "red", marginTop: 20 }}>{error}</p>}

      {weatherData && (
        <div
          style={{
            marginTop: 30,
            backgroundColor: "#0077be",
            color: "white",
            borderRadius: 10,
            padding: 20,
          }}
        >
          <h3 style={{ margin: 0 }}>{weatherData.city}</h3>
          <small>Updated just now</small>

          <div style={{ marginTop: 20 }}>
            <h1 style={{ margin: 0 }}>{weatherData.temperature}</h1>
            <p style={{ margin: 0, fontSize: 18 }}>
              Wind Speed: {weatherData.windspeed}
            </p>
            <p style={{ margin: 0, fontSize: 16 }}>
              Weather:{" "}
              {weatherCodeMap[weatherData.weathercode] || "Unknown weather"}
            </p>
            <p style={{ margin: 0, fontSize: 14 }}>
              Latitude: {weatherData.latitude} | Longitude:{" "}
              {weatherData.longitude}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
