const { connection } = require('mongoose')
const ICrud = require('./interfaces/InterfaceCrud')
const Mongoose = require('mongoose')

const STATUS = {
    0: 'Disconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Disconectando' 
}

class MongoDB extends ICrud {
    constructor() {
        super()
        this._herois = null
        this._driver = null
    }

    async isConnected() {
        const state = STATUS[this._driver.readyState]
        if (state === 'Conectado') return state 
        
        if (state !== 'Conectando') return state
        
        if (state === 'Conectando')
        await new Promise(resolve => setTimeout(resolve, 1000))

        return STATUS[this._driver.readyState]
    }

    connect() {
        Mongoose.connect('mongodb://miqueias:minhasenha@localhost:27017/heroes', { 
            useNewUrlParser: true
        }, function(error) {
            if (!error) return;
            console.log('Falha na conexão', error)
        })

        const connection = Mongoose.connection    

        connection.once('open', () => console.log('Database Rodando!!'))

        this._driver = connection
    }

    defineModel() {
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
        
        this._herois = Mongoose.model('herois', heroisSchema)
    }

    async create(item) {
        const resultCadastrar = await model.create({
            nome: 'Batman',
            poder: 'Dinheiro'
        })
        console.log('result cadastrar', resultCadastrar)
    }
}

module.exports = MongoDB