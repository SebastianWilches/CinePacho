import { useState } from "react"
import { CineContext } from "./CineContext"

export const CineProvider = ({ children }) => {

    //Estados globales
    const [selectedMultiplex_ID, setSelectedMultiplex_ID] = useState();
    const [listaMultiplex, setListaMultiplex] = useState([]);



    return (
        <CineContext.Provider value={
            {
                listaMultiplex,
                setListaMultiplex,
                setSelectedMultiplex_ID
            }
        }>
            {children}
        </CineContext.Provider>
    )
}
