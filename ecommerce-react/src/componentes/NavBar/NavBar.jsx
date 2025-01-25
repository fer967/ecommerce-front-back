import { Link, NavLink } from "react-router-dom";
import CartWidget from "../CartWidget/CartWidget";
import './NavBar.css';

const NavBar = () => {
    return (
        <header>
            <Link to="/">
                <h1>Tienda de Instrumentos Musicales</h1>
            </Link>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/categoria/cuerdas">Cuerdas</NavLink>
                    </li>
                    <li>
                        <NavLink to="/categoria/vientos">Vientos</NavLink>
                    </li>
                    <li>
                        <NavLink to="/categoria/percusion">Percusion</NavLink>
                    </li>
                    <li>
                        <NavLink to="/categoria/teclados">Teclados</NavLink>
                    </li>
                </ul>
            </nav>
            <CartWidget />
        </header>
    )
}

export default NavBar;

