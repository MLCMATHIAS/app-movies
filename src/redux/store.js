import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
/* conectamos nuestro Store con nuestra App de React.
Es hora de conectar todo. Para eso necesitaremos de un componente que nos brinda la libreria 'react-redux', que se llama `Provider`. En nuestro Provider llamamos a nuestro store, y con este envolvemos a toda nuestra App, para tener acceso a nuestro store desde cualquier componente hijo. */
//Ya tenemos nuestro STORE conectado con nuestra App!
//el browserRouter lo utilizamos para poder utilizar la routes.
// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__ || compose;

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))


export default store;


