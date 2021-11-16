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
    const movie_img = `https://image.tmdb.org/t/p/w185_and_h278_bestv2${movie.poster_path}`;
    element.innerHTML += `
          <div onclick='show_movie_details_on_click(${movie.id})' class="card" id="${element_id}-${movie.id}">
            <div class="card-header"></div>
            <div class="card-body"><img src='${movie_img}' /></div>
            <div class="card-footer" style="color: #b537f2;>${movie.original_title}</div>
        </div>`;
  });
};

fetch(UPCOMING)
  .then((res) => res.json())
  .then((movies) => {
    console.log(movies.results);
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
    // console.log(genres_arr);
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

const show_movie_details_on_click = (id) => {
  const clicked_movie = `${BASE_URL}/movie/${id}${API_KEY}`;
  fetch(clicked_movie)
    .then((res) => res.json())
    .then((movie) => {
      document.querySelector("body").style.overflow = "hidden";
      const movie_details_element = document.getElementById("movie-details");
      movie_details_element.classList.add("show");

      movie_details_element.innerHTML = `
      <div  class="movie-details-close">
          <button onclick='close_movie_details_on_click()' class="close">x</button>
      </div>
      <div class="movie-details-header">
          <h3>${movie.original_title}</h3>
        </div>
        <div class="movie-details-body">
          <img
            src="https://image.tmdb.org/t/p/w185_and_h278_bestv2${movie.poster_path}"
          />
        
          <p class="movie-details-descp">
          ${movie.overview}
          </p>
        
          <p class="movie-details-descp">Released Date: ${movie.release_date}</p>
        </div>`;
    });
};

const close_movie_details_on_click = () => {
  document.querySelector("body").style.overflow = "initial";
  const movie_details_element = document.getElementById("movie-details");
  movie_details_element.classList.remove("show");
};
