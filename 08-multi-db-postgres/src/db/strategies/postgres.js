const ICrud = require('./interfaces/InterfaceCrud')
const Sequelize = require('sequelize')

class Postgres extends ICrud {
    constructor() {
        super()
        this._driver = null,
        this._herois = null,
        this._connect()
    }

    isConnected() {
        try {
            this._driver.authenticate()
            return true
        } catch (error) {
            console.log('fail', error)
            return false
        }
    }

    create(item) {
        console.log('o Item foi salvo no Postgres')
    }

    async defineModel() {
        this._herois = driver.define('herois', {
            id: {
                type: Sequelize.INTEGER,
                require: true,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: Sequelize.STRING,
                require: true
            },
            poder: {
                type: Sequelize.STRING,
                require: true
            },
        }, {
            tableName: 'TB_HEROIS',
            freezeTableName: false,
            timestamps: false
        })
        await this._herois.sync()
    }

    _connect() {
        this._driver = new Sequelize(
            'heroes',
            'miqueias',
            '123', {
               host: 'localhost',
               dialect: 'postgres',
               quoteIdentifiers: false,
               opeatorsAliases: false
            }
        )
    }
}

module.exports = Postgres