from flask import Flask
from conexao.db_conection import db
from dao.dao import UsuarioDAO, DespesaDAO, RecebimentoDAO

PASTA_UPLOAD = '../frontend/projeto/src/assets/img/usuarios'

def criar():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+mysqlconnector://root:root@localhost:3306/CoinControl"
    app.secret_key='pra usar flash'

    db.init_app(app)
    with app.app_context():
        db.create_all()

    dao = UsuarioDAO()
    despesa_dao = DespesaDAO()
    recebimento_dao = RecebimentoDAO()


    return app, dao, despesa_dao, recebimento_dao

def upload_de_imagem(imagem):
    import os
    from werkzeug.utils import secure_filename 

    if imagem.filename != '':
        if imagem:
            nome_arquivo = secure_filename(imagem.filename)
            imagem.save(os.path.join(PASTA_UPLOAD, nome_arquivo))

def apagar_imagem(imagem):
    import os

    if imagem != 'default_profile_picture.png':
        os.remove(os.path.join(PASTA_UPLOAD, imagem))