import axios from 'axios'

export const getAsistenciaReq = async()=>
    await axios.get('http://localhost:4000/asistencia')