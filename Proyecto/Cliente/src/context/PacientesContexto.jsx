import { createContext, useContext } from "react";
import { useState } from "react";
import { deletePaciente, getPacientes } from "../api/Pacientes.api";

export const pacContexto = createContext()

//aqui dentro se accede a persConexto 
export const PacientesContextoProveedor = ({children}) => {

    const [pacientes, setPacientes] = useState([]);

    async function cargarPacientes() {
        try {
            const respuesta = await getPacientes()
            //setpersonas va a ser los datos que tenga la respuesta del gettasksreq y se los va a poner a personas
            setPacientes(respuesta.data)
        } catch (error) {
            console.log("no pasa", error)
        }
    }

    const BorrarPaciente = async (ced) => {
        try {
            await deletePaciente(ced)
        } catch (error) {
            console.log(error)
        }
    }

    return ( 
    /*aca se mete en value toda la info que quiero que este en el contexto para que se pueda acceder en los demas lugares*/ 
    <pacContexto.Provider value={{pacientes, cargarPacientes, BorrarPaciente}}>
        {children}
    </pacContexto.Provider>
    );
};

export const usePacientes = () => {
    const contexto = useContext(pacContexto)
    return contexto
}