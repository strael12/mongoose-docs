const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PASS = '88488263';
const USER = 'rafaelsilva2';
const PORT = process.env.PORT || 3000;
const Client = require('./Model/Schema/Client');

app.set('view engine','ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.json());

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

        res.render('home');
    }else {
        res.render('error');
    }
})

app.listen(PORT, () => console.log('The server is running at localhost:3000'));