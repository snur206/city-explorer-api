'use strict';
const movieKey = process.env.MOVIE_API_KEY;
const axios = require('axios');

async function movie (request, response) {
  try {
    let name =request.query.query;
    let movieQuery = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${movieQuery}`);
    if(!movieQuery) {
      response.send('unsupported city.');
    }
    let movieArray = cityMovie.data.results.map(movie => new Movie(movie.title, movie.overview, movie.average_votes, movie.total_votes, movie.popularity, movie.released_on));
    response.send(movieArray);
  } catch (err) {
    response.send(err) {
      response.send(err.message);
    }
  }
  
//   // let movieQuery = request.query.searchQuery;
  
//   // console.log(url);
//   let cityMovie = await axios.get(url);
//   console.log('Movie', cityMovie);
//   if (cityMovie === undefined) {
//     response.status(400).send('unsupported city.');
//   }

//   let selectMovie = cityMovie.data.results.map(dayMovie => {
//     return new Movie(dayMovie);
//   });

//   response.send(selectMovie);
// }

class Movie {
  constructor(data) {
    this.title = data.original_title;
    this.overview = data.overview;
    this.average_votes = data.average_votes;
    this.total_votes = data.total_votes;
    this.popularity = data.popularity;
    this.released_on = data.released_on;
    this.data = data;
  }
}

module.exports = movie;

