import '../assets/css/sobre.css'
import Navbar from "../components/navbar"

import henrique1 from '../assets/img/sobre/henrique1.jpeg'
import henrique2 from '../assets/img/sobre/henrique2.jpeg'
import fabio1 from '../assets/img/sobre/eu1.jpeg'
import fabio2 from '../assets/img/sobre/eu2.jpeg'
import nois from '../assets/img/sobre/nois1.jpeg'




function Sobre({logado}){
    return(
        <>
        <Navbar logado={logado} />
            <div id='sobre'>
                <h1>Sobre Nós</h1>

                <div id='donos'>
                    <div>
                        <img id='fabio-img' src={fabio1} alt="" />
                        <h1 id='fabio'>Fábio Hirose Fonseca</h1>
                        <h2>Dono da empresa Coin Control</h2>
                    </div>
                    <div>
                        <img id='henrique-img' src={henrique1} alt="" />
                        <h1 id='henrique'>Henrique Souza Siqueira</h1>
                        <h2>Dono da empresa Coin Control</h2>
                    </div>
                </div>

                <div className='paragrafo-1' >
                    <div className='alinhar-direita'>
                        <img className='img-paragrafo' src={nois} alt="" />
                    </div>
                    <div>
                        <p className='paragrafo-text' >
                            <span className='negrito'>Tudo começa em 2026 </span>, em um projeto amador, liderado por estudantes do Ensino 
                            Médio no IFSP - Campus Araraquara. Alunos esses que buscavam ajudar pessoas 
                            com uma ferramenta que ajudaria famílias em sua jornada de economia e estabilidade financeira.
                        </p>
                    </div>
                </div>
                <div className='paragrafo-1' >
                    <div>
                        <p className='paragrafo-text' >O CoinControl é a sua <span className='negrito'>agenda monetária </span>pessoal que busca melhorar a monitoração de seus gastos e 
                            sua renda mensal. Compreendendo e mostrando detalhadamente a entrada e saída do dinheiro envolvido. 
                            Economizando da melhor maneira possível e gerando um gasto mais consciente e favorável no fim do mês. 
                        </p>
                    </div>
                    <div className='alinhar-esquerda'>
                        <img className='img-paragrafo' src={fabio2} alt="" />
                    </div>
                </div>
                <div className='paragrafo-1' >
                    <div className='alinhar-direita'>
                        <img className='img-paragrafo' src={henrique2} alt="" />
                    </div>
                    <div>
                        <p className='paragrafo-text' >
                            Diversas pessoas não possuem o conhecimento financeiro para gerir o próprio dinheiro, 
                            principalmente pessoas de baixa renda ou em situações marginalizadas. Portanto, 
                            buscamos conscientizar e ajudar as pessoas objetivamente com um site intuitivo e acessível, 
                            e mostrar uma forma de como você pode gastar de forma monitorada e com o auxílio de video-aulas 
                            e cursos gratuitos direto da sua casa!
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sobre