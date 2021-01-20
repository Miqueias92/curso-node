/**
 *  0 - obter um usuário
 *  1 - Obter o número de telefone de um usuário a partir de seu id
 *  2 - Obter um endereço de um usuário
 */

 function obterUsuario(callback){

    setTimeout(function(){
        return callback(null, {
            id: 1,
            nome: 'Aladin',
            dataNascimento: new Date(),
        })
    }, 1000);
 }

 function obterTelefone(idUsuario, callback){
    setTimeout(function(){
        return callback(null, {
            telefone: '1199002',
            ddd: 11 
        })
    }, 2000);
 }

 function obterEndereco(idUsuario, callback){
    setTimeout(function(){
        return callback(null, {
            rua: 'dos bobos',
            numero: 0
        })
    }, 2000);
 }

//  function resolverUsuario(erro, usuario){
//     console.log('usuario', usuario);
//  }

 obterUsuario(function resolverUsuario(error, usuario){
    // null || "" || 0 === false
    if(error){
        console.log('DEU RUIM em USUARIO', usuario);
        return;
    }

    obterTelefone(usuario.id, function resolverTelefone(error1, telefone){
        if(error1){
            console.log('DEU RUIM em TELEFONE', telefone);
            return;
        }

        obterEndereco(usuario.id,  function resolverEndereco(error2, endereco){
            if(error2){
                console.log('DEU RUIM em ENDERECO', endereco);
                return;
            }

            console.log(`
                Nome: ${usuario.nome},
                Endereco: ${endereco.rua}, ${endereco.numero},
                Telefone: (${telefone.ddd}) ${telefone.telefone}
            `);
        });
    });
 });

 //const telefone = ObterTelefone(usuario.id);

 //console.log('usuario', usuario);
 //console.log('telefone', telefone);