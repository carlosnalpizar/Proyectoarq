import React, { useState } from 'react';
import '../css/TareasFormulario.css';
import { Form, Formik } from 'formik';
import '../css/App.css';
import { useEffect } from 'react';
import { getPacientes } from '../api/Pacientes.api.js';
import { getHabitacionesDisponibles } from '../api/Habitaciones.api.js';
import { getEstancia } from '../api/Estancia.api.js';
import { createReserva } from '../api/Reservaciones.api.js';

const FormReservacion = () => {

    const [habitaciones, setHabitaciones] = useState([])
    const [pacientes, setPacientes] = useState([])
    const [estancia, setEstancia] = useState([])


    const [check, setCheck] = useState(null);
    const [registrado, setRegistrado] = useState(null);

    //el useeffect se hace apenas se carga la pagina
    useEffect(()=>{
            async function cargarHabitaciones(){
                const respuesta = await getHabitacionesDisponibles()
                setHabitaciones(respuesta.data)
            }

            async function cargarPacientes(){
                const respuesta = await getPacientes()
                setPacientes(respuesta.data)
            }

            async function cargarEstancia(){
                const respuesta = await getEstancia()
                setEstancia(respuesta.data)
            }
            cargarHabitaciones()
            cargarPacientes()
            cargarEstancia()

    },[])

//return de renderizado de react
return (
    <div className='insPer'>
        <h2>Reservacion</h2>
    <Formik
        initialValues={{
            NumReservacion: null,
            idEstancia: 1,
            idHabitacion: 1,
            Cedula_Paciente: 1,
        }}
        onSubmit={async (values, actions) => {
            try {
                const respuesta = await createReserva(values);
                console.log("pasa", respuesta);
                setCheck('Reserva realizada!')
                setTimeout(() => {
                    window.location.href = `/home`;
                }, 2000);
                actions.resetForm()
            } catch (error) {
                console.log("no pasa", error);
                console.log(values)
                setRegistrado('Ya existe el numero de reserva')
            }
            }}
        >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
            <Form onSubmit={handleSubmit} className="form-container">


            <div className="form-group">
                <label htmlFor="NumReservacion">Numero de reservacion</label>
                <input
                type="number"
                name="NumReservacion"
                placeholder="Digite Reservacion"
                onChange={handleChange}
                value={values.NumReservacion !== null ? parseInt(values.NumReservacion) : ""}/>
            </div>

            <div className="form-group">
                <label htmlFor="idEstancia">Tipo de estancia</label>
                <select
                name="idEstancia"
                onChange={handleChange}>

                    {
                        estancia.map(estadia => (
                            <option key={estadia.idEstancia} value={estadia.idEstancia}>{estadia.Tipo_Estancia}, de {estadia.Hora_De_inicio} a {estadia.Hora_De_Fin}</option>
                        ))
                    }

                </select>
            </div>

            <div className="form-group">
                <label htmlFor="idHabitacion">Numero de Habitacion</label>
                <select
                name="idHabitacion"
                onChange={handleChange}>

                    {
                        habitaciones.map(habitacion => (
                            <option key={habitacion.idHabitaciones} value={habitacion.idHabitaciones}>{habitacion.idHabitaciones}</option>
                        ))
                    }

                </select>
            </div>

            <div className="form-group">
                <label htmlFor="Cedula_Paciente">Cedula del Paciente</label>
                <select
                name="Cedula_Paciente"
                onChange={handleChange}>

                    {
                        pacientes.map(paciente => (
                            <option key={paciente.Cedula} value={paciente.Cedula}>{paciente.Cedula}</option>
                        ))
                    }

                </select>
            </div>


            {<p className="check">{check}</p>}
            {<p className="registrado">{registrado}</p>}
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Guardando..." : "Registrar"}
            </button>

            </Form>
        )}
        </Formik>
    </div>


);
};

export default FormReservacion;