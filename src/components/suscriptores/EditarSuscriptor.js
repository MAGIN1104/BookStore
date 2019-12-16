import React,{Component} from 'react';
import  {compose} from 'redux';
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {Link} from 'react-router-dom';
import Spinner from '../layout/Spinner';
import {PropTypes} from 'prop-types';
class EditarSuscriptor extends Component{


    //crear los refs
    nombreInput = React.createRef();
    apellidosInput= React.createRef();
    carreraInput= React.createRef();
    codigoInput= React.createRef();

    //editar suscriptor en la base de datos
    editarSuscriptor= e=>{
        e.preventDefault();
        //crear el objeto que va actualizar
        const suscriptorActualizado={
            nombre      : this.nombreInput.current.value,
            apellidos   : this.apellidosInput.current.value,
            carrera     : this.carreraInput.current.value,
            codigo      : this.codigoInput.current.value
        }
        // EXTRAER FIRESTORE Y HISTORY DE POPS
        const {suscriptor,firestore,history} = this.props        

        //almacenar en la bse de datos de firebase
        firestore.update({
            collection  :'suscriptores',
            doc         : suscriptor.id
        }, suscriptorActualizado).then(history.push('/suscriptores'));
    }

    render(){
        const {suscriptor} = this.props;
        if(!suscriptor) return <Spinner/>
        return(
            
            <div className="row">
                <div className="col-12 mb-4 mt-5">
                    <Link to={'/suscriptores'} className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i> {''}
                        Volver al Listado
                    </Link>
                </div>
                <div className="col-12">
                    <h4>
                    <i className="fas fa-pencil-alt"></i> &nbsp;
                        Editar Suscriptor
                    </h4>

                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <form
                                onSubmit={this.editarSuscriptor}
                            >

                                <div className="form-group">
                                    <label>Nombre:</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="nombre"
                                        placeholder="Nombre del Suscriptor"
                                        required
                                        ref={this.nombreInput}  
                                        defaultValue={suscriptor.nombre}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Apellido:</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="apellidos"
                                        placeholder="Apellido del Suscriptor"
                                        required
                                        ref={this.apellidosInput}  
                                        defaultValue={suscriptor.apellidos}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Carrera:</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="carrera"
                                        placeholder="Carrera del Suscriptor"
                                        required
                                        ref={this.carreraInput}  
                                        defaultValue={suscriptor.carrera}

                                    />
                                </div>

                                <div className="form-group">
                                    <label>Código:</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="codigo"
                                        placeholder="Código del Suscriptor"
                                        required
                                        ref={this.codigoInput}  
                                        defaultValue={suscriptor.codigo}
            
                                    />
                                </div>

                                <input 
                                    type="submit"
                                    value="Guardar Cambios"
                                    className="btn btn-success"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

EditarSuscriptor.protoTypes ={
    firestore   : PropTypes.object.isRequired
}

export default compose(
    firestoreConnect(props=>[
        {
            collection  :   'suscriptores',
            storeAs     :   'suscriptor',
            doc         :    props.match.params.id

        }
    ]),
    connect(({firestore: {ordered}}, props)=>({
        suscriptor: ordered.suscriptor && ordered.suscriptor[0]
    }))
)(EditarSuscriptor)