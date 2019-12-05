const express = require('express');
const app = express();
const handle = require('express-handlebars');
//config
    //Templete Engine
    app.engine('handlebars', handle({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')

    //app.use(express.static(path.join(__dirname, '/public')))
    app.use(express.static('public'))
    
//Rotas
    app.get('/', function(req, res){
        res.render(__dirname + "/views/layouts/home.handlebars")
    })

app.listen(3000, function(){
    console.log('Ex app listing on port 3000!');
});