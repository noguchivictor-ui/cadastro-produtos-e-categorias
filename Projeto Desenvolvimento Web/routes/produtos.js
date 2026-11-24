const express = require('express');
const {Produto,Categoria} = require('../models');
const router = express.Router();

router.get('/', async (req,res)=>{
    try {
        const produtos = await Produto.findAll({
            include: {model: Categoria, as: 'categoria'},
            order:[['id','ASC']]
        });
        res.render('produtos/lista', {produtos});
    } catch (erro) {
        res.status(500).send('erro ao listar produtos');
    }
});

router.get('/novo', async (req,res)=>{
    const categorias = await Categoria.findAll({order:[['nome','ASC']]});
    res.render('produtos/formulario',{produto:null, categorias, erro:null});
});

// reaproveita a tela do formulario para mostrar os erros de validacao
async function mostrarFormulario(res, produto, mensagem){
    const categorias = await Categoria.findAll({order:[['nome','ASC']]});
    return res.status(400).render('produtos/formulario',{produto, categorias, erro: mensagem});
}

function lerDados(body){
    return {
        nome: (body.nome || '').trim(),
        precoTexto: String(body.preco || '').trim(),
        categoriasId: body.categoriasId
    };
}

function dadosValidos(dados){
    const preco = Number(dados.precoTexto);
    return dados.nome && dados.precoTexto !== '' && Number.isFinite(preco) &&
        preco >= 0 && /^\d+$/.test(String(dados.categoriasId || ''));
}

router.post('/salvar', async (req,res)=>{
    const dados = lerDados(req.body);
    if(!dadosValidos(dados)){
        return mostrarFormulario(res, dados, 'preencha nome, preco valido e categoria');
    }
    try {
        const categoria = await Categoria.findByPk(dados.categoriasId);
        if(!categoria){ return mostrarFormulario(res, dados, 'selecione uma categoria existente')}
        await Produto.create({nome: dados.nome, preco: Number(dados.precoTexto), categoriasId: categoria.id});
        res.redirect('/produtos');
    } catch (error) {
        res.status(500).send('erro ao salvar produto');
    }
});

router.get('/editar/:id', async (req,res)=>{
    const produto = await Produto.findByPk(req.params.id);
    if(!produto){ return res.status(404).send('produto nao encontrado')}
    const categorias = await Categoria.findAll({order:[['nome','ASC']]});
    res.render('produtos/formulario',{produto, categorias, erro:null});
});

router.post('/editar/:id', async (req,res)=>{
    const produto = await Produto.findByPk(req.params.id);
    if(!produto){ return res.status(404).send('produto nao encontrado')}
    const dados = lerDados(req.body);
    const formulario = {id: produto.id, ...dados};
    if(!dadosValidos(dados)){
        return mostrarFormulario(res, formulario, 'preencha nome, preco valido e categoria');
    }
    try {
        const categoria = await Categoria.findByPk(dados.categoriasId);
        if(!categoria){ return mostrarFormulario(res, formulario, 'selecione uma categoria existente')}
        await produto.update({nome: dados.nome, preco: Number(dados.precoTexto), categoriasId: categoria.id});
        res.redirect('/produtos');
    } catch (error) {
        res.status(500).send('erro ao editar produto');
    }
});

router.post('/excluir/:id', async (req,res)=>{
    try {
        await Produto.destroy({where: {id: req.params.id}});
        res.redirect('/produtos');
    } catch (error) {
        res.status(500).send('erro ao excluir produto');
    }
});

module.exports = router
