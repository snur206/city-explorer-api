'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
let app = express();
app.use(cors());
const weatherData = require('./data/weather.json');
const PORT = process.env.PORT;
const movieKey = process.env.MOVIE_API_KEY;
const Movie = require('./Movie.js');
const axios = require('axios');
const Forecast = require('./Forecast.js');

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
  let { lat } = request.query;
  let { lon } = request.query;
  let url = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;

  console.log(url);
  console.log(request.query);
  console.log('search query', searchQuery);
  weatherData.forEach(data => console.log(data));
  let cityWeather = weatherData.find(city => city.city_name.toLowerCase() === searchQuery.toLowerCase());
  // cityWeather => undefined
  console.log(cityWeather.data[0].weather);
  try {
    //undefined
    let selectCity = cityWeather.data.map(dailyWeather => {
      return new Forecast(dailyWeather);
    });
    console.log(selectCity);
    response.status(200).send(selectCity);
  } catch(err) {
    response.status(500).send('Invalid', err);
  }
}

app.get('/movie', async (request, response) => {
  console.log('insted movie function');
  let movieQuery = request.query.searchQuery;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${movieQuery}`;
  console.log(url);
  let cityMovie = await axios.get(url);
  console.log('Movie', cityMovie);
  if (cityMovie === undefined) {
    response.status(400).send('unsupported city.');
  }
  else {
    let movieArray = cityMovie.data.results.map(movie => new Movie(movie.title, movie.overview, movie.average_votes, movie.total_votes, movie.popularity, movie.released_on));
    response.send(movieArray);
  }
  let selectMovie = cityMovie.data.result.map(dayMovie => {
    return new Movie(dayMovie);
  });

  response.send(selectMovie);
}
);





app.use;


app.use('*', (request, response) => {
  response.status(500).send('Invalid Request, page found.');
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
