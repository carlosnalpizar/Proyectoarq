
import { useEffect } from 'react'
import CardPaciente from '../componentes/CardPaciente'
import '../css/App.css'
import { usePacientes } from '../context/PacientesContexto'
import '../css/ListaPersonas.css'

const ListaPacientes = () => {

    //abajo se itera sobre personas y personas es el cargar personas del contexto, ese cargarpersonas hace el metodo getall  del API
    const {pacientes, cargarPacientes} = usePacientes()

    //apenas se entra a la pagina se hace el use effect entonces es una buena manera para poder traer datos y que se carguen de una vez
    useEffect(() => {
        cargarPacientes()
    })

//funcion
        function listaPacientes(){
            if(pacientes.length===0){
                return <h1 style={{ textAlign: 'center' }}>No hay pacientes en la lista</h1>
            }else{
                /* la funcion map itera sobre el arreglo personas y devuelve una persona(nombre de la variable) por cada iteracion */
                return pacientes.map(paciente => (
                    <CardPaciente iteracion={paciente} key={paciente.Cedula} /> //el key debe ser en cada iteracion el campo en BASE DE DATOS, por eso se pone "Cedula"
            )) 
        }
    }
//funcion

//return de react
    return (
        <div>
            <h1 className='myh1'>Lista de Pacientes registrados</h1>
                {listaPacientes()}
        </div>
    )
}

export default ListaPacientes
