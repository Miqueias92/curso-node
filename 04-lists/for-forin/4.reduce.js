const {obterPessoas} = require('./service')

Array.prototype.myReduce = function(callback, valorInicial) {
    let valorFinal = typeof valorInicial != undefined ? valorInicial : this[0]
    for(let index =0; index <= this.length-1; index++) {
        valorFinal = callback(valorFinal, this[index], this)
    }
    return valorFinal
} 

async function main() {
    try {
        
        const { results } = await obterPessoas(`a`)

        const pesos = results.map(item => parseInt(item.height))
        console.log('pesos', pesos)

        // const total = pesos.reduce((antetior, proximo) => {
        //     return antetior + proximo
        // }, 0)

        const minhaLista = [
            ['Miqueias', 'Sousa'],
            ['NodeBR', 'Nerdão']
        ]

        const total = minhaLista.myReduce((anterior, proximo) => {
            return anterior.concat(proximo)
        }, [])
        .join(', ')

        console.log('total', total)

    } catch (error) {
        console.error(`DEU RUIM`, error)
    }
}

main()