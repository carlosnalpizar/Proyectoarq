import { useReservas } from '../context/ReservacionesContexto'
import '../cssComponents/CardPersona.css'

const CardReserva = ({ iteracion }) => {

    const { BorrarReserva } = useReservas()

    const handleDeleteClick = (id) => {
        BorrarReserva(id);
        alert("Borrado correctamente");
    }

    return (
        <div className="card-persona">
            <div>
                <p><strong>ID de Reservacion:</strong> {iteracion.idReservaciones}</p>
                <p><strong>Numero de habitacion seleccionada:</strong> {iteracion.Habitacion_idHabitacion}</p>
                <p><strong>Estancia:</strong> {iteracion.idEstancia}</p>
                <p><strong>Cedula del Paciente:</strong> {iteracion.Pacientes_Persona_Cedula}</p>
                <button onClick={() => handleDeleteClick(iteracion.idReservaciones)} type="button" className="delete-button">Borrar Reservacion</button>
            </div>
        </div>
    )
}


export default CardReserva