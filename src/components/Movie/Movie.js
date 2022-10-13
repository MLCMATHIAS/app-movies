import React from "react";
import { connect } from "react-redux";
import { getMovieDetail } from "../../actions/index";
import "./Movie.css";


class Movie extends React.Component {
  componentDidMount() { 
    this.props.getMovieDetail(this.props.match.params.id);
  }

  render() {
    return (  
    <div className="movie-detalle-padre">
      <div className="movie-detalle-hijo">
        <div className="movie-card-detalle">
        <img src={this.props.movie.Poster}></img>
        </div>
       <div className="card-inf-extra">
        <h1 className="titulo-info-extra">Título:{this.props.movie.Title}</h1>
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
