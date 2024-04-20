import { createContext, useContext } from "react";
import { useState } from "react";
import { getTasksReq, deletePersona   } from "../api/tasks.api";

export const persContexto = createContext()

//aqui dentro se accede a persConexto 
export const PersContextoProveedor = ({children}) => {

    const [personas, setPersonas] = useState([]);

    async function cargarPersonas() {
        try {
            const respuesta = await getTasksReq()
            //setpersonas va a ser los datos que tenga la respuesta del gettasksreq y se los va a poner a personas
            setPersonas(respuesta.data)
        } catch (error) {
            console.log("no pasa", error)
        }
    }

    const BorrarPersona = async (ced) => {
        try {
            await deletePersona(ced)
        } catch (error) {
            console.log(error)
        }
    }

    return ( 
    /*aca se mete en value toda la info que quiero que este en el contexto para que se pueda acceder en los demas lugares*/ 
    <persContexto.Provider value={{personas, cargarPersonas, BorrarPersona}}>
        {children}
    </persContexto.Provider>
    );
};

//y persContexto se llama aqui para acceder a los valores de el proveedor y de cualquier otro lado se llama a usePersonas y esta va a acceder a ese proveedor
export const usePersonas = () => {
    const contexto = useContext(persContexto) 
    if(!contexto){
        throw new Error("no esta dentro del contexto provider o proveedor")
    }
    return contexto
}