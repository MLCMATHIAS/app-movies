import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Buscador.css";
import { getMovies, addMovieFavorite,addmovieLoad } from "../../redux/actions/index";
import img3 from '../img/busqueda.png'

export class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = {//setea un estado local inicial.
      title:""
    };
  }
 

  componentDidMount(){
    const NamesArray = ["batman", "panda", "doom",
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
    this.setState({ title: event.target.value });//cambia el estado:de la propiedad title
  }
  handleSubmit(event) {
    event.preventDefault();//evita que se refresque la pagina,al darle al boton
    this.props.getMovies(this.state.title)//despacha la accion getMovie,con lo que tenga guardado en estado.
    this.state.title="";//limpia el buscador cada vez que le doy buscar
  }

  render() {
    console.log("props del component buscador",this.props);
    const { title } = this.state;//hace un distracturing de titulo.
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
                   this.props.addMovieFavorite({
                    title: movie.Title,
                    id: movie.imdbID,
                    Poster: movie.Poster})}>
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

/* Conectamos nuestro componente con nuestro Store.
Usamos las funciones `mapStateToProps` y `mapDispatchToProps` dentro de nuestros componentes. La primera nos permite traer nuestro state global como props a nuestro componente, y la segunda nos permite hacer el `dispatch` de nuestras actions al store. Y para terminar de conectar nuestro componente con el store global usamos una HoC ( High Order Component ) que importamos de la libreria 'react-redux' que se llama `connect`.
*/

//mapStateToProps toma el estado redux,que me va a guardar en mi componente una propiedad que se va a llamar en este caso movies que va a ser igual state.moviesLoaded ,que es donde voy a ir guardondo las pelis que busco por titulo.

function mapStateToProps(state) {
  return {
    movies: state.moviesLoaded,//
    peliculasPrecargar: state.cargarPelisAutos,
    wait:state.wait,
  };
}

function mapDispatchToProps(dispatch) {//recibe a dispatch,para despachar acciones.
  return {
    //me guarda en una props mi componente llamado getmoviesFavorites.que recibe un parametro (movie),que cuando hago props.addmoviesFavorites y la ejecute pasandole un ´parametro (movie),va a estar haciendo un dispatch de la accion (addMovieFavorite(movie)).
    addMovieFavorite: (movie) => dispatch(addMovieFavorite(movie)),
    getMovies: (title) => dispatch(getMovies(title)),
    addmovieLoad:(data) => dispatch(addmovieLoad(data)),
    
  };
}

//usamos una HoC ( High Order Component ) que importamos de la libreria 'react-redux' que se llama `connect`.
export default connect(mapStateToProps, mapDispatchToProps)(Buscador);


/* Pasamos a explicar un poco que estamos haciendo. `mapStateToProps` recibe como parametro `state` y nos devuelvo un objecto con parte del state que queremos, en este caso usamos la key 'movies' (accedemos a ella en nuestro componente como this.props.movies) y su value es la parte del estado que queremos traer, `moviesLoaded` en este caso.
`mapDispatchToProps` recibe como parametro una funcion, la llamamos dispatch, y nos devuelve un objecto, con las acciones que queremos enviar a nuestro store. Los nombres son arbitrarios, son los que usaremos para acceder a estos en nuestro componentes via props. Cada funcion nos devuelve la funcion dispatch que recibe como parametro la action que queremos enviar al store, en nuestro caso son `addMovieFavorite` y `getMovies` que tenemos en nuestra carpeta `actions`. Los parametros que recibe cada function son los payloads que usamos en nuestra action.
Dispatch una accion desde nuestro componente
*/
/*componente de funcion:
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