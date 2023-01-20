import {ADD_MOVIE_FAVORITE,GET_MOVIES,REMOVE_MOVIE_FAVORITE,
        GET_DETAILS,ADD_MOVIE_CARGARAUTO} from "./action";

//paso 2°:
//creamos nuestro estado inicial.
const initialState = {
  moviesFavorites: [],//arreiglo de pelicualas favoritas.
  moviesLoaded: [],//arriglo de peliculas cargadas.
  movieDetail: {},//un objeto vacio que va a hacer el detalle de alguna peli.
  cargarPelisAutos:[],
  wait:true,
};


//creo los 4 reducers para las 4 acciones que creamos anteriormente que son:
//`getMovies`, `getMovieDetail`, `removeMovieFavorite`,`addMovieFavorite`.

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MOVIES://cuando la accion de su tipo sea get_movies
      return {
        ...state,//hace una copia del estado.
        moviesLoaded: action.payload,//accede a la propiedad que me devolvio la api.
        wait:false,
      };

//detalles de la peli:autor,actores,genero ect.
      case GET_DETAILS://cuando la accion de su typo se get_details
      return {
        ...state,//hace una copia del estado
        movieDetail: action.payload,//en mi nuevo estado quiero que movieDetail me muestre el detalle de la peli.
      };

//agregar una pelicula a favoritos.
    case ADD_MOVIE_FAVORITE://cuando la accion de su typo sea get_movie_favorite
      return {
        ...state,//hace una copia del estado
        moviesFavorites: state.moviesFavorites.concat(action.payload),
        // moviesFavourites:[...state.moviesFavourites,action.payload]//con metodo spread operator.
        //lo que hace es:traeme todo lo que ya haya en el moviesFavourites,
        //y agregale lo que me venga en la action.
      };

//cargar las pelis automaticamente al iniciar la pagina.
      case ADD_MOVIE_CARGARAUTO:
      return {
        ...state,//hace una copia del estado
        cargarPelisAutos:[...state.cargarPelisAutos,action.payload]
      };

//elimino una pelicula de favoritos.
      case REMOVE_MOVIE_FAVORITE://cuando la accion de su typo sea
      return {
        ...state,//hace una copia del estado
        moviesFavorites: state.moviesFavorites.filter( movie =>
         movie.id !== action.payload,
        //cambio el estado de moviesFavourite.
        //en mi nuevo estado quiero que:
        //con el metodo filter, saque una pelicula//(m => :recibe cada una de las pelis.
        //m.id !== action.payload:dejame pasar cuyo id sea diferente al que me vino al
        // payload de la accion.        
        ),
      };
    default:
      return state;//si no retorna el estado inicial.
  }
}
//Exportamos el reducer para poder usarlo en nuestro store.
export default rootReducer;



/*  2°paso:un reducer es simplemente una funcion que recibe 2 parametros: state y action. Y depende la `action` que reciba nos devuelve el estado actualizado. Al comienzo del archivo creamos nuestro estado inicial. Lo llamamos `initialState`:

 #Tienes que crear los 4 reducers para las 4 acciones que creamos anteriormente que son:`getMovies`, `getMovieDetail`, `removeMovieFavorite`,`addMovieFavorite`

 #Ya tenemos la base de nuestro reducer. Como sabemos el `initialState` es inmutable, por eso a la hora del return, hacemos una copia de este, con sintaxis de ES6 (spread operator) otra opcion seria usar `Object.assign({}, state, ...)`, y nos devuelve nuestro `state` actualizado. Exportamos el reducer para poder usarlo en nuestro store.
 */
