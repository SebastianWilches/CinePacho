import { useState, useContext } from "react"
import { CineContext } from "./CineContext"

export const CineProvider = ({ children }) => {

    //Estados globales
    const [selectedMultiplex_ID, setSelectedMultiplex_ID] = useState(); //Seleccionar el Multiplex en el home
    const [listaMultiplex, setListaMultiplex] = useState([]);
    const [openShoppingCart, setOpenShoppingCart] = useState(false); //Permite abrir el Modal ShoppingCart
    const [infoCliente, setInfoCliente] = useState([]);   //Info que retorna un login exitoso del cliente
    const [tokenCliente, setTokenCliente] = useState([]); //Token que retorna un login exitoso del cliente
    const [listaCompraID, setListaCompraID] = useState([]); //Aquí se almacena todas las compras que haga un cliente
    const [isLog, setIsLog] = useState(false);
    const [selectedSnacks, setSelectedSnacks] = useState([]);



    return (
        <CineContext.Provider value={
            {
                listaMultiplex,
                setListaMultiplex,
                setSelectedMultiplex_ID,
                openShoppingCart,
                setOpenShoppingCart,
                setInfoCliente,
                setTokenCliente,
                selectedMultiplex_ID,
                infoCliente,
                tokenCliente,
                setListaCompraID,
                listaCompraID,
                setIsLog,
                isLog,
                selectedSnacks,
                setSelectedSnacks
            }
        }>
            {children}
        </CineContext.Provider>
    )
}
