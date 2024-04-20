import React from 'react'
import { Link } from 'react-router-dom'
import '../cssComponents/Navbar.css'
import Logo from '../img/favicon.png'
import  Cookies  from 'universal-cookie';

const Navbar = () => {
    const cookies = new Cookies();
    const borrarCookies = () => {
        cookies.remove('loggeado');
        };

    return (
        <div className='head'>
            <header>
                <nav>
                    <ul>
                        <li><Link to="/home/"><img src={Logo} alt="logo de la compañia" className='logo'/></Link></li>
                        <li><Link to="/home/">Inicio</Link></li>
                        <li><Link to="/home/perfil">Perfil</Link></li>
                        <li onClick={borrarCookies}><Link to="/">Cerrar Sesion</Link></li>
                    </ul>
                </nav>
            </header>
            
        </div>
    )
}

export default Navbar
