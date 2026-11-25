import { useState, useEffect } from 'react';

import Navbar from '../components/Navbar';
import AdicionarDespesa from '../components/AdicionarDespesa.jsx';
import BotaoEditar from '../components/botaoEditar.jsx';

import '../assets/css/extrato.css';

function Planilha({ logado, setLogado }) {

    const [despesas, setDespesas] = useState([]);
    const [atualizou, setAtualizou] = useState(false);
    const [mensagem, setMensagem] = useState({
        "mensagem":"",
        "class":"",
        "ativo": false
    });

    

    const [filtros, setFiltros] = useState({
        "descricao": '',
        "categoria": '',
        "dataInicio": '',
        "dataFim": '',
        "metodo_de_pagamento": '',
        "pago":"",
        "valor_min":"",
        "valor_max":""
    });

    useEffect(() => {
        fetch('http://localhost:5000/planilha', {
            credentials: 'include'
        })
        .then((resposta) => resposta.json())
        .then((dados) => {
            setDespesas(dados.uniao_despesas);
            setAtualizou(false);
        })
    }, [atualizou]);

    

    function alterarFiltro(e) {
        const { name, value } = e.target;

        setFiltros((anterior) => ({
            ...anterior,
            [name]: value
        }));
    }

    function buscarDespesas(e) {
        e.preventDefault();

        fetch('http://localhost:5000/buscar_por_filtro', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"filtros":filtros})
        })
        .then((dados) => dados.json())
        .then((dados_resposta) => {
            setDespesas(dados_resposta.uniao_despesas);
        });

        setFiltros({
            "descricao": '',
            "categoria": '',
            "dataInicio": '',
            "dataFim": '',
            "metodo_de_pagamento": '',
            "pago":"",
            "valor_min":"",
            "valor_max":""
        })
    }

return (
    <>
        <Navbar logado={logado} setLogado={setLogado}/>

        <main className="pagina-extrato">

            <section className="sessao1-extrato">
                <h1>
                    Seu <span>Extrato Pessoal</span> fácil de ver
                </h1>
            </section>

            <div className="painel-extrato">
                    {mensagem.ativo
                    ?
                    <div className={mensagem.class}>
                        <button id='botao-mensagem' onClick={() => setMensagem({"mensagem":"","class":"","ativo": false})}>X</button>
                        <p id='texto-mensagem' >{mensagem.mensagem}</p>
                    </div>
                    :
                    <div></div>
                    }

                <section className="sessao2-extrato">
                    <div className="sessao2-extrato-texto">
                        <h2>Meus Gastos</h2>
                        <p>Controle suas despesas de forma simples.</p>
                    </div>

                    <div className="sessao2-extrato-botao">
                        <AdicionarDespesa setMensagem={setMensagem} setAtualizou={setAtualizou} />
                    </div>
                </section>

                <section className="filtros-extrato">
                    <form onSubmit={buscarDespesas}>
                        
                        <div className="filtro-extrato-campo">
                            <label htmlFor="descricao">Descrição:</label>
                            <input
                                type="text"
                                id="descricao"
                                name="descricao"
                                value={filtros.descricao}
                                onChange={alterarFiltro}
                            />
                        </div>
                
                        <div className="filtro-extrato-campo">
                            <label htmlFor="categoria">Categoria:</label>
                            <select value={filtros.categoria} onChange={alterarFiltro} name="categoria">
                                <option value="">
                                    Todos
                                </option>

                                <option value="salario">Salário</option>
                                <option value="renda_extra">Renda Extra</option>
                                <option value="lucros_dividendos">Lucros e dividendos</option>
                                <option value="mandatorio">Mandatório</option>
                                <option value="objetivos_curtos">Objetivos Curtos</option>
                                <option value="objetivos_medios">Objetivos Médios</option>
                                <option value="objetivos_longos">Objetivos Longos</option>
                                <option value="evolucao">Evolução Pessoal</option>
                                <option value="lazer">Lazer</option>
                                <option value="reserva_emergencia">Reserva de Emergência</option>
                            </select>
                        </div>
                
                        <div className="filtro-extrato-campo">
                            <label htmlFor="dataInicio">Data inicial:</label>
                            <input
                                type="date"
                                id="dataInicio"
                                name="dataInicio"
                                value={filtros.dataInicio}
                                onChange={alterarFiltro}
                                max={filtros.dataFim}
                            />
                        </div>
                
                        <div className="filtro-extrato-campo">
                            <label htmlFor="dataFim">Data final:</label>
                            <input
                                type="date"
                                id="dataFim"
                                name="dataFim"
                                value={filtros.dataFim}
                                onChange={alterarFiltro}
                                min={filtros.dataInicio}
                            />
                        </div>
                
                
                        <div className="filtro-extrato-campo">
                            <label htmlFor="metodo_de_pagamento">Método de pagamento:</label>
                            <select
                                id="metodo_de_pagamento"
                                name="metodo_de_pagamento"
                                value={filtros.pagamento}
                                onChange={alterarFiltro}
                            >
                                <option value="">
                                    Todos
                                </option>
                                
                                <option value="pix">Pix</option>
                                <option value="debito">Débito</option>
                                <option value="credito">Crédito</option>
                                <option value="dinheiro">Dinheiro</option>
                                <option value="boleto">Boleto</option>
                                <option value="cheque">Cheque</option>
                                <option value="transferencia">Transferência</option>
                                <option value="deposito">Depósito</option>
                                <option value="outros">Outros</option>
                            </select>
                        </div>
                        <div className="filtro-extrato-campo">
                            <label htmlFor="pago">Status Pagamento:</label>
                            <select 
                                name="pago" 
                                onChange={alterarFiltro} 
                                value={filtros.pago}
                                id="pago"
                            >
                                <option value="">
                                    Todos
                                </option>

                                <option value="sim">Pago</option>
                                <option value="nao">Não pago</option>
                            </select>
                        </div>

                        <div className="filtro-extrato-campo">
                            <label htmlFor="valor_min">
                                Valor Mínimo:
                            </label>
                            <input 
                                type="number" 
                                value={filtros.valor_min}
                                onChange={alterarFiltro}
                                name="valor_min" 
                                id="valor_min"
                                placeholder='sem valor mínimo' 
                                step="0.1"
                                min="0"
                                max={filtros.valor_max}
                            />
                        </div>
                        <div className="filtro-extrato-campo">
                            <label htmlFor="valor_max">
                                Valor Máximo
                            </label>
                            <input 
                                type="number" 
                                value={filtros.valor_max}
                                onChange={alterarFiltro}
                                name="valor_max" 
                                id="valor_max"
                                placeholder='sem valor máximo' 
                                step="0.1"
                                min={filtros.valor_min}
                            />
                        </div>
                
                        <button type="submit">Buscar</button>
                
                    </form>
                </section>
                <section className="tabela-extrato-transacoes">
                    <div className="tabela-extrato-cabecalho">
                        <h3>Transações cadastradas</h3>
                    </div>

                    <div className="tabela-extrato-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th>Descrição</th>
                                    <th>Categoria</th>
                                    <th>Valor</th>
                                    <th>Método de Pagamento</th>
                                    <th>Data</th>
                                    <th>Pago</th>
                                    <th>Editar</th>
                                </tr>
                            </thead>

                            <tbody>
                                {despesas.length > 0 ? (
                                    despesas.map((despesa) => (
                                        <tr key={despesa.id_lista} className={despesa.pago === 'Pago' ? 'pago' : 'pendente'}>
                                            <td>{despesa.descricao}</td>
                                            <td>{despesa.categoria}</td>
                                            <td>{despesa.valor}</td>
                                            <td>{despesa.metodo_de_pagamento}</td>
                                            <td>{despesa.data}</td>
                                            <td>{despesa.pago === true ? "Sim" : "Não"}</td>
                                            <td><BotaoEditar id={despesa.id} tipo={despesa.tipo} setAtualizou={setAtualizou} setMensagem={setMensagem} /></td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="tabela-extrato-vazia">
                                            Nenhuma despesa cadastrada ainda.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>

            </div>

        </main>
    </>
);
}

export default Planilha;