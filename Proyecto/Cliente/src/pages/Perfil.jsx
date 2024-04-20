import React from 'react'
import '../css/Perfil.css'
import Cookies from 'universal-cookie';
import { useState, useEffect } from 'react';
import { inicioSesion } from '../api/Login.api';
import imagenPerfil from '../img/profile.png';

const Perfil = () => {

    const cookie = new Cookies();
    const cookieUser = cookie.get('user')
    const cookiePass = cookie.get('pass')

    const [usuario, setUsuario] = useState('');

    useEffect(() => {
        const fetchUsuario = async () => {
                const response = await inicioSesion(cookieUser,cookiePass);
                setUsuario(response.data.usuario); 
        };

        fetchUsuario();
    },[cookieUser,cookiePass]); // Ejecutar solo una vez al montar el componente

    return (
        <div>
            <div id="gradient"></div>
                    <div id="card">
                    <img src={imagenPerfil} alt='' className='myimg'/>
                    {usuario && usuario[0] && (
                    <div>
                        <h2>{usuario[0].Nombre} {usuario[0].Apellido1} {usuario[0].Apellido2}</h2>
                        <p className='myp'><strong>Cédula y Usuario:</strong> {usuario[0].Cedula}</p>
                        <p className='myp'><strong>Fecha de Ingreso:</strong> {usuario[0].Fecha_De_Ingreso}</p>
                        <p className='myp'><strong>Departamento:</strong> {usuario[0].Tipo_Departamento}</p>
                        <p className='myp'><strong>Tipo de Perfil:</strong> {usuario[0].Tipo_Perfil}</p>
                        <hr />
                        <h3 className='myp'>Patitos del Retiro</h3>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Perfil
