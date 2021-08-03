const EventEmitter = require('events');
const { stdin } = require('process');

class MeuEmissor extends EventEmitter {

}

const meuEmissor = new MeuEmissor();
const nomeEvento = 'usuario:click'

meuEmissor.on(nomeEvento, function(click) {
    console.log('Um usuário clicou', click)
})

// meuEmissor.emit(nomeEvento, 'na barra de rolagem')
// meuEmissor.emit(nomeEvento, 'no ok')

// let count = 0;
// setInterval(function() {
//     meuEmissor.emit(nomeEvento, 'no ok ' + (count++))
// }, 1000);

const sdtin = process.openStdin()
stdin.addListener('data', function (value) {
    console.log(`Voce digitou: ${value.toString().trim()}`)
})