import React, { useContext } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import {
  HomePage,
  CarteleraPage,
  LoginPage,
  RegisterPage,
  SnacksPage,
} from "./pages";
import { MoviePage } from "./pages/MoviePage";
import CrearConsumible from "./components/EmpleadoComponents/containers/CrearConsumible";
import { CineContext } from "./context/CineContext";
import RutasProtegidaAdmin from "./security/RutasProtegidasAdmin";
import { AdminPage } from "./pages/AdminPage";
import Compras from "./components/compras";

export default function AppRouter() {
  const { infoCliente, tokenCliente, auth, isLog } = useContext(CineContext);

  // {/* <Link to="/sesionEmpleado">Ir a sesion empleado</Link> */}
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<HomePage />} />
            <Route path="cartelera" element={<CarteleraPage />} />
            <Route path="movie/:id" element={<MoviePage />} />
            <Route path="snacks" element={<SnacksPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>

          <Route
            element={
              <RutasProtegidaAdmin
                autenticado={isLog && tokenCliente && infoCliente.rol === 4}
              />
            }
          >
            <Route path="/" element={<NavBar />}>
              <Route path="compras" element={<Compras />} />
            </Route>
          </Route>

          <Route
            element={
              <RutasProtegidaAdmin
                autenticado={
                  auth && tokenCliente && infoCliente.nombrerol === "admin"
                }
              />
            }
          >
            <Route path="/sesionEmpleado" element={<CrearConsumible />} />
          </Route>
          {console.log(
            auth && tokenCliente && infoCliente.nombrerol === "super"
          )}
          <Route
            element={
              <RutasProtegidaAdmin
                autenticado={
                  auth && tokenCliente && infoCliente.nombrerol === "super"
                }
              />
            }
          >
            <Route path="/admin" element={<AdminPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
