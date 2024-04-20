import {database} from '../db.js'


export const getAll = async (req,res)=>{
    try{
        const [resultado] = await database.query(`
        SELECT
            p.Cedula AS Persona_Cedula,
            p.Nombre AS Persona_Nombre,
            p.Apellido1 AS Persona_Apellido1,
            p.Apellido2 AS Persona_Apellido2,
            e.Fecha_De_Ingreso AS Empleado_Fecha_De_Ingreso,
            u.Contraseña AS Usuario_Contraseña,
            d.IdDepartamento AS Departamento_Id,
            d.Tipo_Departamento AS Departamento_Tipo,
            pf.IdPerfil AS Perfil_Id,
            pf.Tipo_Perfil AS Perfil_Tipo_Perfil
        FROM
            persona p
        JOIN
            empleados e ON p.Cedula = e.Persona_Cedula
        JOIN
            usuarios u ON e.Persona_Cedula = u.Empleados_Persona_Cedula
        JOIN
            perfiles pf ON e.Perfiles_IdPerfil = pf.IdPerfil
        JOIN
            departamentos d ON e.Departamentos_IdDepartamento = d.IdDepartamento;
    `);
    
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

export const updateTasks = async (req,res)=>{
    try{
    const {Cedula, Nombre, Apellido1, Apellido2}=req.body
    const [resultado] = await database.query("UPDATE persona SET Nombre = ?, Apellido1 = ?, Apellido2 = ? where Cedula = ?", [Nombre, Apellido1, Apellido2,req.params.ced])
    if (resultado.affectedRows === 0){
        return res.status(404).json({message:"You didnt affect rows"})
    }
    res.json(resultado)
    }catch(error) {
        return res.status(500).json({message:error.message})
}
};


export const deleteTasks = async (req,res)=>{
    try{

    const [delUsuario] = await database.query("DELETE FROM usuarios where Empleados_Persona_Cedula = ?", [req.params.ced])    
    const [delEmpleado] = await database.query("DELETE FROM empleados where Persona_Cedula = ?", [req.params.ced])    
    const [delPers] = await database.query("DELETE FROM persona where Cedula = ?", [req.params.ced])
    
    if (delPers.affectedRows === 0){ 
        return res.status(404).json({message:"You didnt affect rows"})
    }
    return res.sendStatus(204) 
    }catch(error) {
        return res.status(500).json({message:error.message})
}
};


export const createTasks = async (req,res)=>{
    try{
//estos atributos deben ser IGUALES (caracteres iguales) a los que se ponen como values en el front
    const {Cedula, Nombre, Apellido1, Apellido2, Contrasena}=req.body 
    const IdPerfil = parseInt(req.body.TipoPerfil);
    const IdDepartamento = parseInt(req.body.TipoDepartamento);
    const fechaIngreso = new Date().toISOString().slice(0, 19).replace('T', ' ');


    const [insPer] = await database.query("INSERT INTO persona(Cedula, Nombre, Apellido1, Apellido2) VALUES (?, ?, ?, ?)", [Cedula, Nombre, Apellido1, Apellido2]);
    const [insEmpleado] = await database.query("INSERT INTO empleados(Fecha_De_Ingreso, Persona_Cedula, Perfiles_IdPerfil, Departamentos_IdDepartamento) VALUES (?, ?, ?, ?)", [fechaIngreso, Cedula, IdPerfil, IdDepartamento]);
    const [insUsuario] = await database.query("INSERT INTO usuarios(Contraseña, Empleados_Persona_Cedula) VALUES (?, ?)", [Contrasena, Cedula]);

    //aca quiero que devuelva los datos que le meti a la base de datos en formato json en el response de la peticion 
    res.json({
        id:insPer.insertId,
        Cedula,Nombre,Apellido1,Apellido2, Contrasena, IdDepartamento, IdPerfil
        //pase todos los atributos a la respuesta
    })
    }catch(error) {
        return res.status(500).json({message:error.message})
}
};



