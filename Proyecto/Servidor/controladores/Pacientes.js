import {database} from '../db.js'

export const getPacientes = async (req,res)=>{
    try{
        const [resultado] = await database.query(`
        SELECT p.Cedula, p.Nombre, p.Apellido1, p.Apellido2, pa.Fecha_De_Ingreso, pa.Vendajes, pa.Asistencia_Requerida_idAsistencia_Requerida1, ar.Tipo_De_Asistencia
        FROM persona p
        JOIN pacientes pa ON p.Cedula = pa.Persona_Cedula
        JOIN Asistencia_Requerida ar ON pa.Asistencia_Requerida_idAsistencia_Requerida1 = ar.idAsistencia_Requerida;
    `);
    
        res.json(resultado)
    } catch(error) {
            return res.status(500).json({message:error.message})
    }
};



export const createPaciente = async (req,res)=>{
    try{
//estos atributos deben ser IGUALES (caracteres iguales) a los que se ponen como values en el front
    const {Cedula, Nombre, Apellido1, Apellido2, Vendajes}=req.body 
    const IdAsistenciaRequerida = parseInt(req.body.IdAsistenciaRequerida);
    const fechaIngreso = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const [insPer] = await database.query("INSERT INTO persona(Cedula, Nombre, Apellido1, Apellido2) VALUES (?, ?, ?, ?)", [Cedula, Nombre, Apellido1, Apellido2]);
    const [insPaciente] = await database.query("INSERT INTO pacientes(Fecha_De_Ingreso, Vendajes, Persona_Cedula, Asistencia_Requerida_idAsistencia_Requerida1) VALUES (?, ?, ?, ?)", [fechaIngreso, Vendajes, Cedula, IdAsistenciaRequerida]);

    //aca quiero que devuelva los datos que le meti a la base de datos en formato json en el response de la peticion 
    res.json({
        id:insPer.insertId,
        Cedula,Nombre,Apellido1,Apellido2, Vendajes, IdAsistenciaRequerida
        //pase todos los atributos a la respuesta
    })
    }catch(error) {
        return res.status(500).json({message:error.message})
}
};

export const deletePaciente = async (req,res)=>{
    try{

    const [delUsuario] = await database.query("DELETE FROM pacientes where Persona_Cedula = ?", [req.params.ced])       
    const [delPers] = await database.query("DELETE FROM persona where Cedula = ?", [req.params.ced])
    
    if (delPers.affectedRows === 0){ 
        return res.status(404).json({message:"You didnt affect rows"})
    }
    return res.sendStatus(204) 
    }catch(error) {
        return res.status(500).json({message:error.message})
}
};
