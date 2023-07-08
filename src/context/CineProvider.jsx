import { useState, useContext } from "react";
import { CineContext } from "./CineContext";

export const CineProvider = ({ children }) => {
  //Estados globales
  const [selectedMultiplex_ID, setSelectedMultiplex_ID] = useState(); //Seleccionar el Multiplex en el home
  const [listaMultiplex, setListaMultiplex] = useState([]);
  const [openShoppingCart, setOpenShoppingCart] = useState(false); //Permite abrir el Modal ShoppingCart
  const [infoCliente, setInfoCliente] = useState(null); //Info que retorna un login exitoso del cliente
  const [tokenCliente, setTokenCliente] = useState(null); //Token que retorna un login exitoso del cliente
  const [auth, setAuth] = useState(false);

  return (
    <CineContext.Provider
      value={{
        listaMultiplex,
        setListaMultiplex,
        setSelectedMultiplex_ID,
        openShoppingCart,
        setOpenShoppingCart,
        setInfoCliente,
        setTokenCliente,
        selectedMultiplex_ID,
        setAuth,
        tokenCliente,
        auth,
        infoCliente
      }}
    >
      {children}
    </CineContext.Provider>
  );
};
