import React from "react";
import SnackEmpleado from "../pures/SnackEmpleado";

const ListaSnacksEmpleado = ({
  dataSillasFuncion,
  agregarSnack,
  eliminarSnack,
}) => {
  return (
    <div className="empleado-div-lista-snacks">
      {dataSillasFuncion.map((snack, index) => {
        return (
          <SnackEmpleado
            key={index}
            snack={snack}
            agregarSnack={agregarSnack}
            eliminarSnack={eliminarSnack}
          />
        );
      })}
    </div>
  );
};

export default ListaSnacksEmpleado;
