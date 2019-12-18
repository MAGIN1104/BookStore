import React from 'react';
import  {compose} from 'redux';
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {Link} from 'react-router-dom';
import Spinner from '../layout/Spinner';
import {PropTypes} from 'prop-types';

const MostrarLibros = ({libro})=>{
    if(!libro) return <Spinner/>

    return(
            <div className="row">
                <div className="col mt-2">
                    <Link to="/" className="btn btn-secondary" >
                        <i className="fas fa arrow-circle-left"></i>
                        Volver al Listado
                    </Link>
                </div>
                <div className="col mt-2">
                    <Link
                        to={`/libros/editarlibro/${libro.id}`} className="btn btn-primary float-lg-right"
                    >
                        <i className="fas fa-pencil-alt"></i> &nbsp;
                        Editar Libro
                    </Link>
                </div>
                <hr className="mx-5 w-100"/>
                <div className="col-12">
                    <h3 className="mb-4">
                        {libro.titulo}  
                    </h3>
                    <p>
                        <span className="font-weight-bold">
                            Editorial:
                        </span> &nbsp; &nbsp; &nbsp;
                        {libro.editorial}
                    </p>
                    <p>
                        <span className="font-weight-bold">
                            ISBN:
                        </span> &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  
                        {libro.isbn}
                    </p>
                    <p>
                        <span className="font-weight-bold">
                            Existentes:
                        </span> &nbsp; &nbsp; &nbsp;
                        {libro.existencia}
                    </p>
                </div>
            </div>       
        );
}

MostrarLibros.propTypes = {
    firestore:  PropTypes.object.isRequired
}
export default compose(
    firestoreConnect(props=>[
        {
            collection  :   'libros',
            storeAs     :   'libro',
            doc         :   props.match.params.id
         }
    ]),
    connect(({ firestore: {ordered} }, props)=>({
        libro:  ordered.libro && ordered.libro[0]
    }))
)(MostrarLibros)