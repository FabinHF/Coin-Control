from conexao.db_conection import db
from modelo.usuarios import Usuarios
from modelo.despesas import Despesas
from modelo.recebimentos import Recebimentos
from sqlalchemy.exc import IntegrityError

#====================================================================================================================================================================================

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

    def buscar_usuario(self,email):
        return db.session.query(Usuarios).filter_by(email=email).one()

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
        return db.session.query(Usuarios.email, Usuarios.senha).filter_by(email=email).one_or_none()

    def buscar_emails(self):
        emails = db.session.query(Usuarios.email).all()
        lista_emails = [email[0] for email in emails]
        return lista_emails

    def buscar_imagem_nome(self,email):
        return db.session.query(Usuarios.imagem, Usuarios.nome_de_usuario).filter_by(email=email).one_or_none()

#====================================================================================================================================================================================

class DespesaDAO:

    def buscar__todas_despesas(self, email):
        return db.session.query(Despesas).filter_by(email=email).all()

    def buscar_despesas_por_filtro(self, email, lista_filtros):

        despesas = db.session.query(Despesas).filter_by(email=email).all()

        despesas_filtradas = []

        for despesa in despesas:

            corresponde = True

            for chave, valor in lista_filtros.items():

                if(chave == 'dataInicio'):
                    if(despesa.data < valor):
                        corresponde = False
                        break
                    else:
                        pass
                if(chave == 'dataFim'):
                    if(despesa.data > valor):
                        corresponde = False
                        break
                    else:
                        pass
                if(chave == "descricao"):
                    if( valor not in despesa.descricao ):
                        corresponde = False
                        break
                    else:
                        pass
                if(chave == "valor_min"):
                    if(despesa.valor< valor):
                        corresponde = False
                        break
                    else:
                        pass
                if(chave == "valor_max"):
                    if(despesa.valor > valor):
                        corresponde = False
                        break
                    else:
                        pass
                if getattr(despesa, chave) != valor:
                    corresponde = False
                    break

            if corresponde:
                despesas_filtradas.append(despesa)

        return despesas_filtradas


    def adicionar_despesa(self ,email, descricao, valor, categoria, data, metodo_de_pagamento, pago):
        try:
            despesa = Despesas( email=email, 
                                descricao = descricao, 
                                valor = valor, 
                                categoria = categoria, 
                                data = data, 
                                metodo_de_pagamento = metodo_de_pagamento,
                                pago = pago )
            db.session.add(despesa)
            db.session.commit()
            return True
        except Exception as erro:
            db.session.rollback()
            print("ERRO AO ADICIONAR DESPESA:", repr(erro))
            return False
        
    def buscar_dados_despesa(self, id):
        try:
            item = db.session.query(Despesas).filter_by(id=id).one_or_none()
            return item
        except:
            db.session.rollback()
            return False
    def editar_despesa(self, despesa, nova_despesa):
        try:
            despesa.descricao = nova_despesa["descricao"]
            despesa.valor = nova_despesa["valor"]
            despesa.categoria = nova_despesa["categoria"]
            despesa.data = nova_despesa["data"]
            despesa.metodo_de_pagamento = nova_despesa["metodo_de_pagamento"]
            despesa.pago = nova_despesa["pago"]

            db.session.commit()
            return True
        except:
            db.session.rollback()
            return False

    def apagar_despesa(self, id):
        try:
            despesa = db.session.query(Despesas).filter_by(id=id).one_or_none()
            db.session.delete(despesa)
            db.session.commit()
            return True
        except:
            db.session.rollback()
            return False


#====================================================================================================================================================================================

class RecebimentoDAO:

    def buscar_todos_recebimentos(self, email):
        return db.session.query(Recebimentos).filter_by(email=email).all()

    def buscar_recebimentos_por_filtro(self, email, lista_filtros):
    
        recebimentos = db.session.query(Recebimentos).filter_by(email=email).all()

        recebimentos_filtradas = []

        for recebimento in recebimentos:

            corresponde = True

            for chave, valor in lista_filtros.items():

                if(chave == 'dataInicio'):
                    if(recebimento.data < valor):
                        corresponde = False
                        break
                    else:
                        pass
                if(chave == 'dataFim'):
                    if(recebimento.data > valor):
                        corresponde = False
                        break
                    else:
                        pass
                if(chave == "descricao"):
                    if( valor not in recebimento.descricao ):
                        corresponde = False
                        break
                    else:
                        pass
                if(chave == "valor_min"):
                    if(recebimento.valor< valor):
                        corresponde = False
                    else:
                        pass
                if(chave == "valor_max"):
                    if(recebimento.valor > valor):
                        corresponde = False
                    else:
                        pass

                if getattr(recebimento, chave) != valor:
                    corresponde = False
                    break

            if corresponde:
                recebimentos_filtradas.append(recebimento)

        return recebimentos_filtradas

    def adicionar_recebimento(self ,email, descricao, valor, categoria, data, metodo_de_pagamento, pago):
        try:
            recebimento = Recebimentos( email=email, 
                                        descricao = descricao, 
                                        valor = valor, 
                                        categoria = categoria, 
                                        data = data, 
                                        metodo_de_pagamento = metodo_de_pagamento,
                                        pago = pago )
            db.session.add(recebimento)
            db.session.commit()
            return True
        except IntegrityError:
            db.session.rollback()
            return False
    
    def buscar_dados_recebimento(self, id):
        try:
            item = db.session.query(Recebimentos).filter_by(id=id).one_or_none()
            return item
        except:
            db.session.rollback()
            return False
    def editar_recebimento(self, recebimento, nova_recebimento):
        try:
            recebimento.descricao = nova_recebimento["descricao"]
            recebimento.valor = nova_recebimento["valor"]
            recebimento.categoria = nova_recebimento["categoria"]
            recebimento.data = nova_recebimento["data"]
            recebimento.metodo_de_pagamento = nova_recebimento["metodo_de_pagamento"]
            recebimento.pago = nova_recebimento["pago"]

            db.session.commit()
            return True
        except:
            db.session.rollback()
            return False

    def apagar_recebimento(self, id):
            try:
                recebimento = db.session.query(Recebimentos).filter_by(id=id).one_or_none()
                db.session.delete(recebimento)
                db.session.commit()
                return True
            except IntegrityError:
                db.session.rollback()
                return False