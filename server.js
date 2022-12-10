'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
let app = express();
app.use(cors());
const getWeather = require('./modules/weather');
const getMovies = require('./modules/movie');

const PORT = process.env.PORT;


let weather = require('./Weather');
app.get('/weather', getWeather); // this is our API method, and endpoint,  this allows any client to make a GET to /weather, when they do we run all the code in ./Weather.js
// async function weatherHandler(request, response) {
//   const { lat, lon } = request.query;
//   try {
//     let weatherData = await getWeather(lat, lon);
//     response.send(weatherData);
//   } catch (e) {
//     response.status(500).send('Sorry. Something went wrong!')
//   }
// }

let movie = require('./Movie');
app.get('/movies', getMovies);
// async function movieHandler(request, response) {
//   const { movieQuery } = request.query;
//   try {
//     let 
//   }


/**
 * button.addEventListener('click', (e => console.log('button clicked')))
 */


app.get('*', (request, response, next) => {
  response.send('Invalid request'); // be default this will have a status 200, and response with "invalid request".
});


// will trigger on any method, instead of just 'get' like above.
app.use('*', (request, response) => {
  response.status(500).send(err.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
