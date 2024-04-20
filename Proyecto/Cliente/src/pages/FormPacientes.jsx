import React, { useState } from 'react';
import '../css/TareasFormulario.css';
import { Form, Formik } from 'formik';
import { insPacientes } from '../api/Pacientes.api.js';
import '../css/App.css';
import { useEffect } from 'react';
import { getAsistenciaReq } from '../api/Asistencia.api.js';

const FormPacientes = () => {

    const [asistenciaRequerida, setasistenciaRequerida] = useState([])
    const [check, setCheck] = useState(null);
    const [registrado, setRegistrado] = useState(null);
//el useeffect se hace apenas se carga la pagina
    useEffect(()=>{
            async function cargarAsistenciaRequerida(){
                const respuesta = await getAsistenciaReq()
                setasistenciaRequerida(respuesta.data)
            }
            cargarAsistenciaRequerida()
    },[])

//return de renderizado de react
return (
    <div className='insPer'>
        <h2>Registro de Paciente</h2>
    <Formik
        initialValues={{
            Cedula: null,
            Nombre: "",
            Apellido1: "",
            Apellido2: "",
            IdAsistenciaRequerida: 1,
            Vendajes:""
        }}
        onSubmit={async (values, actions) => {
            try {
                const respuesta = await insPacientes(values);
                console.log("pasa", respuesta);
                setCheck('PACIENTE REGISTRADO CORRECTAMENTE!');
                setTimeout(() => {
                    window.location.href = `/home`;
                }, 2000);
                actions.resetForm();
            } catch (error) {
                console.log("no pasa", error);
                console.log(values);
                setRegistrado('PERSONA YA REGISTRADA, INTENTE DE NUEVO')
            }
        }}
        >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
            <Form onSubmit={handleSubmit} className="form-container">
            <div className="form-group">
                <label htmlFor="Cedula">Cedula</label>
                <input
                type="number"
                name="Cedula"
                placeholder="Digite cedula"
                onChange={handleChange}
                value={values.Cedula !== null ? parseInt(values.Cedula) : ""}/>
            </div>

            <div className="form-group">
                <label htmlFor="Nombre">Nombre</label>
                <input
                type="text"
                name="Nombre"
                placeholder="Digite nombre"
                onChange={handleChange}
                value={values.Nombre || ""}/>
            </div>

            <div className="form-group">
                <label htmlFor="Apellido1">Primer Apellido</label>
                <input
                type="text"
                name="Apellido1"
                placeholder="Digite apellido"
                onChange={handleChange}
                value={values.Apellido1 || ""}/>
            </div>

            <div className="form-group">
                <label htmlFor="Apellido2">Segundo Apellido</label>
                <input
                type="text"
                name="Apellido2"
                placeholder="Digite apellido"
                onChange={handleChange}
                value={values.Apellido2 || ""}/>
            </div>

            <div className="form-group">
                <label htmlFor="Contrasena">Vendajes</label>
                <input
                type="text"
                name="Vendajes"
                placeholder="Vendajes necesitados"
                onChange={handleChange}
                value={values.Vendajes || ""}/>
            </div>

            <div className="form-group">
                <label htmlFor="TipoPerfil">Tipo de Asistencia</label>
                <select
                name="IdAsistenciaRequerida"
                onChange={handleChange}>

                    {
                        asistenciaRequerida.map(asist => (
                            <option key={asist.Tipo_De_Asistencia} value={asist.IdAsistenciaRequerida}>{asist.Tipo_De_Asistencia}</option>
                        ))
                    }

                </select>
            </div>
            {<p className="check">{check}</p>}
            {<p className="registrado">{registrado}</p>}
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Guardando..." : "Registrar"}
            </button>

            </Form>
        )}
        </Formik>
    </div>


);
};

export default FormPacientes;
