from flask import jsonify, request, flash, session
from utils import criar, upload_de_imagem, apagar_imagem
from flask_cors import CORS

app,dao = criar()

CORS(app, origins=["http://localhost:5173"])


@app.route('/verifica_logado')
def verifica_logado():
    session['logado'] = True
    logado = ('logado' in session and session['logado'] == True)
    return jsonify({'logado':logado})

@app.route('/')
def home():
    return jsonify({'message': 'API is running'})

@app.route("/entrar", methods=['post'])
def entrar():
    usuario_entrada = request.json.get('usuario')
    #usuario = dao.buscar_usuario_login( usuario_entrada['email'])
    #print(usuario)

    return jsonify({'resposta':"a"})