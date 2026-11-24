import { useState } from 'react';
import FormularioDespesa from './FormularioDespesa';
import FormularioRecebimento from './FormularioRecebimento';
import '../assets/css/adicionarLancamento.css';

function AdicionarLancamento({setAtualizou, setMensagem}) {

    const [aberto, setAberto] = useState(false);
    const [tipo, setTipo] = useState(null);

    function fecharModal() {
        setAberto(false);
        setTipo(null);
    }

    return (
        <>
            {/* Botão que abre o modal */}
            <button
            className='botao-adicionar-lancamento'
            onClick={() => setAberto(true)}>
                + Novo Item
            </button>

            {aberto && (
                <div className="modal-overlay" onClick={fecharModal}>

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

                        {!tipo ? (

                            <>
                                <h2>Adicionar lançamento</h2>

                                <p>
                                    O que você deseja adicionar?
                                </p>

                                <div className="escolha-lancamento">

                                    <button
                                        onClick={() => setTipo('despesa')}
                                    >
                                        Despesa
                                    </button>

                                    <button
                                        onClick={() => setTipo('recebimento')}
                                    >
                                        Recebimento
                                    </button>

                                </div>
                            </>

                        ) : (

                            <>
                                <button
                                    className="voltar-modal"
                                    onClick={() => setTipo(null)}
                                >
                                    ← Voltar
                                </button>

                                {tipo === 'despesa' ?
                                    <FormularioDespesa
                                        fecharModal={fecharModal}
                                        setAtualizou={setAtualizou}
                                        setMensagem = {setMensagem}
                                    />
                                    :
                                    <FormularioRecebimento
                                        fecharModal={fecharModal}
                                        setAtualizou={setAtualizou}
                                        setMensagem = {setMensagem}

                                    />
                                }

                            </>

                        )}

                    </div>

                </div>
            )}
        </>
    );
}

export default AdicionarLancamento;