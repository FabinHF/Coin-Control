import { useState } from "react"

import "./../assets/css/botaoEditar.css"

import BotaoApagar from "./BotaoApagar"

function BotaoEditar({id, tipo, setAtualizou, setMensagem}){

    const URL = "http://127.0.0.1:5000"

    const[aberto, setAberto] = useState(false)
    const[pago, setPago] = useState("")

    const[item, setItem] = useState({
        "descricao":"",
        "valor":"",
        "categoria":"",
        "data":"",
        "metodo_de_pagamento":"",
        "pago":""
    })

    function abrirModal(){
        setAberto(true)
        fetch(`${URL}/busca_dados_${tipo}/${id}`,{
            credentials: 'include'
        })
        .then((dados) => dados.json())
        .then((dados_resposta) =>{
            if("erro" in dados_resposta){
                console.error(dados_resposta.erro);
            }else{
                setItem({
                    "descricao":dados_resposta.descricao,
                    "valor":dados_resposta.valor,
                    "categoria":dados_resposta.categoria,
                    "data":dados_resposta.data,
                    "metodo_de_pagamento":dados_resposta.metodo_de_pagamento,
                    "pago":dados_resposta.pago
                })
                if(dados_resposta.pago == true){
                    setPago("sim")
                }else{
                    setPago("nao")
                }
            }
        })
    }

    function handleChange(e){
        const{name,value} = e.target

        if(name == "pago"){
            setPago(value)
            if(value=="sim"){
                setItem({
                    ...item,
                    [name]:true
                })
            }else{
                setItem({
                    ...item,
                    [name]:false
                })
            }
        }else{
            setItem({
                ...item,
                [name]:value
            }) 
        }
    }

    function atualizar(e){
        e.preventDefault()
        fetch(`${URL}/editar_${tipo}/${id}`,{
            credentials: "include",
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"item": item})
        })
        .then( (dados) => dados.json() )
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
        setAberto(false)
    }

    
    function fecharModal(){
        setAberto(false)
    }

    return(
        <>
            <button 
            className="botao-editar"
            onClick={abrirModal} >
                Editar
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

                        {tipo ==='despesa' ? //Fomulário Desopesa
                            <div>
                                <form
                                    onSubmit={atualizar}
                                    className="formulario-lancamento"
                                >

                                    <h3>Adicionar Despesa</h3>

                                    <label>
                                        Com o que você gastou ou irá gastar?

                                        <input
                                            type="text"
                                            name="descricao"
                                            placeholder="Ex: Parcela de celular"
                                            value={item.descricao}
                                            onChange={handleChange}
                                        />
                                    </label>

                                    <label>
                                        Qual o valor?

                                        <input
                                            type="number"
                                            name="valor"
                                            placeholder="R$ 0,00"
                                            step="0.01"
                                            min="0.01"
                                            required
                                            value={item.valor}
                                            onChange={handleChange}
                                        />
                                    </label>

                                    <label>
                                        Qual a categoria da despesa?

                                        <select value={item.categoria} onChange={handleChange} name="categoria" required>
                                            <option value="" disabled>
                                                Escolha uma categoria
                                            </option>

                                            <option value="mandatorio">Mandatório</option>
                                            <option value="objetivos_curtos">Objetivos Curtos</option>
                                            <option value="objetivos_medios">Objetivos Médios</option>
                                            <option value="objetivos_longos">Objetivos Longos</option>
                                            <option value="evolucao">Evolução Pessoal</option>
                                            <option value="lazer">Lazer</option>
                                            <option value="reserva_emergencia">Reserva de Emergência</option>
                                        </select>
                                    </label>

                                    <label>
                                        Data de pagamento

                                        <input
                                            type="date"
                                            name="data"
                                            required
                                            value={item.data}
                                            onChange={handleChange}
                                        />
                                    </label>

                                    <label>
                                        Método de pagamento

                                        <select value={item.metodo_de_pagamento} onChange={handleChange} name="metodo_de_pagamento" required>
                                            <option value="" disabled>
                                                Escolha um método
                                            </option>

                                            <option value="pix">PIX</option>
                                            <option value="dinheiro">Dinheiro</option>
                                            <option value="debito">Cartão de débito</option>
                                            <option value="credito">Cartão de crédito</option>
                                            <option value="transferencia">Transferência</option>
                                            <option value="outros">Outros</option>
                                        </select>
                                    </label>

                                    <div className="campo-pago">

                                        <p>Essa conta já foi paga?</p>

                                        <label>
                                            <input
                                                type="radio"
                                                name="pago"
                                                value="sim"
                                                checked={pago==="sim"}
                                                onChange={handleChange}
                                            />
                                            Sim, já paguei esta conta
                                        </label>

                                        <label>
                                            <input
                                                type="radio"
                                                name="pago"
                                                value="nao"
                                                checked={pago === "nao"}
                                                onChange={handleChange}
                                            />
                                            Não, vou pagar depois
                                        </label>

                                    </div>
                                    <div className="escolha-editar">
                                        <button
                                            type="submit"
                                            className="botao-salvar"
                                        >
                                            Salvar despesa
                                        </button>

                                        <BotaoApagar id={id} tipo={tipo} setAtualizou={setAtualizou} setMensagem={setMensagem} setAberto={setAberto} />
                                    </div>
                                </form>
                            </div>
                        : //Fomulário Recebimento
                            <div>
                                <form
                                onSubmit={atualizar}
                                    className="formulario-lancamento"
                                >
                                
                                    <h3>Editar Recebimento</h3>
                                                
                                    <label>
                                        De onde veio ou virá esse dinheiro?
                                                
                                        <input
                                            type="text"
                                            name="descricao"
                                            placeholder="Ex: Salário mensal"
                                            value={item.descricao}
                                            onChange={handleChange}
                                        />
                                    </label>
                                                
                                    <label>
                                        Qual o valor?
                                                
                                        <input
                                            type="number"
                                            name="valor"
                                            placeholder="R$ 0,00"
                                            step="0.01"
                                            min="0.01"
                                            value={item.valor}
                                            onChange={handleChange}
                                            required
                                        />
                                    </label>
                                                
                                    <label>
                                        Qual a categoria do recebimento?
                                                
                                        <select value={item.categoria} onChange={handleChange} name="categoria" required>
                                            <option value="" disabled>
                                                Escolha uma categoria
                                            </option>
                                                
                                            <option value="salario">Salário</option>
                                            <option value="renda_extra">Renda Extra</option>
                                            <option value="objetivos_medios">Lucros e dividendos</option>
                                        </select>
                                    </label>
                                                
                                    <label>
                                        Data do recebimento
                                        <input
                                            type="date"
                                            name="data"
                                            value={item.data}
                                            onChange={handleChange}
                                            required
                                        />
                                    </label>
                                                
                                    <label>
                                        Método de recebimento
                                                
                                        <select value={item.metodo_de_pagamento} onChange={handleChange} name="metodo_de_pagamento" required>
                                            <option value="" disabled>
                                                Escolha um método
                                            </option>
                                                
                                            <option value="pix">PIX</option>
                                            <option value="dinheiro">Dinheiro</option>
                                            <option value="transferencia">Transferência</option>
                                            <option value="deposito">Depósito</option>
                                            <option value="outros">Outros</option>
                                        </select>
                                    </label>
                                                
                                    <div className="campo-pago">
                                                
                                        <p>Esse recebimento já foi realizado?</p>
                                                
                                        <label>
                                            <input
                                                type="radio"
                                                name="pago"
                                                value="sim"
                                                checked={pago==="sim"}
                                                onChange={handleChange}
                                            />
                                            Sim, já paguei esta conta
                                        </label>

                                        <label>
                                            <input
                                                type="radio"
                                                name="pago"
                                                value="nao"
                                                checked={pago === "nao"}
                                                onChange={handleChange}
                                            />
                                            Não, vou pagar depois
                                        </label>

                                    </div>
                                    <div className="escolha-editar">
                                        <button
                                            type="submit"
                                            className="botao-salvar"
                                        >
                                            Salvar despesa
                                        </button>

                                        <BotaoApagar id={id} tipo={tipo} setAtualizou={setAtualizou} setMensagem={setMensagem} setAberto={setAberto} />
                                    </div>
                                </form>
                            </div>
                        }

                    </div>
                </div>

            )}
        </>
    )
}

export default BotaoEditar