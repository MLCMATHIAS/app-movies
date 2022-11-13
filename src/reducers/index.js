import {ADD_MOVIE_FAVORITE,GET_MOVIES,REMOVE_MOVIE_FAVORITE,
        GET_DETAILS,ADD_MOVIE_CARGARAUTO} from "../actions";

const initialState = {
  moviesFavorites: [],
  moviesLoaded: [],
  movieDetail: {},
  cargarPelisAutos:[],
  wait:true,
};

//acciones.

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MOVIES:
      return {
        ...state,
        moviesLoaded: action.payload,
        wait:false,
      };

      case GET_DETAILS:
      return {
        ...state,
        movieDetail: action.payload,
      };

    case ADD_MOVIE_FAVORITE:
      return {
        ...state,
        moviesFavorites: state.moviesFavorites.concat(action.payload),
        
      };

      case ADD_MOVIE_CARGARAUTO:
      return {
        ...state,
        cargarPelisAutos: state.cargarPelisAutos.concat(action.payload),
      };

      case REMOVE_MOVIE_FAVORITE:
      return {
        ...state,
        moviesFavorites: state.moviesFavorites.filter( movie =>
         movie.id !== action.payload,
        ),
      };
    default:
      return state;
  }
}

export default rootReducer;

