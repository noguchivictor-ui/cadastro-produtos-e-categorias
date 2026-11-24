const express = require('express');
const {Categoria,Produto} = require('../models');
const router = express.Router();

router.get('/',async (req,res)=>{
    try {
        const categorias = await Categoria.findAll({order:[['id','ASC']]});
        res.render('categorias/lista', {categorias, erro: req.query.erro});
    } catch (erro) {
        res.status(500).send('erro ao listar categorias');
    }
});

router.get('/nova', (req,res)=>{
    res.render('categorias/formulario',{categoria:null, erro:null});
});

router.post('/salvar',async (req,res)=>{
    const nome = (req.body.nome || '').trim();
    if(!nome){return res.status(400).render('categorias/formulario',{categoria: {nome},erro:'digite o nome da categoria'})};
    try {
        await Categoria.create({nome});
        res.redirect('/categorias');
    } catch (error) {
        res.status(500).send('erro ao salvar categoria');
    }
});

router.get('/editar/:id', async(req,res)=>{
    const categoria = await Categoria.findByPk(req.params.id);
    if(!categoria){ return res.status(404).send('categoria nao encontrada')}
    res.render('categorias/formulario',{categoria, erro:null});
});

router.post('/editar/:id', async(req,res)=>{
    const id = req.params.id;
    const categoria = await Categoria.findByPk(id);
    if(!categoria){ return res.status(404).send('categoria nao encontrada')}
    const nome = (req.body.nome || '').trim();
    if(!nome){return res.status(400).render('categorias/formulario',{categoria: {id: categoria.id, nome},erro:'digite o nome da categoria'})};
    try {
        await categoria.update({nome});
        res.redirect('/categorias');
    } catch (error) {
        res.status(500).send('erro ao editar categoria');
    }
});

router.post('/excluir/:id',async(req,res)=>{
    try {
        const quantidade = await Produto.count({where: {categoriasId: req.params.id}});
        if(quantidade > 0){ return res.redirect('/categorias?erro=produtos')}

        await Categoria.destroy({where: {id: req.params.id}});
        res.redirect('/categorias');
    } catch (error) {
        res.status(500).send('erro ao excluir categoria');
    }
});

module.exports = router
