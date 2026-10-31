from conexao.db_conection import db
from modelo.usuarios import Usuarios
from sqlalchemy.exc import IntegrityError

class UsuarioDAO:

    def adicionar_usuario(self ,nome, nome_de_usuario, email, telefone, senha, imagem):
        try:
            usuario = Usuarios(nome=nome, nome_de_usuario=nome_de_usuario, email=email, telefone=telefone, senha=senha, imagem=imagem)
            db.session.add(usuario)
            db.session.commit()
            return True
        except IntegrityError:
            db.session.rollback()
            return False

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

    def buscar_emails(self):
        emails = db.session.query(Usuarios.email).all()
        lista_emails = [email[0] for email in emails]
        return lista_emails