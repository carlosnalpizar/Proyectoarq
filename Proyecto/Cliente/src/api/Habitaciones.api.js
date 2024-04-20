import axios from 'axios'

export const getHabitaciones = async()=>
    await axios.get('http://localhost:4000/habitaciones')

export const getHabitacionesDisponibles = async()=>
    await axios.get('http://localhost:4000/habitacionesDisponibles')

export const updateEstado = async (idHabitacion, estado) =>  
    await axios.put(`http://localhost:4000/habitaciones/${idHabitacion}`, {estado} )