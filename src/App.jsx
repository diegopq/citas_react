import { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Header from "./components/Header";
import ListadoPacientes from "./components/ListadoPacientes";

function App() {
  const [pacientes, setPacientes] = useState([]);

  const [paciente, setPaciente] = useState({});

  //cuando se manda un arreglo vacio, se ejecuta una sola vez
  useEffect(() => {
    //obtiene los pacientes del local storage
    const pacientesLocalStorage = localStorage.getItem("pacientes") ?? "[]";

    if (pacientesLocalStorage) {
      setPacientes(JSON.parse(pacientesLocalStorage));
    }
  }, []);

  useEffect(() => {
    //se guarda en local storage cada que hay un cambio en el state de pacientes
    //local storage solo guarda strings por eso se usa JSON.stringify
    localStorage.setItem("pacientes", JSON.stringify(pacientes));
  }, [pacientes]);

  //fucion para eliminar paciente
  const eliminarPaciente = (id) => {
    const pacientesFiltrados = pacientes.filter(
      (paciente) => paciente.id !== id
    );

    setPacientes(pacientesFiltrados);
  };

  return (
    <div className="container mx-auto mt-20">
      <Header />
      <div className="mt-12 md:flex">
        <Formulario
          setPacientes={setPacientes}
          pacientes={pacientes}
          paciente={paciente}
          setPaciente={setPaciente}
        />
        <ListadoPacientes
          pacientes={pacientes}
          setPaciente={setPaciente}
          eliminarPaciente={eliminarPaciente}
        />
      </div>
    </div>
  );
}

export default App;
