import axios from 'axios'

export const getDepartas = async()=>
    await axios.get('http://localhost:4000/departamentos')