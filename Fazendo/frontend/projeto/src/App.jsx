import {Routes, Route, useLocation} from 'react-router-dom'

import {useEffect,useState} from 'react'

import PaginaPrincipalDeslogada from "./pages/PaginaPrincipalDeslogada"
import PaginaPrincipalLogada from "./pages/PaginaPrincipalLogada"

import Footer from "./components/Footer"
import Entrar from "./pages/Entrar"
import Cadastrar from "./pages/Cadastrar"
import Sobre from "./pages/Sobre"
import Planilha from './pages/Planilha'
import Extrato from './pages/Extrato'



function App() {
  const location = useLocation();
  const URL = 'http://localhost:5000'
  const[logado, setLogado] = useState(false)

  useEffect( () => {
    fetch(`${URL}/verifica_logado`, {
      credentials: 'include'
    })
    .then( (dados) => dados.json() )
    .then( (dados) => {setLogado(dados.logado)
    } )
    .catch((erro) => {
      console.error('Erro ao verificar login:', erro);
    });
  }  ,[location.pathname, logado] )

  return (
    <>
        <main>
          <Routes>
            {
              logado?

              <>
                <Route path="/" element={<PaginaPrincipalLogada logado={logado} setLogado={setLogado} />} />
                <Route path="/sobre" element={<Sobre logado={logado} setLogado={setLogado}/>} />
                <Route path='/planilhas' element={<Planilha logado={logado} setLogado={setLogado}/>}/>
                <Route path='/extrato' element={<Extrato logado={logado} setLogado={setLogado}/>}/>
              </>
              :
              <>
                <Route path="/" element={<PaginaPrincipalDeslogada logado={logado} />} />
                <Route path="/entrar" element={<Entrar />} />
                <Route path="/cadastrar" element={<Cadastrar />} />
                <Route path="/sobre" element={<Sobre />} />
              </>
            }
          </Routes>
        </main>
        <Footer/>
    </>
  )
}

export default App
