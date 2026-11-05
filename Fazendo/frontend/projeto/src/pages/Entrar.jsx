import capivara from '../assets/img/capivaras/capivara1.png'
import "../assets/css/entrar.css"
import {Link, useNavigate} from 'react-router-dom'
import {Eye,Lock} from 'lucide-react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

function Entrar(){

    const navigate = useNavigate();

    const URL = 'http://localhost:5000'

    const location = useLocation();

    const mensagem = location.state?.mensagem;
    const tipo = location.state?.tipo;


    const[usuario, SetUsuario] = useState({
        "email":"",
        "senha":"",
    })

    const[lembre, setLembre] = useState(false)

    const[erro, SetErro] = useState("")

    function handleChange(e){
        const {name, value} = e.target
        SetUsuario({
            ...usuario,
            [name]:value
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        
        fetch(`${URL}/entrar`,{
            method: 'POST',
            credentials: 'include',
            headers:{
                'Content-Type': "application/json"
            },
            body: JSON.stringify({'usuario': usuario, "lembre": lembre}) 
        })
        .then( (dados) => dados.json() )
        .then( (dados_resposta) => {
            if("erro" in dados_resposta){
                SetErro(dados_resposta.erro)
            }else{
                navigate(dados_resposta.redirect, {state: {mensagem: dados_resposta.mensagem, tipo: dados_resposta.type}});
                setErro(mensagem)
            }
        } )
        .catch((erro) => {
            console.error(erro)
            SetErro("Não foi possível conectar ao servidor.")
        })
    }

    return(
        <>
        <div id='entrar-container' >
            <div id='imagem' >
                <h2>Quer aprender a</h2>
                <h1 className='amarelo' >Economizar?</h1>
                <img src={capivara} alt='Capivara'/>
                <h1 className='amarelo' >Acesse já!</h1>
            </div>
            <div id='login-form' >
                <Link id='voltar' to='/'>&lt; Voltar</Link>
                <form onSubmit={handleSubmit}>

                    <div className='campo'>
                        <Eye className='icone' />
                        <input onChange={handleChange}  type="text" placeholder='Email' value={usuario.email} name='email' id='email'/>
                    </div>

                    <div className='campo'>
                        <Lock className='icone' />
                        <input onChange={handleChange}  type="text" placeholder='Senha' value={usuario.senha} name='senha' id='senha' />
                    </div>
                    <div id='opcoes'>
                        
                        {erro &&
                            <div className='erro'>
                                {erro}
                            </div>

                        }
                        <label id='lembre-label' htmlFor="lembre">
                            <input type="checkbox" checked={lembre} onChange={(e) => setLembre(e.target.checked) } name="lembre" id="lembre" />
                            Lembre-se de mim
                        </label>

                    </div>
                    <div id="button-container">
                        <button id='botao-login' type="submit">LOGIN</button>
                    </div>
                </form>
                <div id='margem-senha'>
                    <a id='senha-rec' href="#">Esqueceu a senha?</a>
                </div>
                <div id='entrar-cadastro'>
                    <p>Não possui uma conta?</p>
                    <Link to='/cadastrar'>Cadastre-se</Link>
                </div>
            </div>

        </div>
        </>
    )
}

export default Entrar