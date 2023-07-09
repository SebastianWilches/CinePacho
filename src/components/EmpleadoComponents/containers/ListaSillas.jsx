import React from "react";
import Silla from "../pures/Silla";

const ListaSillas = ({ dataSillasFuncion, agregarSilla, eliminarSilla }) => {
  return (
    <div className="empleado-div-listado-sillas-sala">
    {
        dataSillasFuncion?.map((silla, index)=>{
            return <Silla key={index} dataSilla={silla} agregarSilla={agregarSilla} eliminarSilla={eliminarSilla}/>
        })
    }
    </div>
  );
};

export default ListaSillas;
