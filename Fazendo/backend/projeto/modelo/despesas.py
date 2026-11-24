from conexao.db_conection import db

class Despesas(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(100),  db.ForeignKey('usuarios.email'), nullable=False)
    descricao = db.Column(db.String(100), nullable=True)
    valor = db.Column(db.Float, nullable=False)
    categoria = db.Column(db.String(100), nullable=False)
    data = db.Column(db.Date, nullable=False)
    metodo_de_pagamento = db.Column(db.String(100), nullable=False)
    pago = db.Column(db.Boolean, nullable=False)