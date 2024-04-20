import { usePersonas } from '../context/PersonasContexto'
import '../cssComponents/CardPersona.css'

const CardPersona = ({ iteracion }) => {

    const { BorrarPersona } = usePersonas()

    const handleDeleteClick = (cedula) => {
        BorrarPersona(cedula);
        alert("Borrado correctamente");
    }

    return (
        <div className="card-persona">
            <div>
                <p><strong>Cédula:</strong> {iteracion.Persona_Cedula}</p>
                <p><strong>Nombre:</strong> {iteracion.Persona_Nombre}</p>
                <p><strong>Apellido 1:</strong> {iteracion.Persona_Apellido1}</p>
                <p><strong>Apellido 2:</strong> {iteracion.Persona_Apellido2}</p>
                <p><strong>Fecha de Ingreso:</strong> {iteracion.Empleado_Fecha_De_Ingreso}</p>
                <p><strong>Contraseña:</strong> {iteracion.Usuario_Contraseña}</p>
                <p><strong>Departamento ID:</strong> {iteracion.Departamento_Id}</p>
                <p><strong>Departamento Tipo:</strong> {iteracion.Departamento_Tipo}</p>
                <p><strong>Perfil ID:</strong> {iteracion.Perfil_Id}</p>
                <p><strong>Perfil Tipo:</strong> {iteracion.Perfil_Tipo_Perfil}</p>
                <button onClick={() => handleDeleteClick(iteracion.Persona_Cedula)} type="button" className="delete-button">Borrar Empleado</button>
            </div>
        </div>
    )
}


export default CardPersona