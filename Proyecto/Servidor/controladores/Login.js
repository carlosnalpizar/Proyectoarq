import { database } from "../db.js";
import Cookies from "universal-cookie";

export const getUser = async (req, res) => {
    const { username, password } = req.body;
    const cedulaint = parseInt(username);
    //console.log(cedulaint, password)
    //el login no funciona con if comparando resultados de la consulta o etc, funciona devolviendo un status de 200 si SI se encuentra un resultado, 
    //la unica manera de que haya algun resultado es que se ingresen los datos correctos (existentes) necesitados por la consulta 
    try {
        const [usuario] = await database.query(`
            SELECT
                p.Cedula,
                p.Nombre,
                p.Apellido1,
                p.Apellido2,
                e.Fecha_De_Ingreso,
                u.Contraseña,
                d.IdDepartamento,
                d.Tipo_Departamento,
                pf.IdPerfil,
                pf.Tipo_Perfil
            FROM
                persona p
            JOIN
                empleados e ON p.Cedula = e.Persona_Cedula
            JOIN
                usuarios u ON e.Persona_Cedula = u.Empleados_Persona_Cedula
            JOIN
                perfiles pf ON e.Perfiles_IdPerfil = pf.IdPerfil
            JOIN
                departamentos d ON e.Departamentos_IdDepartamento = d.IdDepartamento
            WHERE
                u.Empleados_Persona_Cedula = ? AND u.Contraseña = ?`,
            [cedulaint, password]
        );

        // Si no trae nada la consulta:
        if (!usuario || !usuario.length) {
            return res.status(404).json({ mensaje: 'Empleado no encontrado' });
        }

        // Creación de cookie con permiso de usuario
        // const cookies = new Cookies();
    
        // const fechaExpiracionCookie = new Date();
        // fechaExpiracionCookie.setTime(fechaExpiracionCookie.getTime() + 60000 * 60); // Una hora

        // const cookieValue = `${usuario[0].IdPerfil}`;

        // cookies.set('tipoPerfil', cookieValue, { expires: fechaExpiracionCookie, path: '/' });

        // Si el empleado y la contraseña son válidos, inicia sesión exitosamente
        res.status(200).json({ mensaje: 'Inicio de sesión exitoso', usuario });

    } catch (error) {
        console.log('Error al iniciar sesión:', error);
        res.status(500).json({ mensaje: 'Error interno del server' });
    }
};
