import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Favorites.css";
import { removeMovieFavorite } from "../../actions";


export class ConnectedList extends Component {
  render() {
    return (
      <div className="contenedor-banner-fav">
        <div className="contenedor-titulo">
          <h2 className="titulo-fav">Películas Favoritas</h2>
          </div>
          {this.props.movies?.map((movie) => {
            return (
                <li key={movie.id}>
                  <div className="contenedor-padre-cars">
                  <div className="contenedor-cards" >
                    <Link className="titulo-pelis-fav"
                      to={`/movie/${movie.id}`}>
                      {<img className="imagen-fav" src={movie.Poster} alt="imagen" />}
                    </Link> 
                    <div className="contenedor-btn">
                    <button className="btn-eliminar-fav"
                    onClick={() => this.props.removeMovieFavorite(movie.id)}
                  >X</button>  
                    </div>
                  </div>
                  </div>
                </li>
            );
          })}      
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    movies: state.moviesFavorites,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeMovieFavorite: (id) => dispatch(removeMovieFavorite(id)),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ConnectedList);
