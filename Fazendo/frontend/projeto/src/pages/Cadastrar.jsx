import capivara from '../assets/img/capivaras/capivara2.png'
import "../assets/css/cadastrar.css"
import {Link} from 'react-router'
import {Eye,Lock,Phone,EyeClosed, User} from 'lucide-react'
import { useState } from 'react'

function Cadastrar(){

    const[erro, setErro] = useState("");

    const[registroUser, setRegistroUser] = useState({
        "nome": '',
        "email": '',
        "telefone": '',
        "senha": '',
        "senha_confirm": ''
    });

    function handleChange(event){
        const { name, value } = event.target;
        setRegistroUser({
            ...registroUser,
            [name]: value
        });
    };

    function handleSubmit(e){
        e.preventDefault();

        console.log("a")

        if(registroUser.senha !== registroUser.senha_confirm){
            setErro("As senhas não são iguais");
            return;
        }else{
            fetch('http://localhost:5000/cadastrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"novo_usuario": registroUser})
            })
            .then(dados => dados.json())
            .then((dados_resposta) => {
                if ("erro" in dados_resposta) {
                    setErro(dados_resposta.erro);
                }else{
                    setErro("");
                    setRegistroUser({
                        "nome": '',
                        "email": '',
                        "telefone": '',
                        "senha": '',
                        "senha_confirm": ''
                    });
                document.getElementById("termos").checked = false;
                window.location.href = dados_resposta.redirect;
                }
            });
        }
    }

    return(
        <>
        <div id='cadastrar-container' >

            <div id='imagem' >
                <h1>Seu dinheiro sob controle</h1>
                <h2  className='amarelo' >seu futuro mais tranquilo</h2>
                <img src={capivara} alt='Capivara'/>
                <h1>Cadastre-se de forma </h1>
                <h1 ><span className="amarelo">Rápida</span> e <span className="amarelo">Intuitiva</span></h1>
            </div>

            <div id='cadastro-form' >
                <Link id='voltar' to='/'>&lt; Voltar</Link>
                <form onSubmit={handleSubmit} >

                    <div className='campo'>
                        <User className='icone' />
                        <input required type="text" placeholder='Nome Completo' onChange={handleChange} value={registroUser.nome} name='nome' />
                    </div>

                    <div className='campo'>
                        <Eye className='icone' />
                        <input required type="text" placeholder='Email' onChange={handleChange} value={registroUser.email} name='email' /> 
                    </div>

                    <div className='campo'>
                        <Phone className='icone' />
                        <input required type="text" placeholder='Telefone (00) 00000-0000' onChange={handleChange} value={registroUser.telefone} name='telefone'/>
                    </div>

                    <div className='campo'>
                        <Lock className='icone' />
                        <input required type="text" placeholder='Senha' onChange={handleChange} value={registroUser.senha} name='senha'/>
                    </div>

                    <div className='campo'>
                        <Lock className='icone' />
                        <input required type="text" placeholder='Confirmar Senha' onChange={handleChange} value={registroUser.senha_confirm} name='senha_confirm'/>
                    </div>
                        {erro && <p>{erro}</p>}

                    <div id='opcoes'>
                        <label id='termos-label' htmlFor="termos">
                            <input required type="checkbox" name="termos" id="termos" />
                            Li e concordo com os <Link to='/termos'>Termos de Uso</Link> e <Link to='/politica'>Política de Privacidade</Link>
                        </label>

                    </div>
                    <div id="button-container">
                        <button id='botao-login' type="submit">CADASTRAR</button>
                    </div>
                </form>
                <div id='entrar-cadastro'>
                    <p>Já possui uma conta?</p>
                    <Link to='/entrar'>Entrar</Link>
                </div>
            </div>
        </div>
        </>
    )
}

export default Cadastrar