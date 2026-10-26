import logo_horizontal from '../assets/img/logos/logo_horizontal.png'
import fotoUsuario from '../assets/img/usuarios/default_profile_picture.png'

import "../assets/css/navbar.css"



import {Link} from 'react-router'

function Navbar({logado}) {

    console.log(logado)

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
                                <Link to='/historico'> 
                                    <h3>Histórico</h3>
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
                                <h3>Olá, Usuário</h3>
                                <Link to='/usuario-config'>
                                    <img id='nav-foto-user' src={fotoUsuario} alt="Foto do usuário" />
                                </Link>
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