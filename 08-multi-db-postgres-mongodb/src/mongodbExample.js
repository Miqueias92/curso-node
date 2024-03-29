// npm install mongoose

const Mongoose = require('mongoose')

Mongoose.connect('mongodb://miqueias:minhasenha@localhost:27017/heroes', 
    { useNewUrlParser: true }, function(error) {
        if (!error) return;
        console.log('Falha na conexão', error)
    })

const connection = Mongoose.connection    

connection.once('open', () => console.log('Database Rodando!!'))

setTimeout(() => {
   const state = connection.readyState
   console.log("state", state)     
}, 1000);

/**
 *  0 - Disconectado
 *  1 - Conectado
 *  2 - Conectando
 *  3 - Disconectando 
 */

const heroisSchema = new Mongoose.Schema({
    nome: {
        type: String,
        required: false
    },
    poder: {
        type: String,
        required: true 
    },
    insertedAt: {
        type: Date,
        default: new Date()
    }
})

const model = Mongoose.model('herois', heroisSchema)

async function main() {

    const resultCadastrar = await model.create({
        nome: 'Batman',
        poder: 'Dinheiro'
    })
    console.log('result cadastrar', resultCadastrar)

    const itens = await model.find()
    console.log(itens)
}

main()