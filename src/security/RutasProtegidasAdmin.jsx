import { Navigate, Outlet } from "react-router-dom";

const RutasProtegidaAdmin = ({ autenticado, rutaRedireccion = "/", children }) => {
  console.log(autenticado);
  if (!autenticado) {
    return <Navigate to={rutaRedireccion} />;
  }
  return children ? children : <Outlet />;
};

export default RutasProtegidaAdmin;
