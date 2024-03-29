/**
 *  0 - obter um usuário
 *  1 - Obter o número de telefone de um usuário a partir de seu id
 *  2 - Obter um endereço de um usuário
 */

 // Importamos um módulo interno do node.js
 const util = require('util')
 const obterEnderecoAsync = util.promisify(obterEndereco)

 function obterUsuario(){
    // quando der algum problema -> reject
    // quando sucesso chama resolve
    return new Promise(function resolvePromisse(resolve, reject){
        setTimeout(function(){
            
            //return reject(new Error('DEU RUIM DE VERDADE!'));

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
    setTimeout(function() {
        return callback(null, {
            rua: 'dos bobos',
            numero: 0
        })
    }, 2000);
 }

 main()
 async function main(){

    try {
        console.time('medida-promisse')
        
        const usuario = await obterUsuario()
        // const telefone = await obterTelefone(usuario.id)
        // const endereco = await obterEnderecoAsync(usuario.id)

        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])

        const telefone = resultado[0]
        const endereco = resultado[1]

        console.log(`
            Nome: ${usuario.nome},
            Telefone: (${telefone.ddd}), ${telefone.telefone}
            Endereço: ${endereco.rua}, ${endereco.numero}
        `)
        console.timeEnd('medida-promisse')

    }catch(error) {
        console.error('DEU RUIM', error);
    }
 }

//  const usuarioPromisse =  obterUsuario()

//  usuarioPromisse
//     .then(function (usuario) {
//         return obterTelefone(usuario.id)
//             .then(function resolverTelefone(result){
//                 return {
//                     usuario: {
//                         id: usuario.id,
//                         nome: usuario.nome
//                     },
//                     telefone: result
//                 }
//             })
//     })
//     .then(function (resultado){
//         const endereco = obterEnderecoAsync(resultado.usuario.id)
//         return endereco.then(function (result) {
//             return {
//                 usuario: resultado.usuario,
//                 telefone: resultado.telefone,
//                 endereco: result
//             }
//         })
//     })
//     .then(function (resultado) {
//         console.log('resultado', resultado)
//     })
//     .catch(function (error) {
//         console.log('DEU RUIM', error)  
//     })