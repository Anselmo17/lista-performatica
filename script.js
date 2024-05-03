let listItens = document.getElementById('list');

const worker = new Worker('./worker.js');


function list() {
    console.log('----- inicio -------');

    // ate 68785 carrego
    const size = 600000;
    const itens = Object.keys(new Array(size).fill(null));

    const itensFinal = itens.map(item => ({ name: (parseInt(item) + 1) + '-Teste' }));
    worker.postMessage(itensFinal);
}



// consome os dados no html 
let lote = [];
let listFinal = '';
worker.onmessage = function (e) {
    const {type, data} = e.data;

    console.time();

    if(type === 'chunk'){
        lote.push(data);
    }
    if(type !== 'chunk'){
        listFinal = lote.join('');
        listItens.innerHTML = listFinal;
        console.timeEnd();
        console.log('---- finaliza Loop onmessage ---');
    }
}
