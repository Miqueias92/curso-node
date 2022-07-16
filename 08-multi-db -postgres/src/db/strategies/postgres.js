const ICrud = require('./interfaces/InterfaceCrud')

class Postgres extends ICrud {
    constructor() {
        super()
    }

    create(item) {
        console.log('o Item foi salvo no Postgres')
    }
}

module.exports = Postgres