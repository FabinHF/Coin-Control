import { useState } from "react";
import "./../assets/css/botaoApagar.css"

function BotaoApagar({id, tipo, setAtualizou, setMensagem, setAberto}){

    const URL = "http://127.0.0.1:5000"

    const[abertoApagar, setAbertoApagar] = useState(false)

    function abrirModal(e){
        e.preventDefault()
        setAbertoApagar(true)
    }

    function fecharModal(e){
        e.preventDefault()
        setAbertoApagar(false)
    }

    function apagarDespesa(e){
        e.preventDefault()

        fetch(`${URL}/apagar_${tipo}/${id}`,{
            credentials:"include",
            method:"DELETE"
        })
        .then((dados)=> dados.json())
        .then((dados_resposta) =>{
            if("erro" in dados_resposta){
                setMensagem({
                    "mensagem":dados_resposta.erro,
                    "class":"erro",
                    "ativo": true
                })
            }else{
                setMensagem({
                    "mensagem":dados_resposta.mensagem,
                    "class":"mensagem",
                    "ativo": true
                })
                setAtualizou(true)
            }
        })
        fecharModals(e)
    }

    function fecharModals(e){
        e.preventDefault()
        setAbertoApagar(false)
        setAberto(false)
    }

    return(
        <>
        <button 
        className="botao-modal-apagar"
        onClick={abrirModal}>
            Apagar
        </button>
        {abertoApagar &&(
            <>
                <div className="modal-overlay-apagar" onClick={fecharModal}>

                    <div
                        className="modal-conteudo"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <button
                            className="modal-fechar"
                            onClick={fecharModal}
                        >
                            x
                        </button>

                            <>
                                <h2>Você realmente deseja apagar essa transação?</h2>

                                <div className="escolha-lancamento-apagar">

                                    <button
                                        className="botao-apagar"
                                        onClick={apagarDespesa}
                                    >
                                        Apagar
                                    </button>

                                    <button
                                        className="botao-cancelar"
                                        onClick={fecharModal}
                                    >
                                        Cancelar
                                    </button>

                                </div>
                            </>
                    </div>
                </div>
            </>
            )
        }
        </>
    )
}

export default BotaoApagar