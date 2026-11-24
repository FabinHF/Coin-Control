from flask import jsonify, request, flash, session
from utils import criar, upload_de_imagem, apagar_imagem
from flask_cors import CORS

app,usuario_dao, despesa_dao, recebimento_dao = criar()

CORS(app, origins=["http://localhost:5173"], supports_credentials=True)


@app.route('/verifica_logado')
def verifica_logado():
    logado = session.get('logado', False)
    return jsonify({'logado':logado})

@app.route('/')
def home():
    return jsonify({'message': 'API is running'})


@app.route('/cadastrar', methods=['POST'])
def cadastrar():
    usuario = request.json.get('novo_usuario')
    lista_emails = usuario_dao.buscar_emails()
    email = usuario['email']

    for i in lista_emails:
        if email != i:
            pass
        else:
            return jsonify({'erro': 'Email já cadastrado. Por favor, use outro email.'})

    nome = usuario['nome']
    nome_de_usuario = usuario['nome']
    telefone = usuario['telefone']
    senha = usuario['senha']
    imagem = "default_profile_picture.png"
    resposta = usuario_dao.adicionar_usuario(nome, nome_de_usuario, email, telefone, senha, imagem)

    if(resposta):
        flash('Usuário cadastrado com sucesso!')
        return jsonify({'mensagem': 'Usuário cadastrado com sucesso!', 'sucesso': True, "type": "success", 'redirect': '/entrar'})
    else:
        return jsonify({'erro': 'Email já cadastrado. Por favor, use outro email.'})

@app.route("/entrar", methods=['POST'])
def entrar():

    usuario = request.json.get('usuario')

    email = usuario['email']
    senha = usuario['senha']
    
    usuario_banco = usuario_dao.buscar_usuario_login(email)

    if(usuario_banco is None):
        return jsonify({'erro': 'Email ou senha incorretos.'})
    
    if(usuario_banco.senha == senha and usuario_banco.email == email):
        session['logado'] = True
        session['usuario'] = usuario_banco.email
        flash('Login realizado com sucesso!')
        return jsonify({'mensagem': 'Login realizado com sucesso!', 'sucesso': True, "type": "success", 'redirect': '/'})

    return jsonify({'erro': 'Email ou senha incorretos.'})
    


@app.route("/sair")
def sair():
    try:
        session.clear()
        flash('Logout realizado com sucesso!')
        return jsonify({'mensagem': 'Logout realizado com sucesso!', 'sucesso': True, "type": "success", 'redirect': '/'})
    except:
        return jsonify({'erro': 'Erro ao realizar logout.'})

@app.route("/busca_imagem_nome", methods=['POST'])
def busca_imagem_nome():
    try:
        email = request.json.get('email')
        usuario = usuario_dao.buscar_imagem_nome(email)

        return jsonify({'imagem': f'http://localhost:5000/static/uploads/usuarios/{usuario.imagem}', 'nome': usuario.nome_de_usuario})
    except:
        return jsonify({'erro': 'Erro ao buscar imagem e nome do usuário.'})

@app.route("/busca_email")
def busca_email():
    try:        
        email = session.get('usuario')
        return jsonify({'email': email})
    except:
        return jsonify({'erro': 'Erro ao buscar email do usuário.'})

@app.route("/planilha")
def planilha():
    email = session.get('usuario')
    despesas = despesa_dao.buscar__todas_despesas(email)
    recebimentos = recebimento_dao.buscar_todos_recebimentos(email)

    categorias_despesas = {"mandatorio":"Mandatório","objetivos_curtos":"Objetivos Curtos","objetivos_medios":"Objetivos Médios","objetivos_longos":"Objetivos Longos","evolucao":"Evolução","lazer":"Lazer","reserva_emergencia":"Reserva de Emergência"}
    categorias_recebimentos = {"salario":"Salário","renda_extra":"Renda Extra","lucros_dividendos":"Lucros e Dividendos"}

    metodos_despesas = {"pix":"PIX","dinheiro":"Dinheiro","debito":"Débito","credito":"Crédito","transferencia":"Transferência","outros":"Outros"}
    metodos_recebimentos = {"pix":"PIX","dinheiro":"Dinheiro","transferencia":"Transferência","deposito":"Depósito","outros":"Outros"}

    lista_despesas = []
    lista_recebimentos = []

    for despesa in despesas:
        lista_despesas.append({
            'id': despesa.id,
            'tipo': 'despesa',
            'descricao': despesa.descricao,
            'categoria': categorias_despesas[despesa.categoria],
            'valor': despesa.valor,
            'data': despesa.data,
            'metodo_de_pagamento': metodos_despesas[despesa.metodo_de_pagamento],
            'pago': despesa.pago
        })

    for recebimento in recebimentos:
        lista_recebimentos.append({
            'id': recebimento.id,
            'tipo': 'recebimento',
            'descricao': recebimento.descricao,
            'categoria': categorias_recebimentos[recebimento.categoria],
            'valor': recebimento.valor,
            'data': recebimento.data,
            'metodo_de_pagamento': metodos_recebimentos[recebimento.metodo_de_pagamento],
            'pago': recebimento.pago
        })

    uniao_despesas = lista_despesas + lista_recebimentos
    uniao_despesas.sort(key=lambda x: x['data'], reverse=True)

    for i,v in enumerate(uniao_despesas):
        v['data'] = v['data'].strftime("%d/%m/%Y")
        v['id_lista'] = i

    return jsonify({'uniao_despesas': uniao_despesas})

@app.route("/buscar_por_filtro", methods=['POST'])
def buscar_por_filtro():
    email = session.get('usuario')
    filtros = request.json.get('filtros')
    lista_filtros = {}

    for i in filtros:
        if filtros[i] == '':
            pass
        else:
            lista_filtros[i] = filtros[i]


    despesas = despesa_dao.buscar_despesas_por_filtro(email, lista_filtros)
    recebimentos = recebimento_dao.buscar_recebimentos_por_filtro(email, lista_filtros)

    lista_despesas = []
    lista_recebimentos = []

    for despesa in despesas:
        lista_despesas.append({
            'id': despesa.id,
            'tipo': 'despesa',
            'descricao': despesa.descricao,
            'categoria': despesa.categoria,
            'valor': despesa.valor,
            'data': despesa.data.strftime('%d/%m/%Y'),
            'pagamento': despesa.pagamento,
            'pago': despesa.pago
        })

    for recebimento in recebimentos:
        lista_recebimentos.append({
            'id': recebimento.id,
            'tipo': 'recebimento',
            'descricao': recebimento.descricao,
            'categoria': recebimento.categoria,
            'valor': recebimento.valor,
            'data': recebimento.data.strftime('%d/%m/%Y'),
            'pagamento': recebimento.pagamento,
            'pago': recebimento.pago
        })

    uniao_despesas = lista_despesas + lista_recebimentos
    uniao_despesas.sort(key=lambda x: x['data'], reverse=True)
    

    return jsonify({'uniao_despesas': uniao_despesas})


@app.route("/adicionar_despesa", methods=['POST'])
def adicionar_despesa():
    despesa = request.json.get("despesa")

    email = session.get("usuario")
    descricao = despesa.get("descricao")
    valor = float(despesa.get("valor"))
    categoria = despesa.get("categoria")
    data = despesa.get("data")
    metodo = despesa.get("metodo")

    if(despesa.get("pago") == "sim"):
        pago = True
    else:
        pago = False

    resultado = despesa_dao.adicionar_despesa(email, descricao, valor, categoria, data, metodo, pago)

    if(resultado):
        return jsonify({"mensagem": "Adicionado com sucesso!"})
    else:
        return jsonify({"erro": "Erro ao adicionar"})

@app.route("/adicionar_recebimento", methods=["POST"])
def adicionar_recebimento():
    recebimento = request.json.get("recebimento")

    email = session.get("usuario")
    descricao = recebimento.get("descricao")
    valor = float(recebimento.get("valor"))
    categoria = recebimento.get("categoria")
    data = recebimento.get("data")
    metodo = recebimento.get("metodo")

    if(recebimento.get("pago") == "sim"):
        pago = True
    else:
        pago = False

    resultado = recebimento_dao.adicionar_recebimento(email, descricao, valor, categoria, data, metodo, pago)

    if(resultado):
        return jsonify({"mensagem": "Adicionado com sucesso!"})
    else:
        return jsonify({"erro": "Erro ao adicionar"})

@app.route("/busca_dados_despesa/<int:id>")
def busca_dados_despesa(id):
    item = despesa_dao.buscar_dados_despesa(id)
    if(item == False):
        return jsonify({"erro":"Erro ao buscar as informações"})
    else:
        return jsonify({"descricao":item.descricao,"valor":item.valor,"categoria":item.categoria,"data":item.data.strftime("%Y-%m-%d"),"metodo_de_pagamento":item.metodo_de_pagamento,"pago":item.pago })

@app.route("/busca_dados_recebimento/<int:id>")
def busca_dados_recebimento(id):
    item = recebimento_dao.buscar_dados_recebimento(id)
    if(item == False):
        return jsonify({"erro":"Erro ao buscar as informações"})
    else:
        return jsonify({"descricao":item.descricao,"valor":item.valor,"categoria":item.categoria,"data":item.data.strftime("%Y-%m-%d"),"metodo_de_pagamento":item.metodo_de_pagamento,"pago":item.pago })

@app.route("/editar_despesa/<int:id>", methods=["PUT"])
def editar_despesa(id):
    nova_despesa = request.json.get("item")
    despesa = despesa_dao.buscar_dados_despesa(id)

    if(despesa == False):
        return jsonify({"erro":"Erro ao buscar as informações"})
    else:
        resposta_editar = despesa_dao.editar_despesa(despesa, nova_despesa)
        if(resposta_editar == True):
            return jsonify({"mensagem":"Transação editada com sucesso!"})
        else:
            return jsonify({"erro":"Erro ao editar"})

@app.route("/editar_recebimento/<int:id>", methods=["PUT"])
def editar_recebimento(id):
    nova_recebimento = request.json.get("item")
    recebimento = recebimento_dao.buscar_dados_recebimento(id)

    if(recebimento == False):
        return jsonify({"erro":"Erro ao buscar as informações"})
    else:
        resposta_editar = recebimento_dao.editar_recebimento(recebimento, nova_recebimento)
        if(resposta_editar == True):
            return jsonify({"mensagem":"Transação editada com sucesso!"})
        else:
            return jsonify({"erro":"Erro ao editar"})

@app.route("/apagar_despesa/<int:id>", methods=["DELETE"])
def apagar_despesa(id):
    resposta = despesa_dao.apagar_despesa(id)
    print(resposta)

    if(resposta == True):
        return jsonify({"mensagem":"Transação apagada com sucesso!"})
    else:
        return jsonify({"erro":"Erro ao apagar!"})

@app.route("/apagar_recebimento/<int:id>", methods=["DELETE"])
def apagar_recebimento(id):
    resposta = recebimento_dao.apagar_recebimento(id)

    if(resposta == True):
        return jsonify({"mensagem":"Transação apagada com sucesso!"})
    else:
        return jsonify({"erro":"Erro ao apagar!"})