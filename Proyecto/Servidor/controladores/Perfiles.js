import {database} from '../db.js'


export const getAllPerf = async (req,res)=>{
    try{
        const [resultado] = await database.query("SELECT * FROM perfiles")
        res.json(resultado)
    } catch(error) {
            return res.status(500).json({message:error.message})
    }
};