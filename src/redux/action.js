// Actions type
export const ADD_MOVIE_FAVORITE = "ADD_MOVIE_FAVORITE";
export const GET_MOVIES = "GET_MOVIES";
export const REMOVE_MOVIE_FAVORITE = "REMOVE_MOVIE_FAVORITE";
export const GET_DETAILS = "GET_DETAILS";
export const ADD_MOVIE_CARGARAUTO = "ADD_MOVIE_CARGARAUTO";

//clave api.
const api_key = "36e54fcf";

//1° creamos nuestras  Actions.
//  para hacer la request:solicitar a la API y traer todas las peliculas `getMovie'.

export function getMovies(titulo) {
  return async function (dispatch) {
    return await fetch(`http://www.omdbapi.com/?apikey=${api_key}&s=${titulo}`)//hace un llamado a la api.
      .then((response) => response.json())//capturo la respuesta y lo convierte en un objeto javascript
      .then((movies) => {//objeto ya convertido en javascript.
        dispatch({ type: GET_MOVIES, payload: movies.Search }); //despacho la accion({})
                   //el tipo        inf extra: va a ser el obj que me devolvio la api.
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

//agregar una pelicula a favorito.
export function addMovieFavorite(payload) {
  return { type: ADD_MOVIE_FAVORITE, payload };
}
//sacamos una pelicula de favoritos.
export function addmovieLoad(payload) {
  return { type: ADD_MOVIE_CARGARAUTO, payload };
}
//elimina una pelicula de favoritos
export function removeMovieFavorite(payload) {
  return { type: REMOVE_MOVIE_FAVORITE, payload };
}

