import React from 'react'
import '../css/App.css'
import '../css/Home.css'
import imagenLogo from '../img/patitos-del-retiro-high-resolution-logo-black-transparent.png'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import Cookies from 'universal-cookie';
import { inicioSesion } from '../api/Login.api'

const TareasPagina = () => {

    const cookie = new Cookies();
    const cookieUser = cookie.get('user')
    const cookiePass = cookie.get('pass')

    const [usuario, setUsuario] = useState('');


    //con inicioSesion del api puedo usar todos los datos del usuario/empleado en el mismo jsx por la respuesta del server
    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                    const response = await inicioSesion(cookieUser,cookiePass);
                    setUsuario(response.data.usuario); 
            } catch (error) {
                console.error('Error al obtener el usuario:', error);
            }
        };

        fetchUsuario();
    },[cookieUser,cookiePass]); // Ejecutar solo una vez al montar el componente


if(usuario && usuario[0].IdPerfil===1){
    //GERENCIA (TODOS LOS MODULOS)
    return (
        <div className='mybody'>
            <img src={imagenLogo} alt='' className='myimg'/>
            <h1 className='myh1'>Bienvenido nuevamente {usuario && usuario[0].Nombre}</h1>
            <div className="multi-button">
                <button ><Link to="/home/registroEmpleado">Registrar empleados</Link></button>
                <button ><Link to="/home/registroPaciente">Registrar pacientes</Link></button>
                <button ><Link to="/home/registroReserva">Reservar habitaciones</Link></button>
                <button ><Link to="/home/listaEmpleados">lista de empleados</Link></button>
                <button ><Link to="/home/listaPacientes">lista de pacientes</Link></button>
                <button ><Link to="/home/listaReservaciones">lista de reservaciones</Link></button>
                <button ><Link to="/home/limpieza">limpieza de habitaciones</Link></button>
            </div>
        </div>
        )
    }else if(usuario && usuario[0].IdPerfil===2){
        //GESTION DE PACIENTES
        return (
            <div className='mybody'>
                <img src={imagenLogo} alt='' className='myimg'/>
                <h1 className='myh1'>Bienvenido nuevamente {usuario && usuario[0].Nombre} {usuario && usuario[0].Apellido1}</h1>
                <div className="multi-button">
                    <button ><Link to="/home/registroPaciente">Registrar pacientes</Link></button>
                    <button ><Link to="/home/registroReserva">Reservar habitaciones</Link></button>
                    <button ><Link to="/home/listaPacientes">lista de pacientes</Link></button>
                    <button ><Link to="/home/listaReservaciones">lista de reservaciones</Link></button>
                </div>
            </div>
            )
    }else if(usuario && usuario[0].IdPerfil===3){
        //mantenimiento
        return (
            <div className='mybody'>
                <img src={imagenLogo} alt='' className='myimg'/>
                <h1 className='myh1'>Bienvenido nuevamente {usuario && usuario[0].Nombre} {usuario && usuario[0].Apellido1}</h1>
                <div className="multi-button">
                    <button ><Link to="/home/limpieza">limpieza de habitaciones</Link></button>
                </div>
            </div>
            )
    }else if(usuario && usuario[0].IdPerfil===4){
        return (
            //DTI (solo para verificar que todo funcione correctamente, normalmente no se hacen empleados DTI)
            <div className='mybody'>
                <img src={imagenLogo} alt='' className='myimg'/>
                <h1 className='myh1'>Bienvenido nuevamente {usuario && usuario[0].Nombre} {usuario && usuario[0].Apellido1}</h1>
                <div className="multi-button">
                    <button ><Link to="/home/registroEmpleado">Registrar empleados</Link></button>
                    <button ><Link to="/home/registroPaciente">Registrar pacientes</Link></button>
                    <button ><Link to="/home/registroReserva">Reservar habitaciones</Link></button>
                    <button ><Link to="/home/listaEmpleados">lista de empleados</Link></button>
                    <button ><Link to="/home/listaPacientes">lista de pacientes</Link></button>
                    <button ><Link to="/home/listaReservaciones">lista de reservaciones</Link></button>
                    <button ><Link to="/home/limpieza">limpieza de habitaciones</Link></button>
                </div>
            </div>
            )
    }
}

export default TareasPagina
