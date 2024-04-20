import axios from "axios";

export const insPacientes = async(newPaciente)=>
    await axios.post('http://localhost:4000/paciente', newPaciente)

export const deletePaciente = async (paciente) =>  
    await axios.delete(`http://localhost:4000/paciente/${paciente}`)

export const getPacientes = async()=>
    await axios.get('http://localhost:4000/paciente')

