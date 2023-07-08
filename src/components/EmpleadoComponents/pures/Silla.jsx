import React, { useState } from "react";
import { TbArmchair, TbArmchairOff } from "react-icons/tb";

const Silla = ({ dataSilla, agregarSilla, eliminarSilla }) => {
  // console.log(dataSilla);

  const [seleccionada, setSeleccionada] = useState(false);

  const handleClic = () => {
    let date = new Date(dataSilla.horario);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    dataSilla.horario = formattedDate;
    if (seleccionada===false) {
      agregarSilla(dataSilla)
    }else{
      eliminarSilla(dataSilla)
    }
    setSeleccionada(!seleccionada);
  }

  return (
    <div className="div-silla-seleccion-empleado">
      {dataSilla.disponible === "disponible" && (
        <TbArmchair className={`empleado-icon-silla empleado-silla-disponible ${seleccionada && 'empleado-silla-tomada'}`} onClick={handleClic}/>
      )}
      {dataSilla.disponible === "ocupada" && (
        <TbArmchairOff className="empleado-icon-silla empleado-silla-ocupada" />
      )}
      <span>{dataSilla.Silla_silla_id}</span>
    </div>
  );
};

export default Silla;
