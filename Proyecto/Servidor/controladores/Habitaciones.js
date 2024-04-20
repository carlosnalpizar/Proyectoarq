import {database} from '../db.js'


export const getAllHabitaciones = async (req,res)=>{
    try{
        const [resultado] = await database.query("SELECT * FROM habitaciones")
        res.json(resultado)
    } catch(error) {
            return res.status(500).json({message:error.message})
    }
};

export const getHabitacionesDisponibles = async (req,res)=>{
    try{
        const [resultado] = await database.query("SELECT * FROM habitaciones where EstadoHabitacion = 1")
        res.json(resultado)
    } catch(error) {
            return res.status(500).json({message:error.message})
    }
};

export const updateHabitaciones = async (req,res)=>{
    try{
    const {Limpieza}=req.body
    const [resultado] = await database.query("UPDATE habitaciones SET Limpieza = ? WHERE idHabitaciones = ?", [ Limpieza, req.params.id])
    if (resultado.affectedRows === 0){
        return res.status(404).json({message:"You didnt affect rows"})
    }
    res.json(resultado)
    }catch(error) {
        return res.status(500).json({message:error.message})
}
};