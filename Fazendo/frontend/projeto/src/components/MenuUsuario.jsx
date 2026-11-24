import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import defaultProfilePicture from '../assets/img/usuarios/default_profile_picture.png';
import '../assets/css/menuUsuario.css';

function MenuUsuario({email, setLogado}) {
    const navigate = useNavigate();
    const location = useLocation();

    const [menuAberto, setMenuAberto] = useState(false);

    const [imagem, setImagem] = useState(null);
    const [nome, setNome] = useState("");
    const [carregamento, setCarregamento] = useState(true);

    useEffect(() => {
        
        async function fetchData() {
            setCarregamento(true);
            try{
                const resposta = await fetch('http://localhost:5000/busca_imagem_nome', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: email})
                })
                
                const dados_resposta = await resposta.json();
                
                if ("erro" in dados_resposta || !resposta.ok){
                    console.error(dados_resposta.erro);
                    return;
                }
                
                setImagem(dados_resposta.imagem);
                setNome(dados_resposta.nome);
                
                }catch (erro) {
                    console.error('Erro ao buscar imagem e nome do usuário:', erro);
                }finally {
                    setCarregamento(false);
                }
            };
            if(email){
                fetchData();
            }
    },[location.pathname, email]);
    

    function sair() {
        fetch('http://localhost:5000/sair', {
            credentials: 'include'
        })
        .then((dados) => dados.json())
        .then((dados_resposta) => {
            if ("erro" in dados_resposta) {
                console.error(dados_resposta.erro);
            } else {
                setLogado(false);
                navigate(dados_resposta.redirect, {state: {mensagem: dados_resposta.mensagem, tipo: dados_resposta.type}});
            }
        })
    }

    return (
        <div className="menu-usuario">

            <button
                onClick={() => setMenuAberto(!menuAberto)}
                id='menu-usuario-botao'
            >
                <h3 id='nome-menu' >Olá, {nome}</h3>
                <img id='menu-foto-user' src={imagem || defaultProfilePicture} alt="Imagem do usuário" />
            </button>

            {menuAberto && (
                <div className="opcoes-usuario">

                    <button onClick={() => {
                        sair();
                        setMenuAberto(false);
                    }} >
                        Sair
                    </button>

                </div>
            )}

        </div>
    );
}

export default MenuUsuario;