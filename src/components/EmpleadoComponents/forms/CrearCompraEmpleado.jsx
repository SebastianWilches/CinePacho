import React, { useContext, useState } from "react";
import { CineContext } from "../../../context/CineContext";
import ListaSillas from "../containers/ListaSillas";
import axios from "axios";

const CrearCompraEmpleado = () => {
  const { selectedMultiplex_ID } = useContext(CineContext);

  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRvIjoiamVhc3NvbnN1YXJlekBvdXRsb29rLmVzIiwiaWF0IjoxNjg4Nzg0MzcxLCJleHAiOjE3MTk4ODgzNzF9.y3ClFI2WkA0BounoZZAx-heMtfuic_JbioQN-XJ47Jg";

  const [datosCompra, setDatosCompra] = useState({
    idMultiplex: selectedMultiplex_ID || "2", //ACA IRA EL MULTIPLEX QUE TIENE ASISNADO EL EMPLEADO
    idEmpleado: "2", //ACA IRA EL ID DEL EMPLEADO EXTRAIDO DEL CONTEXTO
    idCompra: null,
    cedulaCliente: null, //ACA IRA EL CC DEL CLIENTE INGRESADA EN EL FORM
    sillasSeleccionadas: [],
    snackSeleccionados: [],
  });

  const handleChangeCompra = (e) => {
    setDatosCompra({
      ...datosCompra,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(datosCompra);
    let crearCompraEmpleadoURL = "http://localhost:3001/crearCompraEmpleado";
    const axiosInstance = axios.create({
      baseURL: crearCompraEmpleadoURL, // Reemplaza con la URL base de tu API
      headers: {
        'x-access-token': token
      },
    });
    
    // Ejemplo de solicitud GET utilizando axiosInstance
    axiosInstance.post(crearCompraEmpleadoURL, {idMultiplex:datosCompra.idMultiplex, cedulaCliente:datosCompra.cedulaCliente, idEmpleado:datosCompra.idEmpleado})
      .then(response => {
        // Manejar la respuesta del servidor
        console.log(response.data);
        if (response.data.mensaje==="Se ha creado la compra con exito") {
          setDatosCompra({
            ...datosCompra,
            idCompra:response.data.idCompra
          })
          alert('Se creo con exito la compra')
        }
      })
      .catch(error => {
        // Manejar errores
        console.error(error);
      });
  };

  return (
    <div className="empleado-div-control">
      <h2>Crear Compra</h2>
      <form className="funcion-form" onSubmit={handleSubmit}>
        <div className="funcion-form-div">
          <label>N° Documento Cliente</label>
          <input
            type="number"
            name="cedulaCliente"
            required
            onChange={handleChangeCompra}
          />
        </div>

        <div className="funcion-form-div">
          <button className="button-submit empleado-btn-form" type="submit">
            Crear Compra
          </button>
        </div>
      </form>

      <ListaSillas />
    </div>
  );
};

export default CrearCompraEmpleado;
