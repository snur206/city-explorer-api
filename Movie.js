'use strict';
const movieKey = process.env.MOVIE_API_KEY;
const axios = require('axios');

async function movie (request, response) {
  try {
    let name =request.query.movieQuery;
    let movieQuery = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${name}`);
    let movieArray = movieQuery.data.results.map(movie => new Movie(movie));
    console.log(movieArray);
    return(movieArray);
  } catch (err) {
    response.send(err);
    // response.send(err.message);
  }
}


class Movie {
  constructor(data) {
    this.title = data.original_title;
    this.overview = data.overview;
    this.average_votes = data.average_votes;
    this.total_votes = data.total_votes;
    this.popularity = data.popularity;
    this.released_on = data.released_on;
    this.image_url = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
    this.data = data;
  }
}

module.exports = movie;
