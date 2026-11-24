import {useState} from 'react'


function FormularioRecebimento({ fecharModal, setAtualizou, setMensagem  }) {

    const[recebimento, setRecebimento] = useState({
        "descricao":"",
        "valor":"",
        "categoria": "",
        "data": "",
        "metodo": "",
        "pago": "sim"
    })

    function handleChange(e){
        const {name, value} = e.target

        setRecebimento({
            ...recebimento,
            [name]:value
        })
    }

    function salvarRecebimento(e) {
        e.preventDefault();

        fetch('http://localhost:5000/adicionar_recebimento',{
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"recebimento": recebimento})
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
            onSubmit={salvarRecebimento}
        >

            <h3>Adicionar Recebimento</h3>

            <label>
                De onde veio ou virá esse dinheiro?

                <input
                    type="text"
                    name="descricao"
                    placeholder="Ex: Salário mensal"
                    value={recebimento.descricao}
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
                    value={recebimento.valor}
                    onChange={handleChange}
                    required
                />
            </label>

            <label>
                Qual a categoria do recebimento?

                <select value={recebimento.categoria} onChange={handleChange} name="categoria" required>
                    <option value="" disabled>
                        Escolha uma categoria
                    </option>

                    <option value="salario">Salário</option>
                    <option value="renda_extra">Renda Extra</option>
                    <option value="lucros_dividendos">Lucros e dividendos</option>
                </select>
            </label>

            <label>
                Data do recebimento
                <input
                    type="date"
                    name="data"
                    value={recebimento.data}
                    onChange={handleChange}
                    required
                />
            </label>

            <label>
                Método de recebimento

                <select value={recebimento.metodo} onChange={handleChange} name="metodo" required>
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
                        defaultChecked
                        onChange={handleChange}
                    />
                    Sim, já recebi esse dinheiro
                </label>

                <label>
                    <input
                        type="radio"
                        name="pago"
                        value="nao"
                        onChange={handleChange}
                    />
                    Não, vou receber depois
                </label>

            </div>

            <button
                type="submit"
                className="botao-salvar"
            >
                Salvar recebimento
            </button>
        </form>
    );
}

export default FormularioRecebimento;