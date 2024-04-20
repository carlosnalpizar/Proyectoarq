import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import TareasFormulario from '../pages/TareasFormulario'
import Home from '../pages/Home'
import ListaTareas from '../pages/ListaTareas'
import NotFound from '../pages/NotFound'
import FormPacientes from '../pages/FormPacientes'
import ListaPacientes from '../pages/ListaPacientes'
import Cookies from 'universal-cookie'
import '../css/SinAutenticar.css'
import { Link } from 'react-router-dom'
import Acerca from '../pages/Acerca'
import Perfil from '../pages/Perfil'
import Limpieza from '../pages/Limpieza'
import FormReservacion from '../pages/ReservacionForm'
import ListaReservaciones from '../pages/ListaReservaciones'

const RutasLoggeado = () => {
    
    const cookies = new Cookies(); //traer las cookies existentes
    const cookie = cookies.get('loggeado',); //de las cookies que hay traer el valor de la cookie loggeado
    const cookiePermiso  = cookies.get('idperfil');
    console.log(cookiePermiso)
    
if(cookie && cookiePermiso===1){
return (
    <div>
        <Navbar />

            <Routes>

                <Route path="/" element={<Home />}> </Route>
                <Route path="/perfil" element={<Perfil />}> </Route>
                <Route path="/registroEmpleado" element={<TareasFormulario />}> </Route>
                <Route path="/listaEmpleados" element={<ListaTareas />}> </Route>
                <Route path="/registroPaciente" element={<FormPacientes/>}> </Route>
                <Route path="/listaPacientes" element={<ListaPacientes/>}> </Route>
                <Route path="/registroReserva" element={<FormReservacion/>}> </Route>
                <Route path="/listaReservaciones" element={<ListaReservaciones/>}> </Route>
                <Route path="/acercadenosotros" element={<Acerca/>}> </Route>
                <Route path="/limpieza" element={<Limpieza/>}> </Route>
                <Route path="*" element={<NotFound />}> </Route>

            </Routes>

        <Footer />
    </div>
)
}else if(cookie && cookiePermiso===2){
    return (
        <div>
            <Navbar />
    
                <Routes>
                    <Route path="/" element={<Home />}> </Route>
                    <Route path="/perfil" element={<Perfil />}> </Route>
                    <Route path="/registroPaciente" element={<FormPacientes/>}> </Route>
                    <Route path="/listaPacientes" element={<ListaPacientes/>}> </Route>
                    <Route path="/registroReserva" element={<FormReservacion/>}> </Route>
                    <Route path="/listaReservaciones" element={<ListaReservaciones/>}> </Route>
                    <Route path="/acercadenosotros" element={<Acerca/>}> </Route>
                    <Route path="*" element={<NotFound />}> </Route>
    
                </Routes>
    
            <Footer />
        </div>
    )
}else if(cookie && cookiePermiso===3){
    return (
        <div>
            <Navbar />
    
                <Routes>
    
                    <Route path="/" element={<Home />}> </Route>
                    <Route path="/perfil" element={<Perfil />}> </Route>
                    <Route path="/limpieza" element={<FormPacientes/>}> </Route>
                    <Route path="/acercadenosotros" element={<Acerca/>}> </Route>
                    <Route path="*" element={<NotFound />}> </Route>
    
                </Routes>
    
            <Footer />
        </div>
    )
}else if(cookie && cookiePermiso===4){
    return (
        <div>
            <Navbar />
    
                <Routes>
    
                    <Route path="/" element={<Home />}> </Route>
                    <Route path="/perfil" element={<Perfil />}> </Route>
                    <Route path="/registroPaciente" element={<FormPacientes/>}> </Route>
                    <Route path="/listaPacientes" element={<ListaPacientes/>}> </Route>
                    <Route path="/registroReserva" element={<FormReservacion/>}> </Route>
                    <Route path="/listaReservaciones" element={<ListaReservaciones/>}> </Route>
                    <Route path="/acercadenosotros" element={<Acerca/>}> </Route>
                    <Route path="*" element={<NotFound />}> </Route>
    
                </Routes>
    
            <Footer />
        </div>
    )
}else{
    return(
        <div className='login-container'>
            <h1>Por favor, inicia sesion</h1>
            <button className='btn22'><Link to="/">regresar</Link></button>
        </div>
    )
}
}



export default RutasLoggeado
