import axios from 'axios'

export const getPerfiles = async()=>
    await axios.get('http://localhost:4000/perfiles')