from flask import jsonify, request, flash, session
from utils import criar, upload_de_imagem, apagar_imagem
from flask_cors import CORS

app,dao = criar()

CORS(app, origins=["http://localhost:5173"])


@app.route('/verifica_logado')
def verifica_logado():
    session['logado'] = False
    logado = ('logado' in session and session['logado'] == True)
    return jsonify({'logado':logado})

@app.route('/')
def home():
    return jsonify({'message': 'API is running'})


@app.route('/cadastrar', methods=['POST'])
def cadastrar():
    usuario = request.json.get('novo_usuario')
    lista_emails = dao.buscar_emails()
    email = usuario['email']
    print(lista_emails, email)

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
        return jsonify({'menssagem': 'Usuário cadastrado com sucesso!', 'redirect': '/entrar'})
    else:
        return jsonify({'erro': 'Email já cadastrado. Por favor, use outro email.'})       