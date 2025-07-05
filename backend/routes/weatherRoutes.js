const express = require("express");
const router = express.Router();
const { getWeather } = require("../controllers/weatherController");

router.get("/weather/:city", getWeather);

module.exports = router;
