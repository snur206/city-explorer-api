'use strict';

require('dotenv').config();
const express = require ('express');
const cors = require ('cors');
let app = express();
app.use(cors());
const weatherData = require ('./data/weather.json');
const PORT = process.env.PORT;

app.get('/test', handleTest);
function handleTest(req, res){
  try {
    res.status(200).send('test route');


  } catch(err) {
    res.status(500).send('error', err);

  }
}


app.get('/weather', cityRequest);

function cityRequest (request, response) {
  console.log('message');
  let { searchQuery } = request.query;
  console.log(request.query);
  console.log('search query', searchQuery);
  let cityWeather = weatherData.find(city => city.city_name.toLowerCase() === searchQuery.toLowerCase());
  console.log(cityWeather.data[0].weather);
  try {

    let selectCity = cityWeather.data.map(dailyWeather => {
      new Forecast(dailyWeather);
    });
    console.log(selectCity);
    response.status(200).send(selectCity);
  } catch(err) {
    response.status(500).send('Invalid', err);
  }
}


class Forecast {
  constructor(cityWeather) {
    this.date = cityWeather.valid_date;
    this.description = cityWeather.weather.description;
  }
}
app.use;

app.use('*', (request, response) => {
  response.status(500).send('Invalid Request, page found.');
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
