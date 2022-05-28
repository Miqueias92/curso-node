const Commander = require('commander')
const Database = require('./database')
const Heroi = require('./heroi')

async function main() {

    Commander
        .version('v1')
        .option('-n, --nome [value]', 'Nome do Heroi')
        .option('-p, --poder [value]', "Poder do Heroi")

        .option('-c, --cadastrar', "Cadastrar um heroi")
        .option('-l, --listar', "Listar um heroi")
        .parse(process.argv)

    const heroi = new Heroi(Commander._optionValues)
    try {
        
        if(Commander._optionValues.cadastrar){
            const resultado = await Database.cadastrar(heroi)
            if (!resultado) {
                console.error('Heroi não foi cadastrado')
                return
            }
            console.log('Heroi cadastrado com sucesso')
        }

        if(Commander._optionValues.listar){
            const resultado = await Database.listar()
            console.log(resultado)
            return
        }
        
    } catch (error) {
        console.error('DEU RUIM', error)
    }    
}

main()