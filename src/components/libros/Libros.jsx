import React from 'react';
import  {compose} from 'redux';
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {Link} from 'react-router-dom';
import Spinner from '../layout/Spinner';
import {PropTypes} from 'prop-types';
const Libros = ({libros})=>{

    if(!libros) return <Spinner/>

    return ( 
        <div className="row">
            <div className="col-md-12 mb-4 mt-2">
                <Link
                    to = "/libros/nuevolibro"
                    className = "btn btn-primary"
                >
                    <i className="fas fa-plus"></i> {' '}
                    Nuevo Libro
                </Link>
            </div>

            <div className="col-md-2">
                <h2>
                    <i className="fas fa-book"></i> Libros
                </h2>
            </div>

            <table className="table table-sm table-striped mt-3">
                <thead className="text-ligth bg-primary">
                    <tr>
                        <th>Titulo</th>
                        <th>ISBN</th>
                        <th>Editorial</th>
                        <th className="text-center" >Ex.</th>
                        <th className="text-center" >Pr.</th>

                        <th className="text-center">Accion</th>
                    </tr>
                </thead>

                <tbody>
                   {libros.map(libro=>(
                    <tr key={libro.id} >
                        <td> {libro.titulo} </td>
                        <td> {libro.isbn} </td>
                        <td> {libro.editorial} </td>
                        <td className="text-center"> {libro.existencia} </td>
                        <td className="text-center"> {libro.existencia - libro.prestados.length} </td>

                        <td className="text-center">  
                                <Link
                                    to={`/suscriptores/mostrar/${libros.id}`}
                                    className="btn btn-success"
                                >
                                    <i className="fas fa-plus"></i> {' '}
                                    Detalle
                                </Link>

                                <button
                                    type="button"
                                    className="btn btn-danger"
                                >
                                    <i className="fas fa-trash-alt" ></i> {''}
                                    Borrar
                                </button>

                            </td>
                    </tr>
                   ))}
                </tbody>
            </table>
        </div>

    );
}

Libros.propTypes={
    firestore   : PropTypes.object.isRequired,
    libros      : PropTypes.array.isRequired
}

export default compose(
    firestoreConnect([{ collection : 'libros' }]),
    connect((state,props)=>({
        libros  :   state.firestore.ordered.libros
    }))
)(Libros);