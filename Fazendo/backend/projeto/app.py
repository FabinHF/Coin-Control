import email
import os

from flask import jsonify, request, flash, session
from utils import criar, upload_de_imagem, apagar_imagem
from flask_cors import CORS

app,dao = criar()

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
    lista_emails = dao.buscar_emails()
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
    resposta = dao.adicionar_usuario(nome, nome_de_usuario, email, telefone, senha, imagem)

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
    
    usuario_banco = dao.buscar_usuario_login(email)

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
        usuario = dao.buscar_imagem_nome(email)

        return jsonify({'imagem': f'http://localhost:5000/static/uploads/usuarios/{usuario.imagem}', 'nome': usuario.nome_de_usuario})
    except:
        print("b")
        return jsonify({'erro': 'Erro ao buscar imagem e nome do usuário.'})

@app.route("/busca_email")
def busca_email():
    try:        
        email = session.get('usuario')
        return jsonify({'email': email})
    except:
        return jsonify({'erro': 'Erro ao buscar email do usuário.'})
