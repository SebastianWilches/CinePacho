import { useContext } from "react";
import { CineContext } from "../../../context/CineContext";

const DatosEmpleado = ({ datosEmpleado }) => {

  const {infoCliente} = useContext(CineContext)

  console.log(infoCliente);

  return (
    <div className="empleado-div-control">
      <h2>Información de usuario</h2>
      <div>
        <p>
          <span className="empleado-span-datos-title">ID:</span>
          {infoCliente.idEmpleado}
        </p>
        <p>
          <span className="empleado-span-datos-title">Cedula:</span>
          {infoCliente.cedula}
        </p>
        <p>
          <span className="empleado-span-datos-title">Nombre:</span>
          {infoCliente.nombre}
        </p>
        <p>
          <span className="empleado-span-datos-title">Celular:</span>
          {infoCliente.celular}
        </p>
        <p>
          <span className="empleado-span-datos-title">Multiplex:</span>
          {infoCliente.idMultiplex}
        </p>
        <p>
          <span className="empleado-span-datos-title">Cargo:</span>
          {infoCliente.nombre_cargo}
        </p>
        <p>
          <span className="empleado-span-datos-title">Rol:</span>
          {infoCliente.nombrerol}
        </p>
        <p>
          <span className="empleado-span-datos-title">Correo:</span>
          {infoCliente.correo}
        </p>
      </div>
    </div>
  );
};

export default DatosEmpleado;
