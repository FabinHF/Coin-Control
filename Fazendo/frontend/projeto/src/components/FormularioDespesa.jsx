import { useState } from "react";

function FormularioDespesa({ fecharModal, setAtualizou, setMensagem }) {

    const[despesa, setDespesa] = useState({
        "descricao":"",
        "valor":"",
        "categoria": "",
        "data": "",
        "metodo": "",
        "pago": "nao"
    })

    function handleChange(e){
        const{name, value} = e.target

        setDespesa({
            ...despesa,
            [name]:value
        })
    }

    function salvarDespesa(e) {
        e.preventDefault();
        
        fetch('http://localhost:5000/adicionar_despesa',{
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"despesa": despesa})
        })
        .then((dados) => dados.json())
        .then((dados_resposta)=>{
            if ('erro' in dados_resposta){
                setMensagem({"mensagem":dados_resposta.erro, 
                            "class":"erro",
                            "ativo":true})
            }else{
                setMensagem({"mensagem":dados_resposta.mensagem, 
                            "class":"mensagem",
                            "ativo":true})
            }
        })

        fecharModal();
        setAtualizou(true);
    }

    return (
        <form
            className="formulario-lancamento"
            onSubmit={salvarDespesa}
        >

            <h3>Adicionar Despesa</h3>

            <label>
                Com o que você gastou ou irá gastar?

                <input
                    type="text"
                    name="descricao"
                    placeholder="Ex: Parcela de celular"
                    value={despesa.descricao}
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
                    value={despesa.valor}
                    onChange={handleChange}
                />
            </label>

            <label>
                Qual a categoria da despesa?

                <select value={despesa.categoria} onChange={handleChange} name="categoria" required>
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
                    value={despesa.data}
                    onChange={handleChange}
                />
            </label>

            <label>
                Método de pagamento

                <select value={despesa.metodo} onChange={handleChange} name="metodo" required>
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
                        onChange={handleChange}
                    />
                    Sim, já paguei esta conta
                </label>

                <label>
                    <input
                        type="radio"
                        name="pago"
                        value="nao"
                        defaultChecked
                        onChange={handleChange}
                    />
                    Não, vou pagar depois
                </label>

            </div>

            <button
                type="submit"
                className="botao-salvar"
            >
                Salvar despesa
            </button>

        </form>
    );
}

export default FormularioDespesa;