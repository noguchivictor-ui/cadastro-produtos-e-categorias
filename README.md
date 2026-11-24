# cadastro-produtos-categorias
CRUD de produtos e categorias com Node.js, Express, Sequelize, SQLite e EJS, com relacionamento 1:N e validações no servidor.

# Cadastro de Produtos e Categorias

Aplicação web para gerenciar produtos e categorias, desenvolvida como projeto
da disciplina de Desenvolvimento Web [nome da instituição/curso].

## Funcionalidades

- Cadastro, listagem, edição e exclusão de **categorias**
- Cadastro, listagem, edição e exclusão de **produtos**
- Cada produto pertence a uma categoria (relacionamento 1:N)
- Não permite excluir uma categoria que ainda tem produtos
- Validação dos dados no servidor (nome obrigatório, preço numérico e não negativo, categoria existente)
- Mensagens de erro exibidas no próprio formulário

## Tecnologias

- Node.js
- Express 5
- Sequelize (ORM) + SQLite
- EJS (templates com partials de cabeçalho e rodapé)
- HTML e CSS

## Estrutura do projeto

```
├── server.js          # configuração do Express e inicialização
├── dataBase.js        # conexão Sequelize/SQLite
├── models/            # Categoria, Produto e associações
├── routes/            # rotas de categorias e produtos
├── views/             # páginas EJS (e partials)
└── public/            # arquivos estáticos (CSS)
```

## Como rodar

```bash
git clone https://github.com/[seu-usuario]/cadastro-produtos-categorias.git
cd cadastro-produtos-categorias
npm install
node server.js
```

Acesse **http://localhost:3000**. O banco SQLite (`dados.sqlite`) é criado
automaticamente na primeira execução.

> Cadastre primeiro uma categoria e depois os produtos.

## O que eu aprendi

- Organização de uma aplicação em rotas, models e views
- Modelagem e relacionamento entre tabelas com Sequelize
- Fluxo completo de CRUD com formulários HTML (GET/POST e redirects)
- Validação de dados no back-end e tratamento de erros
- Depuração de erros de configuração (view engine, caminhos, async/await)

## Próximos passos

- [ ] Busca e filtro de produtos por categoria
- [ ] Paginação da listagem
- [ ] Autenticação de usuários

## Autor

[Seu nome] · [LinkedIn](https://linkedin.com/in/seu-perfil)
