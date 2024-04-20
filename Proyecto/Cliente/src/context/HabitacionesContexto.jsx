import { createContext, useContext } from "react";
import { useState } from "react";
import { getHabitaciones, updateEstado } from "../api/Habitaciones.api";


export const HabitacionesContexto = createContext()

//aqui dentro se accede a persConexto 
export const HabitacionesContextoProveedor = ({children}) => {

    const [habitaciones, setHabitaciones] = useState([]);

    async function cargarHabitacion() {
        try {
            const respuesta = await getHabitaciones()
            //setpersonas va a ser los datos que tenga la respuesta del gettasksreq y se los va a poner a personas
            setHabitaciones(respuesta.data)
        } catch (error) {
            console.log("no pasa", error)
        }
    }

    const updateEstadoHabitacion = async (id) => {

        const limpiezaValor = habitaciones.find((limpieza)=> limpieza.idHabitaciones === id)
        await updateEstado(id, limpiezaValor.idHabitaciones === 1 ? 2 : 1)

        }


    return ( 
    /*aca se mete en value toda la info que quiero que este en el contexto para que se pueda acceder en los demas lugares*/ 
    <HabitacionesContexto.Provider value={{habitaciones, cargarHabitacion, updateEstadoHabitacion}}>
        {children}
    </HabitacionesContexto.Provider>
    );
};

export const useHabitacion = () => {
    const contexto = useContext(HabitacionesContexto)
    return contexto
}