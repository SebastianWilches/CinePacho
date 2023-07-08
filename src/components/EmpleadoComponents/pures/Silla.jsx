import React, { useState } from "react";
import { TbArmchair, TbArmchairOff } from "react-icons/tb";

const Silla = ({ dataSilla }) => {
  const [disonible, setDisonible] = useState(true);
  return (
    <div className="div-silla-seleccion-empleado">
      {disonible ? (
        <TbArmchair className="empleado-icon-silla empleado-silla-disponible" />
      ) : (
        <TbArmchairOff className="empleado-icon-silla empleado-silla-ocupada" />
      )}
      <span>1</span>
    </div>
  );
};

export default Silla;
