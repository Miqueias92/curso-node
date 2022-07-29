const ICrud = require('./interfaces/InterfaceCrud')
const Sequelize = require('sequelize')
const { where } = require('sequelize')

class Postgres extends ICrud {
    constructor() {
        super()
        this._driver = null,
        this._herois = null
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

    async create(item) {
        const { dataValues } = await this._herois.create(item)
        return dataValues
    }

    async read(item = {}) {
        return await this._herois.findAll({where: item, raw: true})
    }

    async update(id, item) {
        return this._herois.update(item, { where: {id: id} })   
    }

    async delete(id) {
        const query = id ? { id } : {}
        return this._herois.destroy({ where: query })
    }

    async defineModel() {
        this._herois = this._driver.define('herois', {
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

    async connect() {
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
        await this.defineModel()
    }
}

module.exports = Postgres