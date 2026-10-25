import capivara from '../assets/img/capivaras/capivara1.png'
import "../assets/css/entrar.css"
import {Link} from 'react-router'
import {Eye,Lock} from 'lucide-react'
import { useState } from 'react'

function Entrar(){
    const URL = 'http://127.0.0.1:5000'

    const[usuario, SetUsuario] = useState({
        "email":"",
        "senha":""
    })
    const[msg, SetMsg] = useState("")

    function handleChange(e){
        const {name, value} = e.target

        console.log(name,value)
        SetUsuario({
            ...usuario,
            [name]:value
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        fetch(`${URL}/entrar`,{
            method: 'POST',
            headers:{
                'Content-Type': "application/json"
            },
            body: JSON.stringify({'usuario': usuario}) 
        })
        .then( (dados) => dados.json() )
        .then( (dados_resposta) => {
            SetMsg(dados_resposta.resposta)
        } )
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
                        <input onChange={handleChange}  type="text" placeholder='Email' name='email' id='email'/>
                    </div>

                    <div className='campo'>
                        <Lock className='icone' />
                        <input onChange={handleChange}  type="text" placeholder='Senha' name='senha' id='senha' />
                    </div>
                    <div id='opcoes'>
                        <label id='lembre-label' htmlFor="lembre">
                            <input type="checkbox" name="lembre" id="lembre" />
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