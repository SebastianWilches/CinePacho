import { CineContext } from "./CineContext"

export const CineProvider = ({ children }) => {

    //TODO: Logica de la programación
    return (
        <CineContext.Provider value={
            {
                test: 'testValue'
            }
        }>
            {children}
        </CineContext.Provider>
    )
}
