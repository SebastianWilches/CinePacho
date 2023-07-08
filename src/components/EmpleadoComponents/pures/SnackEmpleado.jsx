import React, { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { HiOutlineMinusCircle } from "react-icons/hi";
const SnackEmpleado = ({ snack, agregarSnack, eliminarSnack }) => {
//   console.log(snack);
  const [cantidad, setCantidad] = useState(0);
  const agregarCantidad = () => {
    if (cantidad < snack.cantidad) {
      setCantidad(cantidad + 1);
    }
  };

  const disminuirCantidad = () => {
    if (cantidad > 0) {
      setCantidad(cantidad - 1);
    }
  };

  return (
    <div className="empleado-div-snack">
      <img src={snack.direccionFoto} alt={""} />
      <div>
        <span>{snack.nombresnack}</span>
        <span>{snack.precio}</span>
        <div>
          <span
            onClick={disminuirCantidad}
            className="btn-empleado-snack btn-minus-cantidad"
          >
            <HiOutlineMinusCircle />
          </span>
          <span>{cantidad}</span>
          <span
            onClick={agregarCantidad}
            className="btn-empleado-snack btn-add-cantidad"
          >
            <IoMdAddCircleOutline />
          </span>
        </div>
        <span
          className="button-submit btn-empleado-snack btn-agrega-producto-empleado"
          onClick={() => agregarSnack({ cantidad, idSnack: snack.idSnack })}
        >
          Agregar producto
        </span>
        <span
          className="button-submit btn-empleado-snack btn-elimina-producto-empleado"
          onClick={() => eliminarSnack({idSnack:snack.idSnack})}
        >
          Eliminar producto
        </span>
      </div>
    </div>
  );
};

export default SnackEmpleado;
