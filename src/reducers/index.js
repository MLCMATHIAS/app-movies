import {ADD_MOVIE_FAVORITE,GET_MOVIES,REMOVE_MOVIE_FAVORITE,GET_DETAILS,} from "../actions";

const initialState = {
  moviesFavorites: [],
  moviesLoaded: [],
  movieDetail: {},
};

//acciones.

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MOVIES:
      return {
        ...state,
        moviesLoaded: action.payload,
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

