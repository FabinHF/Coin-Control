from conexao.db_conection import db
from modelo.usuarios import Usuarios

class UsuarioDAO:
    def adicionar_usuario(self,nome, email, telefone, senha, imagem):

        usuario = Usuarios(nome, email, telefone, senha,imagem)
        db.session.add(usuario)
        db.session.commit()

    def buscar_usuario(self,id):
        return db.session.query(Usuarios).filter_by(id=id).one()

    def remover_usuario(self,usuario):
        db.session.delete(usuario)
        db.session.commit()

    def atualizar_usuario(self,usuario, nome, email, telefone, senha, imagem):
        usuario.nome = nome
        usuario.email = email
        usuario.telefone = telefone
        usuario.senha = senha
        usuario.imagem = imagem
        db.session.commit()

    def buscar_usuario_login(self,email):
        return db.session.query(Usuarios).filter_by(email=email).one()