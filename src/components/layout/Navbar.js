import React from 'react';
import {Link} from  'react-router-dom'; //Importamos {Link} para sacarle mas provecho a react esto reemplaza a los <a href="" />
const Navbar = () => {     // esto nos devolcera un navbar y nos mostrara un menu responsive en la parte superior
    return(
        <nav className="navbar navbar-expand-md navbar-dark bg-primary">
            <nav className="navbar navbar-light">
                <span className="navbar-brad mb-0">
                    Administrador de Biblioteca
                </span>
            </nav>   

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        

        <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav ms-auto mr-5">
            <li className="nav-item">
                <Link to={'/Suscriptores'} className="nav-link">
                    Suscriptores
                </Link>
            </li>
            <li className="nav-item">
                {/*LOS LINKS REEMPLAZAN A LOS HREF*/}
                <Link to={'/'} className="nav-link"> 
                    Libros
                </Link>
            </li>
            </ul>
        </div>
        </nav>
    );
}

export default Navbar;