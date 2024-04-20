import {database} from '../db.js'


export const getAsistencia = async (req,res)=>{
    try{
        const [resultado] = await database.query("SELECT * FROM asistencia_requerida")
        res.json(resultado)
    } catch(error) {
            return res.status(500).json({message:error.message})
    }
};