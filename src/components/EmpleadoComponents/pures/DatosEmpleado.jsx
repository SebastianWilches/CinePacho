import React, { useState } from 'react'

const DatosEmpleado = () => {

  const [DatosEmpleado, setDatosEmpleado] = useState(null);

  return (
    <div className="empleado-div-control">
      <h2>Información de usuario</h2>
      <div>
        <p><span className='empleado-span-datos-title'>ID:</span></p>
        <p><span className='empleado-span-datos-title'>Cedula:</span></p>
        <p><span className='empleado-span-datos-title'>Nombre:</span></p>
        <p><span className='empleado-span-datos-title'>Celular:</span></p>
        <p><span className='empleado-span-datos-title'>Multiplex:</span></p>
        <p><span className='empleado-span-datos-title'>Cargo:</span></p>
        <p><span className='empleado-span-datos-title'>Rol:</span></p>
        <p><span className='empleado-span-datos-title'>Correo:</span></p>
      </div>
    </div>
  )
}

export default DatosEmpleado