import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export default function CreateEmpleado() {
  const { register, handleSubmit } = useForm();
  const [cargos, setCargos] = useState(null);
  const [roles, setRoles] = useState(null);
  const [multiplex, setMultiplex] = useState(null);
  const [puntosAgiles, setPuntosAgiles] = useState(null);

  const handleAddEmployee = (empleadoData) => {
    console.log(empleadoData);
    const  urlBase = "https://cinepachoapi.azurewebsites.net/"
    axios
        .post(`${urlBase}registrarSesionEmpleado`, empleadoData)
        .then((response) => {
          // Manejar la respuesta del servidor
          console.log(response.data);
          if (response.data.mensaje==="Empleado creado exitosamente") {
            Swal.fire({
              title: "¡Usuario Registrado Exitosamente!",
              icon: "success",
            });
          }else{
            if (response.data.mensaje.includes('Ya existe un empleado')) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: response.data.mensaje,
              });
            }
          }
        })
        .catch((error) => {
          // Manejar errores
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se ha podido registrar el usuario",
          });
        });
  };

  useEffect(() => {
    const urlBase = "https://cinepachoapi.azurewebsites.net/";
    // listaRoles
    // listaCargos
    // listaPuntosAgiles/2
    // listarMultiplex
    axios
      .get(`${urlBase}listarMultiplex`)
      .then((response) => {
        // Handle the response data
        console.log(response.data.listaMultiplex);
        setMultiplex([...response.data.listaMultiplex]);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error(error);
      });
    axios
      .get(`${urlBase}listaRoles`)
      .then((response) => {
        // Handle the response data
        console.log(response.data.listaRoles);
        setRoles([...response.data.listaRoles]);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error(error);
      });
    axios
      .get(`${urlBase}listaCargos`)
      .then((response) => {
        // Handle the response data
        console.log(response.data.listaCargos);
        setCargos([...response.data.listaCargos]);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error(error);
      });
  }, []);

  const handleChangeMultiplex = (e) => {
    console.log(e.target.value);
    const urlBase = "https://cinepachoapi.azurewebsites.net/";
    // listaPuntosAgiles/2
    // console.log(register);
    if (e.target.value !== "") {
      axios
        .get(`${urlBase}listaPuntosAgiles/${e.target.value}`)
        .then((response) => {
          // Handle the response data
          console.log(response.data);
          setPuntosAgiles([...response.data.lista]);
        })
        .catch((error) => {
          // Handle any errors that occurred during the request
          console.error(error);
        });
    }
  };

  return (
    <div className="bg-white rounded p-4 shadow">
      <form
        onSubmit={handleSubmit((data) => {
          handleAddEmployee(data);
        })}
      >
        <h3 className="text-xl font-bold mb-2">Gestión de Empleados</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700">Nombre</label>
            <input
              type="text"
              placeholder="Nombre"
              className="bg-gray-200 rounded p-2 w-full"
              {...register("nombre")}
            />
            <label className="block text-gray-700 mt-2">Rol</label>
            <select
              className="bg-gray-200 rounded p-2 w-full"
              {...register("rolId")}
            >
              <option value="">Seleccionar Rol</option>
              {
                roles?.map((r,i)=>{
                  return <option key={i} value={r.idRol}>{r.nombrerol}</option>
                })
              }
            </select>
            <label className="block text-gray-700 mt-2">Cédula</label>
            <input
              type="text"
              placeholder="Cédula"
              className="bg-gray-200 rounded p-2 w-full"
              {...register("cedula")}
            />
            <label className="block text-gray-700 mt-2">Celular</label>
            <input
              type="text"
              placeholder="Celular"
              className="bg-gray-200 rounded p-2 w-full"
              {...register("celular")}
            />
            <label className="block text-gray-700 mt-2">Correo</label>
            <input
              type="text"
              placeholder="Correo"
              className="bg-gray-200 rounded p-2 w-full"
              {...register("correo")}
            />
          </div>
          <div>
            <label className="block text-gray-700">Cargo</label>
            <select
              className="bg-gray-200 rounded p-2 w-full"
              {...register("cargoId")}
            >
              <option value="">Seleccionar Cargo</option>
              {
                cargos?.map((c,i)=>{
                  return <option key={i} value={c.cargo_id}>{c.nombre_cargo}</option>
                })
              }
            </select>
            <label className="block text-gray-700 mt-2">Multiplex</label>
            <select
              className="bg-gray-200 rounded p-2 w-full"
              {...register("multiplexId")}
              onChange={handleChangeMultiplex}
            >
              <option value="">Seleccionar Multiplex</option>
              {multiplex?.map((m, i) => {
                return (
                  <option value={m.multiplex_id} key={i}>
                    {m.nombreMultiplex}
                  </option>
                );
              })}
            </select>
            <label className="block text-gray-700 mt-2">Puntos Ágiles</label>
            <select
              className="bg-gray-200 rounded p-2 w-full"
              {...register("puntoAgilId")}
            >
              <option value="">Seleccionar Puntos Ágiles</option>
              {
                puntosAgiles?.map((p,i)=>{
                  return <option key={i} value={p.idPuntoAgil}>{p.nombrePuntoAgil}</option>
                })
              }
            </select>
            <label className="block text-gray-700 mt-2">Contraseña</label>
            <input
              type="password"
              placeholder="Contraseña"
              className="bg-gray-200 rounded p-2 w-full"
              {...register("contrasena")}
            />
            <label className="block text-gray-700 mt-2">Foto</label>
            <input
              type="file"
              className="bg-gray-200 rounded p-2 w-full"
              {...register("image")}
            />
          </div>
        </div>
        <input className="button-submit btn-sub-register" type="submit" />
      </form>
    </div>
  );
}
