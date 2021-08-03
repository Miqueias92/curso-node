/**
 *  0 - obter um usuário
 *  1 - Obter o número de telefone de um usuário a partir de seu id
 *  2 - Obter um endereço de um usuário
 */

 // Importamos um módulo interno do node.js
 const util = require('util')
 const obterEnderecoAsync = util.promisify(obterEndereco)

 function obterUsuario(callback){
    // quando der algum problema -> reject
    // quando sucesso chama resolve
    return new Promise(function resolvePromisse(resolve, reject){
        setTimeout(function(){
            return resolve({
                id: 1,
                nome: 'Aladin',
                dataNascimento: new Date(),
            })
        }, 1000);
    })

 }

 function obterTelefone(idUsuario){
    
    return new Promise(function resolvePromisse(resolve, reject){
        setTimeout(function(){
            return resolve({
                telefone: '1199002',
                ddd: 11 
            })
        }, 2000);
    })
 }

 function obterEndereco(idUsuario, callback){
    setTimeout(function(){
        return callback(null, {
            rua: 'dos bobos',
            numero: 0
        })
    }, 2000);
 }

