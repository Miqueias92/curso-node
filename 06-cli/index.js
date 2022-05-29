const Commander = require('commander')
const { listar } = require('./database')
const Database = require('./database')
const Heroi = require('./heroi')

async function main() {

    Commander
        .version('v1')
        .option('-n, --nome [value]', 'Nome do Heroi')
        .option('-p, --poder [value]', "Poder do Heroi")
        .option('-i, --id [value]', "Id do heroi")

        .option('-c, --cadastrar', "Cadastrar um heroi")
        .option('-l, --listar', "Listar um heroi")
        .option('-r, --remover', "Remover um heroi")
        .option('-a, --atualizar [value]', "Atualizar um heroi por id")
        .parse(process.argv)

    const heroi = new Heroi(Commander._optionValues)
    try {
        
        if(Commander._optionValues.cadastrar){
            delete heroi.id
            
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

        if (Commander._optionValues.remover) {
            const resultado = await Database.remover(heroi.id)
            if (!resultado) {
                console.error('Não foi possível remover o Heroi')
                return;
            } 
            console.log('Heroi removido com sucesso')
        }

        if (Commander._optionValues.atualizar) {
            const idParaAtualizar = parseInt(Commander._optionValues.atualizar)
            //delete heroi.id
            // remover todas as chaves que estiverem com undefined | null
            const dado = JSON.stringify(heroi)
            const heroiAtualizar = JSON.parse(dado)
            const resultado = await Database.atualizar(idParaAtualizar, heroiAtualizar)
            if (!resultado) {
                console.error('Não foi possível atualizar o heroi')
                return;
            }
            console.log('Heroi atualizado com sucesso!')
        }
        
    } catch (error) {
        console.error('DEU RUIM', error) 
    }    
}

main()