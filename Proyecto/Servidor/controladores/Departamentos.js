import {database} from '../db.js'


export const getAllDepar = async (req,res)=>{
    try{
        const [resultado] = await database.query("SELECT * FROM departamentos")
        res.json(resultado)
    } catch(error) {
            return res.status(500).json({message:error.message})
    }
};