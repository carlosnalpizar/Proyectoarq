import axios from 'axios';

export const inicioSesion = async (username, password) => {
    const response = await axios.post('http://localhost:4000/login', {username,password});
    return response;
};

