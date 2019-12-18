import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

class NuevoLibro extends Component{
    state ={
        titulo:'',
        isbn:'',
        editorial:'',
        existencia:''
     }

    // Agrega un nuevo libro a la base de datos
    agregarLibro = e => {
        e.preventDefault();

        // extraer los valores del state
        const nuevoLibro = this.state;

        //AGREGAR LIBRO INTERESADOS
        nuevoLibro.prestados=[]
        // extraer firestore  de props
        const { firestore, history } = this.props

        //Guardarlo en la base de datos
        firestore.add({ collection : 'libros' }, nuevoLibro)
            .then(() => history.push('/') )
    }

    // extrae los valores del input y los coloca en el state
    leerDato = e => {
        this.setState({
            //leedelinput    //y se llena con ese valor
            [e.target.name] : e.target.value
        })
    }

    render(){
        return(
            <div className="row">
                <div className="col-12 mb-4 mt-2">
                    <Link to='/' className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i>&nbsp; 
                            Volver al listado
                    </Link>
                </div>
                <div className="col-12">
                    <h2>
                        <i className="fas-fa-book"></i> &nbsp;
                        Nuevo Libro 
                    </h2>             
                    <div className="row justify-content-center">
                        <div className="col-md-5 mt-5">
                        <form
                            onSubmit={this.agregarLibro}
                        >
                            <div className="form-group">
                                <label>Titulo:</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="titulo"
                                        placeholder="Titulo o Nombre de Libro"
                                        required
                                        onChange={this.leerDato} 
                                        value={this.state.titulo}
                                    />
                            </div>
                            <div className="form-group">
                                <label>Editorial:</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="editorial"
                                        placeholder="Editorial del Libro"
                                        required
                                        value={this.state.editorial}
                                        onChange={this.leerDato} 
                                    />
                            </div>
                            <div className="form-group">
                                <label>ISBN:</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="isbn"
                                        placeholder="ISBN del Libro"
                                        required
                                        onChange={this.leerDato} 
                                        value={this.state.isbn}
                                    />
                            </div>

                            <div className="form-group">
                                <label>Existencia:</label>
                                    <input 
                                        type="number"
                                        min="0"
                                        className="form-control"
                                        name="existencia"
                                        placeholder="Cantidad en existencia"
                                        required
                                        onChange={this.leerDato} 
                                        value={this.state.existencia}
                                    />
                            </div>
                            <input type="submit" value="Agregar libro" className="btn btn-success"/>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

NuevoLibro.propTypes ={
    firestore : PropTypes.object.isRequired
}

export default firestoreConnect()(NuevoLibro);