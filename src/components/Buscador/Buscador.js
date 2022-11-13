import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Buscador.css";
import { getMovies, addMovieFavorite,addmovieLoad } from "../../actions";
import img3 from '../img/busqueda.png'

export class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title:""
    };
  }
 

  componentDidMount(){
    const NamesArray = ["batman", "panda", "doom", "peppa",
    "spider man", "iron man", "superman", "the boy",
    "resident evil", "tomb raider", "scary movie", "jason",
    "star wars", "harry potter", "matrix", "john wick",
    "terminator", "toy story", "wolverine", "thor"];
  
    var number = Math.floor(Math.random(0) * 19);//buscar un numero aleatorio
    var TitleApi = [];
    console.log(number);
    NamesArray.map((element, index) => index === number ? TitleApi.push(element) : null);
    //el elemento es batman,el index es el recorrido.
  var Title = TitleApi.toString();
    const apikey = "36e54fcf";
    fetch(`http://www.omdbapi.com/?apikey=${apikey}&s=${Title}`)
      .then((response) => response.json())
      .then((data) => {
       this.props.addmovieLoad(data.Search);
      });
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
        {/* this.props.wait === true */}
        {this.props.wait?
        (<ul className="contenedor-list-peli">
          {this.props.peliculasPrecargar?.map((movie) => {
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
        </ul>):(<ul className="contenedor-list-peli">
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
</ul>)}

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    movies: state.moviesLoaded,//
    peliculasPrecargar: state.cargarPelisAutos,
    wait:state.wait,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addMovieFavorite: (movie) => dispatch(addMovieFavorite(movie)),
    getMovies: (title) => dispatch(getMovies(title)),
    addmovieLoad:(data) => dispatch(addmovieLoad(data)),
    
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Buscador);
