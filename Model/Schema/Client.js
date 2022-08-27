const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true,
        lowercase: true,
        maxLength: 100
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        maxLength: 100,
        unique: true
    },
    telefone: {
        type: String,
        required: true,
        maxLength: 20
    },
    endereco: String, 
})

module.exports = mongoose.model('Cliente', ClientSchema);


