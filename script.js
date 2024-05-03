let listItens = document.getElementById('list');

const worker = new Worker('./worker.js');


// const qtdItems = 17_900_000;

// const lineHeight = 36;
// const limit = 15;
// const visibleHeight = limit * lineHeight;
// const maxVirualItemsLengh = 500_000;

// const listElement = document.querySelector("ul");
// listElement.style.height = lineHeight * limit + "px";

// let scrollTop = 0;




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
let loteOrigin = [];
let listFinal = '';
worker.onmessage = function (e) {
    const { type, data } = e.data;

    console.time();

    if (type === 'chunk') {
        lote.push(data);
    }
    if (type !== 'chunk') {
        loteOrigin = lote;
        listFinal = lote.join('');
        listItens.innerHTML = listFinal;
        console.timeEnd();
        console.log('---- finaliza Loop onmessage ---');
    }
}


// teste
// function render() {
//     listItens.innerHTML = "";

//     // calcula valores
//     const fullListHeight =
//     loteOrigin.length > maxVirualItemsLengh
//             ? maxVirualItemsLengh
//             : loteOrigin.length * lineHeight;

//     const scrollingPercentage =
//         (scrollTop * 100) / (fullListHeight - visibleHeight);
//     const startItemIndex = Math.floor(
//         (scrollingPercentage * (loteOrigin.length - limit)) / 100
//     );
//     const endItemIndex = startItemIndex + limit;
//     const startSpacerHeight = scrollTop;
//     const endSpacerHeight = fullListHeight - startSpacerHeight - visibleHeight;

//     const startSpacer = document.createElement("li");
//     startSpacer.style.height = startSpacerHeight + "px";
//     listElement.append(startSpacer);

//     let items = loteOrigin.slice(startItemIndex, endItemIndex);

//     items = items

//     items.forEach((item) => {
//         const listItem = document.createElement("li");
//         listItem.innerHTML = item.toLocaleString("pt-br");
//         listItem.style.height = lineHeight + "px";
//         listItem.classList.add("list__item");
//         listElement.append(listItem);
//     });

//     const endSpacer = document.createElement("li");
//     endSpacer.style.height = endSpacerHeight + "px";
//     listElement.append(endSpacer);
// }
