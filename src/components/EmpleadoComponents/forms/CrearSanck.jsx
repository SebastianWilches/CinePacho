import React, { useContext, useState } from "react";
import { CineContext } from "../../../context/CineContext";
import axios from "axios";

const CrearSanck = () => {
  const { infoCliente } = useContext(CineContext);

  const [datosSnack, setDatosSnack] = useState({
    idMultiplex: infoCliente.idMultiplex,
    nombreSnack: null,
    precio: null,
    cantidad: null,
    image: null,
  });

  const handleChangeSnack = (e) => {
    if (e.target.name === "image") {
      setDatosSnack({
        ...datosSnack,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setDatosSnack({
        ...datosSnack,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let CrearSanckURL = 'https://cinepachoapi.azurewebsites.net/crearSanck';
    const formData = new FormData();
    formData.append("idMultiplex", datosSnack.idMultiplex);
    formData.append("nombreSnack", datosSnack.nombreSnack);
    formData.append("precio", datosSnack.precio);
    formData.append("cantidad", datosSnack.cantidad);
    formData.append("image", datosSnack.image);
    console.log(formData);
    axios
      .post(CrearSanckURL, formData)
      .then((response) => {
        // Manejar la respuesta del servidor
        console.log(response);
        if (response.data.mensaje==="Se ha registrado exitosamente el snack") {
          alert(response.data.mensaje)
        }
      })
      .catch((error) => {
        // Manejar errores
        console.log(error);
        if (error.response.data.error==="ER_DUP_ENTRY") {
          alert('Ya existe el snack')
        }else{
          alert(error.response.data.mensaje)
        }
      });
  };

  return (
    <div className="empleado-div-control">
      <h2>Crear Snack</h2>
      <form className="funcion-form" onSubmit={handleSubmit}>
        <div className="funcion-form-div">
          <label>Escriba el nombre</label>
          <input
            type="text"
            name="nombreSnack"
            required
            onChange={handleChangeSnack}
          />
        </div>
        <div className="funcion-form-div">
          <label>Escriba el precio</label>
          <input
            type="text"
            name="precio"
            required
            onChange={handleChangeSnack}
          />
        </div>
        <div className="funcion-form-div">
          <label>Escriba la cantidad</label>
          <input
            type="number"
            name="cantidad"
            min="1"
            required
            onChange={handleChangeSnack}
          />
        </div>
        <div className="funcion-form-div">
          <label>Seleccione la imagen del producto</label>
          <div className="form-div-input-file">
            <input
              type="file"
              name="image"
              required
              onChange={handleChangeSnack}
            />
          </div>
        </div>
        <div className="funcion-form-div">
          <button className="button-submit empleado-btn-form" type="submit">
            Crear Snack
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearSanck;
