from conexao.db_conection import db

class Usuarios(db.Model):
    nome = db.Column(db.String(100), nullable=False)
    nome_de_usuario = db.Column(db.String(50), nullable=True, unique=True)
    email = db.Column(db.String(100), primary_key=True, nullable=False, unique=True)
    telefone = db.Column(db.String(20), nullable=False)
    senha = db.Column(db.String(100), nullable=False)
    imagem = db.Column(db.String(200), nullable=True)
