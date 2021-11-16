const BASE_URL = `https://api.themoviedb.org/3`;
const API_KEY = `?api_key=c33575ea5f8a18616196a44b1637bda6`;

const TRENDING = `${BASE_URL}/trending/all/week${API_KEY}`;
const GENRES = `${BASE_URL}/genre/movie/list${API_KEY}`;
const LATEST = `${BASE_URL}/movie/latest${API_KEY}`;
const NOW_PLAYING = `${BASE_URL}/movie/now_playing${API_KEY}`;
const POPULAR = `${BASE_URL}/movie/popular${API_KEY}`;
const TOP_RATED = `${BASE_URL}/movie/top_rated${API_KEY}`;
const UPCOMING = `${BASE_URL}/movie/upcoming${API_KEY}`;

let MOVIES = [];

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

const render_movie_card_per_genre = (movies, element_id) => {
  const element = document.getElementById(`${element_id}`);
  element.classList.add("show");
  element.innerHTML = `<div class="close-wrapper">
  <button class="close" onclick="close_movie_details_on_click(event)">
    x
  </button>
  </div>
  <div class="movie-per-genre-container">

  </div>
`;

  const body_element = document.querySelector(".movie-per-genre-container");
  movies.forEach((movie) => {
    const movie_img = `https://image.tmdb.org/t/p/w185_and_h278_bestv2${movie.poster_path}`;
    body_element.innerHTML += `
        
            <div
                onclick='show_movie_details_on_click(${movie.id})'
                class="movie-per-genre-card"
                >
                <div class="movie-per-genre-card-header"></div>
                <div class="movie-per-genre-card-body">
                    <img src='${movie_img}' />
                </div>
            </div>
        `;
  });
};

const infinite_scroll = (element) => {
  const content_element = document.getElementById(`${element}`);
  content_element.addEventListener("scroll", (e) => {
    let max_possible_scroll = content_element.scrollLeftMax;
    if (e.target.scrollLeft >= max_possible_scroll) {
      content_element.childNodes.forEach((child) => {
        const cloned_content = child.cloneNode(true);
        content_element.appendChild(cloned_content);
      });
    }
  });
};

fetch(UPCOMING)
  .then((res) => res.json())
  .then((movies) => {
    // console.log("UPCOMING", movies.results);
    infinite_scroll("upcoming");
    render_movie_card(movies.results, "upcoming");
  });

fetch(TRENDING)
  .then((res) => res.json())
  .then((movies) => {
    // console.log("TRENDING", movies.results);
    MOVIES = [...MOVIES, ...movies.results];
    infinite_scroll("trending");
    render_movie_card(movies.results, "trending");
  });

fetch(GENRES)
  .then((res) => res.json())
  .then((genres_arr) => {
    // console.log("GENRES", genres_arr);
    const element = document.getElementById(`genres`);
    genres_arr.genres.forEach((genre) => {
      element.innerHTML += `
          <div onclick='show_movie_per_genre(${genre.id})' class="card genre-card" id="genre-${genre.id}">
            <div class="card-header"></div>
            <div class="card-body">${genre.name}</div>
        </div>`;
    });
  });

fetch(TOP_RATED)
  .then((res) => res.json())
  .then((movies) => {
    // console.log("TOP_RATED",movies.results);
    MOVIES = [...MOVIES, ...movies.results];
    infinite_scroll("top-rated");
    render_movie_card(movies.results, "top-rated");
  });

fetch(POPULAR)
  .then((res) => res.json())
  .then((movies) => {
    // console.log(""POPULAR,movies.results);
    MOVIES = [...MOVIES, ...movies.results];
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
      <div  class="close-wrapper">
          <button class="close" onclick='close_movie_details_on_click(event)'>x</button>
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

const close_movie_details_on_click = (event) => {
  document.querySelector("body").style.overflow = "initial";
  event.target.parentElement.parentElement.classList.remove("show");
};

const show_movie_per_genre = (genre_id) => {
  console.log(genre_id);
  const movies_new_arr = MOVIES.filter((movie) =>
    movie.genre_ids.includes(genre_id)
  );
  console.log(MOVIES);
  console.log(movies_new_arr);
  render_movie_card_per_genre(movies_new_arr, "movie-per-genre");
};
