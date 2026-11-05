import Navbar from "../components/Navbar"

import capivara3 from "../assets/img/capivaras/capivara3.png"
import grafico from "../assets/img/outros/graficopizza.png"

import {Link} from "react-router-dom"

import "../assets/css/PaginaPrincipalDeslogada.css"

function PaginaPrincipal({logado}){

    return(
        <>
        <Navbar logado={logado}/>

        <main className="pagina-principal">

            {/* PRIMEIRA SEÇÃO */}
            <section className="secao-inicial">

                <div className="texto-inicial">
                    <h1>
                        Faça sua agenda
                        financeira com o
                        <span> Coin Control!</span>
                    </h1>

                    <Link to="/entrar" className="botao-principal">
                        CRIAR CONTA GRÁTIS
                        <span>→</span>
                    </Link>
                </div>

                <div className="imagem-capivara">
                    <img src={capivara3} alt="Capivara com moedas" />
                </div>

            </section>


            {/* SEGUNDA SEÇÃO */}
            <section className="secao-grafico">

                <div className="imagem-grafico">
                    <img id="grafico" src={grafico} alt="Gráfico financeiro" />
                </div>

                <div className="texto-grafico">
                    <h2>
                        Entenda como o seu
                        dinheiro funciona de
                        forma <span>rápida e simples</span>
                    </h2>

                    <Link to="/entrar" className="botao-principal">
                        COMECE AGORA
                    </Link>
                </div>

            </section>


            {/* TERCEIRA SEÇÃO */}
            <section className="secao-tabelas">

                <h2>
                    Monte <span>tabelas,</span>
                    <br />
                    registre <span>movimentações</span>
                    <br />
                    e <span>acompanhe</span> seus dados.
                </h2>

                <Link to="/entrar" className="botao-principal">
                    VEJA COMO FUNCIONA
                </Link>

            </section>


            {/* QUARTA SEÇÃO */}
            <section className="secao-informacoes">

                <div className="informacao">
                    <h2>
                        Conheça os <span>cursos</span>
                        <br />
                        presentes no nosso site!
                    </h2>

                    <Link to="/entrar" className="botao-secundario">
                        Ver Cursos gratuitos
                    </Link>
                </div>

                <div className="informacao">
                    <h2>
                        Ou então, <span>conheça mais</span>
                        <br />
                        sobre nossa empresa!
                    </h2>

                    <Link to="/sobre" className="botao-secundario">
                        Sobre nós
                    </Link>
                </div>

            </section>


            {/* QUINTA SEÇÃO */}
            <section className="secao-numeros">

                <div className="numero">
                    <strong>135.000+</strong>
                    <span>USUÁRIOS ATIVOS</span>
                </div>

                <div className="numero">
                    <strong>MAIS DE 15</strong>
                    <span>COLABORADORES</span>
                </div>

                <div className="numero">
                    <strong>SERVIÇO 100%</strong>
                    <span>GRATUITO</span>
                </div>

            </section>

        </main>
        </>
    );
}

export default PaginaPrincipal;