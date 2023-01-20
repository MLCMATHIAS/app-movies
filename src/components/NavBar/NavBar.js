import React from "react";
import { NavLink } from "react-router-dom";
import img from "../img/camara-de-video.png";
import "./Navbar.css";

export default function NavBar() {
  return (
    <header className="navbar">
      <div className="contenedor-logo">
        <img
          id="pelicula-logo-img"
          src={img}
          width="70"
          height="70"
          className="d-inline-block align-top"
          alt=""
        />
        <h1>Movie mlc</h1>
      </div>
      <nav>
        <ul className="list">
          <li className="list-item">
            <NavLink exact to="/">
              Home
            </NavLink>
            <NavLink to="/favs">Favoritas</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
