import Footer from "./components/Footer"
import {BrowserRouter, Routes, Route} from 'react-router'

import {useEffect,useState} from 'react'

import PaginaPrincipal from "./pages/PaginaPrincipal"
import Entrar from "./pages/Entrar"
import Cadastrar from "./pages/Cadastrar"
import Sobre from "./pages/Sobre"


function App() {
  const URL = 'http://127.0.0.1:5000'
  const[logado, setLogado] = useState(false)

  function verifica_login(){
    useEffect( () => {
      fetch(`${URL}/verifica_logado`)
      .then( (dados) => dados.json() )
      .then( (dados) => {setLogado(dados.logado)} )
    },[] )}

    verifica_login()

  return (
    <>
      <BrowserRouter>
        <main>
          <Routes>
            {
              logado?
              <>
                <Route path="/" element={<PaginaPrincipal logado={logado} />} />
                <Route path="/sobre" element={<Sobre logado={true}/>} />
              </>
              :
              <>
                <Route path="/" element={<PaginaPrincipal logado={logado} />} />
                <Route path="/entrar" element={<Entrar />} />
                <Route path="/cadastrar" element={<Cadastrar />} />
                <Route path="/sobre" element={<Sobre />} />
              </>
            }
          </Routes>
        </main>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
