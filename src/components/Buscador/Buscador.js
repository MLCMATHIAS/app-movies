import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Buscador.css";
import { getMovies, addMovieFavorite, addmovieLoad } from "../../redux/action";
import img3 from "../img/busqueda.png";

export class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""//setea un estado local inicial.
    };
  }
//me va a tomar uno de los nombres aleatoriamente al cargar la pagina inicial.
  componentDidMount() {
    const NamesArray = [
      "batman",
      "spider man",
      "iron man",
      "superman",
      "resident evil",
      "tomb raider",
      "scary movie",
      "star wars",
      "harry potter",
      "matrix",
      "john wick",
      "terminator",
      "toy story",
      "wolverine",
      "thor",
    ];

    var number = Math.floor(Math.random(0) * 15); //buscar un numero aleatorio
    var TitleApi = [];
    console.log(number);
    NamesArray.map((element, index) =>
      index === number ? TitleApi.push(element) : null
    );
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
    this.setState({ title: event.target.value }); //cambia el estado:de la propiedad title
  }
  handleSubmit(event) {
    event.preventDefault(); //evita que se refresque la pagina,al darle al boton
    this.props.getMovies(this.state.title); //despacha la accion getMovie,con lo que tenga guardado en estado.
    this.state.title = ""; //limpia el buscador cada vez que le doy buscar
  }

  render() {
    const { title } = this.state; //hace un distracturing de titulo.
    return (
      <div className="contenedor-buscador">
        <div className="contenedor-banner">
          <h1 className="texto-titulo"> Movies Mlc </h1>
          <p className="texto-parrafo">
            Encontra todas tus peliculas favoritas en un solo sitio y
            gratis!Terror, Accion, Suspenso, Documentales, Anime y mas..!
          </p>
        </div>

        <form className="form-container" onSubmit={(e) => this.handleSubmit(e)}>
          <div className="contenedor-buscar-peli">
            <img
              id="img-buscador"
              src={img3}
              width="40"
              height="40"
              className="d-inline-block align-top "
              alt=""
            />
            <label className="label" htmlFor="title">
              {""}
            </label>
            <input
              className="buscar-pelicula"
              type="text"
              placeholder="Search Movie"
              id="title"
              autoComplete="off"
              value={title}
              onChange={(e) => this.handleChange(e)}
            />
          </div>
        </form>

        {this.props.wait ? (
          <ul className="contenedor-list-peli">
            {this.props.peliculasPrecargar?.map((movie) => {
              return (
                <div className="card-list-peli">
                  <div key={movie.imdbID}>
                    <div>
                      <Link to={`/movie/${movie.imdbID}`}>
                        <img
                          className="img-pelis"
                          src={movie.Poster}
                          alt="imagen"
                        />
                      </Link>
                    </div>
                    <button
                      className="btn-fav"
                      onClick={() =>
                        this.props.addMovieFavorite({
                          title: movie.Title,
                          id: movie.imdbID,
                          Poster: movie.Poster,
                        })
                      }
                    >
                      <div className="btn-text">Agregar a favoritos</div>
                    </button>
                  </div>
                </div>
              );
            })}
          </ul>
        ) : (
          <ul className="contenedor-list-peli">
            {this.props.movies?.map((movie) => {
              return (
                <div className="card-list-peli">
                  <div key={movie.imdbID}>
                    <div>
                      <Link to={`/movie/${movie.imdbID}`}>
                        <img
                          className="img-pelis"
                          src={movie.Poster}
                          alt="imagen"
                        />
                      </Link>
                    </div>
                    <button
                      className="btn-fav"
                      onClick={() =>
                        this.props.addMovieFavorite({
                          title: movie.Title,
                          id: movie.imdbID,
                          Poster: movie.Poster,
                        })
                      }
                    >
                      <div className="btn-text">Agregar a favoritos</div>
                    </button>
                  </div>
                </div>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}



//mapStateToProps toma el estado redux,que me va a guardar en mi componente una
// propiedad que se va a llamar en este caso movies que va a ser igual state.
//moviesLoaded ,que es donde voy a ir guardondo las pelis que busco por titulo.

//me permite acceder al estado global(volores o propiedades)
//para luego despacharlas como props.
function mapStateToProps(state) {
  return {
    movies: state.moviesLoaded,
    peliculasPrecargar: state.cargarPelisAutos,
    wait: state.wait,
  };
}

//me permite despachar acciones.
//para luego poder usarlas como props.
function mapDispatchToProps(dispatch) {
  return {
    addMovieFavorite: (movie) => dispatch(addMovieFavorite(movie)),
    getMovies: (title) => dispatch(getMovies(title)),
    addmovieLoad: (data) => dispatch(addmovieLoad(data)),
  };
}

/* Conectamos nuestro componente con nuestro Store.
Usamos las funciones `mapStateToProps` y `mapDispatchToProps` dentro de nuestros
componentes. La primera nos permite traer nuestro state global como props a nuestro
componente, y la segunda nos permite hacer el `dispatch` de nuestras actions al store.
Y para terminar de conectar nuestro componente con el store global usamos una
HoC ( High Order Component ) que importamos de la libreria 'react-redux' 
que se llama `connect`.
*/
export default connect(mapStateToProps, mapDispatchToProps)(Buscador);


/*Usando componente de funcion:
export default function Buscador({prop1, prp2}){
  const[title,setTitle] = useState('')
  
  let handleChange = (e) => {
    setTitle(e.target.value);
  }
  let handleChange = (e) => {
    e.prevenDefault();
  }

  return(
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
*/
