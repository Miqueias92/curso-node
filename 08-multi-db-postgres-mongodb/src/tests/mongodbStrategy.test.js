const assert = require('assert')
const MongoDB = require('../db/strategies/mongodb')
const Context = require('../db/strategies/base/contextStrategy')

const context = new Context(new MongoDB())

describe('MongoDB Suite de testes', function () {
    // this.timeout(Infinity)

    this.beforeAll(async function() {
        await context.connect()
    })
    // that = this; com errow function isso não é mais nescessário
    it('MongoDB connection', async () => {
        // that --> contexto do this do describe
        const result = await context.isConnected()
        const expected = 'Conectado'

        assert.deepEqual(result, expected)
    })
})