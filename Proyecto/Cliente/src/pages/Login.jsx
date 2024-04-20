import React from 'react'
import '../css/Login.css'
import { useState, useEffect } from 'react';
import { inicioSesion } from '../api/Login.api';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';

const Login = () => {

    const [Empleados_Persona_Cedula, setEmpleados_Persona_Cedula] = useState('');
    const [Contraseña, setContraseña] = useState('');
    const [Perfil, setIdPerfil] = useState([]);
    const [error, setError] = useState(null);

    const handleUsernameChange = (event) => {
        setEmpleados_Persona_Cedula(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setContraseña(event.target.value);
    };


    useEffect(() => {
        // Verificar si Perfil no está vacío y establecer la cookie
        if (Perfil.length > 0) {
            const cookie = new Cookies();
            const fechaExpiracionCookie = new Date();
            fechaExpiracionCookie.setTime(fechaExpiracionCookie.getTime() + 60000 * 60); // una hora

            cookie.set('idperfil', Perfil[0].IdPerfil, { expires: fechaExpiracionCookie, path: '/' });
        }
    }, [Perfil]);

//login.jsx => login.api => login.js (controlador)
    const InicioSesion = async (event) => {

        const cookie = new Cookies();
        const fechaExpiracionCookie = new Date();
        fechaExpiracionCookie.setTime(fechaExpiracionCookie.getTime() + 60000*60); //una hora

        event.preventDefault();
        try {
    
            const response = await inicioSesion(Empleados_Persona_Cedula, Contraseña);
            setIdPerfil(response.data.usuario);
            
            if (response.status === 200) {
                console.log("inicio de sesion exitoso")
                cookie.set('user', Empleados_Persona_Cedula, { expires: fechaExpiracionCookie, path: '/' });
                cookie.set('pass', Contraseña, { expires: fechaExpiracionCookie, path: '/' });
                window.location.href = `/home`;
                cookie.set('loggeado', true, { expires: fechaExpiracionCookie, path: '/' });
            } else {
                console.error('Credenciales incorrectas');
            }
        } catch (error) {
            setError('Datos Incorrectos');
            console.log('usuario no encontrado', error);
        }
    };

    const cookies = new Cookies();
    const loggeado = cookies.get('loggeado')

    if(loggeado !== true){
        return (
            <div className='log'>
                <div className='log mybody'> 
                    <div className="login">
                        <h3>Bienvenido a Patitos del Retiro</h3>
                        <h3>Por favor, inicia sesión</h3>
                        {<p className="error">{error}</p>}
                        <form onSubmit={InicioSesion}>
                            <div className="text_area">
                                <input
                                    type="number"
                                    id="Empleados_Persona_Cedula"
                                    name="Empleados_Persona_Cedula"
                                    defaultValue=""
                                    onChange={handleUsernameChange}
                                    className="text_input"
                                    placeholder='Usuario'
                                    autoComplete="username"
                                />
                            </div>
                            <div className="text_area">
                                <input
                                type="password"
                                id="Contraseña"
                                name="Contraseña"
                                defaultValue=""
                                onChange={handlePasswordChange}
                                className="text_input"
                                placeholder='Contrasena'
                                autoComplete="current-password"
                                />
                            </div>
                            <input
                                type="submit"
                                value="Ingresar"
                                className="btn"
                            />
                        </form>
                    </div>
                </div>
            </div>
        )
}else{
    return(
        <div className='login-container'>
            <h1>Ya has iniciado sesion</h1>
            <button className='btn22'><Link to="/home">regresar</Link></button>
        </div>
    )
}
}
export default Login