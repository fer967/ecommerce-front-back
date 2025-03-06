import { Link, useNavigate } from 'react-router-dom';
import "./Home.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const Home = () => {
    const navigate = useNavigate();
    const handleProductsRedirect = () => {
        navigate('/productos');
    };
    return (
        <div className="home-container">
            <div className="home">
                <h3>Tenemos lo que necesitas :</h3>
                <p>Instrumentos Nuevos y Usados</p>
                <p>Accesorios</p>
                <p>Cursos propios</p>
                <p>Entrega a domicilio</p>
                <p>Atencion personalizada</p>
            </div>
            <br />
            <div className="home">
                <h3>Visitanos en :</h3>
                <p>Av. San Martin 1850</p>
                <p>
                    <a href="https://wa.me/03516271526?text=Hola%20quiero%20más%20información
                        " target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faWhatsapp} /> 03516271526
                    </a>
                </p>
            </div>
            <br />
            <div className="home">
                <h3>Seguinos en :</h3>
                <p>
                    <a href="URL_DE_TU_FACEBOOK" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebook} />
                    </a>
                </p>
                <p>
                    <a href="URL_DE_TU_INSTAGRAM" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                </p>
            </div>
            <br />
            <button onClick={handleProductsRedirect} className='button'>Nuestro Productos</button>
            <Link to="/upload" className='upload'>Subir nuevo producto</Link>
        </div>
    );
};

export default Home;


// Modificacion para agregar iconos : 
/*
npm install @fortawesome/react-fontawesome @fortawesome/free-brands-svg-icons @fortawesome/fontawesome-svg-core

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

<div className="home">
<h3>Seguinos en :</h3>
    <p>
        <a href="URL_DE_TU_FACEBOOK" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} /> Facebook
        </a>
    </p>
    <p>
        <a href="URL_DE_TU_INSTAGRAM" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} /> Instagram
        </a>
    </p>
</div>

Estilos sugeridos :
.home a {
    color: #333; /* Color del texto 
    text-decoration: none; /* Elimina el subrayado 
    margin-right: 10px; /* Espacio entre los enlaces 
}

.home a:hover {
    color: #007bff; /* Cambia el color al pasar el mouse 
}

.home svg {
    margin-right: 5px; /* Espacio entre el icono y el texto 
    font-size: 1.2em; /* Tamaño del icono 
}

*/

/*
<div className="home">
            <h3>Seguinos en :</h3>
                <p>Facebook</p>
                <p>Instagram</p>
            </div>
*/

