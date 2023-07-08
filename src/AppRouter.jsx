import React from "react";
import { Link, Routes, Route, Navigate } from "react-router-dom";
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

export default function AppRouter() {
  return (
    <>
      <Link to='/sesionEmpleado' >Ir a sesion empleado</Link>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<HomePage />} />
          <Route path="cartelera" element={<CarteleraPage />} />
          <Route path="movie/:id" element={<MoviePage />} />
          <Route path="snacks" element={<SnacksPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        <Route>
          <Route path="sesionEmpleado" element={<CrearConsumible />} />
        </Route>
        {/* <Route path='*' element={<Navigate to='/'/>}/> */}
      </Routes>
    </>
  );
}
