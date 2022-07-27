const assert = require('assert')
const Postgres = require('../db/strategies/postgres')
const Context = require('../db/strategies/base/contextStrategy')

const context = new Context(new Postgres())

const MOCK_HEROI_CADASTRAR = {
    nome: 'Gavião Negro',
    poder: 'flexas'
}

const MOCK_HEROI_ATUALIZAR = {
    nome: 'Batman',
    poder: 'Dinheiro'
}

describe ('Postgres Strategy', function () {
    this.timeout(Infinity)

    this.beforeAll(async function() {
        await context.connect()
        await context.create(MOCK_HEROI_ATUALIZAR)
    })

    it('PostgresSQL Connection', async function () {
        const result = await context.isConnected()
        assert.equal(result, true)
    })

    it('cadastrar', async function(){
        const result = await context.create(MOCK_HEROI_CADASTRAR)
        delete result.id // remove o id, do objeto retornado do banco
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })

    it('listar', async function() {
        const [result] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome})
        // pegar a primeira posição
        // const posicaoZero = result[0]
        // const [posicao1, posicao2] = ['esse é o 1', 'esse é o 2']
        delete result.id
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)   
    })

    it('atualizar', async function() {
        const [itemAtualizar] = await context.read({ nome: MOCK_HEROI_ATUALIZAR.nome})
        
        // copia as chaves do objeto e substitui o nome
        const novoItem = {
            ...MOCK_HEROI_ATUALIZAR,
            nome: 'Mulher Maravilha'
        }
        
        const [result] = await context.update(itemAtualizar.id, novoItem)
        const [itemAtualizado] = await context.read({ id: itemAtualizar.id })
        assert.deepEqual(result, 1)
        assert.deepEqual(itemAtualizado.nome, novoItem.nome)
    })
})