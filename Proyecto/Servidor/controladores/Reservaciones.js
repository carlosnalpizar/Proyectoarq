import {database} from '../db.js'


export const getReservaciones = async (req,res)=>{
    try{
        const [resultado] = await database.query(`SELECT * FROM reservaciones`);
        res.json(resultado)
    } catch(error) {
            return res.status(500).json({message:error.message})
    }
};

export const getOne = async (req,res)=>{
    try{
    const [resultado] = await database.query("SELECT * FROM persona where Cedula = ?", [req.params.ced])
    console.log(resultado)
    if (resultado.length == 0){ //o sea si manda por params un id que no existe va a dejar un arreglo en 0, se valida si ese arreglo es igual a 0 (no existe)
        return res.status(404).json({message:"no hay"})
    }
    res.json(resultado[0])
    }catch(error) {
    return res.status(500).json({message:error.message})
}
};



export const deleteReservacion = async (req,res)=>{
    try{
    const [delReserva] = await database.query("DELETE FROM reservaciones where idReservaciones = ?", [req.params.id])       
    if (delReserva.affectedRows === 0){ 
        return res.status(404).json({message:"You didnt affect rows"})
    }
    return res.sendStatus(204) 
    }catch(error) {
        return res.status(500).json({message:error.message})
}
};


export const createReservacion = async (req,res)=>{
    try{
//estos atributos deben ser IGUALES (caracteres iguales) a los que se ponen como values en el front
    const NumReservacion = req.body.NumReservacion
    const idEstancia = parseInt(req.body.idEstancia);
    const idHabitacion = parseInt(req.body.idHabitacion);
    const Cedula_Paciente = parseInt(req.body.Cedula_Paciente);

    const [insPer] = await database.query("INSERT INTO reservaciones(idReservaciones, Habitacion_idHabitacion, idEstancia, Pacientes_Persona_Cedula) VALUES (?, ?, ?, ?)", [NumReservacion, idHabitacion, idEstancia, Cedula_Paciente]);
    const [updateEstadoHabitacion] = await database.query("UPDATE habitaciones SET EstadoHabitacion = ? WHERE idHabitaciones = ?", [2, idHabitacion]);

    //aca quiero que devuelva los datos que le meti a la base de datos en formato json en el response de la peticion 
    res.json({
        id:insPer.insertId,
        NumReservacion, idEstancia, idHabitacion, Cedula_Paciente
        //pase todos los atributos a la respuesta
    })
    }catch(error) {
        return res.status(500).json({message:error.message})
}
};



