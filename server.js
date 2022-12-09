'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
let app = express();
app.use(cors());
// const weatherData = require('./data/weather.json');
const PORT = process.env.PORT;

// const axios = require('axios');
// const theWeather = require('./modules/weather');
// const theMovie = require('./modules/movie');

let weather = weather = require('./Weather');
app.get('/Weather'. weather);


let movie = require('./Movie');
app.get('/Movie', movie);


app.get('*', (request, response) => {
  response.send('Invalid request');
});


app.use('*', (request, response) => {
  response.status(500).send(err.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
