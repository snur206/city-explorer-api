'use strict';

class Forecast {
  constructor(cityWeather) {
    console.log(cityWeather);
    this.date = cityWeather.datetime;
    this.description = cityWeather.description;
  }
}

module.exports = Forecast;
