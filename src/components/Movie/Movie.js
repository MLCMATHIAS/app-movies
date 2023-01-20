import React from "react";
import { connect } from "react-redux";
import { getMovieDetail } from "../../redux/action";
import "./Movie.css";

//Ahora cuando hagamos click en alguna pelicula nos deberia llevar a la ruta
// `/movie/{movie-id}`. En nuestro componente Movie tenemos que usar ese parametro
// para usarlo en nuestra `getMovieDetail` function. Podemos acceder a este valor
// gracias a las `props` que nos da `react-router`.
//debemos poner componetDidMount :para que cuando el componente se valla a montar,
// no se pierda lo cargado en el render:osea la informacion ya obtenida.
//y al refrescar la pantalla en el navegador ,nose pierda la info y quede en blanco.

class Movie extends React.Component {
  componentDidMount() {
    this.props.getMovieDetail(this.props.match.params.id);
    //con this.props.match.params.id,tomamos el valor de nuestro id.
    //anda a buscar ese detalle en particular.
  }

  /*Llamamos a la funcion `getMovieDetail` y le pasamos nuestro ID todo dentro de
   nuestro `componentDidMount`. Una vez obtenido los datos tendriamos que tenerlos
   en `this.props.movieDetail` (obtenidos desde nuestro mapStateToProps y guardado
   en nuestro initalState). Y por ultimo mostramos detalles de la pelicula por ej:
    Titulo, Año, Rating, Plot, Premios, Genero, etc... Ej:*/

  render() {
    return (
      <div className="movie-detalle-padre">
        <div className="movie-detalle-hijo">
          <div className="movie-card-detalle">
            <img src={this.props.movie.Poster}></img>
          </div>
          <div className="card-inf-extra">
            <h1 className="titulo-info-extra">
              Título:{this.props.movie.Title}
            </h1>
            <h2>Detalle:{this.props.movie.Plot}</h2>
            <h3>Genero:{this.props.movie.Genre}</h3>
            <h3>Director:{this.props.movie.Director}</h3>
            <h3>Estreno:{this.props.movie.Released}</h3>
            <h3>Actores principales:{this.props.movie.Actors}</h3>
            <h3>Lenguaje:{this.props.movie.Language}</h3>
            <h3>Duracion:{this.props.movie.Runtime}</h3>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    movie: state.movieDetail,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getMovieDetail: (id) => dispatch(getMovieDetail(id)),
    //getmoviedetail:va a ser una funcion,que va a recibir una propiedad:(id),
    //y esa propiedad va a despachar una accion:(getMovieDetail(id)).
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
