import axios from 'axios'

export const getTasksReq = async()=>
    await axios.get('http://localhost:4000/persona')

export const createTaskReq = async (userNuevo) =>  
    await axios.post('http://localhost:4000/persona', userNuevo)

export const deletePersona = async (personaABorrar) =>  
    await axios.delete(`http://localhost:4000/persona/${personaABorrar}`)

export const updatePersona = async (personaAMod) =>  
    await axios.put(`http://localhost:4000/persona/${personaAMod}`)

export const getOnePersona = async (persona) =>  
    await axios.get(`http://localhost:4000/persona/${persona}`)
