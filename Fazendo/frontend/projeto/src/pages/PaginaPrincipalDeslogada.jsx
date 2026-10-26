import Navbar from "../components/navbar"

function PaginaPrincipal({logado}){

    console.log(logado)

    return(
        <>
        <Navbar logado={logado}/>
            <h1>Página Principal deslogado</h1>
        </>
    )
}

export default PaginaPrincipal