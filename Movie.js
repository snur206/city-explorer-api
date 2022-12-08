'use strict';

class Movie {
  constructor(title, overview, average_votes, total_votes, popularity, released_on) {
    this.title = title;
    this.overview = overview;
    this.average_votes = average_votes;
    this.total_votes = total_votes;
    this.popularity = popularity;
    this.released_on = released_on;
  }
}

module.exports = Movie;
