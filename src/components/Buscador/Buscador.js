import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Buscador.css";
import { getMovies, addMovieFavorite } from "../../actions";
import img3 from '../img/busqueda.png'

export class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title:""
    };
  }
  handleChange(event) {
    this.setState({ title: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.getMovies(this.state.title)
    this.state.title="";
  }

  render() {
    console.log("props del component buscador",this.props);
    const { title } = this.state;
    return (
      <div className="contenedor-buscador">       
        <div className="contenedor-banner">        
        <h1 className="texto-titulo">Tus movies </h1>
      <p className="texto-parrafo">Encontra todas tus peliculas favoritas en un solo sitio y gratis!Terror, Accion, Suspenso, Documentales, Anime y mas..!</p>
        </div>
      
        <form className="form-container" onSubmit={(e) => this.handleSubmit(e)}>
          <div className="contenedor-buscar-peli">
          <img id="img-buscador" src={img3} width="40" height="40" className="d-inline-block align-top " alt="" />
            <label className="label" htmlFor="title">
             {""}
            </label>
            <input className="buscar-pelicula"
              type="text"
              placeholder="Search Movie"
              id="title"
              autoComplete="off"
              value={title}
              onChange={(e) => this.handleChange(e)}
            />
          </div>         
        </form>
        <ul className="contenedor-list-peli">
          {this.props.movies?.map((movie) => {
            return (
              <div className="card-list-peli">
              <div key={movie.imdbID}>
                <div>
                <Link to={`/movie/${movie.imdbID}`}>
                  <img className="img-pelis" src={movie.Poster} alt="imagen" /></Link>
                </div>
                <button className="btn-fav" onClick={() =>
                   this.props.addMovieFavorite({title: movie.Title, id: movie.imdbID, Poster: movie.Poster})}>
                    <div className="btn-text">Agregar a favoritos</div></button>
              </div>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    movies: state.moviesLoaded,//
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addMovieFavorite: (movie) => dispatch(addMovieFavorite(movie)),
    getMovies: (title) => dispatch(getMovies(title)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Buscador);
