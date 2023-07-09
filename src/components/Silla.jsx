import React, { useEffect, useState } from 'react'
import './Silla.css'

export default function Silla({infoSilla, numSilla, setListSillasSeleccionadas, listSillasSeleccionadas}) {


  const reservaSilla = () => {
    setListSillasSeleccionadas(listSillasSeleccionadas => listSillasSeleccionadas.concat(infoSilla));
    console.log(listSillasSeleccionadas);

  }


  return (
    <button className={`btn-silla ${infoSilla.disponible}`} onClick={reservaSilla}>
      {infoSilla.idSilla}
    </button>
  )
}
