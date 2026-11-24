import logo_horizontal from '../assets/img/logos/logo_horizontal.png'

import MenuUsuario from './menuUsuario.jsx'

import "../assets/css/navbar.css"

import { Link } from 'react-router-dom'
import { useState } from 'react'


function Navbar({logado, setLogado}) {

    const [email, setEmail] = useState('');

    if(logado == true){
        fetch('http://localhost:5000/busca_email', {
        credentials: 'include'})
        .then((dados) => dados.json())
        .then((dados) => {
            setEmail(dados.email);
        })
        .catch((erro) => {
            console.error('Erro ao obter email:', erro);
        });
    }
        
    return (
        <>
            
            {
                logado ? // Navbar para quando o usuário estiver logado
                    <>
                        <nav className='navbar' id='navbar-logado' >

                            {/* Área da logo */}
                            <div id='nav-logo'>
                                <Link to='/'> 
                                    <img className='logo' src={logo_horizontal} alt="Logo do coin control com texto horizontal" />
                                </Link>
                            </div>

                            {/* Área dos links */}
                            <div id='nav-links' >
                                <Link to='/'> 
                                    <h3><span>Início</span></h3>
                                </Link>
                                <Link to='/planilhas'> 
                                    <h3>Planilhas</h3>
                                </Link>
                                <Link to='/planejamento'> 
                                    <h3>Planejamento</h3>
                                </Link>
                                <Link to='/extrato'> 
                                    <h3>Extrato</h3>
                                </Link>
                                <Link to='/cursos'> 
                                    <h3>Cursos</h3>
                                </Link>
                                <Link to='/sobre'> 
                                    <h3>Sobre</h3>
                                </Link>
                            </div>

                            {/* Área do Usuário */}
                            <div id='nav-logins' >
                                <MenuUsuario  email={email} setLogado={setLogado} />
                            </div>
                        </nav>
                    </>
                :       // Navbar para quando o usuário NÃO estiver logado
                    <>
                    <nav className='navbar' id='navbar-não-logado' >

                            {/* Área da logo */}
                            <div id='nav-logo'>
                                <Link to='/'> 
                                    <img className = 'logo' src={logo_horizontal} alt="Logo do coin control com texto horizontal" />
                                </Link>
                            </div>

                            {/* Área dos links */}
                            <div id='nav-links-deslogado' >
                                <Link to='/'> 
                                    <h3><span>Início</span></h3>
                                </Link>
                                <Link to='/Sobre'> 
                                    <h3>Sobre</h3>
                                </Link>
                            </div>
                            
                            {/* Área de login e cadastro */}
                            <div id='nav-logins-deslogado' >
                                <Link to='/entrar'> 
                                    <h3 id='nav-entrar'>Entrar</h3>
                                </Link>
                                <Link to='/cadastrar'> 
                                    <h3 id='nav-cadastrar' >Cadastrar</h3>
                                </Link>
                            </div>
                        </nav>
                    </>
            }
        </>
    )
}

export default Navbar