
import '../cssComponents/CardPersona.css'


const obtenerNombreTipoHabitacion = (tipoHabitacion) => {
    switch (tipoHabitacion) {
        case 1:
            return 'Habitación compartida';
        case 2:
            return 'Habitación individual';
        case 3:
            return 'Habitación individual con cama matrimonial';
        case 4:
            return 'Habitación de cuidados especiales';
        default:
            return 'Tipo de habitación desconocido';
    }
};

const obtenerEstadoHabitacion = (EstadoHabitacion) => {
    switch (EstadoHabitacion) {
        case 1:
            return 'Disponible';
        case 2:
            return 'Reservadas';
        case 3:
            return 'En mantenimiento';
        case 4:
            return 'Cerradas';
        default:
            return 'Tipo de habitación desconocido';
    }
};

const obtenerLimpieza = (Limpieza) => {
    let color = '';
    switch (Limpieza) { 
        case 1:
            color = 'green'; 
            return <span style={{ color }}>Limpieza lista</span>;
        case 2:
            color = 'red'; 
            return <span style={{ color }}>Limpieza pendiente</span>;
        default:
            return 'X';
    }
};

const CardHabitacion = ({ iteracion }) => {

    const handleLimpieza= (limpiezaHecha) =>{
        if(limpiezaHecha === 1){
            iteracion.Limpieza = 2
        }
    }

    return (
    <div className="card-persona">
        <div>
            <p><strong>Numero de Habitacion:</strong> {iteracion.idHabitaciones}</p>
            <p><strong>Tipo de Habitacion:</strong> {obtenerNombreTipoHabitacion(iteracion.TipoHabitacion)}</p>
            <p><strong>Estado Habitacion:</strong> {obtenerEstadoHabitacion(iteracion.EstadoHabitacion)}</p>
            <p><strong>Limpieza:</strong> {obtenerLimpieza(iteracion.Limpieza)}</p>
            <button type='submit' className='update-button' onClick={() => {handleLimpieza(iteracion.Limpieza)}}>Actualizar estado de limpieza</button>
            </div>
    </div>
    )
}

export default CardHabitacion