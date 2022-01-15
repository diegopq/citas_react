import React from "react";
import { useState, useEffect } from "react";

import Error from "./Error";

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [sintomas, setSintomas] = useState("");

  const [error, setError] = useState(false);

  //useEffect es un callback, que se ejecuta cuando un state cambia o cuando el
  //componente esta listo, es el sustituto de componentDidMount y componentDidUpdate
  //es un lugar donde se puede ejecutar codigo para consultar apis o local storage
  //puede actualizar el componente cuando una variable cambia, esta variable va
  //en un arreglo de dependencias despues del callback, si no se le pasan dependencias
  //se ejecuta una sola vez
  useEffect(() => {
    if (Object.keys(paciente).length === 0) return;

    setNombre(paciente.nombre);
    setPropietario(paciente.propietario);
    setEmail(paciente.email);
    setFecha(paciente.fecha);
    setSintomas(paciente.sintomas);
  }, [paciente]);

  // Cuando el usuario hace submit
  const handleSubmit = (e) => {
    e.preventDefault();

    //validacion del formulario
    if ([nombre, propietario, email, fecha, sintomas].includes("")) {
      setError(true);
      return;
    }
    setError(false);

    if (paciente.id) {
      //editar paciente
      const pacientesEditados = pacientes.map((element) =>
        paciente.id === element.id
          ? { nombre, propietario, email, fecha, sintomas, id: paciente.id }
          : element
      );

      setPacientes(pacientesEditados);
      setPaciente({});
    } else {
      //crear paciente nuevo
      let newPaciente = [
        ...pacientes,
        { nombre, propietario, email, fecha, sintomas, id: generarId() },
      ];

      setPacientes(newPaciente);
    }

    // reiniciar el formulario
    setNombre("");
    setPropietario("");
    setEmail("");
    setFecha("");
    setSintomas("");
  };

  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const date = new Date().getTime().toString(36);
    return random + date;
  };

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y{" "}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>
      <form
        onSubmit={handleSubmit}
        action=""
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
      >
        {error && <Error>Llena todos los campos</Error>}
        <div className="mb-5">
          <label
            htmlFor="nombre"
            className="block text-gray-700 uppercase font-bold"
          >
            Nombre Mascota
          </label>
          <input
            type="text"
            id="nombre"
            placeholder="Nombre de la mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="dueño"
            className="block text-gray-700 uppercase font-bold"
          >
            Nombre Dueño
          </label>
          <input
            type="text"
            id="dueño"
            placeholder="Nombre del dueño"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-gray-700 uppercase font-bold"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email de contacto"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="alta"
            className="block text-gray-700 uppercase font-bold"
          >
            Alta
          </label>
          <input
            type="date"
            id="alta"
            placeholder="Fecha de alta"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="sintomas"
            className="block text-gray-700 uppercase font-bold"
          >
            Sintomas
          </label>
          <textarea
            name="sintomas"
            id="sintomas"
            placeholder="Descripción de sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          ></textarea>
        </div>
        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold 
          rounded-md hover:bg-indigo-700 cursor-pointer transition-all"
          value={paciente.id ? "Editar Paciente" : "Agregar paciente"}
        />
      </form>
    </div>
  );
};

export default Formulario;
