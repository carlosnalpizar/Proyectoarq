import axios from 'axios'

export const getEstancia = async()=>
    await axios.get('http://localhost:4000/estancia')