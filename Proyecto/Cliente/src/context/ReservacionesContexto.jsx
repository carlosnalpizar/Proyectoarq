import { createContext, useContext } from "react";
import { useState } from "react";
import { deleteReserva, getReserva } from '../api/Reservaciones.api'

export const resContexto = createContext()

//aqui dentro se accede a persConexto 
export const ResContextoProveedor = ({children}) => {

    const [reservaciones, setReservaciones] = useState([]);

    async function cargarReservas() {
        try {
            const respuesta = await getReserva()
            //setpersonas va a ser los datos que tenga la respuesta del gettasksreq y se los va a poner a personas
            setReservaciones(respuesta.data)
        } catch (error) {
            console.log("no pasa", error)
        }
    }

    const BorrarReserva = async (idRes) => {
        try {
            await deleteReserva(idRes)
        } catch (error) {
            console.log(error)
        }
    }

    return ( 
    /*aca se mete en value toda la info que quiero que este en el contexto para que se pueda acceder en los demas lugares*/ 
    <resContexto.Provider value={{reservaciones, cargarReservas, BorrarReserva}}>
        {children}
    </resContexto.Provider>
    );
};

//y persContexto se llama aqui para acceder a los valores de el proveedor y de cualquier otro lado se llama a usePersonas y esta va a acceder a ese proveedor
export const useReservas = () => {
    const contexto = useContext(resContexto) 
    if(!contexto){
        throw new Error("no esta dentro del contexto provider o proveedor")
    }
    return contexto
}