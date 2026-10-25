import {Link} from 'react-router'
import '../assets/css/Footer.css'

function Footer(){
    return(
        <>
        <footer id="footer"> {/*Footer*/}

            {/* Informações do Footer  */}
            <div id="footer-container"> 
                {/* Coluna da logo e nome */}
                <div className="footer-column">
                    <h1 id="titulo"><span>Coin</span> Control</h1>
                    <p>Mudando a forma como você vê seu <span>dinheiro</span></p>
                </div>

                {/* Coluna de contato */}
                <div className="footer-column">
                    <h2>Siga-nos</h2>

                    <div className="redes-sociais">
                        <a href="#">📸 Instagram</a>
                        <a href="#">🐦 Twitter</a>
                        <a href="#">📺 YouTube</a>
                    </div>
                </div>

                {/* Coluna de Atendimento */}
                <div className="footer-column">
                    <h2>Atendimento</h2>

                    <p>📍 Araraquara - SP</p>
                    <p>📞 (16) 98767-6767</p>
                    <p>✉️ coincontrol@gmail.com</p>
                </div>
            </div>

            {/* Direitos Footer */}
            <div id="footer-bottom" >
                <p>
                    © 2026 Coin Control — Todos os direitos reservados.
                </p>

                <div id="footer-links">
                    <Link to='/termos'>Termos de Uso</Link>
                    <Link to='/politicas'>Políticas de Privacidade</Link>
                </div>
            </div>
        </footer>
        </>
    )
}

export default Footer