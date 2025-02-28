import { Link, useNavigate } from 'react-router-dom';
import "./Home.css";

const Home = () => {
    const navigate = useNavigate();
    const handleProductsRedirect = () => {
        navigate('/productos');
    };
    return (
        <div className="home-container">
            <br />
            <br />
            <button onClick={handleProductsRedirect} className='button'>Nuestro Productos</button>
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
                <p>WhatsApp  03518443399</p>
            </div>
            <br />
            <div className="home">
            <h3>Seguinos en :</h3>
                <p>Facebook</p>
                <p>Instagram</p>
            </div>
            <br />
            <Link to="/upload" className='upload'>Subir nuevo producto</Link>
        </div>
    );
};

export default Home;