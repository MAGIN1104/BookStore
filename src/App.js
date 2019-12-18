import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';


import Suscriptores from './components/suscriptores/Suscriptores';
import MostrarSuscriptor from './components/suscriptores/MostrarSuscriptor';
import NuevoSuscriptor from './components/suscriptores/NuevoSuscriptor';
import EditarSuscriptor from './components/suscriptores/EditarSuscriptor';

import Libros from './components/libros/Libros';
import EditarLibro from './components/libros/EditarLibro';
import MostrarLibro from './components/libros/MostrarLibros';
import NuevoLibro from './components/libros/NuevoLibro';
import PrestamoLibro from './components/libros/PrestamoLibro';


import Navbar from './components/layout/Navbar';

function App() {
  return (
    <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
                <Route exact path="/suscriptores" component={(Suscriptores)} />
                <Route exact path="/suscriptores/nuevo" component={(NuevoSuscriptor)} />
                <Route exact path="/suscriptores/mostrar/:id" component={(MostrarSuscriptor)} />
                <Route exact path="/suscriptores/editar/:id" component={(EditarSuscriptor)} />
                
                <Route exact path="/" component={(Libros)}/>
                <Route exact path="/libros/nuevolibro" component={(NuevoLibro)}/>
                <Route exact path="/libros/editarlibro/:id" component={(EditarLibro)}/>
                <Route exact path="/libros/mostrarlibro/:id" component={(MostrarLibro)}/>
                <Route exact path="/libros/prestamo/:id" component={(PrestamoLibro)}/>
            </Switch>
          </div>
      </Router>
    </Provider>
  );
}

export default App;
