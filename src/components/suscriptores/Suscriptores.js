import React from 'react';
import  {compose} from 'redux';
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {Link} from 'react-router-dom';
import Spinner from '../layout/Spinner';
import {PropTypes} from 'prop-types';
const Suscriptores = ({suscriptores,firestore})=>{
    
    if(!suscriptores) return <Spinner/> // Si no hay suscriptores nos muesta un spinner que fue creado en components/layout/Spinner.js

    //eliminar suscriptores

        const eliminarSuscriptor = id=>{
            firestore.delete({
                collection: 'suscriptores',
                doc:    id
            })
        }

    return(   
    //aca mostraremos a los suscriptores y ademas navegaremos con los botones
        <div className="row">
            <div className="col-md-12 mb-4 mt-2">
                <Link
                    to="/suscriptores/nuevo"
                    className="btn btn-primary"
                >
                    <i className="fas fa-plus"></i> {''}  {/*los <i></i>  nos sirven para incluir ICONOS*/}
                    Nuevo Suscriptor
                </Link>
            </div>

            {/**ACA CREAMOS UN DIV PARA TENER UN TITULO CON UN ICONO */}
            <div className="col-md-2">
                <h2>
                    <i className="fas fa-users" ></i> Suscriptores
                </h2>
            </div>
            {/**CREACION DE LA TABLAS */}
            <table className="table table-striped mt-3">
                <thead className="text-light bg-primary">
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Carrera</th>
                        <th>Accion</th>
                    </tr>
                </thead> 
                
                <tbody>
                    {suscriptores.map(suscriptor=>(
                        <tr key={suscriptor.id}>
                            <td> {suscriptor.nombre}</td>
                            <td> {suscriptor.apellidos}</td>
                            <td> {suscriptor.carrera}</td>
                            <td className="text-center">  
                                <Link
                                    to={`/suscriptores/mostrar/${suscriptor.id}`}
                                    className="btn btn-success btn-block"
                                >
                                    <i className="fas fa-angle-double-right"></i> {' '}
                                    Mas Informacion
                                </Link>

                                <button
                                    type="button"
                                    className="btn btn-danger btn-block"
                                    onClick={()=>eliminarSuscriptor(suscriptor.id)}
                                >
                                    <i className="fas fa-trash-alt" ></i> {''}
                                    Eliminar
                                </button>

                            </td>
                        </tr>
                        
                    ))}
                </tbody>               
            </table>
        </div>
    );
}


Suscriptores.protoTypes={
    firestore : PropTypes.object.isRequired,
    suscriptores : PropTypes.array.isRequired
}

/*ESTE EXPORT ES MUY DIFERENTE  A LOS DEMAS YA QUE ESTAMOS TRABAJANDO CON LA CONEXION DE LA BASE DE DATOS Y ADEMAS DEBEMOS RETORNAR UNA COLECCION*/
export default compose(
    firestoreConnect([{ collection : 'suscriptores' }]),
    connect((state, props) => ({
        
        suscriptores : state.firestore.ordered.suscriptores
    }))
)(Suscriptores);