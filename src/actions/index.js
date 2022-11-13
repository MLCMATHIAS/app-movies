// Actions type
export const ADD_MOVIE_FAVORITE = "ADD_MOVIE_FAVORITE";
export const GET_MOVIES = "GET_MOVIES";
export const REMOVE_MOVIE_FAVORITE = "REMOVE_MOVIE_FAVORITE";
export const GET_DETAILS = "GET_DETAILS";
export const ADD_MOVIE_CARGARAUTO = "ADD_MOVIE_CARGARAUTO";

//clave api.
const api_key = "36e54fcf";

export function getMovies(titulo) {
  return function (dispatch) {
    return fetch(`http://www.omdbapi.com/?apikey=${api_key}&s=${titulo}`)
      .then((response) => response.json())
      .then((movies) => {
        dispatch({ type: GET_MOVIES, payload: movies.Search }); 
      });        
  };
}

export function getMovieDetail(id) {
  return function (dispatch) {
    return fetch(`http://www.omdbapi.com/?apikey=${api_key}&i=${id}`)
      .then((response) => response.json())
      .then((detail) => {
        dispatch({ type: GET_DETAILS, payload: detail});
      });
  };
}

export function addMovieFavorite(payload) {
  return { type: ADD_MOVIE_FAVORITE, payload };
}

export function addmovieLoad(payload) {
  return { type: ADD_MOVIE_CARGARAUTO, payload };
}

export function removeMovieFavorite(payload) {
  return { type: REMOVE_MOVIE_FAVORITE, payload };
}

