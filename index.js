const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PASS = '88488263';
const USER = 'rafaelsilva2';
const path = require("path");
const PORT = process.env.PORT || 3000;
const Client = require('./Model/Schema/Client');

app.set('view engine','ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));

mongoose.connect(`mongodb+srv://${USER}:${PASS}@treinamento.usistsp.mongodb.net/?retryWrites=true&w=majority`, () => {
    console.log('Connected');
});


// Renderiza a página home
app.get('/create', async (req,res,next) => {
    res.render('home');
})

// Salva no banco
app.post('/create', async (req,res,next) => {

    const nome = req.body.nome;// retorna o valor que é passado pelo o usuário
    const email = req.body.email;
    const telefone = req.body.telefone;
    const endereco = req.body.endereco;

    if(nome !== '' &&
       email !== '' &&
       telefone !== '' &&
       endereco !== ''){
        await Client.create({
            nome: nome,
            email: email,
            telefone: telefone,
            endereco: endereco
        })

        res.redirect('/read');
    }else {
        res.render('error');
    }
})

// Ler e lista todos os clientes
app.get('/read', async (req,res,next) => {
    const all = await Client.find();// Retorna todos os clientes
    res.render('list', {clients: all});
})



// Recupera os valores nos campos do input 
app.get('/update/:id', async (req,res,next) => {
    const client = await Client.findOne({_id: req.params.id});
    res.render('edit', {clients: client});
})

// Atualiza no banco de dados assim que é feito o post
app.post('/update', async (req,res,next) => {
    const clientId = req.body.id;

    if(clientId){
        // Primeiro parametro filtra
        // Segundo parametro pegar os valores recuperados e atualiza no banco de dados
        await Client.updateOne({_id: req.body.id},{
            nome: req.body.nome,
            email: req.body.email,
            telefone: req.body.telefone,
            endereco: req.body.endereco})
        res.redirect('/read');
    }else {
        // Se não existir o ID é gerado um erro
        res.status(404).render('error');
    }
})


// O link está na página de listagem, assim que o usuário clica em deletar 
// usuário, ele recebe o parametro e compara como deleteOne, se for igual 
// e feita a remoção e após isso, voltar para a mesma página.
app.get('/delete/:id', async (req,res,next) => {
    const id = req.params.id;   
    if(id){
        await Client.deleteOne({_id: id});
        res.redirect('/read');
    }
})


app.listen(PORT, () => console.log('The server is running at localhost:3000'));