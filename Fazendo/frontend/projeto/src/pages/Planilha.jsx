import { useState, useEffect } from 'react';

import Navbar from '../components/Navbar';
import AdicionarDespesa from '../components/AdicionarDespesa.jsx';

import '../assets/css/planilha.css';

function Planilha({ logado, setLogado }) {

    const [despesas, setDespesas] = useState([]);
    const [atualizou, setAtualizou] = useState(false);
    const [mensagem, setMensagem] = useState("");

    const [filtros, setFiltros] = useState({
        categoria: '',
        dataInicio: '',
        dataFim: '',
        descricao: '',
        pagamento: ''
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
            body: JSON.stringify(filtros)
        })
        .then((resposta) => {resposta.json()})
        .then((dados) => {
            setDespesas(dados.uniao_despesas);
        });
    }

return (
    <>
        <Navbar logado={logado} setLogado={setLogado}/>

        <main className="pagina-planilha">

            <section className="sessao1">
                <h1>
                    Sua <span>Planilha Pessoal</span> de Despesas
                </h1>
            </section>

            <div className="painel-planilha">

                <section className="sessao2">
                    <div className="sessao2-texto">
                        <h2>Meus Gastos</h2>
                        <p>Controle suas despesas de forma simples.</p>
                    </div>

                    <div className="sessao2-botao">
                        <AdicionarDespesa setMensagem={setMensagem} setAtualizou={setAtualizou} />
                    </div>
                    {mensagem}
                </section>

                <section className="filtros">
                    <form onSubmit={buscarDespesas}>
                
                        <div className="filtro-campo">
                            <label htmlFor="categoria">Categoria:</label>
                            <input
                                type="text"
                                id="categoria"
                                name="categoria"
                                value={filtros.categoria}
                                onChange={alterarFiltro}
                            />
                        </div>
                
                        <div className="filtro-campo">
                            <label htmlFor="data-inicio">Data de início:</label>
                            <input
                                type="date"
                                id="data-inicio"
                                name="dataInicio"
                                value={filtros.dataInicio}
                                onChange={alterarFiltro}
                            />
                        </div>
                
                        <div className="filtro-campo">
                            <label htmlFor="data-fim">Data de fim:</label>
                            <input
                                type="date"
                                id="data-fim"
                                name="dataFim"
                                value={filtros.dataFim}
                                onChange={alterarFiltro}
                            />
                        </div>
                
                        <div className="filtro-campo">
                            <label htmlFor="descricao">Descrição:</label>
                            <input
                                type="text"
                                id="descricao"
                                name="descricao"
                                value={filtros.descricao}
                                onChange={alterarFiltro}
                            />
                        </div>
                
                        <div className="filtro-campo">
                            <label htmlFor="pagamento">Método de pagamento:</label>
                            <select
                                id="pagamento"
                                name="pagamento"
                                value={filtros.pagamento}
                                onChange={alterarFiltro}
                            >
                                <option value="">Escolha um método</option>
                                <option value="debito">Débito</option>
                                <option value="credito">Crédito</option>
                                <option value="pix">Pix</option>
                                <option value="dinheiro">Dinheiro</option>
                                <option value="boleto">Boleto</option>
                                <option value="cheque">Cheque</option>
                                <option value="outros">Outros</option>
                            </select>
                        </div>
                
                        <button type="submit">Buscar</button>
                
                    </form>
                </section>
                <section className="tabela-despesas">
                    <div className="tabela-cabecalho">
                        <h3>Despesas cadastradas</h3>
                    </div>

                    <div className="tabela-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th>Descrição</th>
                                    <th>Categoria</th>
                                    <th>Valor</th>
                                    <th>Método de Pagamento</th>
                                    <th>Data</th>
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
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="tabela-vazia">
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