import React, { useState } from 'react';
import '../css/TareasFormulario.css';
import { Form, Formik } from 'formik';
import { createTaskReq } from '../api/tasks.api.js';
import '../css/App.css';
import { useEffect } from 'react';
import { getPerfiles } from '../api/perfiles.api.js';
import { getDepartas } from '../api/departamentos.api.js';

const TareasFormulario = () => {

    const [perfiles, setperfiles] = useState([])
    const [departamentos, setdepartamentos] = useState([])
    const [check, setCheck] = useState(null);
    const [registrado, setRegistrado] = useState(null);

//el useeffect se hace apenas se carga la pagina
    useEffect(()=>{
            async function cargarTiposPerfil(){
                const respuesta = await getPerfiles()
                setperfiles(respuesta.data)
            }

            async function cargarTiposDepar(){
                const respuesta2 = await getDepartas()
                setdepartamentos(respuesta2.data)
            }
            cargarTiposPerfil()
            cargarTiposDepar()

    },[])

//return de renderizado de react
return (
    <div className='insPer'>
        <h2>Registro de Empleado</h2>
    <Formik
        initialValues={{
            Cedula: null,
            Nombre: "",
            Apellido1: "",
            Apellido2: "",
            TipoPerfil: 1,
            TipoDepartamento: 1,
            Contrasena: "",
        }}
        onSubmit={async (values, actions) => {
            try {
                const respuesta = await createTaskReq(values);
                console.log("pasa", respuesta);
                setCheck('EMPLEADO REGISTRADO CORRECTAMENTE!')
                setTimeout(() => {
                    window.location.href = `/home`;
                }, 2000);
                actions.resetForm()
            } catch (error) {
                console.log("no pasa", error);
                console.log(values)
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
                <label htmlFor="Contrasena">Contrasena</label>
                <input
                type="password"
                name="Contrasena"
                placeholder="Digite contraseña"
                onChange={handleChange}
                value={values.Contrasena || ""}/>
            </div>

            <div className="form-group">
                <label htmlFor="TipoPerfil">Tipo de Perfil</label>
                <select
                name="TipoPerfil"
                onChange={handleChange}>

                    {
                        perfiles.map(perfil => (
                            <option key={perfil.IdPerfil} value={perfil.IdPerfil}>{perfil.Tipo_Perfil}</option>
                        ))
                    }

                </select>
            </div>

            <div className="form-group">
                <label htmlFor="TipoDepartamento">Departamento</label>
                <select
                name="TipoDepartamento"
                onChange={handleChange}>

                    {
                        departamentos.map(Departamento => (
                            <option key={Departamento.IdDepartamento} value={Departamento.IdDepartamento}>{Departamento.Tipo_Departamento}</option>
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

export default TareasFormulario;

