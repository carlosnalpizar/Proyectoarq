import { useEffect } from 'react'
import CardHabitaciones from '../componentes/CardHabitacion'
import '../css/App.css'
import '../css/ListaPersonas.css'
import { useHabitacion } from '../context/HabitacionesContexto';

const ListaPacientes = () => {

    //abajo se itera sobre personas y personas es el cargar personas del contexto, ese cargarpersonas hace el metodo getall  del API
    const {habitaciones, cargarHabitacion} = useHabitacion()

    //apenas se entra a la pagina se hace el use effect entonces es una buena manera para poder traer datos y que se carguen de una vez
    useEffect(() => {
        cargarHabitacion()
    })

//funcion
        function listaHabitaciones(){
            if(habitaciones.length===0){
                return <h1>No hay Habitaciones en la lista</h1>
            }else{
                /* la funcion map itera sobre el arreglo personas y devuelve una habitacion(nombre de la variable) por cada iteracion */
                return habitaciones.map(habitacion => (
                    <CardHabitaciones iteracion={habitacion} key={habitacion.idHabitaciones} /> //el key debe ser en cada iteracion el campo en BASE DE DATOS, por eso se pone "Cedula"
            )) 
        }
    }
//funcion

//return de react
    return (
        <div>
            <h1 className='myh1'>Lista de Habitaciones registradas</h1>
                {listaHabitaciones()}
        </div>
    )
}

export default ListaPacientes

