import Navbar from "../components/Navbar"

function PaginaPrincipal({logado, setLogado}) {

    return(
        <>
        <Navbar logado={logado} setLogado={setLogado}/>
            <h1>Página Principal Logada</h1>
        </>
    )
}

export default PaginaPrincipal