const BASE_URL = `https://api.themoviedb.org/3`;
const API_KEY = `?api_key=c33575ea5f8a18616196a44b1637bda6`;

//trending
const TRENDING = `${BASE_URL}/trending/all/week${API_KEY}`;
//upcoming
const UPCOMING = `${BASE_URL}/movie/upcoming${API_KEY}`;
//genre
const GENRES = `${BASE_URL}/genre/movie/list${API_KEY}`;
//top rated
const TOP_RATED = `${BASE_URL}/movie/top_rated${API_KEY}`;

const render_movie_card = (movies, element_id) => {
  const element = document.getElementById(`${element_id}`);
  movies.forEach((movie) => {
    const movie_img = `https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`;
    element.innerHTML += `
          <div class="card" id="${element_id}-${movie.id}">
            <div class="card-header"></div>
            <div class="card-body"><img src='${movie_img}' /></div>
            <div class="card-footer" style="color: #b537f2;>${movie.original_title}</div>
        </div>`;
  });
};

fetch(UPCOMING)
  .then((res) => res.json())
  .then((movies) => {
    // console.log(movies);
    render_movie_card(movies.results, "upcoming");
  });

fetch(TRENDING)
  .then((res) => res.json())
  .then((movies) => {
    // console.log(movies.results);
    render_movie_card(movies.results, "trending");
  });

fetch(GENRES)
  .then((res) => res.json())
  .then((genres_arr) => {
    console.log(genres_arr);
    const element = document.getElementById(`genres`);
    genres_arr.genres.forEach((genre) => {
      element.innerHTML += `
          <div class="card genre-card" id="genre-${genre.id}">
            <div class="card-header"></div>
            <div class="card-body">${genre.name}</div>
        </div>`;
    });
  });

fetch(TOP_RATED)
  .then((res) => res.json())
  .then((movies) => {
    // console.log(movies.results);
    render_movie_card(movies.results, "top-rated");
  });
