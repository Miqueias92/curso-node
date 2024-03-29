 // npm install sequelize
 // npm install pg-hstore pg

 const Sequelize = require('sequelize')
 const driver = new Sequelize(
     'heroes',
     'miqueias',
     '123', {
        host: 'localhost',
        dialect: 'postgres',
        quoteIdentifiers: false, // não vai ser case sensi
        opeatorsAliases: false
     }
 )

 async function main(params) {
    const Herois = driver.define('herois', {
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
    await Herois.sync()

    await Herois.create({
        nome: 'Lanterna Verde',
        poder: 'Anel'
    })
    
    const result = await Herois.findAll({
        raw: true,
        attributes: ['nome']
    })
    console.log('result', result)
 }

 main()