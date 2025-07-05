const axios = require("axios");

// Helper: Get coordinates from city name using Nominatim API
async function getCoordinates(city) {
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      city
    )}&format=json&limit=1&addressdetails=1`;
    const response = await axios.get(url, {
      headers: { "User-Agent": "mern-weather-app-example" },
    });

    if (response.data.length === 0) return null;

    const place = response.data[0];

    // Robust validation using address object
    if (
      !place.address ||
      (!place.address.city &&
        !place.address.town &&
        !place.address.village &&
        !place.address.hamlet)
    ) {
      console.log(
        `Invalid place, missing city/town/village/hamlet: ${JSON.stringify(
          place.address
        )}`
      );
      return null;
    }

    return {
      latitude: place.lat,
      longitude: place.lon,
      display_name: place.display_name,
    };
  } catch (error) {
    console.error("Error fetching coordinates:", error.message);
    return null;
  }
}

// Controller: Get weather
exports.getWeather = async (req, res) => {
  const city = req.params.city.trim();

  if (!city || city.length < 2 || !isNaN(city)) {
    return res
      .status(400)
      .json({ error: "Please enter a valid city or town name." });
  }

  const coords = await getCoordinates(city);
  if (!coords) {
    return res
      .status(404)
      .json({ error: `City "${city}" not found or invalid.` });
  }

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current_weather=true`;
    const response = await axios.get(url);

    if (!response.data.current_weather) {
      return res.status(500).json({ error: "Weather data unavailable." });
    }

    const weather = response.data.current_weather;

    res.json({
      city: coords.display_name,
      temperature: `${weather.temperature} °C`,
      windspeed: `${weather.windspeed} km/h`,
      weathercode: weather.weathercode,
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    res.status(500).json({ error: "Failed to fetch weather data." });
  }
};
