const ICrud = require('./interfaces/InterfaceCrud')

class MongoDB extends ICrud {
    constructor() {
        super()
    }

    create(item) {
        console.log('o Item foi salvo no MongoDb')
    }
}

module.exports = MongoDB