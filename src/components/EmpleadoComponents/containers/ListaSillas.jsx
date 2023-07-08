import React from "react";
import Silla from "../pures/Silla";

const ListaSillas = ({ dataSillasFuncion }) => {
  return (
    <div className="empleado-div-listado-sillas-sala">
      <Silla />
      <Silla />
      <Silla />
      <Silla />
      <Silla />
    </div>
  );
};

export default ListaSillas;
