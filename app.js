const express = require('express');
const app = express();
const handle = require('express-handlebars');
const bodyParser = require('body-parser')
const Post = require('./models/Post')
const fs = require('fs')
//config
    //Templete Engine
    app.engine('handlebars', handle({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')

    //Body Parser
    app.use(bodyParser.urlencoded({extended:false}))
    app.use(bodyParser.json())

    //app.use(express.static(path.join(__dirname, '/public')))
    app.use(express.static('public'))
    
//Rotas
    app.get('/', function(req, res){
        Post.findAll().then(function(posts){
            res.render(__dirname + "/views/layouts/home.handlebars")
        })
    })

    app.get('/cad', function(req, res){
        res.render(__dirname + '/views/layouts/formulario.handlebars')
    })

    app.post('/add', function(req, res){
        Post.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
        }).then(function(){
            res.redirect('/')
        }).catch(function(erro){
            res.send("Post não criado, erro: " + erro)
        })
    })

    app.get('/deletar/:id', function(req, res){
        Post.destroy({where: {'id': req.params.id}}).then(function(){
            res.redirect('/')
        }).catch(function(erro){
            res.send("não existe")
        })
    })
app.listen(3000, function(){
    console.log('Ex app listing on port 3000!');
});