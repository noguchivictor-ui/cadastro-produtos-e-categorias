const express = require('express');
const path = require('path');
const sequelize = require('./dataBase');
require('./models');

const server = express();

server.set('view engine','ejs');
server.set('views', path.join(__dirname , 'views'));
server.use(express.urlencoded({extended: true}));
server.use(express.static(path.join(__dirname, 'public')));

server.get('/', (req,res)=>{
    res.render('index');
});

server.use('/categorias', require('./routes/categorias'));
server.use('/produtos', require('./routes/produtos'));

server.use((req,res)=>{res.status(404).send('pagina nao encontrada')});

sequelize.sync().then(()=>{
    server.listen(3000, ()=>{
        console.log('servidor rodando na porta 3000');
    })
})
.catch(erro => console.error('erro ao tentar rodar o servidor', erro));
