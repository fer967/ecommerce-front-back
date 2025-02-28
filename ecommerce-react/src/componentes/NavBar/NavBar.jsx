import './NavBar.css';
import CartWidget from '../CartWidget/CartWidget';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function NavBar() {
    return (
        <>
            <nav className='navbar'>
                <Link to='/'>
                    <h2 className='title'>Music Store</h2>
                </Link>
                <div className='categoria'>
                    <NavLink to={`/categoria/accesorios`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>accesorios</NavLink>
                    <NavLink to={`/categoria/cuerdas`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>cuerdas</NavLink>
                    <NavLink to={`/categoria/vientos`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>vientos</NavLink>
                    <NavLink to={`/categoria/percusion`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>percusion</NavLink>
                    <NavLink to={`/categoria/teclados`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>teclados</NavLink>
                </div>
                <CartWidget />
            </nav>
        </>
    );
}


