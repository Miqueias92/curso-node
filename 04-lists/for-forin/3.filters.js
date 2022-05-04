const {obterPessoas} = require('./service')

/**
 * 
 * const item = {
 *    nome: 'nomeTeste',
 *    idade: 15
 * 
 * }
 *
 * const {nome, idade} = item
 * console.lo(nome, idade) 
 * 
 */

async function main(){
    try {

        const { 
            results 
        } = await obterPessoas(` a`)

        const familiaLars = results.filter(function(item) {
            // por padrão precisa retornar um boolean
            // para informar se deve manter ou remover da lista
            // false > remove da lista
            // true mantem
            // não encontrou -1
            // encontrou = posicaoArray
            const result = item.name.toLowerCase().indexOf('lars') !== -1
            return result
        })

        
        const names = familiaLars.map((pessoa) => pessoa.name)
        console.log(names)
    } catch (error) {
        console.error('DEU RUIM', error)
    }
}

main()