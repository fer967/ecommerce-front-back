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

/*
import './NavBar.css';
import CartWidget from '../CartWidget/CartWidget';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function NavBar() {
    return (
        <>
            <nav className='navbar'>
                <Link to='/'>
                    <h2 className='title'>instrumentos musicales</h2>
                </Link>
                <div className='category'>
                    <NavLink to={`/category/cuerdas`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>cuerdas</NavLink>
                    <NavLink to={`/category/vientos`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>vientos</NavLink>
                    <NavLink to={`/category/percusion`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>percusion</NavLink>
                    <NavLink to={`/category/teclados`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>teclados</NavLink>
                </div>
                <CartWidget />
            </nav>
        </>
    );
}
*/