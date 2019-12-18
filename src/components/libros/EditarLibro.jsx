import React , {Component} from 'react';
import  {compose} from 'redux';
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {Link} from 'react-router-dom';
import Spinner from '../layout/Spinner';
import {PropTypes} from 'prop-types';
class EditarLibro extends Component{
    //crear los refs
    tituloInput = React.createRef();
    editorialInput = React.createRef();
    isbnInput = React.createRef();
    existentesInput= React.createRef();

    //editar libro en la base de datos
    editarlibro = e=>{
        e.preventDefault();
        //crear el objeto que va actualizar
        const libroActualizado={
            titulo      : this.tituloInput.current.value,
            editorial   : this.editorialInput.current.value,
            isbn        : this.isbnInput.current.value,
            existencia  : this.existentesInput.current.value
        }
        //EXTRAER FIRESTORE Y HISTORY DE PROPS
        const {libro,firestore,history}=this.props

        //almacenar en la base de datos de firebase
        firestore.update({
            collection  :'libros',
            doc         :libro.id,

        }, libroActualizado).then(history.push('/'));
    }


    render(){
        const {libro} = this.props;
        if(!libro) return <Spinner/>
        return(
            <div className="row">
                <div className="col-12 mb-4 mt-5">
                    <Link to={'/'} className="btn btn-secondary">
                        <i className="fas fa-arrow circle-left">
                            Volver al Listado
                        </i>                    
                    </Link>
                </div>

                <div className="col-12">
                    <h4>
                        <i className="fas fa-pencil-alt"> &nbsp;
                            Editar Libro
                        </i>
                    </h4>

                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <form
                                onSubmit={this.editarlibro}
                            >

                                <div className="form-group">
                                    <label>Titulo:</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="titulo"
                                        required
                                        ref = {this.tituloInput}
                                        defaultValue={libro.titulo}
                                        
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Editorial:</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="editorial"
                                        required
                                        ref = {this.editorialInput}
                                        defaultValue={libro.editorial}
                                        
                                    />
                                </div>

                                <div className="form-group">
                                    <label>ISBN:</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="isbn"
                                        required
                                        ref = {this.isbnInput}
                                        defaultValue={libro.isbn}
                                        
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Existentes:</label>
                                    <input 
                                        type="number"
                                        className="form-control"
                                        name="existencia"
                                        required
                                        ref = {this.existentesInput}
                                        defaultValue={libro.existencia}
                                        
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

EditarLibro.propTypes = {
    firestore   :PropTypes.object.isRequired
}
export default compose(
    firestoreConnect(props=>[
        {
            collection  :   'libros',
            storeAs     :   'libro',
            doc         :   props.match.params.id
        }
    ]),
    connect(({ firestore:   {ordered}}, props)=>({
        libro: ordered.libro && ordered.libro[0]
    }))
)(EditarLibro)