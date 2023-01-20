import React from "react";
import { Route } from "react-router-dom";
import Favorites from "./components/Favorites/Favorites";
import Buscador from "./components/Buscador/Buscador";
import NavBar from "./components/NavBar/NavBar";
import Movie from "./components/Movie/Movie";


function App() {
  return (
      <>
          <NavBar />  
          <Route exact path="/" component={Buscador} />
          <Route path="/favs" component={Favorites} />        
          <Route path="/movie/:id" component={Movie} />
      </>
  );
}

export default App;
