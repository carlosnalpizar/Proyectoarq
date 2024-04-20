import { Router } from "express";
import { getAll,
    createTasks,
    deleteTasks,
    getOne,
    updateTasks
} from "../controladores/tasks.controller.js";

import { getAllPerf } from "../controladores/Perfiles.js";
import { getAllDepar } from "../controladores/Departamentos.js";
import { createPaciente, deletePaciente, getPacientes } from "../controladores/Pacientes.js";
import { getAsistencia } from "../controladores/Asistencia.js";
import { getUser } from "../controladores/Login.js";
import { getAllHabitaciones, getHabitacionesDisponibles, updateHabitaciones } from "../controladores/Habitaciones.js";
import { getEstancias } from "../controladores/Estancia.js";
import { createReservacion, deleteReservacion, getReservaciones } from "../controladores/Reservaciones.js";

const router = Router();

//cuando el server reciba una solicitud get con el slash especifico TASKS hara el getAll (ese getAll es para obtener todas las personas)

//personas
router.get('/persona', getAll);
router.post('/persona', createTasks);
router.get('/persona/:ced', getOne);
router.put('/persona/:ced',updateTasks);
router.delete('/persona/:ced', deleteTasks);
//personas

//perfiles
router.get('/perfiles', getAllPerf)
//perfiles

//perfiles
router.get('/departamentos', getAllDepar)
//perfiles

//pacientes
router.get('/paciente', getPacientes)
router.post('/paciente', createPaciente)
router.delete('/paciente/:ced', deletePaciente)
//pacientes

//Asistencia Requerida
router.get('/asistencia', getAsistencia)
//Asistencia Requerida


//Inicio Sesion
router.post('/login', getUser)
//Inicio Sesion

//Habitaciones
router.get('/habitaciones', getAllHabitaciones)
router.get('/habitacionesDisponibles', getHabitacionesDisponibles)
router.put('/habitaciones/:id', updateHabitaciones)
//Habitaciones

//Estancia
router.get('/estancia', getEstancias)
//Estancia

//Reservacion
router.delete('/reservacion/:id', deleteReservacion)
router.post('/reservacion', createReservacion)
router.get('/reservacion', getReservaciones)
//Reservacion




export default router;