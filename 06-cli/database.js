const {
    readFile,
    writeFile 
} = require('fs')

const {
    promisify
} = require('util')

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

// outra forma de obter dados json
// const dadosJson = require('./herois.json')

class Database {
    
    constructor() {
        this.NOME_ARQUIVO = 'herois.json'
    }
    
    async obterDadosArquivo(){
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8')
        return JSON.parse(arquivo.toString())
    }

    async escreverArquivo(dados) {
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados))
        return true
    }
    
    async cadastrar(heroi) {
        const dados = await this.obterDadosArquivo()
        const id = heroi.id <= 2 ? heroi.id : Date.now()
        
        /**
         * { nome: Flash, poder: velocidade}
         * 
         * { id: 12389123}
         * 
         * { nome: Flash, poder: Velocidade, id: 781231}
         * para juntar usar o operador ...
         */
        const heroiComId = {
            id,
            ...heroi
        }
        // concatenando o array que já existia com os novos dados
        const dadosFinal = [
            ...dados,
            heroiComId
        ]

        const resultado = await this.escreverArquivo(dadosFinal)
        return resultado
    }

    async listar(id) {
        const dados = await this.obterDadosArquivo()
        const dadosFiltrado = dados.filter(item => id ? (item.id === id) : true)
        return dadosFiltrado
    }

    async remover(id) {
        if(!id) {
            return await this.escreverArquivo([])
        }

        const dados = await this.obterDadosArquivo()
        const indice = dados.findIndex(item => item.id === parseInt(id))
        if(indice === -1) {
            throw Error('O Heroi informado não existe')
        }

        dados.splice(indice, 1)
        return await this.escreverArquivo(dados)
    }

    async atualizar(id, modificacoes) {
        const dados = await this.obterDadosArquivo()
        const indice = dados.findIndex(item => item.id === parseInt(id))

        if(indice === -1) {
            throw Error('O heroi informado não existe')
        }

        const atual = dados[indice]
        const objetoAtualizar = {
            ...atual,
            ...modificacoes
        }

        dados.splice(indice, 1)

        return await this.escreverArquivo([
            ...dados,
            objetoAtualizar
        ])
    }
}

module.exports = new Database()