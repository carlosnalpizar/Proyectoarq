import axios from 'axios'

export const createReserva = async (reservacion) =>  
    await axios.post('http://localhost:4000/reservacion', reservacion)

export const deleteReserva = async (reserva) =>  
    await axios.delete(`http://localhost:4000/reservacion/${reserva}`)

export const getReserva = async (reserva) =>  
    await axios.get('http://localhost:4000/reservacion')