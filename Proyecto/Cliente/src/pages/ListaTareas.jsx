
import { useEffect } from 'react'
import CardPersona from '../componentes/CardPersona'
import '../css/App.css'
import { usePersonas } from '../context/PersonasContexto'
import '../css/ListaPersonas.css'

const ListaTareas = () => {

    //abajo se itera sobre personas y personas es el cargar personas del contexto, ese cargarpersonas hace el metodo getall  del API
    const {personas, cargarPersonas} = usePersonas()

    //apenas se entra a la pagina se hace el use effect entonces es una buena manera para poder traer datos y que se carguen de una vez
    useEffect(() => {
        cargarPersonas()
    })

//funcion
        function listaPersonas(){
            if(personas.length===0){
                return <h1 style={{ textAlign: 'center' }}>No hay personas en la lista</h1>
            }else{
                /* la funcion map itera sobre el arreglo personas y devuelve una persona(nombre de la variable) por cada iteracion */
                return personas.map(persona => (
                    <CardPersona iteracion={persona} key={persona.Persona_Cedula} /> //el key debe ser en cada iteracion el campo en BASE DE DATOS, por eso se pone "Cedula"
            )) 
        }
    }
//funcion

//return de react
    return (
        <div>
            <h1 className='myh1'>Lista de Empleados registrados</h1>
                {listaPersonas()}
        </div>
    )
}

export default ListaTareas
